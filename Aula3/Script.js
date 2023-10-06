let btn1 = document.querySelector("#btn1");
let btn2 = document.querySelector("#btn2");
let btn3 = document.querySelector("#btn3");
let btn4 = document.querySelector("#btn4");
let btn5 = document.querySelector("#btn5");

btn1.addEventListener("click", fun1);
btn2.addEventListener("click", fun2);
btn3.addEventListener("click", fun3);
btn4.addEventListener("click", fun4);

function fun1() {
  let val = fatorial(parseInt(document.querySelector("#exerc1").value));
  document.querySelector("#result1").innerHTML = val;
}

function fun2() {
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  let dt = document.querySelector("#exerc2").value;
  dt = dt.split("-");
  console.log(dt[1])
  document.querySelector("#result2").innerHTML = `${dt[2]} de ${meses[parseInt(dt[1])-1]} de ${dt[0]}`;
}

function fun3(){
  document.querySelector("#result3").innerHTML = "t"
  let nome = document.querySelector("#exerc31").value
  let peso = document.querySelector("#exerc32").value
  let altura = document.querySelector("#exerc33").value
  let imc = (peso/Math.pow(altura,2)).toFixed(2)
  let grau

  if(imc <= 18.5 ){
    grau = "abaixo do peso"
  } else if(imc <= 24.9) {
    grau = "com o peso ideal"
  } else if(imc <= 29.9) {
    grau = "levemente acima do peso"
  } else if (imc <= 34.9) {
    grau = "Obesidade I(fortinho)"
  } else if(imc <= 39.9) {
    grau = "Obesidade grau II(cheinho)"
  } else {
    grau = "Obesidade grau III (muito forte)"
  }
  document.querySelector("#result3").innerHTML = `Meu caro ${nome}, o seu IMC é: ${imc} e você está ${grau}`
}

function fun4(){
  let input = document.querySelector("#exerc4").value
  let notas = []
  let val_restante = 0

  input%50 == 0 ? notas[0] = input/50 : notas[0] = Math.floor(input/50)
  val_restante = input - notas[0]*50
  val_restante%10 == 0 ? notas[1] = val_restante/10 : notas[1] = Math.floor(val_restante/10)
  val_restante -= notas[1]*10
  val_restante%5 == 0 ? notas[2] = val_restante/5 : notas[2] = Math.floor(val_restante/5)
  val_restante -= notas[2]*5
  val_restante == 0 ? notas[3] = 0 : notas[3] = val_restante

  document.querySelector("#result4").innerHTML = `${notas[0]} - ${notas[1]} - ${notas[2]} - ${notas[3]}`
}
function fatorial(n) {
  if (n == 0 || n == 1) return 1;
  return n * fatorial(n - 1);
}
