window.addEventListener("load", init);
let alunos = [];
function init() {
  let enviarAluno = document.querySelector("#enviarAluno");
  let btn1 = document.querySelector("#btn1");
  let btn2 = document.querySelector("#btn2");
  let btn3 = document.querySelector("#btn3");
  let btn4 = document.querySelector("#btn4");
  let btn5 = document.querySelector("#btn5");

  enviarAluno.addEventListener("click", addAluno);
  btn1.addEventListener("click", imprimir);
  btn2.addEventListener("click", imprimir);
  btn3.addEventListener("click", imprimir);
  btn4.addEventListener("click", imprimir);
  btn5.addEventListener("click", imprimir);
}

function addAluno() {
  let nome = document.querySelector("#inputNome");
  let nota = document.querySelector("#inputNota");
  let aluno = {
    nome: nome.value,
    nota: nota.value,
  };
  alunos.push(aluno);
  nome.value = "";
  nota.value = "";
}

function ordemAlfabetica() {
  let copia = alunos.slice();
  return copia.sort((a, b) => a.nome.localeCompare(b.nome));
}

function ordemDescrecenteNota() {
  let copia = alunos.slice();
  return copia.sort((a, b) => b.nota - a.nota);
}

function maiorNota() {
  let notas = ordemDescrecenteNota();
  let i = -1;
  let j = 0;
  let maioresNotas = [];
  do {
    i++;
    j++;
    maioresNotas.push(notas[i]);
  } while (notas[i].nota == notas[j].nota);
  return maioresNotas;
}

function media() {
  let media = 0;
  for (const n of alunos) {
    media += Number(n.nota);
  }
  media = media / alunos.length;
  let resultado = {
    nome: "Media",
    nota: media,
  };
  return [resultado];
}

function aprovados() {
    let copia = alunos.copyWithin();
    let aprovados = copia.filter((aprovado) => aprovado.nota >= 6);
    return aprovados;
}

function imprimir() {
  let divResposta = document.querySelector("#resposta");
  let array;
  switch (this.id) {
    case "btn1":
      array = ordemAlfabetica();
      break;

    case "btn2":
      array = ordemDescrecenteNota();
      break;

    case "btn3":
      array = maiorNota();
      break;

    case "btn4":
      array = media();
      break;

    case "btn5":
      array = aprovados();
      break;
  }
  //Aproveitei o metodo imprimir para fazer todos, por isso o exercicio 4 tive que transformar em uma lista
  let resposta = "";
  for (const i of array) {
    let nome = i.nome;
    let nota = i.nota;
    resposta += `Nome ${nome} ---------- Nota ${nota}<br>`;
  }

  divResposta.innerHTML = resposta;
}
