document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const width = 15;
    const height = 15;
  
  
    let currentPosition = 6;
    let currentTetromino = [];
    let tetrominoQueue = [];
    let timerId;
    let score = 0;
  
  
  
  
    const tetrominoes = [
      [1, width + 1, width * 2 + 1, width * 2], // LShape
      [1, width + 1, width + 2, width * 2 + 1], // ZShape
      [0, 1, width + 1, width + 2], // TShape
      [0, width, width + 1, width * 2 + 1], // Square
      [1, width + 1, width * 2 + 1, width * 3 + 1] // Line
    ];
  
  
    for (let i = 0; i < height * width; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      grid.appendChild(cell);
    }
  
    
  
    function generateTetromino() {
      const random = Math.floor(Math.random() * tetrominoes.length);
      currentTetromino = tetrominoes[random];
      currentPosition = 4;
      if (isCollision(currentPosition)) {
        stopGame();
        
        return;
      }
      if (isCollision(currentPosition + width)) {
        freeze();
        clearRows();
        generateTetromino();
        return;
      }
      draw();
    }
  
  
  function draw() {
    currentTetromino.forEach(index => {
      grid.children[currentPosition + index].classList.add('tetromino'); // Correct class name
    });
  }
  
  
  function undraw() {
    currentTetromino.forEach(index => {
      grid.children[currentPosition + index].classList.remove('tetromino'); // Correct class name
    });
  }

  function isGameOver() {
    return isCollision(currentPosition);
  }
  
  function displayGameOverAlert() {
    const finalScore = `Your final score: ${score}`;
    alert(`Game Over!\n${finalScore}`);
  }
  
  function checkGameOver() {
    if (isGameOver()) {
      console.log("Game over!");
      displayGameOverAlert();
      return;
    }
    
  }
  
  
  
    function moveDown() {
      undraw();
      if (!isCollision(currentPosition + width)) {
        currentPosition += width;
        draw();
      } else {
        freeze();
        clearRows();
        generateTetromino();
      }
    }
  
  
    function freeze() {
      currentTetromino.forEach(index => {
        grid.children[currentPosition + index].classList.add('taken');
      });
    }
  
  
    function isCollision(nextPosition) {
      return currentTetromino.some(index => {
        const newIndex = nextPosition + index;
        return newIndex >= width * height || grid.children[newIndex].classList.contains('taken');
      });
    }
  
    function moveLeft() {
      undraw();
      const isAtLeftEdge = currentTetromino.some(index => (currentPosition + index) % width === 0);
      if (!isAtLeftEdge && !isCollision(currentPosition - 1)) {
        currentPosition -= 1;
      }
      draw();
    }
  
   
    function moveRight() {
      undraw();
      const isAtRightEdge = currentTetromino.some(index => (currentPosition + index) % width === width - 1);
      if (!isAtRightEdge && !isCollision(currentPosition + 1)) {
        currentPosition += 1;
      }
      draw();
    }
  
  
    
    function rotate() {
      undraw();
      
      draw();
    }
  
  
    function clearRows() {
        const pattern = [
          [0, 0],
          [0, 1],
          [0, 2],
          [1, 0],
          [1, 1],
          [1, 2],
          [2, 0],
          [2, 1],
          [2, 2],
        ];
      
        for (let row = height - 3; row >= 0; row--) { 
          for (let col = 0; col < width - 2; col++) {
            const matched = pattern.every(offset => {
              const [rowOffset, colOffset] = offset;
              const cell = grid.children[(row + rowOffset) * width + col + colOffset];
              return cell && cell.classList.contains('taken');
            });
      
            if (matched) {
              for (let i = row; i < row + 3; i++) {
                for (let j = col; j < col + 3; j++) {
                  const currentCell = grid.children[i * width + j];
                  currentCell.classList.remove('taken', 'tetromino');
                }
              }
              score += 50; 
              return;
            }
          }
        }
      }
              

  
  
    
    function startGame() {
      generateTetromino();
      timerId = setInterval(moveDown, 300);
    }
  
  
   
    function stopGame() {
      clearInterval(timerId);
    }
   
  
  
   
    document.addEventListener('keydown', e => {
      switch (e.key) {
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowUp':
          rotate();
          break;
        default:
          break;
      }
     
    });
    
  
    function restartGame() {
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => {
        cell.classList.remove('taken', 'tetromino');
      });
  
  
      currentTetromino = [];
     
      currentPosition = 4;
      score = 0;
      stopGame();
  
  
      startGame();
    }
    
   
  
    function gameLoop() {
     
      if (isGameOver()) {
        displayGameOverAlert();
        
        stopGame();
      } else {
        requestAnimationFrame(gameLoop);
      }
    }
  
    gameLoop();
  
  
  
  function isGameOver() {
    return isCollision(currentPosition);
  }
  
  function displayGameOverAlert() {
    const finalScore = `Your final score: ${score}`;
    alert(`Game Over!\n${finalScore}`);
  }
  
  
  function pauseGame() {
    clearInterval(timerId); 
    }
  
  
  function resumeGame() {
    timerId = setInterval(moveDown, 1000); 
  }
  
  
  function goToHome() {
    window.location.href = 'file:///C:/Users/Chhayank%20Dave/Downloads/wt%20project%202nd%20sem/home%20page%20of%20game.html';
   
  }
    startGame();
    const settingsButton = document.getElementById('settings-btn');
    settingsButton.addEventListener('click', () => {
      const optionsContainer = document.getElementById('options-container');
      optionsContainer.style.display = 'block';
    });
  
  
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.addEventListener('click', (e) => {
      const selectedOption = e.target.textContent; 
      handleOption(selectedOption);
      optionsContainer.style.display = 'none'; 
    });
  
  
    function handleOption(option) {
      switch (option) {
        case 'Restart':
          restartGame();
          break;
        case 'Pause':
          pauseGame();
          break ;
  
  
        case 'Resume':
            resumeGame();
           break;
        case 'Go to Home':
          goToHome();
          break;
        default:
          alert('Invalid option selected!');
      }
    }

    
   
  });