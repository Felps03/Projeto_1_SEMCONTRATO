//GET IMAGE NAME

function bs_input_file() {
	$(".input-file").before(
		function() {
			if ( ! $(this).prev().hasClass('input-ghost') ) {
				var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0'>");
				element.attr("name",$(this).attr("name"));
				element.change(function(){
					element.next(element).find('input').val((element.val()).split('\\').pop());
				});
				$(this).find("button.btn-choose").click(function(){
					element.click();
				});
				$(this).find("button.btn-reset").click(function(){
					element.val(null);
					$(this).parents(".input-file").find('input').val('');
				});
				$(this).find('input').css("cursor","pointer");
				$(this).find('input').mousedown(function() {
					$(this).parents('.input-file').prev().click();
					return false;
				});
				return element;
			}
		}
	);
}

$(function() {
	bs_input_file();
});


//EXTRA
function hasNumber(value) {
	for(let aux = 0; aux <= value.length; aux++) {
		if(value.charAt(aux).match(/^[0-9]$/)) {
			return true;
		}
	}
}

//VALIDATORS

//------------------------------------------------------------------
//Name validator
function nameValidator(value) {
	let name = document.querySelector("#name");
	let namemessage = document.querySelector("#namevalidator");
	
	if(value == null || value.length < 2 || hasNumber(value)) {
		name.classList.add("is-invalid");

		namemessage.classList.add("invalid-feedback");
		namemessage.textContent = "Nome inválido!"
	} else {
		name.classList.remove("is-invalid");
		name.classList.add("is-valid");

		namemessage.classList.remove("invalid-feedback");
		namemessage.classList.add("valid-feedback");
		namemessage.textContent = "Nome válido!"
	}
}

//------------------------------------------------------------------
//Lastname
function lastnameValidator(value) {
	let lastname = document.querySelector("#lastname");
	let lastnamemessage = document.querySelector("#lastnamevalidator");

	if(value == null || value.length < 2 || hasNumber(value)) {
		lastname.classList.add("is-invalid");

		lastnamemessage.classList.add("invalid-feedback");
		lastnamemessage.textContent = "Sobrenome inválido!"
	} else {
		lastname.classList.remove("is-invalid");
		lastname.classList.add("is-valid");

		lastnamemessage.classList.remove("invalid-feedback");
		lastnamemessage.classList.add("valid-feedback");
		lastnamemessage.textContent = "Sobrenome válido!"
	}
}	

//------------------------------------------------------------------
//Email
function emailValidator(value) {
	let email = document.querySelector("#email");
	let emailmessage = document.querySelector("#emailvalidator");
	let isEmail = false;

	console.log(isEmail);

	if(value.match(/^[a-z.]+[a-z]+@(compasso)+\.(com)+\.(br)?$/)) isEmail = true;

	console.log(isEmail);

	if((value == null || value.length < 2) || hasNumber(value) || !isEmail) {
		email.classList.add("is-invalid");

		emailmessage.classList.add("invalid-feedback");
		emailmessage.textContent = "E-mail inválido!"
	} else {
		email.classList.remove("is-invalid");
		email.classList.add("is-valid");

		emailmessage.classList.remove("invalid-feedback");
		emailmessage.classList.add("valid-feedback");
		emailmessage.textContent = "E-mail válido!"
	}
}	

//------------------------------------------------------------------