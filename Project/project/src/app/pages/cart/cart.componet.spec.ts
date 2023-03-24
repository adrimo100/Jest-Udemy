import { CartComponent } from './cart.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from 'src/app/models/book.model';

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

describe('Cart component', () => {
  //Método donde vamos a crear los test. Primer argumento el nombre del bloque y el ségundo método que contiene los tests

  let component: CartComponent; //Componente que vamos a usar en los tets
  let fixture: ComponentFixture<CartComponent>; //Variable para poder acceder a características del componente
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      //Objeto de configuración de los tests
      imports: [
        HttpClientTestingModule, //Se debe añadir en los casos en los que llamamos a APIs para simular las peticiones.
      ],
      declarations: [CartComponent], //Componentes a testear
      providers: [BookService], //Servicios necesarios para los tests
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA], //Opcinal pero recomendable
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent); //Creamos el componente
    component = fixture.componentInstance; //Guardamos el componente en component
    fixture.detectChanges(); //Para que el componente ejecute los hooks
    service = fixture.debugElement.injector.get(BookService); //Para obtener el servicio
    jest.spyOn(service, 'getBooksFromCart').mockImplementation(() => listBook); //Para cubrir el OnInit
  });

  afterEach(() => {
    fixture.destroy();
    jest.resetAllMocks();
  });

  it('should create', () => {
    //Pide el nombre del test y el método que será el test
    expect(component).toBeTruthy(); //Comprueba que el componente se ha instanciado
  });

  it('getTotalPrice returns an amount', () => {
    const totalPrice = component.getTotalPrice(listBook);

    expect(totalPrice).toBeGreaterThan(0);
    expect(totalPrice).not.toBeNull();
  });

  it('OnInputNumberChange increments correctly', () => {
    const action = 'plus';
    const book: Book = {
      name: '',
      author: '',
      isbn: '',
      price: 15,
      amount: 2,
    };

    const spy1 = jest
      .spyOn(service, 'updateAmountBook') //Espiamos el método que se va a usar del servicio para evitar que se ejecute de verdad
      .mockImplementation(() => null); //Hacemos un mock pasandole a la vez un método alternativo.
    const spy2 = jest
      .spyOn(component, 'getTotalPrice')
      .mockImplementation(() => null);

    component.onInputNumberChange(action, book);

    expect(spy1).toHaveBeenCalled(); //Comprobar que se ha llamado
    expect(spy2).toHaveBeenCalled();
    expect(book.amount).toBe(3);
  });

  it('OnInputNumberChange decrements correctly', () => {
    const action = 'minus';
    const book: Book = {
      name: '',
      author: '',
      isbn: '',
      price: 15,
      amount: 2,
    };

    const spy1 = jest
      .spyOn(service, 'updateAmountBook') //Espiamos el método que se va a usar del servicio para evitar que se ejecute de verdad
      .mockImplementation(() => null); //Hacemos un mock pasandole a la vez un método alternativo.
    const spy2 = jest
      .spyOn(component, 'getTotalPrice')
      .mockImplementation(() => null);

    component.onInputNumberChange(action, book);

    expect(spy1).toHaveBeenCalled(); //Comprobar que se ha llamado
    expect(spy2).toHaveBeenCalled();
    expect(book.amount).toBe(1);
  });

  //Test método privado se hace testenado el método público que lo llama
  it('onClearBooks works correctly', () => {
    const spy = jest.spyOn(service, 'removeBooksFromCart').mockImplementation();
    component.listCartBook = [...listBook];
    component.onClearBooks();

    expect(spy).toBeCalled();
    expect(component.listCartBook.length).toBe(0);
  });

  //Test de método privado directamente (no se suele hacer, con lo anterior basta)
  it('clearListCarBook works correctly', () => {
    const spy = jest
      .spyOn(service, 'removeBooksFromCart')
      .mockImplementation(() => null);
    component.listCartBook = [...listBook];
    component['_clearListCartBook'](); //Para poder acceder y ejecutar el método privado
    expect(component.listCartBook.length).toBe(0);
    expect(spy).toBeCalled();
  });
});
