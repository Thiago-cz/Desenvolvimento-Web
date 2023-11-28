import {
  putUsuario,
  getUsuario,
  deleteUsuario,
  logout,
} from "./CrudUsuario.js";

window.addEventListener("load", init);

function init() {
  document
    .querySelector("#inputEditarUsuario")
    .addEventListener("click", mudarOpcao);
  document
    .querySelector("#inputRecuperarUsuario")
    .addEventListener("click", mudarOpcao);
  document
    .querySelector("#inputDeletarUsuario")
    .addEventListener("click", mudarOpcao);
  document
    .querySelector("#btnEnviarEditar")
    .addEventListener("click", enviarEditar);
  document
    .querySelector("#btnRecuperarUsuarios")
    .addEventListener("click", recuperarUsuario);
  document
    .querySelector("#btnDeletarUsuario")
    .addEventListener("click", deletarUsuario);
}

// document.querySelector("#btnLogout").addEventListener("click", logout);

async function enviarEditar(e) {
  e.preventDefault();
  let id = document.querySelector("#inputIdEditar");
  let nome = document.querySelector("#inputNomeEditar");
  let email = document.querySelector("#inputEmailEditar");
  let senha = document.querySelector("#inputSenhaEditar");

  let usuarioEditado = {
    id: id.value,
    nome: nome.value,
    email: email.value,
    senha: senha.value,
  };

  putUsuario(usuarioEditado);
}

async function recuperarUsuario(e) {
  e.preventDefault();
  let tabela = document.querySelector("#tableRecuperarUsuarios");
  let linha = document.createElement("tr");

  tabela.append(linha);

  let id = document.createElement("td");
  let nome = document.createElement("td");
  let email = document.createElement("td");

  linha.append(id);
  linha.append(nome);
  linha.append(email);

  let res = await getUsuario();
  if(res){
    id.innerHTML = res.id;
    nome.innerHTML = res.nome;
    email.innerHTML = res.email;
  }

}

function deletarUsuario(e) {
  // e.preventDefault();
  deleteUsuario();
}

function mudarOpcao() {
  let radioMenus = document.querySelector("#radioMenus");

  for (let i = 0; i < 3; i++) {
    let input = radioMenus.children[i];
    if (input.checked) {
      let id = input.id.replace("input", "div");
      document.querySelector(`#${id}`).style.display = "";
    } else {
      let id = input.id.replace("input", "div");
      document.querySelector(`#${id}`).style.display = "none";
    }
  }
}
