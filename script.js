
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


var wichUserTurns =  function() {
	if (user1.move == true) {
		return user1;
	}
	else {
		return user2;
	}
}
 var  changeUser = ()=>{
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
				checkForWinner(squareId);
				changeUser();
			}
		}
}

function checkForWinner(index) {
	console.log(boardArray);

    var countingToFour = 1;
    var testCases = [1, 6, 7, 8];
	var edges;
    var edge1 = [0, 6, 7, 13, 14, 20, 21, 27, 28, 34, 35, 41];
    var edge6 = [0, 1, 2, 3, 7, 14, 21, 28, 35, 36, 37, 38];
    var edge7 = [0, 1, 2, 3, 4, 5, 6, 35, 36, 37, 38, 39, 40, 41];
    var edge8 = [3, 4, 5, 6, 13, 20, 27, 34, 38, 39, 40, 41];



    for (var counter0 = 0; counter0 < testCases.length; counter0++) {

    	// assign edge case set
		if (testCases[counter0] === 1) {
			 edges = edge1;

		}
		else if (testCases[counter0] === 6) {
			 edges = edge6;

		}
		else if (testCases[counter0] === 7) {
			 edges = edge7;
		}
		else if (testCases[counter0] === 8) {
			 edges = edge8;
		}

		// check edge cases
		for (var count = 0; count < edges.length; count++) {


		if ((boardArray[index] === boardArray[index - testCases[counter0]]
			&& boardArray[index - testCases[counter0]] !== edges[count] )
			|| (boardArray[index] === boardArray[index + testCases[counter0]]
				&& boardArray[index + testCases[counter0]] !== edges[count])) {

     			// when a match is found, check the next cell in that direction (-/+)
     		for(var i = index; boardArray[i] === boardArray[i-testCases[counter0]]; i-=testCases[counter0]) {
     			countingToFour++;
     				//console.log("loop2");
     				if (countingToFour === 4) {
     					alert("Player " + boardArray[index] + " wins!");
     					resetGame();
     					return "Winner";
     				}

     			}

     			for (var j = index; boardArray[j] === boardArray[j+testCases[counter0]]; j+=testCases[counter0]) {

     				countingToFour++;
     				if (countingToFour === 4) {
     					alert("Player " + boardArray[index] + " wins!");
     					resetGame();
     					return "Winner";
     				}

     			}
     		}
		//console.log(countingToFour);
		countingToFour = 1;
	}
}
}
