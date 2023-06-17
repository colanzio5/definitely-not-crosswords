
import { IGameDbo } from '../../types/dbos/IGameDbo';
import { IGame } from '../../types/IGame';
import { BoardState } from './BoardState';
import { IGameTemplateDbo } from './gameTemplate';
import { IQuestion, Question } from './question';
import { ICoordinates } from '../../types/ICoordinates';




export function getCellFromCoordinates(coordinates: ICoordinates, game: IGame) {
  const answer = game.questions
    .flatMap((q) => q.answerMap)
    .find((a) => a.coordinates === coordinates);
  if (!answer) throw new Error('could not find cell matching coordinates');
  return answer;
}

export async function GameFromDbo(props: IGameDbo): Promise<IGame> {
  const actions = await getGameActionsDbo(props.id);
  const gameTemplateDbo = await getGameTemplateDbo(props.gameTemplateId);
  const questions = gameTemplateDbo.questions.map(q => Question.FromDbo(q, actions));
  const boardSize = GetBoardSizeFromQuestions(questions);
  const boardState = BoardState.BoardStateFromActions(boardSize, actions, questions);
  console.log(boardState);
  return {
    ...props,
    boardSize,
    questions,
    actions,
    boardState
  }
}

export function ToDbo(game: IGame): IGameDbo {
  return {
    id: game.id,
    ownerId: game.ownerId,
    status: game.status,
    gameTemplateId: game.gameTemplateId,
  };
}

export function GameToGameTemplate(game: IGame): IGameTemplateDbo {
  if (!game.questions) throw new Error('cannot create game template, no questions defined');
  return {
    id: game.id,
    questions: game.questions.map(Question.ToDbo),
  };
}


function GetBoardSizeFromQuestions(questions: IQuestion[]): ICoordinates {
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
