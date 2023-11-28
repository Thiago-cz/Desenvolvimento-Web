
//Adiciona um registro com a chave / valor informados
function adicionarInfo(chave, valor){
  localStorage.setItem(chave, valor);
}

//Busca o registro pela chave informada
function buscarInfo(chave){
  let valor = localStorage.getItem(chave);
  return valor;
}

//Apaga um registro pela chave informada
function removeInfo(chaved){
  let valor = localStorage.removeItem(chave);
  return valor;
}

