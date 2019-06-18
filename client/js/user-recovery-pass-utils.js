function hasNumber(value) {
	for(let aux = 0; aux <= value.length; aux++) {
		if(value.charAt(aux).match(/^[0-9]$/)) {
			return true;
		}
	}
}

//Validators

var errors = [];

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
		emailmessage.textContent = "E-mail inválido e/ou não encontrado!";

		errors[0] = "<strong>E-mail</strong> deve conter 'nome.sobrenome' ou 'nome.sobrenome_bols' seguido do domínio Compasso.";
		headerError();
	} else {
		status = true;
		email.classList.remove("is-invalid");
		email.classList.add("is-valid");

		emailmessage.classList.remove("invalid-feedback");
		emailmessage.classList.add("valid-feedback");
		emailmessage.textContent = "E-mail válido!";

		if(errors[0] === "<strong>E-mail</strong> deve conter 'nome.sobrenome' ou 'nome.sobrenome_bols' seguido do domínio Compasso.")
			errors[0] = "";
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

//Validator test
let recovery = document.getElementById('recovery');

recovery.addEventListener('click', function(event) {
    event.preventDefault();

	emailValidator();

	if(emailValidator()) {
		location.replace("user-login.html");
	}
});