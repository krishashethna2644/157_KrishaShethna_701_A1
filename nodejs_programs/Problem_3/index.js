const readline = require('readline');
const respond = require('./chatbot');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("👗 Welcome to Leos Fashion Wholesale Shop!");
console.log("Type your question (type 'exit' to quit):");

function ask() {
  rl.question("> ", (input) => {
    const reply = respond(input);
    console.log(reply);
    if (input.toLowerCase().includes('exit') || input.toLowerCase().includes('bye')) {
      rl.close();
    } else {
      ask();
    }
  });
}

ask();
