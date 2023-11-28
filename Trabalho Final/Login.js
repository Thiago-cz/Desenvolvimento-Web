import { createUsuario } from "./CrudUsuario.js";

let forms;
let inputEmailLogin;
let inputSenhaLogin;
let btnLogin;
let btnCriarConta;
let checkContinuarLogado; //implementar se der tempo (criar um sessionStorege)

window.addEventListener("load", init);

function init() {
  forms = document.querySelector("#formLogin");
  btnLogin = forms.btnLogin;
  inputEmailLogin = forms.inputEmailLogin;
  inputSenhaLogin = forms.inputSenhaLogin;
  btnCriarConta = forms.btnCriarConta;
  checkContinuarLogado = forms.checkContinuarLoagado;

  btnCriarConta.addEventListener("click", () => {
    this.document.querySelector("#divConteinerLogin").style.display = "none";
    criarTelaCriarConta();
  });
  btnLogin.addEventListener("click", fazerLogin);
}

// function validarEmail() {

// }

// function validarSenha() {

// }

function criarTelaCriarConta() {
  if (document.querySelector("#divConteinerCriarConta")) {
    document.querySelector("#divConteinerLogin").style.display = "none";
    document.querySelector("#divConteinerCriarConta").style.display = "";
    return;
  }
  document.querySelector("#divConteinerLogin").setAttribute("display", "none");

  let divConteinerCriarConta = document.createElement("div");
  let formCriarConta = document.createElement("form");
  formCriarConta.id = "formCriarConta";
  document.querySelector("body").append(divConteinerCriarConta);

  divConteinerCriarConta.classList.add("divConteiner");
  divConteinerCriarConta.id = "divConteinerCriarConta";
  divConteinerCriarConta.append(formCriarConta);

  let titulo = document.querySelector("#titulo").cloneNode(true);
  let nome = document.querySelector(".divEmail").cloneNode(true);
  let barra = document.querySelector("#barra").cloneNode(true);
  let divEmail = nome.cloneNode(true);
  let divSenha = document.querySelector(".divSenha").cloneNode(true);
  let divBtnCadastrar = document.createElement("div");
  let divVoltarLogin = document.createElement("div");
  let btnCadastrar = document.createElement("button");
  let btnVoltarLogin = document.createElement("button");

  titulo.children[0].innerHTML = "Cadastar Usuario";

  nome.children[0].innerHTML = "Nome";
  nome.children[0].htmlFor = "inputNome";
  nome.children[1].id = "inputNome";
  nome.children[1].value = "";
  nome.children[1].type = "text";
  nome.children[1].placeholder = "Joao da Siva Filho";
  nome.style.width = "100%";

  divEmail.children[1].id = "inputEmailCriarConta";
  divEmail.style.width = "100%";
  divEmail.children[1].value = "";
  divSenha.children[1].id = "inputSenhaCriarConta";
  divSenha.style.width = "100%";
  divSenha.children[1].value = "";

  btnCadastrar.innerHTML = "Cadastrar";
  btnCadastrar.type = "submit";
  btnCadastrar.id = "btnCadastrar";
  btnCadastrar.addEventListener("click", enviarFormCadastro);

  btnVoltarLogin.id = "btnVoltarLogin";
  btnVoltarLogin.innerHTML = "Voltar para Login";
  btnVoltarLogin.type = "button";
  btnVoltarLogin.addEventListener("click", () => {
    divConteinerCriarConta.style.display = "none";
    document.querySelector("#divConteinerLogin").style.display = "";
  });

  divVoltarLogin.classList.add("divVoltarLogin");
  divBtnCadastrar.classList.add("divBtnCadastrar");
  divBtnCadastrar.style.marginBottom = "10%";

  divBtnCadastrar.append(btnCadastrar);
  divVoltarLogin.append(btnVoltarLogin);

  formCriarConta.append(titulo);
  formCriarConta.append(barra);
  formCriarConta.append(nome);
  formCriarConta.append(divEmail);
  formCriarConta.append(divSenha);
  formCriarConta.append(divBtnCadastrar);
  formCriarConta.append(divVoltarLogin);
}

async function enviarFormCadastro(e) {
  e.preventDefault();
  let nome = document.querySelector("#inputNome");
  let email = document.querySelector("#inputEmailCriarConta");
  let senha = document.querySelector("#inputSenhaCriarConta");

  let usuario = {
    id: 0,
    nome: nome.value,
    email: email.value,
    senha: senha.value,
  };

  let result = createUsuario();
  if (result) {
    nome.value = "";
    email.value = "";
    senha.value = "";
    window.location.href;
  }
  //limpar formulario
}

async function fazerLogin(e) {
  e.preventDefault();
  let email = document.querySelector("#inputEmailLogin");
  let senha = document.querySelector("#inputSenhaLogin");

  let usuario = {
    email: email.value,
    senha: senha.value,
  };

  try {
    let res = await fetch("http://204.48.20.110/login", {
      method: "POST",
      headers: {
        Accept: "applicantion/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(usuario),
    });

    if (res.status != 200 && res.status != 201) {
      alert("Senha ou email incorretos");
      return;
    }

    let token = await res.json();
    console.log(token);
    window.localStorage.setItem("token", `${token.token}`);

    window.location.href = "./Usuario.html";
  } catch (error) {
    console.log(error);
  }
}
