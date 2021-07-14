const {chequearNumero} = require("./prueba")


test("chequeo si 3 es menor a 5", () => {
    const resultado = chequearNumero(6);
    expect(resultado).toBe(true)
});