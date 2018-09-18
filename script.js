(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {

    const ROWS = 6;
    const COLS = 7;
    let player = 'red';
    let isGameOver = false;

    const container = document.getElementById('connect4');
    const playerSelector = document.getElementById('player');


    function onPlayerMove() {
      playerSelector.textContent = player;
      var className = player === 'red' ? 'red' : 'yellow';
      playerSelector.classList.remove('red', 'yellow');
      playerSelector.classList.add(className);

      if (player === 'red') {
        updateTurn(playerOne || 'red');
      } else {
        updateTurn(playerTwo || 'yellow');
      }
    }

    function createGrid() {

      for (var row = 0; row < ROWS; row++) {

        var $row = document.createElement('div');
        $row.classList.add('row');

        for (var col = 0; col < COLS; col++) {

          var $col = document.createElement('div');
          $col.classList.add('col', 'empty');
          $col.setAttribute('data-col', col);
          $col.setAttribute('data-row', row);

          $row.appendChild($col);

        }

        container.appendChild($row);
      }
    }


    function setupEventListeners() {

      var emptyCols = document.querySelectorAll('.col.empty');
      var cols = document.querySelectorAll('.col');


      function findLastEmptyCell(col) {
        var cells = document.querySelectorAll(".col[data-col='" + col + "']");
        for (var i = cells.length - 1; i >= 0; i--) {
          var $cell = cells[i];
          if ($cell.classList.contains('empty')) {
            return $cell;
          }
        }
        return null;
      }


      var emptyColMouseleave = function () {
        if (isGameOver) return;
        var col = this.getAttribute('data-col');
        var $lastEmptyCell = findLastEmptyCell(col);
        $lastEmptyCell.classList.add('next-' + player);
      }


      var emptyColClick = function () {
        if (isGameOver) return;
        var col = this.getAttribute('data-col');
        var $lastEmptyCell = findLastEmptyCell(col);
        $lastEmptyCell.classList.remove('empty', 'next-' + player);
        $lastEmptyCell.classList.add(player);
        $lastEmptyCell.setAttribute('data-player', player);

        var winner = checkForWinner(
          $lastEmptyCell.getAttribute('data-row'),
          $lastEmptyCell.getAttribute('data-col')
        )

        if (winner) {
          isGameOver = true;
          alert('Game Over! Player ' + player + ' has won!');
          for (var i = 0; i < emptyCols.length; i++) {
            emptyCols[i].classList.remove('empty')
          }
          return;
        }

        player = (player === 'red') ? 'yellow' : 'red';
        onPlayerMove();

        var event = document.createEvent('HTMLEvents');
        event.initEvent('mouseenter', true, false);
        this.dispatchEvent(event);

      };


      for (var i = 0; i < emptyCols.length; i++) {
        emptyCols[i].addEventListener('mouseenter', emptyColMouseleave);
        emptyCols[i].addEventListener('click', emptyColClick);
      }


      for (var i = 0; i < cols.length; i++) {
        cols[i].addEventListener('mouseleave', function () {
          for (var x = 0; x < cols.length; x++) {
            cols[x].classList.remove('next-' + player);
          }
        })
      }
    }


    function checkForWinner(row, col) {


      function $getCell(i, j) {
        var selector = ".col[data-row='" + i + "'][data-col='" + j + "']";
        return document.querySelectorAll(selector)[0];
      }

      function checkDirection(direction) {
        var total = 0;
        var i = +(row) + direction.i;
        var j = +(col) + direction.j;
        var $next = $getCell(i, j);

        while (i >= 0 &&
          i < ROWS &&
          j >= 0 &&
          j < COLS &&
          $next.getAttribute('data-player') === player
        ) {
          total++;
          i += direction.i;
          j += direction.j;
          $next = $getCell(i, j);
        }
        return total;
      }

      function checkWin(directionA, directionB) {
        var total = 1 +
          checkDirection(directionA) +
          checkDirection(directionB);
        if (total >= 4) {
          return player;
        } else {
          return null;
        }
      }

      function checkDiagonalBLtoTR() {
        return checkWin({
          i: 1,
          j: -1
        }, {
          i: 1,
          j: 1
        });
      }

      function checkDiagonalTLtoBR() {
        return checkWin({
          i: 1,
          j: 1
        }, {
          i: -1,
          j: -1
        });
      }

      function checkVerticals() {
        return checkWin({
          i: -1,
          j: 0
        }, {
          i: 1,
          j: 0
        });
      }

      function checkHorizontals() {
        return checkWin({
          i: 0,
          j: -1
        }, {
          i: 0,
          j: 1
        });
      }

      return checkVerticals() ||
        checkHorizontals() ||
        checkDiagonalBLtoTR() ||
        checkDiagonalTLtoBR();
    }
    
    function restart() {
      container.innerHTML = '';
      isGameOver = false;
      player = 'red';

      createGrid();
      setupEventListeners(container);
      onPlayerMove();
    }

    createGrid(container);
    setupEventListeners(container);
    var restartButton = document.getElementById('restart');
    restartButton.addEventListener('click', restart);
    var lastChange = document.querySelector("#player");
    function updateTurn(name) {
      lastChange.innerText = name;
    }

    var nameOne = document.querySelector('#name1');
    var playerOne;

    document.querySelector('#submit1').addEventListener('click', function (e) {
      playerOne = nameOne.value;
      nameOne.value = '';
    })

    var nameTwo = document.querySelector('#name2');
    var playerTwo;

    document.querySelector('#submit2').addEventListener('click', function (e) {
      playerTwo = nameTwo.value;
      nameTwo.value = '';
    })
  })
})()