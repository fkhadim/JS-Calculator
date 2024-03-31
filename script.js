const buttons = document.querySelectorAll('button')
const currentOperation = document.querySelector('.current-operation')
const lastOperation = document.querySelector('.last-operation')

function multiply(num1, num2){
  return roundNumber(num1*num2);
}

function divide(num1, num2) {
  return roundNumber(num1 / num2);
}

function minus(num1, num2) {
  return roundNumber(num1 - num2);
}

function plus(num1, num2) {
  return roundNumber(num1 + num2);
}

function roundNumber(num){
  return Math.round(num*1000) / 1000
}

function currentNumber(nodeList){
  if (nodeList.length < 2) return false;
  let number = []
  for (let i = nodeList.length -1 ; i >= 0; i--){
    if (nodeList[i].textContent != '×' && nodeList[i].textContent != '÷' && nodeList[i].textContent != '+' && nodeList[i].textContent != '-'){
      number.push(nodeList[i].textContent)
    }
    else {
      return number.reverse().join('');
    }
 }
 return number.reverse().join('');
}

function hasDecimal(number){
  if (number === false) return false
   let numArray = number.split('');
   for(let i = 0; i < numArray.length; i++){
     if(numArray[i] === '.'){
       return true;
     }
   }
   return false;
}
function evaluate(nodeList){
  let expression = []
  for(let i = nodeList.length - 1; i >= 0; i--){
    expression.push(nodeList[i].textContent);
  }
  expression = expression.reverse()
  let operators = expression.filter((char) => {
    if (char === '×' || char === '÷' || char === '+' || char === '-'){
      return true;
    }
    else return false
  })
  
  var operands = expression.join('').split(/[^0-9.]+/);
    
    // Convert strings to numbers
    operands = operands.filter(function(num) {
        return num !== ''; // Filter out empty strings
    }).map(function(num) {
        return parseFloat(num);
    });

    let result = operands[0]

    for (let i = 0; i < operators.length; i ++){
      const operator = operators[i]
      const operand = operands[i + 1]

      switch(operator) {
        case '×':
          result = multiply(result, operand);
          break;
        case '÷':
          result = divide(result, operand);
          break;
        case '+':
          result = plus(result, operand);
          break;
        case '-':
          result = minus(result, operand);
          break;
      }
    }
    if((result.toString().split('').length) > 14){
      return (Math.round(result*100)/100).toExponential(2)
    }
    else {
    return result
    }
}

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    if (e.target.textContent != 'AC' && e.target.textContent != 'DEL' && e.target.textContent != '=' && currentOperation.offsetWidth < 325){
      if(currentOperation.lastElementChild){
        if(currentOperation.lastElementChild.textContent ==='-' || currentOperation.lastElementChild.textContent ==='+' || currentOperation.lastElementChild.textContent ==='×' || currentOperation.lastElementChild.textContent ==='÷'){
          if(e.target.textContent != '-' && e.target.textContent != '+' && e.target.textContent != '×' &&e.target.textContent != '÷'){
            let span = document.createElement('span')
            span.textContent = `${e.target.textContent}`
            currentOperation.appendChild(span)
          }
        }
        else {
          if(hasDecimal(currentNumber(currentOperation.children))){
            if(e.target.textContent != '.'){
              let span = document.createElement('span')
              span.textContent = `${e.target.textContent}`
              currentOperation.appendChild(span)
            }
          }
          else {
            let span = document.createElement('span')
            span.textContent = `${e.target.textContent}`
            currentOperation.appendChild(span)
          }
        }
      }
      else {
          if (e.target.textContent != '.' && e.target.textContent != '÷' && e.target.textContent != '×' && e.target.textContent != '-' && e.target.textContent != '+'){
          let span = document.createElement('span')
          span.textContent = `${e.target.textContent}`
          currentOperation.appendChild(span)
          }
      }
  }
    else if (e.target.textContent === 'AC'){
        while (currentOperation.lastElementChild){
          currentOperation.removeChild(currentOperation.lastElementChild);
        }
        if(lastOperation.hasChildNodes){
        lastOperation.lastElementChild.textContent = ''
        }
    }
    else if (e.target.textContent === 'DEL'){
      currentOperation.removeChild(currentOperation.lastElementChild);
    }
    else if (e.target.textContent === '='){
      if(!currentOperation.hasChildNodes()){
        alert('error')
      }
      else{
      let span = document.createElement('span')
      span.textContent = `${evaluate(currentOperation.children)}`
      if(lastOperation.hasChildNodes()){
        lastOperation.removeChild(lastOperation.lastElementChild);
        lastOperation.appendChild(span)
      }
      else if (lastOperation.offsetWidth < 325){
      lastOperation.appendChild(span)
      }
      }
    }
  })
})
