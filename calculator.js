operations = {
  '+' : {'precedence': 2, 'func': (a, b) => {return parseInt(a) + parseInt(b);}},
  '-' : {'precedence': 1, 'func': (a, b) => {return parseInt(b) - parseInt(a);}},
  '*' : {'precedence': 4, 'func': (a, b) => {return parseInt(a) * parseInt(b);}},
  '/' : {'precedence': 3, 'func': (a, b) => {return parseInt(a) / parseInt(b);}}
}

var btns = document.querySelectorAll('input.display');
for(let i = 0; i < btns.length; i++)
    btns[i].addEventListener('click', (e) => {appendToDisplay(e.target.value); e.preventDefault();});
document.querySelector('input[value=\'C\']').addEventListener('mousedown', () => {clearDisplay(); e.preventDefault();});
document.querySelector('input[value=\'=\']').addEventListener('click', () => operate());
window.addEventListener('keydown', e =>
{
  //try to find node with same value as keypress.
  let node = document.querySelector(`input[data-hotkey=\'${e.key}\']`);
  if(node)
  {
    node.click();
  }
  else if(e.key === 'Backspace')
  {
    let display = document.querySelector('#screendisplay');
    display.textContent = display.textContent.substring(0, display.textContent.length - 1);
  }
});

function appendToDisplay(str)
{
  let display = document.querySelector('#screendisplay');
  var currText = display.textContent;

  if(str.match(/\W/g) && currText.charAt(currText.length - 1).match(/\W/g)) return;

  if(display.classList.contains('overwrite') && !str.match(/\W/g))
    display.textContent = str;
  else
    display.textContent = currText + str;

  display.classList.remove('overwrite');
}

function clearDisplay()
{
  let display = document.querySelector('#screendisplay');
  display.textContent = '0';
  display.classList.add('overwrite');
}

function operate()
{
  let tokens = Tokenize(document.querySelector('#screendisplay').textContent);
  document.querySelector('#screendisplay').classList.add('overwrite');
  document.querySelector('#screendisplay').textContent = processRPN(parseToRPN(tokens));
}

function Tokenize(equation)
{
  let tokens = [];

  while(equation.length)
  {
    if(equation[0].match(/\d/))
    {
      let token = equation.match(/\d+/)[0];
      tokens.push({'type': 'number', 'value': token});
      equation = equation.substr(token.length);
    }
    else if(equation[0].match(/\W/))
    {
      let op = equation.match(/\W+/)[0];
      tokens.push({'type': 'operator', 'value': op});
      equation = equation.substr(op.length);
    }
  }

  return tokens;
}

function parseToRPN(tokens)
{
  let rpnQueue = new Queue();
  let operators = new Stack();
  //Shunting algorithm to sort tokens into reverse Polish Notation!
  tokens.forEach(token =>
    {
      if(token['type'] === 'number')
      {
        rpnQueue.push(token['value']);
      }
      else if(token['type'] === 'operator')
      {
        while(!operators.isEmpty() && operations[token['value']]['precedence'] < operations[operators.peek()]['precedence'])
          rpnQueue.push(operators.pop());
        operators.push(token['value']);
      }
    });
    while(!operators.isEmpty())
      rpnQueue.push(operators.pop());
    return rpnQueue;
}

function processRPN(rpn)
{
  let numbers = new Stack();

  while(rpn.length() > 0)
  {
    let val = rpn.pop();
    if(!isNaN(val))//if its a number
      numbers.push(val);//push to stack
    else
    {
      let a = numbers.pop();
      let b = numbers.pop();
      if(val === '/' && (parseInt(a) === 0 || parseInt(b) === 0))
      {
        return 'No division by zero! >:(';
      }
      numbers.push(operations[val]['func'](a, b));
    }
  }

  return numbers.pop();
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

  length()
  {
    return this.queue.length;
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

  peek()
  {
    return this.stack[this.stack.length - 1];
  }

  isEmpty()
  {
    return this.stack.length === 0;
  }
}
