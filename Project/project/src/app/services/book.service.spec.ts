import { BookService } from './book.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment.prod';
import Swal from 'sweetalert2';

const listBook: Book[] = [
  {
    name: '',
    author: '',
    isbn: '',
    price: 15,
    amount: 2,
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 20,
    amount: 1,
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 8,
    amount: 7,
  },
];

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController; //Para mockear las peticiones http

  beforeEach(() => {
    TestBed.configureTestingModule({
      //No hace falta declarations porque no tocamos componentes
      imports: [HttpClientTestingModule],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); //Para que no se lance el siguiente test mientras haya una petición http pendiente del test anterior.
  });

  afterEach(() => {
    jest.resetAllMocks(); //Para resetear los mocks
    localStorage.clear();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('getBooks return a list of book and does a get method', () => {
    service.getBooks().subscribe((data: Book[]) => {
      expect(data).toEqual(listBook);
    });
    const req = httpMock.expectOne(environment.API_REST_URL + '/book');

    expect(req.request.method).toBe('GET'); //Para comprobar que se ha realizado un GET.

    req.flush(listBook); //Simulamos que la petición http se ha hecho y ha devuelto listBook
  });

  it('getBooksFromCart returns a empty array when localStorage is empty', () => {
    const listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
  });

  it('getBooksFromCart returns an array of books when it exists in the local storage', () => {
    localStorage.setItem('listCartBook', JSON.stringify(listBook));
    const newListBook = service.getBooksFromCart();
    expect(newListBook.length).toBe(3);
  });

  it('addBookToCart add a book successfully when the list does not exist in the localStorage', () => {
    const book: Book = {
      name: '',
      author: '',
      isbn: '',
      price: 15,
      amount: 2,
    };

    const toastMock = {
      fire: () => null,
    } as any;

    const spy1 = jest.spyOn(Swal, 'mixin').mockImplementation(() => {
      return toastMock;
    });

    service.addBookToCart(book);

    const newListBook = service.getBooksFromCart();

    expect(spy1).toBeCalled();
    expect(newListBook.length).toBe(1);
  });

  it('reomoveBooksFromCart removes the list from the localStorage', () => {
    const book: Book = {
      name: '',
      author: '',
      isbn: '',
      price: 15,
      amount: 2,
    };
    const toastMock = {
      fire: () => null,
    } as any;

    jest.spyOn(Swal, 'mixin').mockImplementation(() => {
      return toastMock;
    });
    service.addBookToCart(book);
    let newListBook = service.getBooksFromCart();
    expect(newListBook.length).toBe(1);
    service.removeBooksFromCart();
    newListBook = service.getBooksFromCart();
    expect(newListBook.length).toBe(0);
  });
});
