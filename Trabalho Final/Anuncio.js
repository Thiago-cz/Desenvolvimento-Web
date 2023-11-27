window.addEventListener('load',init)

function init(){
    document
      .querySelector("#inputCriarAnuncio")
      .addEventListener("click", mudarOpcao);
    document
      .querySelector("#inputEditarAnuncio")
      .addEventListener("click", mudarOpcao);
    document
      .querySelector("#inputRecuperarAnuncio")
      .addEventListener("click", mudarOpcao);
    document
      .querySelector("#inputDeletarAnuncio")
      .addEventListener("click", mudarOpcao);









      
}


function mudarOpcao(e) {
  let radioMenus = document.querySelector("#radioMenus");

  for (let i = 0; i < 4; i++) {
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
