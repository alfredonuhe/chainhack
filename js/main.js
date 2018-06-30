function registerLedger(mobileText) {

    var publicKey = document.getElementById("public-key-input" + mobileText).value;
    var period = document.getElementById("period-input" + mobileText).value;
    var currentHashBlock = document.getElementById("current-block-hash-input" + mobileText).value;
    var password = document.getElementById("password-input" + mobileText).value;

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

function checkLedger(mobileText){

    $.ajax({
        url: 'http://localhost:3000/check',
        type: 'GET',
        contentType: 'application/json',
        success: function(data){
            var json = JSON.parse(data);
            if (json.privatekey) {
                document.getElementById("check-result" + mobileText).innerHTML = "Result: Ledger stopped functioning";
            }else {
                document.getElementById("check-result" + mobileText).innerHTML = "Result: Ledger is still functioning";
            }
            setTimeout(function(){document.getElementById("check-result" + mobileText).innerHTML = "Result:";}, 3000);
        },
        error: function(err){
            console.log(err);
        }
    });

}



$(document).ready(function() {
    var mobileText = "";
    if (document.documentElement.clientWidth <= 480) mobileText = "-mobile";
    console.log(mobileText);

     document.getElementById("register-button" + mobileText).onclick = function(){
         $('.home-tab' + mobileText).hide();
         $('.register-tab' + mobileText).show();
     };

    document.getElementById("check-button" + mobileText).onclick = function(){
        $('.home-tab' + mobileText).hide();
        $('.check-tab' + mobileText).show();
        console.log("_" + '.check-tab' + mobileText + "_");
    };

    document.getElementById("submit-register-button" + mobileText).onclick = function(){
        registerLedger(mobileText);
    };

    document.getElementById("submit-check-button" + mobileText).onclick = function(){
        checkLedger(mobileText);
    };

    $(".go-back-button" + mobileText).click(function(){
        $('.home-tab' + mobileText).show();
        $('.register-tab' + mobileText).hide();
        $('.check-tab' + mobileText).hide();
    });

});