class Board {
    static light_size = 100;

    constructor(root, length = 5) {
        this._dom_element = createDivElement(Board.light_size * 1.1 * length, Board.light_size * 1.2 * length);
        root.appendChild(this._dom_element);
        this._dom_element.classList.add('board');
        this._dom_element.style.padding = '10px';
        this._lights = this.createLights(length);
        this.addNeighbors();
        this.restartGame();
        this._steps = 0;
        let bottom_line = Board.createBottomLine();
        this._dom_element.appendChild(bottom_line);
        this._steps_counter = document.querySelector('span');
        this._restart_btn = document.querySelector('button');
        this._restart_btn.addEventListener('click', this.restartGame.bind(this));
        this._dom_element.appendChild(this._restart_btn);
        this.update();
    }

    get steps() {
        return this._steps;
    }

    set steps(steps) {
        this._steps = steps;
    }

    update() {
        if (this._steps_counter !== undefined) { // if the set up is over
            this._steps_counter.innerHTML = this._steps;
        }
    }

    static createBottomLine = function () {
        let div = document.createElement('DIV');

        let restart_btn = document.createElement('BUTTON');
        restart_btn.innerHTML = 'restart game';
        restart_btn.style.height = '30px';
        div.appendChild(restart_btn);

        let steps_counter = document.createElement('P');
        steps_counter.innerHTML = 'steps: <span>0</span>';
        steps_counter.style.width = '100px';
        div.appendChild(steps_counter);

        return div;
    }

    createLights(length) {
        let lights = [];
        for (let i = 0; i < length; i++) {
            let row = [];
            for (let j = 0; j < length; j++) {
                row.push(new Light(this._dom_element, Board.light_size, this));
            }
            lights.push(row);
        }
        return lights;
    }

    addNeighbors() {
        for (let row = 0; row < this._lights.length; row++) {
            for (let col = 0; col < this._lights.length; col++) {
                if (this._lights[row][col + 1] !== undefined) {
                    this._lights[row][col].addNeighbor(this._lights[row][col + 1]);
                }
                if (this._lights[row][col - 1] !== undefined) {
                    this._lights[row][col].addNeighbor(this._lights[row][col - 1]);
                }
                if (row + 1 < this._lights.length &&
                    this._lights[row + 1][col] !== undefined) {
                    this._lights[row][col].addNeighbor(this._lights[row + 1][col]);
                }
                if (row >= 1 && this._lights[row - 1][col] !== undefined) {
                    this._lights[row][col].addNeighbor(this._lights[row - 1][col]);
                }
            }
        }
    }

    setBoardOn() {
        const length = this._lights.length;
        for (let row = 0; row < length; row++) {
            for (let col = 0; col < length; col++) {
                this._lights[row][col].on();
            }
        }
    }

    restartGame() {
        const length = this._lights.length;
        this.setBoardOn();
        for (let i = 0; i < length * 2; i++) {
            const row = Math.floor(Math.random() * length);
            const col = Math.floor(Math.random() * length);
            this._lights[row][col].lightIsClicked();
        }
        this._steps = 0;
        this.update();
    }

    appendStep() {
        this._steps += 1;
        this.update();
        this.isGameOver();
    }

    isGameOver() {
        const length = this._lights.length;
        for (let row = 0; row < length; row++) {
            for (let col = 0; col < length; col++) {
                if (this._lights[row][col].status === 'off') {
                    return;
                }
            }
        }
        this.winningShow();
    }

    winningShow() {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => { this.switchStates(i) }, 500 * i);
        }
    }

    switchStates(i) {
        const length = this._lights.length;
        for (let row = 0; row < length; row++) {
            for (let col = 0; col < length; col++) {
                if ((row + col + i) % 2 === 0) {
                    this._lights[row][col].on();
                } else {
                    this._lights[row][col].off();
                }
            }
        }
    }
}