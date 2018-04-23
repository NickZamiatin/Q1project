
function createGrid(params){

  createElsIn(params.board, 'row', params.rows).forEach(row => {
    createElsIn(row, 'column', params.cols)
  });

  return params.board;
}


function createElsIn(container, className, count) {
  for (let index = 0; index < count; index++) {
    let el = document.createElement('div');
    el.classList.add(className);

    container.appendChild(el);
  }

  return Array.from(container.children);
}

createGrid({
  board: document.querySelector('.connectFour'),
  rows: 6,
  cols: 7,
})


document.querySelector("footerLast");


// document.querySelector('name1').addEventListener('submit', function (event) {
//   event.preventDefault()
//
//   var input = document.getElementById('name')
//   setName(input.value)
//   renderName()
// })
