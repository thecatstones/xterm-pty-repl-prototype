## Installation
Make sure that you have npm and Node.js installed, then run `npm i` to install dependencies.

## Usage
Run `node express.js` to initiate server on port 3000. Navigate to `localhost:3000/<language>`.
The language path can be any supported language, currently `ruby` and `javascript` are supported, as long as they are installed in your system.
After the terminal UI loads, start typing.

Supported:
- `Enter` command to execute code
- `Backspace` to delete last character

Not Supported:
- Left and right arrow keys
- `Home` or `End` keys
- Any other modifier keys

## Files
- `repl_pty.js`: Contains the `Repl` object that manages:
	- Initialization of child pseudo terminal process
  	- writing to stdin
	- reading from stdout (asynchronously)

- `express.js`: Express server that handles:
	- routing of '/<shell_command>`
	- routing of POST '/input' for handling inputs

- `public/client.js`: Client-side code that handles:
	- Keyboard inputs to map to actions
	- Tracking the state of the current command line
	- Writes to xterm
	- Sending POST request to server-side for code execution

## WARNING
This is an early-stage prototype. 
Memory leaks not handled, so you have to manually kill the child process executed by your shell command.
