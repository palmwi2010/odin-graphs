import Board from "./board.mjs";

function knightMoves(start, end) {

    const board = new Board();
    const journey = board.knightMoves(start, end);
    const journeyLength = journey.length - 1;
    const journeyString = journey.map(coord => `[${coord}]`).join("\n");
    console.log(`You made it in ${journeyLength} moves! Here's your path:\n${journeyString}`);
}

knightMoves([3,3], [4,3])