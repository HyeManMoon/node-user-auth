$(document).ready(addClickHandlers);

function addClickHandlers() {
    $('#register').on('click', ()=> {
        console.log('register clicked')
        register();
    });
    $('#signin').on('click', () => {
        console.log('Sign in clicked');
        signIn();
    });
    $('#get-user').on('click',()=> {
        console.log('getUserclicked');
        $.ajax({
            url: "/another-route",
            method: 'POST',
            headers: {
                authorization: localStorage.getItem('token')
            },
            success: resp => {
                console.log('Get User Response:', resp);
            }
        })
    });
}

function signIn() {
    const values = {
        email: $('#email-signin').val(),
        password: $('#password-signin').val()
    }
    console.log('Sign in values:', values);
    $.ajax({
        url:'/signin',
        method: 'POST',
        data: values,
        success: resp => {
            console.log('sign in response', resp);
            localStorage.setItem('token', resp.token);
        }
    })
}



function register() {
    const values = {
        email: $('#email').val(),
        firstName: $('#first-name').val(),
        lastName: $('#last-name').val(),
        password: $('#password').val()
    }
    console.log('Register Values', values);

    $.ajax({
        url: '/signup',
        method: 'POST',
        data: values,
        success: res => {
            console.log('register response:', res);
        }
    })
}