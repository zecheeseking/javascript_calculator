var btns = document.querySelectorAll('input.display');

for(let i = 0; i < btns.length; i++)
{
    btns[i].addEventListener('click', (e) => appendToDisplay(e.target.value));
}

var clearbtn = document.querySelector('input[value=\'C\']');
clearbtn.addEventListener('click', () => clearDisplay());

var equalsbtn = document.querySelector('input[value=\'=\']');
equalsbtn.addEventListener('click', () => operate());

function appendToDisplay(str)
{
  var currText = document.querySelector('#screendisplay').textContent;
  //check here for duplicate operations being added.
  if(str.match(/\W/g) && currText.charAt(currText.length - 1).match(/\W/g)) return;

  document.querySelector('#screendisplay').textContent = currText + str;
}

function clearDisplay()
{
  document.querySelector('#screendisplay').textContent = '';
}

function operate()
{
  let tokens = Tokenize(document.querySelector('#screendisplay').textContent);
  operatorRefs = {
    '+' : (a, b) => {return parseInt(a) + parseInt(b);},
    '-' : (a, b) => {return parseInt(a) - parseInt(b);},
    '*' : (a, b) => {return parseInt(a) * parseInt(b);},
    '/' : (a, b) => {return parseInt(a) / parseInt(b);}
  }

  let numbers = new Queue();
  let operators = new Stack();
  //Shunting algorithm to sort tokens into Real Polish Notation!
  
}

function Tokenize(equation)
{
  let tokens = [];

  while(equation.length)
  {
    if(equation[0].match(/\d/))
    {
      let token = equation.match(/\d+/)[0];
      tokens.push(token);
      equation = equation.substr(token.length);
    }
    else if(equation[0].match(/\W/))
    {
      let op = equation.match(/\W+/)[0];
      equation = equation.substr(op.length);
      tokens.push(op);
    }
  }

  return tokens;
}

function add(a, b)
{
  return a + b;
}

function subtract(a, b)
{
  return a - b;
}

function multiply(a, b)
{
  return a * b;
}

function divide(a, b)
{
  return a / b;
}

class Queue
{
  queue = [];
  constructor()
  {
    this.queue = [];
  }

  push(variable)
  {
    this.queue.push(variable);
  }

  pop()
  {
    if(this.queue.length === 0)
      return null;
    return this.queue.splice(0, 1)[0];
  }
}

class Stack
{
  stack = [];
  constructor()
  {
    this.stack = [];
  }

  push(variable)
  {
    this.stack.push(variable);
  }

  pop()
  {
    if(this.stack.length === 0)
      return null;
    return this.stack.splice(this.stack.length - 1)[0];
  }
}
