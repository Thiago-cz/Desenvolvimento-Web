window.addEventListener("load", init);
var form;
function init() {
  form = document.forms.formCadastroUsuario;
  form.inputNome.addEventListener("blur", validarNome);
  form.inputCPFCNPJ.addEventListener("blur", validarCpf);
  form.inputTelefone.addEventListener("blur", validarTelefone);
  form.inputEmail.addEventListener("blur", validarEmail);
  form.inputDataNascimento.addEventListener("blur", validarDataNascimento);
  form.inputIdade.addEventListener("blur", validarIdade);
  form.selectEstado.addEventListener("blur", validarEstado);
  form.selectCidade.addEventListener("blur", validarCidade);
  form.radioMasculino.addEventListener("blur", validarSexo);
  form.radioFeminino.addEventListener("blur", validarSexo);
  form.radioOutro.addEventListener("blur", validarSexo);
  form.checkBoxAlemao.addEventListener("blur", validarIdiomas);
  form.checkBoxIngles.addEventListener("blur", validarIdiomas);
  form.checkBoxMandarin.addEventListener("blur", validarIdiomas);
  form.checkBoxPortugues.addEventListener("blur", validarIdiomas);
  form.checkBoxFrances.addEventListener("blur", validarIdiomas);
  form.buttonEnviar.addEventListener("click", validarCompleto);
}

function validarCompleto(event) {
  let arrayFunctions = [
    validarCpf(),
    validarDataNascimento(),
    validarNome(),
    validarEmail(),
    validarTelefone(),
    validarIdade(),
    validarSexo(),
    validarIdiomas(),
    validarEstado(),
    validarCidade()
  ];
  
  for (const i in arrayFunctions) {
    if (!arrayFunctions[i]) {
      event.preventDefault();
    }
  }
}

function validarCampo(span, value) {
  if (value.validity.valid) {
    return campoValido(span, value);
  }
  return campoInvalido(span, value);
}

function validarCampoR(campo, regex) {
  let span = campo.children[0];
  let value = campo.children[1];

  if (regex.test(value.value)) {
    return campoValido(span, value);
  }
  return campoInvalido(span, value);
}

function validarCampoD(campo, regex, dataNascimentoValida) {
  let span = campo.children[0];
  let value = campo.children[1];

  if (regex.test(value.value)) {
    let dataValida = dataNascimentoValida(value.value);
    if (dataValida) {
      return campoValido(span, value);
    }
  }
  return campoInvalido(span, value);
}

function campoValido(span, value) {
  value.validity.valid = true;
  value.classList.remove("errorInput");
  value.classList.add("validInput");
  span.classList.remove("errorSpan");
  span.classList.add("validSpan");
  span.innerHTML = `${span.innerHTML.slice(0, span.innerHTML.length - 1)}✅`;
  return true;
}

function campoInvalido(span, value) {
  value.validity.valid = false;
  value.classList.add("errorInput");
  value.classList.remove("validInput");
  span.classList.add("errorSpan");
  span.classList.remove("validSpan");
  span.innerHTML = `${span.innerHTML.slice(0, span.innerHTML.length - 1)}❌`;
  return false;
}

function validarCpf() {
  let regex = new RegExp(
    /^((([\d]{2}[\d]{3}[\d]{3}000[1-2]{1}[0-9]{2})|([\d]{2}\.[\d]{3}\.[\d]{3}\/000[1-2]{1}\-[0-9]{2}))|(([\d]{11})|([\d]{3}\.[\d]{3}\.[\d]{3}\-[\d]{2})))$/
  );
  return validarCampoR(form.infoCadastro.children["labelCPF/CNPJ"], regex);
}

function validarNome() {
  let regex = new RegExp(/^([a-z]{2,30})$/, "i");
  return validarCampoR(form.infoCadastro.children["labelNome"], regex);
}

function validarIdade() {
  let labelIdade = form.infoCadastro.children["labelIdade"];
  let input = labelIdade.children["inputIdade"];
  let span = labelIdade.children["spanIdade"];
  return validarCampo(span, input);
}

function validarTelefone() {
  let regex = new RegExp(/^((\+[\d]{2} ?)?\d?[\d]{4}\-?[\d]{4})$/);
  return validarCampoR(form.infoCadastro.children["labelTelefone"], regex);
}

function validarEmail() {
  let regex = new RegExp(
    /^([a-z]{1}[a-z0-9\_\.\-]*\@[a-z]{3,}\.((com)|(io)|(biz)|(me)){1}(.[a-z]{2})?)$/,
    "i"
  );
  return validarCampoR(form.infoCadastro.children["labelEmail"], regex);
}

function validarSexo() {
  let divSexo = form.infoCadastro.children["divSexo"];
  let radioButtons = document.getElementsByName("radioButton");
  let spanSexo = divSexo.children["spanSexo"];

  for (i = 0; i < divSexo.children["divRadioSexo"].childElementCount; i++) {
    if (radioButtons[i].checked) {
      return campoValido(spanSexo, radioButtons[i]);
    }
  }

  return campoInvalido(spanSexo, radioButtons[0]);
}

function validarIdiomas() {
  let divIdiomasFalados = form.infoCadastro.children["divIdiomasFalados"];
  let spanIdiomas = divIdiomasFalados.children["spanIdiomasFalados"];
  let checkBox = document.getElementsByClassName("inputCheckBox");
  let i = 0;

  for (j = 0; j < checkBox.length; j++) {
    if (checkBox[j].checked) {
      i++;
    }
  }

  if (i >= 2) {
    return campoValido(spanIdiomas, checkBox[0]);
  } else {
    return campoInvalido(spanIdiomas, checkBox[0]);
  }
}

function validarCidade() {
  let divCidadeEstado = form.infoCadastro.children["divCidadeEstado"];
  let spanCidade =
    divCidadeEstado.children["labelCidade"].children["spanCidade"];
  let selectCidade =
    divCidadeEstado.children["labelCidade"].children["selectCidade"];

  if (selectCidade.selectedIndex == 0) {
    return campoInvalido(spanCidade, selectCidade);
  }
  return campoValido(spanCidade, selectCidade);
}

function validarEstado() {
  let divCidadeEstado = form.infoCadastro.children["divCidadeEstado"];
  let spanEstado =
    divCidadeEstado.children["labelEstado"].children["spanEstado"];
  let selectCidade =
    divCidadeEstado.children["labelEstado"].children["selectEstado"];

  if (selectCidade.selectedIndex == 0) {
    return campoInvalido(spanEstado, selectEstado);
  }
  return campoValido(spanEstado, selectEstado);
}

function validarDataNascimento() {
  let regex = new RegExp(/^([0-3]?[0-9]{1}\/[0-1]?[0-9]{1}\/[1-9]{1}[\d]{3})$/);
  let funcao = dataNascimentoValida;
  return validarCampoD(
    form.infoCadastro.children["labelDataNascimento"],
    regex,
    dataNascimentoValida
  );
}

function dataNascimentoValida(strData) {
  let data = strData.split("/");
  let d = data[0];
  let m = data[1];
  let y = data[2];
  let date;
  if (d <= 31 && m <= 12) {
    date = new Date(y, m, d);
  }

  if (!isNaN(date)) {
    if (Date.parse(date) > Date.now()) {
      return false;
    }
    return true;
  }
  return false;
}
