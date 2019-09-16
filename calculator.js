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
  Tokenize(document.querySelector('#screendisplay').textContent);
}

function Tokenize(equation)
{
  let index = 0;
  let numbers = new Stack();
  numbers.Push(5);
  numbers.Push(6);
  numbers.Push(7);
  numbers.Pop();

  while(equation.length)
  {
    if(equation[index].match(/\d/))
    {
      let token = equation.match(/\d+/);
      console.log(token);
      equation = equation.substr(token[0].length);
      console.log(equation);
    }
    else if(equation[index].match(/\W/))
    {
      let token2 = equation.match(/\W+/);
      console.log(token2);
      equation = equation.substr(token2[0].length);
      console.log(equation);
    }
  }
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
    let left = this.stack.splice(this.stack.length - 1);
    return left[0];
  }
}
