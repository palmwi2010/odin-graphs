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
        if (this.squareMatch(start, end)) return 0;

        // Add nulls to mark new rows
        let queue = this.getKnightMoves(start);
        const moves = this.getKnightMoves(start);
        const root = {journey: start, moves: moves};
        queue.push(null)
        let depth = 1;

        while (queue.length > 0) {
            let move = queue.shift();

            // Handle end of move
            if (move === null) {
                depth++;
                queue.push(null);
                continue
            }

            // Either the end, or queue its moves
            if (this.squareMatch(end, move)) return depth;
            queue = queue.concat(this.getKnightMoves(move))
        }
        return -1;
    }
}

let board = new Board();
console.log(board.knightMoves([0,0], [1,2]));
