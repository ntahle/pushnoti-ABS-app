//production
//var appEndpoint = 'https://vmc-api.edxapay.com'
var authToken = 'z82LF1CWBuVcXLLAGil7kLRJ'
var toyyibpayEndpoint = 'https://toyyibpay.com'

//sandbox
var appEndpoint = 'https://xiibit-api.webkeur.net'
//var authToken = 'z82LF1CWBuVcXLLAGil7kLRJ'
//var toyyibpayEndpoint = 'https://dev.toyyibpay.com'

function convertToAmPm(dateString) {
    // Try parsing the date string using a more reliable method
    const date = new Date(dateString.replace(/-/g, '/').replace('T', ' '));

    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return date.toLocaleDateString() + ' ' + hours + ':' + minutesStr + ' ' + ampm;
}

function sessionControl(callback){

    var locexp = localStorage.getItem('locexp');
    var lockey = localStorage.getItem('lockey');

    if(locexp == null || lockey == null){
        clearLocStorage();
        window.location.href = 'index.html';
        callback(false);
        return;
    } else {

        var locexpDate = new Date(locexp);
        var currentDate = new Date();
        if(currentDate > locexpDate){
            clearLocStorage();
            window.location.href = 'index.html';
            callback(false);
            return;
        }

        var ept = '/user/auto-verify';

        var playerId = localStorage.getItem('playerId');
        if (playerId === null) {
            playerId = null;
        }

        $.ajax({
            type: "POST",
            url: appEndpoint + ept,
            data: {lockey: lockey, playerId: playerId},
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
            },
            success: function(data){
                if(data.status === 'ok'){
                    callback(true); // Session is valid
                } else {
                    //localStorage.clear();
                    window.location.href = 'index.html';
                    callback(false);
                    return;
                }
            },
            error: function(){
                //localStorage.clear();
                window.location.href = 'index.html';
                callback(false);
            }
        });
    }
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function isiOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function clearLocStorage(){

    var biomet = localStorage.getItem('biomet');
    var playerId = localStorage.getItem('playerId');

    localStorage.clear();

    if (biomet) {
        localStorage.setItem('biomet', biomet);
    }

    if (playerId) {
        localStorage.setItem('playerId', playerId);
    }

}

/*
function getToken() {
    var token = localStorage.getItem('playerId');
    alert ('Player ID: ' + token);
}*/
