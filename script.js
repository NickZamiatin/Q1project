
var boardArray = new Array(42);

function createBoard() {
	var el = document.createElement('div');
	el.className = 'grid';
	document.querySelector('.connectFour').appendChild(el);


	function square() {
		var boardSquare = document.createElement('div');
		boardSquare.className = 'gridEmpty ';
		boardSquare.setAttribute('id', counter)

		boardSquare.appendChild(circle());
		return boardSquare;
	}

	function circle() {
		var blankCircle = document.createElement('div');
		blankCircle.className = 'circleB';
		blankCircle.setAttribute('id', counter)
		return blankCircle;
	}

	for (var counter = 0; counter < boardArray.length; counter++) {
		el.appendChild(square());
	}


}

createBoard();
