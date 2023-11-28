var forms;
var db;

const dbName = "teste";
const objectStoreName = "contas";

window.addEventListener("load", () => {
  forms = document.forms;
  forms.formCadastrar.btnEnviar.addEventListener("click", add);
  forms.formDeletar.btnEnviar.addEventListener("click", remove);
  forms.formAtualizar.btnEnviar.addEventListener("click", put);
  forms.formRecuperarConta.btnEnviar.addEventListener("click", retreave);
  forms.formRecuperarContas.btnEnviar.addEventListener("click", retreaveAll);

  forms.formCadastrar.inputNome.addEventListener("blur", validarNome);
  forms.formCadastrar.inputTelefone.addEventListener("blur", validarTelefone);
  forms.formCadastrar.inputEmail.addEventListener("blur", validarEmail);

  forms.formAtualizar.inputNome.addEventListener("blur", validarNome);
  forms.formAtualizar.inputTelefone.addEventListener("blur", validarTelefone);
  forms.formAtualizar.inputEmail.addEventListener("blur", validarEmail);

  let openRequest = window.indexedDB.open(dbName, "1.0");
  openRequest.addEventListener("error", (error) => {
    alert(`abertura do banco falhou ${openRequest.error}`);
  });
  openRequest.addEventListener("success", () => {
    db = openRequest.result;
    alert("banco aberto com sucesso");
  });
  openRequest.addEventListener("upgradeneeded", (onu) => {
    db = openRequest.result;
    objectStore = db.createObjectStore(objectStoreName, {
      keyPath: "id",
      autoIncrement: true,
    });
    objectStore.createIndex("usuario", "usuario", { unique: true });
    objectStore.createIndex("telefone", "telefone", { unique: false });
    objectStore.createIndex("email", "email", { unique: true });

    alert("banco criado com sucesso!!!");
  });
});
//ok
function add(e) {
  e.preventDefault();
  //array com validade dos campos
  let campos = [
    forms.formCadastrar.inputNome.checked,
    forms.formCadastrar.inputTelefone.checked,
    forms.formCadastrar.inputEmail.checked,
  ];
  for (i of campos) {
    if (!i) {
      console.log("existem campos invalidos");
      return;
    }
  }
  let item = {
    usuario: forms.formCadastrar.inputNome.value,
    telefone: forms.formCadastrar.inputTelefone.value,
    email: forms.formCadastrar.inputEmail.value,
  };

  let transacao = db.transaction(objectStoreName, "readwrite");
  let objStore = transacao.objectStore(objectStoreName);
  let request = objStore.add(item);

  request.onsuccess = () => {
    console.log("elemento criado com sucesso!!");
  };

  transacao.oncomplete = () => {
    console.log("transacao concluida no banco de dados!!!");
  };

  transacao.onerror = (err) => {
    console.log(`deu ruim ${err.target.error}`);
  };
}
//ok
function retreave(e) {
  e.preventDefault();
  let id = parseInt(forms.formRecuperarConta.inputId.value);
  let transacao = db.transaction(objectStoreName, "readonly");
  let objStore = transacao.objectStore(objectStoreName);
  let request = objStore.get(id);
  request.onsuccess = function () {
    let registro = request.result;
    console.log(registro);
  };

  transacao.oncomplete = () => {
    console.log("transacao concluida, busca por id banco de dados");
  };
  transacao.onerror = (e) => {
    console.log("erro durante a transacao: " + e.target.error);
  };
}
//ok
function retreaveAll(e) {
  e.preventDefault();
  let transacao = db.transaction(objectStoreName, "readonly");
  let objStore = transacao.objectStore(objectStoreName);

  let request = objStore.getAll();
  
  request.onsuccess = function () {
    let result = request.result;
    console.log(result);
  };
}
//ok
function remove(e) {
  e.preventDefault();
  let id = parseInt(forms.formDeletar.inputId.value);
  let transacao = db.transaction(objectStoreName, "readwrite");
  let objStore = transacao.objectStore(objectStoreName);
  let request = objStore.delete(id);

  transacao.onerror = (err) => {
    console.log(`deu ruim ${err.target.error}`);
  };

  transacao.oncomplete = () => {  
    alert("transacao concluida no banco de dados!!!");
  };

  request.onsuccess = function () {
    let registro = request.result;
    console.log(`elemento deletado com sucesso!! ${registro}`);
  };

  request.onerror = (err) => {
    console.log(`deu ruim ${err}`);
  };
}
//ok
function put(e) {
  e.preventDefault();
  let item = {
    usuario: forms.formAtualizar.inputNome.value,
    telefone: forms.formAtualizar.inputTelefone.value,
    email: forms.formAtualizar.inputEmail.value,
    id: parseInt(forms.formAtualizar.inputId.value),
  };
  let transacao = db.transaction(objectStoreName, "readwrite");
  let objStore = transacao.objectStore(objectStoreName);
  let request = objStore.put(item);

  request.onsuccess = function () {
    console.log("registro alterado com sucesso!!!");
  };

  request.onerror = function (e) {
    console.log(`requisicao falhou!!! ${e.target.error}`);
  };

  transacao.onerror = function (e) {
    console.log(`erro na transacao : ${e.target.error}`);
  };

  transacao.oncomplete = function () {
    console.log("transacao completada com sucesso!!");
  };
}
//perguntar pq esse funcionou e as demais regex n funcianam
function validarNome(campo) {
  let regex = new RegExp(/^([a-z]{2,30})$/, "i");

  if (campo.target.pattern == "") {
    campo.target.pattern = regex.source;
  }
  validarCampo(campo.target, regex);
}

function validarTelefone(campo) {
  let regex = new RegExp(/^((\+[\d]{2} ?)?\d?[\d]{4}\-?[\d]{4})$/);
  validarCampo(campo.target, regex);
}

function validarEmail(campo) {
  let regex = new RegExp(
    /^([a-z]{1}[a-z0-9\_\.\-]*\@[a-z]{3,}\.((com)|(io)|(biz)|(me)){1}(.[a-z]{2})?)$/,
    "i"
  );
  validarCampo(campo.target, regex);
}

function validarCampo(campo, regex) {
  if (regex.test(campo.value)) {
    campo.classList.remove("error");
    campo.classList.add("valid");
    campo.checked = true;
    return;
  }
  campo.classList.remove("valid");
  campo.classList.add("error");
  campo.checked = false;
}
