const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const Repl = require('./repl_pty.js');
const LANG_REPL = require('./lang_repl.js');

const app = express();
let repl = null;

app.use(bodyParser.text());
app.use(express.static('public'));

app.get('/:lang', (req, res) => {
  console.log('LANG', req.params);
  const exec_command = LANG_REPL[req.params.lang];

  if (!exec_command) return;
  repl = Repl.new(exec_command);
  res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/input', (req, res) => {
  repl.write(req.body)
  .then(data => {
    res.send(data);
  });
});

const server = http.Server(app);
const PORT = 3000;

server.listen(PORT);
console.log(`Listening on ${PORT}...`);