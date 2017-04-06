var express = require('express')
var http = require("http");
var app = express()

app.get('/search/:pokemon', function (creq, cres) {
  var pokemon = creq.params.pokemon;

  var options = {
    "method": "GET",
    "hostname": "pokeapi.co",
    "port": null,
    "path": "/api/v2/pokemon/"+pokemon+"/",
    "headers": {}
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      var json = JSON.parse(body.toString());
      if(json.detail) {
        console.log("Unsuccessful query");
        cres.send({"error": res.statusCode.toString()});
      } else {
        console.log("Successful query");
        cres.send(json);
      }
    });
  });

  req.end();
  
});

app.get('/', function (req, res) {
  res.sendFile('search.html', { root: __dirname });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});


