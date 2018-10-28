const pty = require('node-pty');

const Repl = {
  new(exec_command) {
    return Object.create(this.init(exec_command));
  },

  init(exec_command) {
    this.process = pty.spawn(exec_command);
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