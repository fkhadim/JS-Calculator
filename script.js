const buttons = document.querySelectorAll('button')
const currentOperation = document.querySelector('.current-operation')

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    if (e.target.textContent != 'AC' && e.target.textContent != 'DEL' && e.target.textContent != '=' && currentOperation.offsetWidth < 325){
      let span = document.createElement('span')
      span.textContent = `${e.target.textContent}`
      currentOperation.appendChild(span)
    }
    else if (e.target.textContent === 'AC'){
        while (currentOperation.lastElementChild){
          currentOperation.removeChild(currentOperation.lastElementChild);
        }
    }
    else if (e.target.textContent === 'DEL'){
      while (currentOperation.hasChildNodes()){
      currentOperation.removeChild(currentOperation.lastElementChild);

      }
    }
  })
})