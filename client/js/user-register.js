let register = document.getElementById('register-new-user');

register.addEventListener('click', function(event) {
    event.preventDefault();

    inputsValidator();
    
    if(formValidator()) {
            let name = document.getElementById('name').value;
            let lastName = document.getElementById('lastname').value;
            let dateOfBirth = document.getElementById('birthdate').value;
            let email = document.getElementById('email').value;
            let photo = document.getElementById('photo').value;
            let userName = document.getElementById('username').value;  
            let password = document.getElementById('password').value;  
	}


    let User = {
        name,
        lastName, 
        dateOfBirth, 
        email,  
        photo,
        userName, 
        password
    }

    console.log(User);

    const URL = 'http://localhost:3000/users/user/';

    $.ajax({
        type: "POST",
        url: URL,
        data: User,
        success: function(data) {
            console.log(data);
            document.querySelector("#register").innerHTML = `
                <div class="alert alert-success alert-dismissible mt-4 border-0 input-circle" id="errormessage">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>Você foi cadastrado com sucesso!
			    </div>
			    <span><a class="menu-item float-right mt-2" href="user-login.html">Ir para a página de acesso</a></span>
			`;
        },
         error: function (request, status, error) {
            //alert(request.responseText);
        }
    });
});