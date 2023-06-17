import { IGameAction } from "../../types/interfaces/IGameActions";

// eslint-disable-next-line no-unused-vars
export enum GameActionTypeEnum {
  // eslint-disable-next-line no-unused-vars
  CORRECT_GUESS = 'CORRECT_GUESS',
  // eslint-disable-next-line no-unused-vars
  INCORRECT_GUESS = 'INCORRECT_GUESS',
  // eslint-disable-next-line no-unused-vars
  PLACEHOLDER = 'PLACEHOLDER',
}

export const SortByDateDesc = (a: IGameAction, b: IGameAction) =>
  a.submittedAt > b.submittedAt ? -1 : a.submittedAt <= b.submittedAt ? 1 : 0;

