import { ReduceTextPipe } from "./reduce-text.pipe"

describe("ReduceTextPipe", () => { //En un test de un pipe no es necesario configurar TestBed

    let pipe: ReduceTextPipe

    beforeEach(() => {
        pipe = new ReduceTextPipe()
    })

    it("should create", () => {
        expect(pipe).toBeTruthy()
    })

    it("use transform correctly", () => {
        const text = "Hello this is a test to check"
        const newText = pipe.transform(text, 5);

        expect(newText.length).toBe(5);
    })
})