
import { IGame } from '../../types/interfaces/IGame';
import { GameStatusEnum } from '../../types/enums/GameStatusEnum';
import { IQuestionDbo } from '../../types/dbos/IQuestionDbo';
import { IGameAction } from '../../types/interfaces/IGameActions';
import { QuestionFromDbo } from './question';
import { GameToGameTemplate } from './game';

export class GameFactory {
  private _game: IGame = {
    id: generateUUID(),
    ownerId: '',
    gameTemplateId: '',
    status: GameStatusEnum.IN_PROGRESS,
    questions: [],
    boardState: [],
    boardSize: { x: 0, y: 0 },
    actions: []
  }

  constructor(props?: { id?: string }) {
    if (props?.id) this._game.id = props.id;
  }

  addQuestion(props: IQuestionDbo, actions: IGameAction[] = []) {
    const question = QuestionFromDbo(props, actions);
    this._game.questions.push(question);
    return this;
  }

  getGame(): IGame {
    if (!this._game.id) this._game.id = generateUUID();
    if (!this._game.ownerId) this._game.ownerId = 'DefaultUser';
    // create game board
    // compute board size first
    this._game.boardSize = this._game.questions
      .flatMap((q) => [...q.answerMap])
      .reduce(
        (pre, cur) => {
          const largest = pre;
          if (cur.coordinates.x > pre.x) largest.x = cur.coordinates.x;
          if (cur.coordinates.y > pre.y) largest.y = cur.coordinates.y;
          return largest;
        },
        { x: 0, y: 0 }
      );
    this._game.boardSize.x += 1;
    this._game.boardSize.y += 1;
    return this._game;
  }

  saveToFirestore = () =>
    addOrUpdateGameTemplateDbo(GameToGameTemplate(this._game));
}
