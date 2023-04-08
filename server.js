const express = require("express");
const app = express();
const port = 12701;

const data = require("./redirect_data.json");
//console.log(data.redirects)

app.use(express.static(__dirname + '/content/public'));

//clean host from header data
function cleanHost(host){
  console.log("cleaning host", host)
  return host.split(".")[0] //get subdomain
}

//clean path from header data
function cleanPath(path){
  console.log("cleaning path", path)
  return path.split("/")[1] //get first path
}

//decide where to redirect
function evalRedirect(host, path){
  let date = new Date()
  console.log("evaluating redirect at", date)

  //clena data
  host = cleanHost(host)
  path = cleanPath(path)

  console.log(host)
  console.log(path)
  if(data.redirects[host]){ //priority to host
    return data.base_redirect + data.redirects[host]
  }else if(data.redirects[path]){ //then path
    return data.base_redirect + data.redirects[path]
  }else{ //else default to empty url
    return data.base_redirect + data.empty_url
  }
}

app.get("/tree", (req, res) => {
  //console.log(req)
  console.log("accessed to link tree")
  res.sendFile(__dirname + '/content/index.html');
});

//catch all
console.log(Object.keys(data.redirects))
app.get(Object.keys(data.redirects), (req, res) => {
  //console.log(req)
  redirect_location = evalRedirect(req.headers.host, req.path)
  console.log("redirecting to", redirect_location)
  res.redirect(301, redirect_location);
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});