var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');

function authIsOwner(request, response) {
  if (request.session.is_logined) {
    return true;
  } else {
    return false;
  }
}

function authStatusUI(request, response){
  var authStatusUI = '<a href="/auth/login">login</a>'
  if(authIsOwner(request, response)){
    authStatusUI = `${request.session.nickname} | <a href="/auth/logout">logout</a>`;
  }
  return authStatusUI;
}

router.get('/', function (request, response) {
  var title = 'Welcome';
  var description = 'Hello, Node.js';
  var list = template.list(request.list);
  var html = template.HTML(title, list,
    `
      <h2>${title}</h2>${description}
      <img src="/images/hello.jpg" style="width:300px; display:block; margin-top:10px;">
      `,
    `<a href="/topic/create">create</a>`,
    authStatusUI(request, response)
  );
  response.send(html);
});

module.exports = router;