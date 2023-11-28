export async function createUsuario(usuario) {
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

export async function getUsuario() {
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
      return
    }

    let usuario = await res.json();

    return usuario;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUsuario() {
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
      return;
    }

    let usuario = await res.json();
    alert("Usuario deletado com sucesso!");
    console.log(usuario);
  } catch (error) {
    console.log(error);
  }
}

export async function putUsuario(usuario) {
  let user = usuario;
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
      body: JSON.stringify(user),
    });
    if (res.status != 200) {
      alert("Erro ao editar usuario");
      console.log(res);
      return;
    }

    let usuario = await res.json();
    alert("Usuario editado com sucesso!");
    console.log(usuario);
  } catch (error) {
    console.log(error);
  }
}

export function logout() {
  localStorage.clear();
  window.location.href = "./Login.html";
}
