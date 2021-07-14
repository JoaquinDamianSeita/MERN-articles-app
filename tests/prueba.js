const chequearNumero = num => {
    if (num <= 5){
        console.log("es menor o igual a 5");
        return true;
    } else  {
        console.log("es mayor a 5");
        return false;
    }
}

module.exports = {chequearNumero: chequearNumero};