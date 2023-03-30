var http = require("http");

http
  .createServer(function (req, res) {
    res.writeHead(301, { Location: "github.com/withjannis" });
    res.end();
  })
  .listen(8888);