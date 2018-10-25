var os = require('os');
var pty = require('node-pty');

const Repl = {
  new(lang) {
    return Object.create(this.init(lang));
  },

  init(lang) {
    this.process = pty.spawn(lang);
    return this;
  },

  on(event, callback) {
    this.process.on(event, callback);
  },

  write(string) {
    return new Promise((resolve, reject) => {
      let result = '';

      this.process.write(string + "\n");

      this.process.on('data', data => result += data);
      setTimeout(() => {
        resolve(result);
      }, 10);
      // wait for output to buffer
    });
  }
};

module.exports = Repl;