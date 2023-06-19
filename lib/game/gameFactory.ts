import { addOrUpdateGameTemplateDbo } from '@app/services/firebase';
import { Game, GameStatusEnum, IGame } from '@app/utils/game/game';
import { generateUUID } from 'three/src/math/MathUtils';
import { IQuestionDbo, Question } from './question';
import { IGameAction } from './gameAction';

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
    const question = Question.FromDbo(props, actions);
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
    addOrUpdateGameTemplateDbo(Game.ToGameTemplate(this._game));
}
