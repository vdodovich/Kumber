let url = "www.google.com";


function signUpClick() {
    let login          = $("input.login-signup").val();
    let email          = $("input.email-signup").val();
    let password       = $("input.password-signup").val();
    let passwordVerify = $("input.password-verify-signup").val();

    if (nonEmpty(login, email, password, passwordVerify)
        && loginValid(login)
        && passwordValid(password)
        && emailValid(email)
        && passwordValidCheck(password, passwordVerify)) {
            console.log("All valid, start request to signin...");
            $.ajax({
                url: url+"/signin",
                type: "POST",
                dataType: "json",
                data: {
                    login: login,
                    email: email,
                    password: password
                },
                success: function (answer) {
                    console.log(answer);
                },
                error: function () {
                     console.log("404!");
                     errorShow("Невдалось підєндатись до сервера!");
                }

            });
    }
}

function signInClick() {
    let login          = $("input.login-signin").val();
    let password       = $("input.password-signin").val();

    if (!login.length) {
        console.error("Empty login!");
        errorShow("Ви не ввели логін!");
        return false;
    }
    else if (!password.length) {
        console.error("Empty password!");
        errorShow("Ви не ввели пароль!");
        return false;
    }
    else if (loginValid(login) && passwordValid(password)){
        console.log("All valid, start request to signup...");
        $.ajax({
            url: url+"/signup",
            type: "POST",
            dataType: "json",
            data: {
                login: login,
                password: password
            },
            success: function (answer) {
                console.log(answer);
            },
            error: function () {
                console.log("404!");
                errorShow("Невдалось підєндатись до сервера!");
            }

        });
    }
}


function errorShow(error) {
    alert (error);
}
function nonEmpty(login, email, password, passwordVerify) {
    if (!login.length) {
        console.error("Empty login!");
        let error = "Ви не ввели логін!";
        errorShow(error);
        return false;
    }
    else if (!email.length) {
        console.error("Empty email!");
        let error = "Ви не ввели email!";
        errorShow(error);
        return false;
    }
    else if (!password.length) {
        console.error("Empty password!");
        let error = "Ви не ввели пароль!";
        errorShow(error);
        return false;
    }
    else if (!passwordVerify.length) {
        console.error("Empty password verify!");
        let error = "Ви не ввели повторний пароль!";
        errorShow(error);
        return false;
    }

    else return true;
}
function loginValid(login) {
    pattern = /^[a-zA-Z](.[a-zA-Z0-9_-]*)$/;
    if (login.length > 10) {
        console.error("Login lenght > 10!");
        let error = "Логін повинен містити не більше 10 символів";
        errorShow(error);
        return false;
    }

    else if (login.length<4) {
        console.error("Login lenght < 4!");
        let error = "Логін повинен містити не менше 4 символів";
        errorShow(error);
        return false;
    }

    else if (!pattern.test(login)){
        console.error("Login invalid!");
        let error = "Логін містить недопустимі символи!";
        errorShow(error);
        return false;
    }

    else return true;
}
function passwordValid(password) {
    if (password.length > 16) {
        console.error("Password lenght > 16!");
        let error = "Пароль повинен містити не більше 16 символів";
        errorShow(error);
        return false;
    }

    else if (password.length<4) {
        console.error("password lenght < 4!");
        let error = "Пароль повинен містити не менше 4 символів";
        errorShow(error);
        return false;
    }

    else return true;
}
function emailValid(email) {
    if (email.length < 4) {
        console.error("Email lenght < 4!");
        let error = "Надто короткий email";
        errorShow(error);
        return false;
    }

    else return true;
}
function passwordValidCheck(password, passwordVerify) {
    if (password!==passwordVerify) {
        console.error("Password != passwordVerify!");
        let error = "Паролі не збігаються!";
        errorShow(error);
        return false;
    }
    else return true;
}
