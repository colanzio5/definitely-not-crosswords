import { ActiveGame, Game, GameAction, Question } from '@prisma/client';
import { CGameAction, IGameAction } from './gameAction';
import { BoardState, IBoardState, ICoordinates } from './boardState';
import { CQuestion, IQuestion } from './question';

export interface IActiveGame extends ActiveGame {
  id: string;
  actions: IGameAction[];
  questions: IQuestion[];
  boardSize: ICoordinates;
  get boardState(): IBoardState;
}

export class CActiveGame implements IActiveGame { 
  id: string;
  boardSize: ICoordinates;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  gameId: string;
  actions: CGameAction[];
  questions: CQuestion[];
 
  get boardState(): IBoardState {
    return BoardState.BoardStateFromActions(this.boardSize, this.actions, this.questions)
  }

  constructor(activeGame: ActiveGame, questions: Question[], actions: GameAction[]) {
    this.id = activeGame.id;
    this.actions = actions;
    this.questions = questions.map(q => new CQuestion(q, this.actions));
    this.type = activeGame.type;
    this.createdAt = activeGame.createdAt;
    this.updatedAt = activeGame.updatedAt;
    this.gameId = activeGame.gameId;
    this.boardSize = CActiveGame.GetBoardSize(this.questions);
  }

  static getCellFromCoordinates(coordinates: ICoordinates, game: CActiveGame) {
    const answer = game.questions
      .flatMap((q) => q.answerMap)
      .find((a) => a.coordinates === coordinates);
    if (!answer) throw new Error('could not find cell matching coordinates');
    return answer;
  }

  static ToDbo(game: CActiveGame): ActiveGame {
    return { ...game };
  }

  private static GetBoardSize(questions: CQuestion[]): ICoordinates {
    const boardSize = questions
      .flatMap((q) => q.answerMap)
      .reduce(
        (pre, cur) => {
          const largest = pre;
          if (cur.coordinates.x > pre.x) largest.x = cur.coordinates.x;
          if (cur.coordinates.y > pre.y) largest.y = cur.coordinates.y;
          return largest;
        },
        { x: 0, y: 0 }
      );
    boardSize.x++;
    boardSize.y++;
    return boardSize;
  }
}

