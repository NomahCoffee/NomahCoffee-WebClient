import "./App.css";
import React from 'react';

function Signup() {
    const [username, setUsername] = React.useState('');
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repassword, setRepassword] = React.useState('');

    const [error, setError] = React.useState('');

    function handleChange(event) {
        if (event.target.id === "emailInput") {
            setEmail(event.target.value);
        } else if (event.target.id === "passwordInput") {
            setPassword(event.target.value);
        } else if (event.target.id === "repasswordInput") {
            setRepassword(event.target.value);
        } else if (event.target.id === "firstnameInput") {
            setFirstname(event.target.value);
        } else if (event.target.id === "lastnameInput") {
            setLastname(event.target.value);
        } else if (event.target.id === "usernameInput") {
            setUsername(event.target.value);
        }
    }

    function clickSignUp(event) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            username: username,
            first_name: firstname,
            last_name: lastname,
            is_superuser: false,
            is_staff: false,
            email: email,
            password: password,
            re_password: repassword,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("http://127.0.0.1:8000/auth/users/", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const errors = JSON.parse(result)
                const usernameError = errors.username
                const emailError = errors.email
                const passwordError = errors.password
                const nonFieldErrors = errors.non_field_errors

                if (usernameError === username) {
                    setError('SUCCESS! NOW GO SIGN IN');
                } else if (usernameError !== undefined) {
                    setError(usernameError);
                } else if (emailError !== undefined) {
                    setError(emailError);
                } else if (passwordError !== undefined) {
                    setError(passwordError);
                } else if (nonFieldErrors !== undefined) {
                    setError(nonFieldErrors);
                }
            })
            .catch((error) => console.log(error));
    }
    return (
        <div>
            <p> Sign Up </p>
            <form>
                <label>Username</label>
                <input type="text" value={username} id="usernameInput" onChange={handleChange}></input><br />
                <label>First Name</label>
                <input type="text" value={firstname} id="firstnameInput" onChange={handleChange}></input><br />
                <label>Last Name</label>
                <input type="text" value={lastname} id="lastnameInput" onChange={handleChange}></input><br />
                <label>Email</label>
                <input type="text" value={email} id="emailInput" onChange={handleChange}></input><br />
                <label>Password</label>
                <input type="text" value={password} id="passwordInput" onChange={handleChange}></input><br />
                <label>Re-Type Password</label>
                <input type="text" value={repassword} id="repasswordInput" onChange={handleChange}></input><br />
            </form>
            <p id='error-message'>{error}</p>
            <button onClick={clickSignUp}> send user info </button>
            <a href="/"> Sign In </a>
        </div>
    );
}

export default Signup;
