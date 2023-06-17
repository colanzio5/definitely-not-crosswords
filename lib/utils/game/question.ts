import { IQuestionDbo } from "../../types/dbos/IQuestionDbo";
import { ICell } from "../../types/interfaces/ICellState";
import { QuestionDirectionEnum } from "../../types/enums/QuestionDirectionEnum";
import { ICoordinates } from "../../types/interfaces/ICoordinates";
import { IGameAction } from "../../types/interfaces/IGameActions";
import { Cell } from "./cell";
import { SortByDateDesc } from "./gameAction";

export interface IQuestion {
  id: string;
  number: number;
  questionText: string;
  answer: string;
  root: ICoordinates;
  direction: QuestionDirectionEnum;
  answerMap: Cell[];
}


export function containsCoordinates(
  question: IQuestion,
  coordinates: ICoordinates
): boolean {
  return question.answerMap.some(
    (c) =>
      c.coordinates.x === coordinates.x && c.coordinates.y === coordinates.y
  );
}

export function QuestionFromDbo(questionDbo: IQuestionDbo, actions: IGameAction[]): IQuestion {
  let answerMap: ICell[] = new Array(questionDbo.answer.length);
  // default state
  questionDbo.answer.split('').forEach((character, index) => {
    let { x, y } = { x: questionDbo.root_x, y: questionDbo.root_y };
    questionDbo.direction == QuestionDirectionEnum.ACROSS
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
  answerMap = answerMap.map((cell) => {
    cell.modifications = cell.modifications.sort(SortByDateDesc);
    return cell;
  });
  return {
    ...questionDbo,
    answerMap,
  };
}

export function ToDbo(question: IQuestion): IQuestionDbo {
  return question;
}

export function getCordAtAnswerIndex(q: IQuestion, index: number): ICoordinates {
  const cord = q.root;
  q.direction == QuestionDirectionEnum.ACROSS
    ? (cord.x += index)
    : (cord.y += index);
  return cord;
}
