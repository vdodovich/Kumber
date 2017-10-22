function signUpClick() {
    let login          = $("input.login-signup").val();
    let email          = $("input.password-signup").val();
    let password       = $("input.password-signup").val();
    let passwordVerify = $("input.password-verify-signup").val();

    console.log({
        login: login,
        email: email,
        password: password,
        passwordVerify: passwordVerify
    });
}