function registerLedger() {
    console.log("processing...");
    var publicKey = document.getElementById("public-key-input").value;
    var period = document.getElementById("period-input").value;
    var currentHashBlock = document.getElementById("current-block-hash-input").value;
    var password = document.getElementById("password-input").value;

    var datatest = JSON.stringify({publickey: publicKey , timeperiod: period, currenthash: currentHashBlock,
                                    password: password});
    console.log(datatest);

    $.ajax({
        url: 'http://localhost:3000/register',
        type: 'POST',
        contentType:'application/json',
        data: datatest,
        dataType:'json'
    });
}

function checkLedger(){
    $.ajax({
        url: 'http://localhost:3000/check',
        type: 'GET',
        contentType: 'application/json',
        success: function(data){
            var json = JSON.parse(data);
            if (json.privatekey) {
                document.getElementById("check-result").innerHTML = "Result: Ledger stopped functioning";
            }else {
                document.getElementById("check-result").innerHTML = " Result: Ledger is still functioning";
            }
            setTimeout(function(){document.getElementById("check-result").innerHTML = "";}, 3000);
        },
        error: function(err){
            console.log(err);
        }
    });

}



$(document).ready(function() {

     document.getElementById("register-buttom").onclick = function(){
         $('.home-tab').hide();
         $('.register-tab').show();
     };

     document.getElementById("register-buttom-mobile").onclick = function(){
        $('.home-tab-mobile').hide();
        $('.register-tab-mobile').show();
     };

    document.getElementById("check-buttom").onclick = function(){
        $('.home-tab').hide();
        $('.check-tab').show();
    };

    document.getElementById("check-buttom-mobile").onclick = function(){
        $('.home-tab-mobile').hide();
        $('.check-tab-mobile').show();
    };

    document.getElementById("submit-register-buttom").onclick = function(){
        registerLedger();
    };

    document.getElementById("submit-check-buttom").onclick = function(){
        checkLedger();
    };

    document.getElementById("go-back-buttom").onclick = function(){
        $('.home-tab').show();
        $('.register-tab').hide();
    };

});