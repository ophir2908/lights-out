let createDivElement = function (width, height) {
    div_element = document.createElement('DIV');
    div_element.style.width = width + 'px';
    div_element.style.height = height + 'px';
    return div_element;
}

class Light {
    constructor(root, size, board) {
        this._dom_element = createDivElement(size, size);
        this._board = board;
        this._neighbors = [];
        this._dom_element.addEventListener('click', this.lightIsClicked.bind(this));
        this._status = 'on';
        this.update();
        root.appendChild(this._dom_element);
    }

    get status() {
        return this._status;
    }

    update() {
        if (this._status === 'on') {
            this._dom_element.style.backgroundColor = 'Yellow';
        } else {
            this._dom_element.style.backgroundColor = 'Black';
        }
    }

    static removeTrailingPx = function (str) {
        return str.substring(0, str.length - 2);
    }

    on() {
        this._status = 'on';
        this.update();
    }

    off() {
        this._status = 'off';
        this.update();
    }

    changeState() {
        if (this._status === 'on') {
            this.off();
        } else {
            this.on();
        }
    }

    addNeighbor(new_neighbor) {
        this._neighbors.push(new_neighbor);
    }

    lightIsClicked() {
        this.changeState();
        for (let neighbor of this._neighbors) {
            neighbor.changeState();
        }
        this._board.appendStep();
    }
}
