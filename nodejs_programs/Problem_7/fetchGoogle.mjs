import fetch from 'node-fetch';

async function fetchGoogle() {
  const response = await fetch('https://www.google.com');
  const data = await response.text();
  console.log(data.slice(0, 500)); // show start of HTML
}

fetchGoogle();
