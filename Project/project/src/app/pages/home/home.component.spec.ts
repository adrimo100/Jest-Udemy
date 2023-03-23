import { HomeComponent } from './home.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { Book } from 'src/app/models/book.model';
import { of } from 'rxjs';

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

const bookServiceMock = {
  getBooks: () => of(listBook),
};

describe('Home Component', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [
        //BookService,
        {
          //Para Mockear el servicio globalmente para el test
          provide: BookService,
          useValue: bookServiceMock, //El sustituto que hemos hecho para mockear
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //Para que se ejecuten los hooks
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getBooks get books from the subscription', () => {
    const bookService = fixture.debugElement.injector.get(BookService);
    /*const spy = jest
      .spyOn(bookService, 'getBooks')
      .mockReturnValueOnce(of(listBook));*/
    component.getBooks();
    //expect(spy).toBeCalled();
    expect(component.listBook.length).toBe(3);
    expect(component.listBook).toEqual(listBook);
  });
});
