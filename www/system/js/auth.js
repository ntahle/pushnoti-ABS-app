
function submitLogin(){
    clearLocStorage();
    var email = $('#email').val();
    var password = $('#password').val();

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        $('#msgarea').html('<i style="color: red" class="fa fa-exclamation-triangle fa-3x"></i><br><br>Please enter a valid email address.');
        return
    }

    if(email == '' || password == ''){
        $('#msgarea').html('<i style="color: red" class="fa fa-exclamation-triangle fa-3x"></i><br><br>Please fill in all the fields.');
        return
    }

    $.ajax({
        type: "POST",
        url: appEndpoint + '/user/verify-account',
        data: {email: email, password: password},
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
        },
        success: function(data){

            if(data.status === 'ok'){

                localStorage.setItem('locexp', data.locexp);
                localStorage.setItem('lockey', data.lockey);
                localStorage.setItem('merchantName', data.merchantName);
                localStorage.setItem('xid', data.xid);
                localStorage.setItem('xpass', data.xpass);

                $('#msgarea').html('<i style="color: green" class="fa fa-check-circle fa-3x"></i><br><br>Account verified! Please wait...');
                $('#modal-message').modal({
                    backdrop: 'static',
                    keyboard: false
                });
                $('#modal-message').modal('show')

                if (data.forceres ===1) {
                    setTimeout(function(){
                        window.location.href = 'force-password.html';
                    }, 3000);
                }else {
                    setTimeout(function(){
                        window.location.href = 'dashboard.html';
                    }, 3000);
                }
            }
            else {
                $('#email').html('');
                $('#password').html('');
                $('#msgarea').html('<i style="color: red" class="fa fa-exclamation-triangle fa-3x"></i><br><br>Login fail. Please check your credentials.');
                $('#modal-message').modal('show')
                clearLocStorage();
            }
        },
        error: function(){
            $('#msgarea').html('<i style="color: orange" class="fa fa-question-circle fa-3x"></i><br><br>Something went wrong. Please try again later.');
        }
    });

}

function submitLoginBio(username, password){
    clearLocStorage();

    //$('#modal-message').modal('show')
    //$('#msgarea').html('<i class="fa fa-spinner fa-spin fa-3x"></i><br><br>Please wait...')

    if(username === '' || password === ''){
        $('#msgarea').html('<i style="color: red" class="fa fa-exclamation-triangle fa-3x"></i><br><br>Please fill in all the fields.');
        $('#modal-message').modal('show')
        return
    }


    $.ajax({
        type: "POST",
        url: appEndpoint + '/user/verify-account',
        data: {xid: username, password: password},
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
        },
        success: function(data){

            if(data.status === 'ok'){

                localStorage.setItem('locexp', data.locexp);
                localStorage.setItem('lockey', data.lockey);
                localStorage.setItem('merchantName', data.merchantName);
                localStorage.setItem('xid', data.xid);
                localStorage.setItem('xpass', data.xpass);

                $('#msgarea').html('<i style="color: green" class="fa fa-check-circle fa-3x"></i><br><br>Account verified! Please wait...');
                $('#modal-message').modal({
                    backdrop: 'static',
                    keyboard: false
                });
                $('#modal-message').modal('show')
                setTimeout(function(){
                    window.location.href = 'dashboard.html';
                }, 3000);
            } else {
                $('#password').html('');
                $('#email').html('');
                //$('#msgarea').html('<i style="color: red" class="fa fa-exclamation-triangle fa-3x"></i><br><br>Login fail. Please login using ID and password.');
                //$('#modal-message').modal('show')

                clearLocStorage();
            }
        },
        error: function(){
            $('#msgarea').html('Something went wrong. Please try again later.');
        }
    });




}


function autoLogin(){

    var lockey = localStorage.getItem('lockey');

    if(lockey == null){
        return
    }else {

        var ept = '/user/auto-verify';

        $.ajax({
            type: "POST",
            url: appEndpoint + ept,
            data: {lockey: lockey},
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
            },
            success: function(data){

                if(data.status === 'ok'){
                    $('#modal-message').modal('show')
                    $('#msgarea').html('<i  class="fa fa-spin fa-spinner fa-3x"></i><br><br>Verifying ...');
                    setTimeout(function(){
                        window.location.href = 'dashboard.html';
                    }, 3000);
                } else {
                    clearLocStorage();
                }
            },
            error: function(){
                $('#msgarea').html('Something went wrong. Please try again later.');
            }
        });
    }


}



function checkBiometricCredentials() {
    return NativeBiometric.getCredentials({
        server: "Edxapay VMC",
    }).then((credentials) => {
        return true;
    }).catch((err) => {
        return false;
    });
}
/*

function deleteBiometricCredentials() {
    NativeBiometric.deleteCredentials({
        server: "Edxapay VMC", // Use the same server name used to set credentials
    }).then(() => {
        alert("Biometric credentials have been deleted.");
    }).catch((err) => {
        alert("Failed to delete biometric credentials.");
    });
}
*/
