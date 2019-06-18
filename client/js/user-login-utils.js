function hasSpace(value) {
	for(let aux = 0; aux <= value.length; aux++) {
		if(value.charAt(aux).match(/^\s$/)) {
			return true;
		}
	}
};

function hasSolitaryChar(value) {
	for(let aux = 0; aux <= value.length; aux++) {
		if(value.charAt(aux-1).match(/^\s$/) && value.charAt(aux).match(/^[a-z0.9]$/) && value.charAt(aux+1).match(/^\s$/)) {
			return true;
		}
	}
};

//Validators

var errors = [];

//Username
function usernameValidator() {
	let status;
	let username = document.querySelector("#username");
	let value = document.querySelector("#username").value;
	let usernamemessage = document.querySelector("#usernamevalidator");

	if(value == null || value.length < 2 || hasSpace(value) || hasSolitaryChar(value)) {
		status = false;
		username.classList.add("is-invalid");

		usernamemessage.classList.add("invalid-feedback");
		usernamemessage.textContent = "Nome de usuário inválido e/ou não encontrado!";

		errors[0] = "<strong>Nome de Usuário</strong> deve conter mais caracteres.";
		headerError();
	} else {
		status = true;
		username.classList.remove("is-invalid");
		username.classList.add("is-valid");

		usernamemessage.classList.remove("invalid-feedback");
		usernamemessage.classList.add("valid-feedback");
		usernamemessage.textContent = "Nome usuário válido!";

		if(errors[0] === "<strong>Nome de Usuário</strong> deve conter mais caracteres.")
			errors[0] = "";
			headerError();
	}

	return status;
}

//Password
function passwordValidator() {
	let status;
	let password = document.querySelector("#password");
	let value = document.querySelector("#password").value;
	let passwordmessage = document.querySelector("#passwordvalidator");

	if(value == null || (value.length < 6 || value.length > 8) || hasSpace(value) || hasSolitaryChar(value)) {
		status = false;
		password.classList.add("is-invalid");

		passwordmessage.classList.add("invalid-feedback");
		passwordmessage.textContent = "Senha inválida e/ou não encontrada!";

		errors[1] = "<strong>Senha</strong> deve conter de 6 a 8 caracteres.";
		headerError();
	} else {
		status = true;
		password.classList.remove("is-invalid");
		password.classList.add("is-valid");

		passwordmessage.classList.remove("invalid-feedback");
		passwordmessage.classList.add("valid-feedback");
		passwordmessage.textContent = "Senha válida!";

		if(errors[1] === "<strong>Senha</strong> deve conter de 6 a 8 caracteres.")
			errors[1] = "";
			headerError();
	}

	return status;
}

function headerError() {
	let errorsView = `
		<div class="alert alert-danger alert-dismissible mt-4 border-0 input-circle" id="error">
			<button type="button" class="close" data-dismiss="alert">&times;</button>
		`;

	 	for(let aux=0; aux < errors.length; aux++) {
			if(!errors[aux] == "" || errors[aux] == null) {
				errorsView += `${errors[aux]}<br>`;
			}
		}
		
		errorsView += `</div>`;
	
	document.querySelector("#error").innerHTML = errorsView;
}

function inputsValidator() {
	usernameValidator();
	passwordValidator();
}

function formValidator() {
	return usernameValidator() && passwordValidator();
}