var TransportNodeHid = require("@ledgerhq/hw-transport-node-hid");
var express = require("express");
var cors = require('cors');
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();
app.use(cors({origin: '*'}));

var request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var server = app.listen(3000, function() {
    console.log("app running on port.", server.address().port);
});


app.getBlock = function (blockNo) {
    request('https://blockchain.info/rawblock/' + blockNo, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body);
    });
}


app.sendData = async function(ins, data) {

    var cla = 0x80;

    data = Buffer.from(data, "utf8");

    var offset = 0;
    var p1 = 0x80;
    var p2 = 0x00;
    var chunk = "";

    const transport = await TransportNodeHid.default.create(5000);
    //transport.setDebugMode(true);

    while (offset !== data.length) {
        if (data.length - offset > 255)
            chunk = data.slice(offset, offset + 255);
        else
            chunk = data.slice(offset);

        if (offset + chunk.length === data.length)
            p1 = 0x80;
        else
            p1 = 0x00;

        await transport.send(cla, ins, p1, p2, chunk).then(response => {
            //TODO do something with the response

            console.log("response: " + JSON.stringify(response));
        });

        offset += chunk.length;
    }
    // [0x154,1,180,0x12,0x15,....]

}

//app.sendData(0x02, "hello");
