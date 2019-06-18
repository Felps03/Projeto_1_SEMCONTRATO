let access = document.getElementById('access');

access.addEventListener('click', function(event) {
    event.preventDefault();

    inputsValidator();
    
    if(formValidator()) {
        let userName = document.getElementById('username').value;  
        let password = document.getElementById('password').value;  
	}

    let Login = {
        userName, 
        password
    }

    console.log(Login);

    const URL = 'http://localhost:3000/users/authenticate';

    $.ajax({
        type: "POST",
        url: URL,
        data: User,
        success: function(data) {
            console.log(data);
            location.replace("user-login.html");
        },
         error: function (request, status, error) {
            //alert(request.responseText);
        }
    });
});