class Board {

    constructor() {
        this.boardSize = 8;
    }

    getKnightMoves(startCoord = [0,0]) {
        const baseMoves = [[1,2], [2,1]]
        const multipliers = [[1,1], [1, -1], [-1, 1], [-1, -1]]

        let moves = [];
        multipliers.forEach(mult => {
            baseMoves.forEach(base => {
                const move = mult.map((val, i) => val * base[i] + startCoord[i]);
                if (move.every(coord => coord >= 0 && coord < this.boardSize)) {
                    moves.push(move);
                }
            })
        })
        return moves;
    }

    squareMatch(square1, square2) {
        return square1.every((val, index) => val === square2[index]);
    }

    knightMoves(start, end) {
        // Check not already there
        if (this.squareMatch(start, end)) return [start];

        // Initialize queue
        const moves = this.getKnightMoves(start);
        let queue = [{journey: [start], moves: moves}];

        while (queue.length > 0) {
            const node = queue.shift();
            for (let index = 0; index < node.moves.length; index++) {
                const move = node.moves[index];
                if (this.squareMatch(end, move)) return node.journey.concat([move]);
                queue.push({journey: node.journey.concat([move]), moves: this.getKnightMoves(move)});
            }
        }
        return null;
    }
}

export default Board
