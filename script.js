
const boardArray = new Array(42);

function createGridConnectFour() {
	let el = document.createElement('div');
	el.className = 'grid';
	document.querySelector('.connectFour').appendChild(el);


	function square() {
		let boardSquare = document.createElement('div');
		boardSquare.className = 'gridEmpty ';
		boardSquare.setAttribute('id', count);

		boardSquare.appendChild(circle());
		return boardSquare;
	}

	function circle() {
		let blankCircle = document.createElement('div');
		blankCircle.className = 'circleB';
		blankCircle.setAttribute('id', count);
		return blankCircle;
	}

	for (var count = 0; count < boardArray.length; count++) {
		el.appendChild(square());
	}
}

createGridConnectFour();


const user1 = { name : "user1", move : true, color : "red", num : 1};
const user2 = { name : "user2", move : false, color : "black", num : 2};


const wichUserTurns = () =>{
  return user1.move == true ? user1 : user2
}
 const changeUser = ()=>{
   if(user1.move == true){
     user1.move == false;
     user2.move == true;
   } else {
     user1.move == true;
     user2.move == false;
   }
 }

// var newGrid = document.querySelector(".grid")
//  newGrid.addEventListener("click",(e)=>{
//    console.log(e.target.className)
//    if ()
//
//  })
const changeColor = (color)=>{
  let newColor = document.createElement('div');
  newColor.className = color;
  newColor.className += "newColor";
  return newColor;
}



function animateChecker() {
	var currentPlayer = wichUserTurns();
	var column = this.id % 7;
	var newColorUser = changeColor(currentPlayer.color);

		for (var newColorCounter = 5; newColorCounter > -1; newColorCounter--) {
			var squareId = column + (7 * newColorCounter)
			squareId.toString();
			var vacantCheck = document.getElementById(squareId);
			if (vacantCheck.className == 'gridEmpty') {
				vacantCheck.appendChild(newColorUser);
				vacantCheck.className = 'gridHasColor';
				arrOfGrid[squareId] = currentPlayer.number;
				changeUser();
				break;

        // create some funck for winners 
			}
		}
}
