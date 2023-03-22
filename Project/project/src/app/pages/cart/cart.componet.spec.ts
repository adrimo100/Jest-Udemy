import { CartComponent } from "./cart.component"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { BookService } from "../../services/book.service";
import { Book } from "src/app/models/book.model";
 
const listBook: Book[] = [
    {
        name: "", 
        author: "", 
        isbn: "", 
        price: 15, 
        amount: 2
    },
    {
        name: "", 
        author: "", 
        isbn: "", 
        price: 20, 
        amount: 1
    },
    {
        name: "", 
        author: "", 
        isbn: "", 
        price: 8, 
        amount: 7
    }
]

describe("Cart component", () => { //Método donde vamos a crear los test. Primer argumento el nombre del bloque y el ségundo método que contiene los tests

    let component: CartComponent; //Componente que vamos a usar en los tets
    let fixture: ComponentFixture<CartComponent> //Variable para poder acceder a características del componente
    
    beforeEach(() => {
        TestBed.configureTestingModule({ //Objeto de configuración de los tests
            imports: [
                HttpClientTestingModule //Se debe añadir en los casos en los que llamamos a APIs para simular las peticiones.
            ],
            declarations:[
                CartComponent
            ],
            providers:[
                BookService
            ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ] //Opcinal pero recomendable
        }) 
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent); //Creamos el componente
        component = fixture.componentInstance; //Guardamos el componente en component
        fixture.detectChanges(); //Para que el componente ejecute los hooks
    })

    it("should create", () => { //Pide el nombre del test y el método que será el test
        expect(component).toBeTruthy(); //Comprueba que el componente se ha instanciado
    })
    
    it("getTotalPrice returns an amount",() => {
        const totalPrice = component.getTotalPrice(listBook);

        expect(totalPrice).toBeGreaterThan(0);
        expect(totalPrice).not.toBeNull();
    })
})