import { Question, QuestionDirectionEnum } from '@prisma/client';
import { ICoordinates } from './boardState';
import { ICell } from './cell';
import { GameAction, IGameAction } from './gameAction';

export interface IQuestion extends Question {
  answerMap: ICell[]
}

export class CQuestion implements IQuestion {
  id: string;
  type: string;
  number: number;
  answer: string;
  questionText: string;
  rootX: number;
  rootY: number;
  direction: QuestionDirectionEnum;
  gameId: string;
  answerMap: ICell[] = [];

  constructor(dbo: Question, actions: IGameAction[]) {
    this.id = dbo.id;
    this.type = dbo.type;
    this.number = dbo.number;
    this.answer = dbo.answer;
    this.questionText = dbo.questionText;
    this.rootX = dbo.rootX;
    this.rootY = dbo.rootY;
    this.direction = dbo.direction;
    this.gameId = dbo.gameId;

    let answerMap: ICell[] = new Array(dbo.answer.length);
    // default state
    dbo.answer.split('').forEach((character, index) => {
      let x = dbo.rootX;
      let y = dbo.rootY;
      dbo.direction == QuestionDirectionEnum.ACROSS
        ? (x += index)
        : (y += index);
      answerMap[index] = {
        coordinates: { x, y },
        correctState: character,
        modifications: [],
      };
    });
    // put each action into the correct cells modifications
    actions.forEach((action) => {
      const answerMapIndex = answerMap.findIndex((cell) =>
        ICoordinates.IsEqual(cell.coordinates, action.coordinates)
      );

      if (answerMapIndex != -1)
        answerMap[answerMapIndex].modifications.push(action);
    });
    //make sure modifications for each cell are sorted
    this.answerMap = answerMap.map((cell) => {
      cell.modifications = cell.modifications.sort(GameAction.SortByDateDesc);
      return cell;
    });
  }
  
  static containsCoordinates(
    question: CQuestion,
    coordinates: ICoordinates
  ): boolean {
    return question.answerMap.some(
      (c) =>
        c.coordinates.x === coordinates.x && c.coordinates.y === coordinates.y
    );
  }

  static ToDbo(question: Question): Question {
    return question;
  }

  static getCordAtAnswerIndex(q: Question, index: number): ICoordinates {
    let cordX = q.rootX;
    let cordY = q.rootY;
    q.direction == QuestionDirectionEnum.ACROSS
      ? (cordX += index)
      : (cordY += index);
    return { x: cordX, y: cordY };
  }
}
