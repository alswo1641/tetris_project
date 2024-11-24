class Tetris {
    constructor(rows = 20, cols = 10, blockSize = 30) {
        this.rows = rows;
        this.cols = cols;
        this.blockSize = blockSize;
        this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
        this.currentTetromino = null;
        this.nextTetromino = null;
        this.currentColor = null;
        this.nextColor = null;
        this.currentX = 3;
        this.currentY = 0;
        this.score = 0;
        this.tetrominoes = [
            { shape: [[1, 1, 1], [0, 1, 0]], color: "purple" }, 
            { shape: [[1, 1], [1, 1]], color: "yellow" },         
            { shape: [[0, 1], [0, 1], [1, 1]], color: "blue" },   
            { shape: [[0, 1, 1], [1, 1, 0]], color: "green" },    
        ];
    }

    getRandomTetromino() {
        return this.tetrominoes[Math.floor(Math.random() * this.tetrominoes.length)];
    }

    // 테트로미노 생성
    spawnTetromino() {
        // 다음 테트로미노를 생성하고, 현재 테트로미노로 설정
        if (!this.nextTetromino) {
            const randomTetromino = this.getRandomTetromino();
            this.nextTetromino = randomTetromino.shape;
            this.nextColor = randomTetromino.color;
        }
        
        this.currentTetromino = this.nextTetromino;
        this.currentColor = this.nextColor;

        // 새로운 랜덤 테트로미노 생성
        const randomTetromino = this.getRandomTetromino();
        this.nextTetromino = randomTetromino.shape;
        this.nextColor = randomTetromino.color;

        this.currentX = 3;
        this.currentY = 0;
        
        this.drawNextTetromino();
    }
    


    // 충돌 체크
    checkCollision(tetromino, x, y) {
        for (let r = 0; r < tetromino.length; r++) {
            for (let c = 0; c < tetromino[r].length; c++) {
                if (tetromino[r][c] && (
                    this.board[y + r] === undefined || 
                    this.board[y + r][x + c] === undefined || 
                    this.board[y + r][x + c]
                )) {
                    return true;
                }
            }
        }
        return false;
    }

    // 테트로미노 고정 및 라인 제거
    placeTetromino() {
        for (let r = 0; r < this.currentTetromino.length; r++) {
            for (let c = 0; c < this.currentTetromino[r].length; c++) {
                if (this.currentTetromino[r][c]) {
                    this.board[this.currentY + r][this.currentX + c] = this.currentColor;
                }
            }
        }
        this.clearLines();
        this.spawnTetromino();
    }

    // 라인 제거
    clearLines() {
        for (let r = 0; r < this.rows; r++) {
            if (this.board[r].every(cell => cell)) {
                this.board.splice(r, 1);
                this.board.unshift(Array(this.cols).fill(0));
                this.score += 100;
            }
        }
    }

    // 테트로미노 회전
    rotateTetromino() {
        const rotated = this.currentTetromino[0].map((_, colIndex) =>
            this.currentTetromino.map(row => row[colIndex]).reverse()
        );
        if (!this.checkCollision(rotated, this.currentX, this.currentY)) {
            this.currentTetromino = rotated;
        } 
        
    }

    // 게임 루프
    gameLoop() {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        const scoreCanvas = document.getElementById("scorecanvas");
        const scoreCtx = scoreCanvas.getContext("2d");

        this.drawBoard(ctx);
        this.drawTetromino(ctx);

        scoreCtx.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);
        scoreCtx.font = "20px Arial";
        scoreCtx.fillText(`Score: ${this.score}`, 10, 20);

        setTimeout(() => {
            if (!this.checkCollision(this.currentTetromino, this.currentX, this.currentY + 1)) {
                this.currentY++;
            } else {
                this.placeTetromino();
            }
            this.gameLoop();
        }, 500);
    }

    // 게임 보드 그리기
    drawBoard(ctx) {
        ctx.clearRect(0, 0, this.cols * this.blockSize, this.rows * this.blockSize);
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.board[r][c]) {
                    ctx.fillStyle = this.board[r][c];
                    ctx.fillRect(c * this.blockSize, r * this.blockSize, this.blockSize, this.blockSize);
                    ctx.strokeRect(c * this.blockSize, r * this.blockSize, this.blockSize, this.blockSize);
                }
            }
        }
    }

    // 테트로미노 그리기
    drawTetromino(ctx) {
        ctx.fillStyle = this.currentColor;
        for (let r = 0; r < this.currentTetromino.length; r++) {
            for (let c = 0; c < this.currentTetromino[r].length; c++) {
                if (this.currentTetromino[r][c]) {
                    ctx.fillRect((this.currentX + c) * this.blockSize, (this.currentY + r) * this.blockSize, this.blockSize, this.blockSize);
                    ctx.strokeRect((this.currentX + c) * this.blockSize, (this.currentY + r) * this.blockSize, this.blockSize, this.blockSize);
                }
            }
        }
    }

    // 다음 테트로미노 미리보기
    drawNextTetromino() {
        const previewCanvas = document.getElementById("smallCanvas");
        const previewCtx = previewCanvas.getContext("2d");
        const size = 20;

        previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        previewCtx.fillStyle = this.nextColor;
        for (let r = 0; r < this.nextTetromino.length; r++) {
            for (let c = 0; c < this.nextTetromino[r].length; c++) {
                if (this.nextTetromino[r][c]) {
                    previewCtx.fillRect(c * size, r * size, size, size);
                    previewCtx.strokeRect(c * size, r * size, size, size);
                }
            }
        }
    }

    // 게임 초기화
    resetGame() {
        this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
        this.score = 0;
        this.spawnTetromino();
    }
}
// 게임객체, 게임
let tetrisGame;

// 게임 초기화 함수
function init() {
    tetrisGame = new Tetris();
    tetrisGame.spawnTetromino(); 
    tetrisGame.gameLoop();      
}

// 키보드 event
function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowLeft':
            if (!tetrisGame.checkCollision(tetrisGame.currentTetromino, tetrisGame.currentX - 1, tetrisGame.currentY)) {
                tetrisGame.currentX--;
            }
            break;
        case 'ArrowRight':
            if (!tetrisGame.checkCollision(tetrisGame.currentTetromino, tetrisGame.currentX + 1, tetrisGame.currentY)) {
                tetrisGame.currentX++;
            }
            break;
        case 'ArrowDown':
            if (!tetrisGame.checkCollision(tetrisGame.currentTetromino, tetrisGame.currentX, tetrisGame.currentY + 1)) {
                tetrisGame.currentY++;
            }
            break;
        case 'ArrowUp':
            tetrisGame.rotateTetromino();
            break;
    }
}

// 이벤트 리스너 등록
document.addEventListener('keydown', handleKeyPress);
