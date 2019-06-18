function hasNumber(value) {
	for(let aux = 0; aux <= value.length; aux++) {
		if(value.charAt(aux).match(/^[0-9]$/)) {
			return true;
		}
	}
}

function hasSpace(value) {
	for(let aux = 0; aux <= value.length; aux++) {
		if(value.charAt(aux).match(/^\s$/)) {
			return true;
		}
	}
};

function hasMoreSpace(value) {
	for(let aux = 0; aux <= value.length; aux++) {
		if(value.charAt(aux).match(/^\s$/) && value.charAt(aux-1).match(/^\s$/)) {
			return true;
		}
	}
}

function hasSolitaryChar(value) {
	for(let aux = 0; aux <= value.length; aux++) {
		if(value.charAt(aux-1).match(/^\s$/) && value.charAt(aux).match(/^[a-z0.9]$/) && value.charAt(aux+1).match(/^\s$/)) {
			return true;
		}
	}
};

//Validators
var errors = [];

//Name validator
function nameValidator() {
	let status;
	let name = document.querySelector("#name");
	let value = document.querySelector("#name").value;
	let namemessage = document.querySelector("#namevalidator");
	
	if(value == null || value.length < 2 || hasNumber(value) || hasMoreSpace(value) || hasSolitaryChar(value)) {
		status = false;

		name.classList.add("is-invalid");

		namemessage.classList.add("invalid-feedback");
		namemessage.textContent = "Nome inválido!";

		errors[0] = "<strong>Primeiro Nome</strong> deve conter mais caracteres.";
		headerError();
	} else {
		status = true;

		name.classList.remove("is-invalid");
		name.classList.add("is-valid");

		namemessage.classList.remove("invalid-feedback");
		namemessage.classList.add("valid-feedback");
		namemessage.textContent = "Nome válido!";

		if(errors[0] === "<strong>Primeiro Nome</strong> deve conter mais caracteres.")
			errors[0] = ""
			headerError();
	}

	return status;
}

//Lastname
function lastnameValidator() {
	let status;
	let lastname = document.querySelector("#lastname");
	let value = document.querySelector("#lastname").value;
	let lastnamemessage = document.querySelector("#lastnamevalidator");

	if(value == null || value.length < 2 || hasNumber(value) || hasMoreSpace(value) || hasSolitaryChar(value)) {
		status = false;
		lastname.classList.add("is-invalid");

		lastnamemessage.classList.add("invalid-feedback");
		lastnamemessage.textContent = "Sobrenome inválido!";

		errors[1] = "<strong>Sobrenome Nome</strong> deve conter mais caracteres.";
		headerError();
	} else {
		status = true;
		lastname.classList.remove("is-invalid");
		lastname.classList.add("is-valid");

		lastnamemessage.classList.remove("invalid-feedback");
		lastnamemessage.classList.add("valid-feedback");
		lastnamemessage.textContent = "Sobrenome válido!";

		if(errors[1] === "<strong>Sobrenome Nome</strong> deve conter mais caracteres.")
			errors[1] = "";
			headerError();
	}

	return status;
}	

//Birthdate
function birthdateValidator() {
	let status;
	let birthdate = document.querySelector("#birthdate");
	let value = document.querySelector("#birthdate").value;
	let birthdatemessage = document.querySelector("#birthdatevalidator");
	
	let birthdateValue = new Date(value);
	let nowValue = new Date(Date.now());

	let day = birthdateValue.getDate(); 
	let month = birthdateValue.getMonth();
	let year = birthdateValue.getFullYear();

	let isDate = true;

	if (isNaN(day) || isNaN(month) || isNaN(year)) isDate = false;
	if (month+1 == 4 || month+1 == 6 || month+1 == 9 || month+1 == 11 && day+1 > 30) isDate = false;
	if ((year % 4) != 0 && month+1 == 2 && day+1 > 28) isDate = false;
	if ((year % 4) == 0 && month+1 == 2 && day+1 > 29) isDate = false;

	birthdate.classList.remove("ext-placeholder");

	if(!isDate || (birthdateValue.getTime() >= nowValue.getTime())) {
		status = false;
		birthdate.classList.add("is-invalid");

		birthdatemessage.classList.add("invalid-feedback");
		birthdatemessage.textContent = "Data de nascimento inválida!";

		errors[2] = "<strong>Data de Nascimento</strong> deve conter 'dia/mês/ano' e deve ser menor que a data atual.";
		headerError();
	} else {
		status = true;
		birthdate.classList.remove("is-invalid");
		birthdate.classList.add("is-valid");

		birthdatemessage.classList.remove("invalid-feedback");
		birthdatemessage.classList.add("valid-feedback");
		birthdatemessage.textContent = "Data de nascimento válida!";

		if(errors[2] === "<strong>Data de Nascimento</strong> deve conter 'dia/mês/ano' e deve ser menor que a data atual.")
			errors[2] = "";
			headerError();
	};

	return status;
}

//Email
function emailValidator() {
	let status;
	let email = document.querySelector("#email");
	let value = document.querySelector("#email").value;
	let emailmessage = document.querySelector("#emailvalidator");
	
	let cltEmail = value.match(/^[a-z]+.[a-z]+@+compasso+\.+com+\.+br$/);
	let bolsEmail = value.match(/^[a-z]+.[a-z]+_bols+@+compasso+\.+com+\.+br$/);
	
	let isEmail = false;

	if(cltEmail || bolsEmail) isEmail = true;

	if(value == null || hasNumber(value) || !isEmail) {
		status = false;
		email.classList.add("is-invalid");

		emailmessage.classList.add("invalid-feedback");
		emailmessage.textContent = "E-mail inválido!";

		errors[3] = "<strong>E-mail</strong> deve conter 'nome.sobrenome' ou 'nome.sobrenome_bols' seguido do domínio Compasso.";
		headerError();
	} else {
		status = true;
		email.classList.remove("is-invalid");
		email.classList.add("is-valid");

		emailmessage.classList.remove("invalid-feedback");
		emailmessage.classList.add("valid-feedback");
		emailmessage.textContent = "E-mail válido!";

		if(errors[3] === "<strong>E-mail</strong> deve conter 'nome.sobrenome' ou 'nome.sobrenome_bols' seguido do domínio Compasso.")
			errors[3] = "";
			headerError();
	}

	return status;
}	

//Photo
function photoValidator() {
	let status;
	let photo = document.querySelector("#photo");
	let value = document.querySelector("#photo").value;
	let photomessage = document.querySelector("#photovalidator");
	
	let archive = value.split(".");
	let extension = archive[1];
	let isExtension = false;

	if(extension != 'png' || extension != 'jpg' || extension != 'jpeg') isExtension = true;

	if(value == null || !isExtension || extension == undefined) {
		status = false;
		photo.classList.add("is-invalid");

		photomessage.classList.add("invalid-feedback");
		photomessage.textContent = "Arquivo inválido!";

		errors[4] = "<strong>Foto de Perfil</strong> deve conter formatos jpg, jpeg ou png.";
		headerError();
	} else {
		status = true;
		photo.classList.remove("is-invalid");
		photo.classList.add("is-valid");

		photomessage.classList.remove("invalid-feedback");
		photomessage.classList.add("valid-feedback");
		photomessage.textContent = "Arquivo válido!";

		if(errors[4] === "<strong>Foto de Perfil</strong> deve conter formatos jpg, jpeg ou png.")
			errors[4] = "";
			headerError();
	}

	return status;
}

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
		usernamemessage.textContent = "Nome de usuário inválido!";

		errors[5] = "<strong>Nome de Usuário</strong> deve conter mais caracteres.";
		headerError();
	} else {
		status = true;
		username.classList.remove("is-invalid");
		username.classList.add("is-valid");

		usernamemessage.classList.remove("invalid-feedback");
		usernamemessage.classList.add("valid-feedback");
		usernamemessage.textContent = "Nome usuário válido!";

		if(errors[5] === "<strong>Nome de Usuário</strong> deve conter mais caracteres.")
			errors[5] = "";
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
		passwordmessage.textContent = "Senha inválida!";

		errors[6] = "<strong>Senha</strong> deve conter de 6 a 8 caracteres.";
		headerError();
	} else {
		status = true;
		password.classList.remove("is-invalid");
		password.classList.add("is-valid");

		passwordmessage.classList.remove("invalid-feedback");
		passwordmessage.classList.add("valid-feedback");
		passwordmessage.textContent = "Senha válida!";

		if(errors[6] === "<strong>Senha</strong> deve conter de 6 a 8 caracteres.")
			errors[6] = "";
			headerError();
	}

	return status;
}

//Password Confirm
function passwordConfirmValidator() {
	let status;
	let password = document.querySelector("#passwordConfirm");
	let value = document.querySelector("#passwordConfirm").value;
	let passwordConfirmmessage = document.querySelector("#passwordconfirmvalidator");
	let getPassword = document.querySelector("#password").value;

	if(value == null || (value.length < 6 || value.length > 8) || !value === getPassword || hasSpace(value) || hasSolitaryChar(value)) {
		status = false;
		password.classList.add("is-invalid");

		passwordConfirmmessage.classList.add("invalid-feedback");
		passwordConfirmmessage.textContent = "As senhas não conferem!";

		errors[7] = "<strong>Confirmação</strong> deve ser igual a Senha.";
		headerError();
	} else {
		status = true;
		password.classList.remove("is-invalid");
		password.classList.add("is-valid");

		passwordConfirmmessage.classList.remove("invalid-feedback");
		passwordConfirmmessage.classList.add("valid-feedback");
		passwordConfirmmessage.textContent = "As senhas conferem!";

		if(errors[7] === "<strong>Confirmação</strong> deve ser igual a Senha.")
			errors[7] = "";
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


//Validators test
let register = document.getElementById('register-new-user');

register.addEventListener('click', function(event) {
    event.preventDefault();

	nameValidator();
	lastnameValidator();
	birthdateValidator();
	emailValidator();
	photoValidator();
	usernameValidator();
	passwordValidator();
	passwordConfirmValidator();

	if(nameValidator() && lastnameValidator() && birthdateValidator() && emailValidator() 
		&& photoValidator() && usernameValidator() && passwordValidator() && passwordConfirmValidator()) {
		document.querySelector("#register").innerHTML = `
            <div class="alert alert-success alert-dismissible mt-4 border-0 input-circle" id="errormessage">
                <button type="button" class="close" data-dismiss="alert">&times;</button>Você foi cadastrado com sucesso!
			</div>
			<span><a class="menu-item float-right mt-5" href="user-login.html">Ir para a página de acesso</a></span>
			`;
	}
});