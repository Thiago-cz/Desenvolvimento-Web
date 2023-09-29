window.addEventListener("load", init);

function init(){
    let input = document.querySelector("#input");
    let resultado = document.querySelector("#resultado");
    let btn = document.querySelector("#btn");

    btn.addEventListener("click", function(){
        let array = input.value.split(",");
        resultado.innerHTML = calcularMedia(array);
        console.log(calcularMedia(array))
    })
    
}

function filtrar (a){
    let filtro = [];
    for (const i of a) {
        if(i < 100)  filtro.push(i);
    }
    return filtro;
};

function calcularMedia(a){
    let filtro = filtrar(a);
    let soma = 0;
    for (const i of filtro){
        soma += Number(i);
    }
    return soma/filtro.length
    
}
