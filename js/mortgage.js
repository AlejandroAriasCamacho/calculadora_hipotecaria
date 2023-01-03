
function calcualteMortgage(e) {


   // este metodo previene el comportamioento por defecto del formulario
    e.preventDefault();

    /*
    recuiperar el valor de los elementos de formulario
    debo indicar el api del DOM 
    */
    let couta = document.forms["fmortgage"]["fcouta"].value;
    let costoTotal = document.forms["fmortgage"]["fvalortotal"].value;
    let interes = document.forms["fmortgage"]["ftinteres"].value;
    let plazoAnio = document.forms["fmortgage"]["fplazo"].value;
    const MONTHS_ON_YEAR = 12;

    const mortgage = {
        costoTotalInmueble: 0,
        totalPrestamo: 0,
        totalInteres: 0,
        cuotaMensual: 0
    };

    mortgage.costoTotalInmueble = costoTotal;
    mortgage.totalPrestamo = costoTotal - couta;
    mortgage.totalInteres = mortgage.totalPrestamo * interes / 100;
    mortgage.cuotaMensual = (mortgage.totalPrestamo + mortgage.totalInteres) / (plazoAnio * MONTHS_ON_YEAR);

   
    ouputMortgage(mortgage);

}

function ouputMortgage(finalMortgage){

   document.getElementById("omontoprestamo").innerHTML = ValueToDollar(finalMortgage.totalPrestamo);
   document.getElementById("ocuota").innerHTML = ValueToDollar(finalMortgage.cuotaMensual);
   var totalPrestamoPorcentaje = 0;
   totalPrestamoPorcentaje = finalMortgage.totalPrestamo * 100 / finalMortgage.costoTotalInmueble;
   alert(totalPrestamoPorcentaje);
//    <output  class="form-control" id="omontoprestamo">0</output>
   if(totalPrestamoPorcentaje > 90){
    document.getElementById("omontoprestamo").className += " alertaPorcentaje";
   } else {
    document.getElementById("omontoprestamo").className = "form-control";
   }
}

function resetform(){
    document.forms["fmortgage"].reset();
}


function ValueToDollar(value){
    const dollarformatter = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2});
    return dollarformatter.format(value);

}


