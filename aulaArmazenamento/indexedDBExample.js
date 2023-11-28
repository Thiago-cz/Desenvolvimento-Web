window.addEventListener('load', ()=>{
  document.querySelector("#buscar")
    .addEventListener("click", exibirTodosRegistros);
});

var db;

let openRequest = window.indexedDB.open('users_db', 1.0 );

//Callback executado na criação ou atualização do banco
openRequest.onupgradeneeded = evento => {
  let db = evento.target.result;

  let objectStore = db.createObjectStore('users', {keyPath: 'id', autoIncrement: true});

  objectStore.createIndex('username', 'username', {unique: true});
  objectStore.createIndex('password', 'password', {unique: false});

  console.log("Database criado com sucesso!")

}

//Callback executado quando o banco é aberto (ou criado) com sucesso
openRequest.onsuccess = evento => {
  console.log("Conexão obtida com sucesso");

  //Recupera a instância do DB
  db = openRequest.result;

  exibirTodosRegistros();
}

//Callback executado caso algum erro aconteca
openRequest.onerror = evento => {
  console.log("Error on DB open: "+ evento.target.error)
}



// let newItem = {username: "admin", password: "admin"};
function adicionarRegistro(newItem){
  //Criar uma transaction no modo readWrite que irá manipular a store users
  let transaction = db.transaction('users', 'readwrite');

  //Recupera a instância do ObjectStore para realizar a operação
  let objectStore = transaction.objectStore('users');

  //Realiza a operação de adicionar elemento
  let request = objectStore.add(newItem);
  request.onsuccess = function (){
    console.log("Request para adicionar elemento criada com sucesso");
    //Aqui você pode apagar o valor digitado nos campos do formulário
  }

  transaction.oncomplete = () => {
    console.log("Transação completa! Adição de item realizada no banco de dados");

    exibirTodosRegistros();
  }

  transaction.onerror = (evento) => {
    console.log("Erro durante a execução ou abertura transação");
    console.log("Error: "+evento.target.error)
  }
}

function exibirTodosRegistros(){
  //Criar uma transaction no modo readonly para recuperar informações no store
  let transaction = db.transaction('users', 'readonly');

  //Recupera a instância do ObjectStore para realizar a operação
  let objectStore = transaction.objectStore('users');

  let request = objectStore.getAll();
  request.onsuccess = function (){
    let data = request.result;

    console.log(data);
  }

  transaction.oncomplete = () => {
    console.log("Transação completa! Buscar todos realizada no banco de dados");
    
  }

  transaction.onerror = (evento) => {
    console.log("Erro durante a execução ou abertura transação");
    console.log("Error: "+evento.target.error)
  }
}

function buscarRegistroPorID(id){
  //Criar uma transaction no modo readonly para recuperar informações no store
  let transaction = db.transaction('users', 'readonly');

  //Recupera a instância do ObjectStore para realizar a operação
  let objectStore = transaction.objectStore('users');

  let request = objectStore.get(id);
  request.onsuccess = function (){
    let registro = request.result;

    console.log(registro);
  }

  transaction.oncomplete = () => {
    console.log("Transação completa! Busca por ID realizada no banco de dados");
   
  }

  transaction.onerror = (evento) => {
    console.log("Erro durante a execução ou abertura transação");
    console.log("Error: "+evento.target.error)
  }
}

function alterarRegistro(editedItem){
  //Criar uma transaction no modo readwrite para alterar informações no store
  let transaction = db.transaction('users', 'readwrite');

  //Recupera a instância do ObjectStore para realizar a operação
  let objectStore = transaction.objectStore('users');

  let request = objectStore.put(editedItem);
  request.onsuccess = function (){
    console.log("Request para alterar elemento criada com sucesso");
    //Aqui você pode apagar o valor digitado nos campos do formulário
  }

  transaction.oncomplete = () => {
    console.log("Transação completa! Modificação realizada no banco de dados");
    exibirTodosRegistros();
  }

  transaction.onerror = (evento) => {
    console.log("Erro durante a execução ou abertura transação");
    console.log("Error: "+evento.target.error)
  }
}

function apagarRegistro(item){
  //Criar uma transaction no modo readwrite para alterar informações no store
  let transaction = db.transaction('users', 'readwrite');

  //Recupera a instância do ObjectStore para realizar a operação
  let objectStore = transaction.objectStore('users');

  objectStore.delete(item.id);

  transaction.oncomplete = () => {
    console.log("Transação completa! Remoção realizada no banco de dados");
    exibirTodosRegistros();
  }

  transaction.onerror = () => {
    console.log("Erro na abertura da transação");
  }
}