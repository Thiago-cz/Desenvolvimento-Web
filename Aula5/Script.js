window.addEventListener("load", init)

function init(){
    let quadrados = document.querySelectorAll(".quadrado")

    for (let q of quadrados) {
        q.addEventListener("mouseover", trocarCor)
        q.addEventListener("mouseout", trocarCor)
    }
}

function trocarCor(){
    this.style.backgroundColor = escolherCor()
}

function escolherCor(){
    return `${Math.floor(Math.random()*255).toString(16)}${Math.floor(Math.random()*255).toString(16)}${Math.floor(Math.random()*255).toString(16)}`
}