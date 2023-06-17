import { IBoardState } from '../../types/interfaces/IBoardState';
import { ICoordinates } from '../../types/interfaces/ICoordinates';
import { IGameAction } from '../../types/interfaces/IGameActions';
import { Cell } from './cell';

import { IQuestion } from './question';



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
        let boardCell: Cell;
        if(!answerCell) boardCell = new Cell("NOT_DEFINED", coordinates);
        else {
          boardCell = new Cell(answerCell.correctState, coordinates);
          boardCell.modifications = actions.filter((action) =>
            ICoordinates.IsEqual(coordinates, action.coordinates)
          );
        }
        boardState[yi][xi] = boardCell;

      }
    }
    return boardState;
  }
}
