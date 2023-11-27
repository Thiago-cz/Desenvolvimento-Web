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
