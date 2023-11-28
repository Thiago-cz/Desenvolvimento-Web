<<<<<<< HEAD
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
=======
document.querySelector("#btnGetUsuario").addEventListener("click", getusuario);
document.querySelector("#btnPutUsuario").addEventListener("click", putUsuario);
document.querySelector("#btnLogout").addEventListener("click", logout);
document
  .querySelector("#btnDeletarUsuario")
  .addEventListener("click", deleteUsuario);

export async function creteateUsuario() {
  try {
    let res = await fetch(`http://204.48.20.110/usuario`, {
      method: "POST",
      headers: {
        Accept: "applicantion/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(usuario),
    });

    if (res.status != 200 && res.status != 201) {
      alert("Erro ao criar usuario!");
      console.log(res);
      return;
    }

    let dados = await res.json();
    alert("Usuario criado com sucesso");
    return dados;
  } catch (error) {
    console.log(error);
  }
}

async function getusuario() {
  try {
    let res = await fetch("http://204.48.20.110/usuario", {
      method: "GET",
      headers: {
        Accept: "apllication/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      mode: "cors",
    });

    if (res.status != 200) {
      alert("Erro ao recuperar usuario");
      console.log(res);
    }

    let usuario = await res.json();
    console.log(usuario);
  } catch (error) {
    console.log(error);
  }
}

async function deleteUsuario(e) {
  try {
    let res = await fetch("http://204.48.20.110/usuario/", {
      method: "DELETE",
      headers: {
        Accept: "apllication/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      mode: "cors",
    });

    if (res.status != 200) {
      alert("Erro ao deletar usuario");
      console.log(res);
    }

    let usuario = await res.json();
    console.log(usuario);
  } catch (error) {}
}

function logout() {
  localStorage.clear();
  window.location.href = "./Login.html";
}

async function putUsuario(e) {
  // let divEditarUsuario = document.querySelector("#divEditarUsuario")
  try {
    let res = await fetch("http://204.48.20.110/usuario", {
      method: "PUT",
      headers: {
        Accept: "apllication/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      mode: "cors",
      body: JSON.stringify({
        nome: "Pedrao",
        email: "thiagooo@gmail.com",
        senha: "teste",
      }),
    });
    if (res.status != 200) {
      alert("Erro ao editar usuario");
      console.log(res);
    }

    let usuario = await res.json();
    console.log(usuario);
  } catch (error) {
    console.log(error);
  }
}
>>>>>>> 3923f7f73c1b9c8785216db29c10e16549feafd3
