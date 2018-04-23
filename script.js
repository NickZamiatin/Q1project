class connectFour {
  constructor(grid) {
    this.ROWS = 6;
    this.COLUMN = 7;
  }
}




const  divClass = document.querySelector('.connectFour');
var boxes = createDiscoBoxes(6, 7);
function createDiscoBoxes(height, width) {
 var length = height*width;

 for (var index = 0; index < length; index++) {
   var el = document.createElement('div');

   el.classList.add('box');

   disco.appendChild(el);
 }

 return disco.children;
}
