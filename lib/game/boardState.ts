import { CCell, ICell } from "./cell";
import { IGameAction } from "./gameAction";
import { IQuestion } from "./question";

export class ICoordinates {
  x: number = 0
  y: number = 0

  public static IsEqual(a: ICoordinates, b: ICoordinates): boolean {
    return (a.x === b.x) && (a.y == b.y);
  }
};
export interface IBoardState extends Array<Array<ICell>> {};

export class BoardState {
  static BoardStateFromActions(
    boardSize: ICoordinates,
    actions: IGameAction[],
    questions: IQuestion[]
  ): IBoardState {
    const answersCellMap = questions.flatMap((q) => [...q.answerMap])
    const boardState = new Array(boardSize.y);
    for (let yi = 0; yi < boardSize.y; yi++) {
      boardState[yi] = new Array(boardSize.x);
      for(let xi = 0; xi < boardSize.x; xi++) {
        const coordinates = { x: xi, y: yi };
        const answerCell = answersCellMap.find(cell => ICoordinates.IsEqual(cell.coordinates, coordinates));
        let boardCell: ICell;
        if(!answerCell) boardCell = new CCell("NOT_DEFINED", coordinates);
        else {
          boardCell = new CCell(answerCell.correctState, coordinates);
          boardCell.modifications = actions.filter((action) =>
            ICoordinates.IsEqual(coordinates, { x: action.cordX, y: action.cordY })
          );
        }
        boardState[yi][xi] = boardCell;

      }
    }
    return boardState;
  }
}
