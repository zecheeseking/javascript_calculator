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
  console.log(tokens);

  operators = {
    '+' : (a, b) => {return parseInt(a) + parseInt(b);},
    '-' : (a, b) => {return parseInt(a) - parseInt(b);},
    '*' : (a, b) => {return parseInt(a) * parseInt(b);},
    '/' : (a, b) => {return parseInt(a) / parseInt(b);}
  }
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

class Stack
{
  stack = [];
  constructor()
  {
    this.stack = [];
  }

  Push(variable)
  {
    this.stack.push(variable);
  }

  Pop()
  {
    if(this.stack.length === 0)
      return 0;
    let left = this.stack.splice(this.stack.length - 1);
    return left[0];
  }
}
