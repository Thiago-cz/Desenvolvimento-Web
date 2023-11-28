let forms;
let btnEnviar;
let btnAddAluno;
let btnMostarMelhorAluno;
let btnMostarMediaAlunos;
let listaAlunos = [];

window.addEventListener("load", () => {
  forms = document.forms;
  btnAddAluno = document.querySelector("#btnAddAluno");
  btnEnviar = document.querySelector("#btnEnviar");
  btnMostarMediaAlunos = document.querySelector("#btnMostarMediaAlunos");
  btnMostarMelhorAluno = document.querySelector("#btnMostarMelhorAluno");
  btnMostarMediaAlunos.addEventListener("click", mostarMediaNotas);
  btnMostarMelhorAluno.addEventListener("click", mostarMaiorNota);
  btnAddAluno.addEventListener("click", addAluno);
  btnEnviar.addEventListener("click", enviarNotas);
});

function validarNome(nome) {
  let regex = new RegExp(/^([a-z]| )?$/);
  if (regex.test(nome)) return true;
  return false;
}

function validarEmail(email) {
  let regex = new RegExp(
    /^[a-z][a-zA-Z]+@[a-zA-Z]{3,}[a-zA-Z]{2,3}(\.[a-zA-Z]{2})?$/
  );
  if (regex.test(email)) return true;
  return false;
}

function validarNota(nota) {
  if ((nota) => 0 && nota <= 10) return true;
  return false;
}

function enviarNotas() {
  let divs = forms[0].getElementsByTagName("div");
  let formValido = true;

  for (const element of divs) {
    let nomeAluno = element.querySelector(".nome").value;
    let emailAluno = element.querySelector(".email").value;
    let notaAluno = parseInt(element.querySelector(".nota").value);

    if (
      validarEmail(emailAluno) &&
      validarNome(nomeAluno) &&
      validarNota(notaAluno)
    ) {
      let aluno = {
        nome: nomeAluno,
        email: emailAluno,
        nota: notaAluno,
      };

      listaAlunos.push(aluno);
    }else {
        formValido = false;
    }

    if(!formValido) {
        document.querySelector('span').innerHTML = 'Formulario invalido!!!'
        listaAlunos = null;
        return;
    }
  }
  for (let i = 0; i < divs.length; i++) {
    document.forms[0].removeChild(document.forms[0].querySelector("div"));
  }
  forms[0].querySelector(".nome").value = "";
  forms[0].querySelector(".email").value = "";
  forms[0].querySelector(".nota").value = "";
}

function mostarMaiorNota() {
  let maiorNota = 0;
  let melhorAluno;

  for (const aluno of listaAlunos) {
    if (aluno.nota >= maiorNota) {
      melhorAluno = aluno;
      maiorNota = melhorAluno.nota;
    }
  }

  document.querySelector(
    "span"
  ).innerHTML = `O melhor aluno eh: ${melhorAluno.nome} com a nota ${melhorAluno.nota}.`;
}

function mostarMediaNotas() {
  let media = 0;
  let soma = 0;

  for (const aluno of listaAlunos) {
    soma += aluno.nota;
  }
  media = soma / listaAlunos.length;
  document.querySelector("span").innerHTML = `A media dos alunos eh ${media}`;
}

function addAluno() {
  document.forms[0].append(document.createElement("div"));
  let divs = document.forms[0].getElementsByTagName("div");
  let div = divs.item(divs.length - 1);
  div.append(document.createElement("label"));
  div.append(document.createElement("label"));
  div.append(document.createElement("label"));
  let label = div.getElementsByTagName("label");
  label[0].innerHTML = " Nome ";
  label[1].innerHTML = " Email ";
  label[2].innerHTML = " Nota ";
  label[0].append(document.createElement("input"));
  label[1].append(document.createElement("input"));
  label[2].append(document.createElement("input"));
  label[0].querySelector("input").classList.add("nome");
  label[1].querySelector("input").classList.add("email");
  label[2].querySelector("input").classList.add("nota");
}
