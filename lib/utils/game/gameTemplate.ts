import { IQuestionDbo } from "../../types/dbos/IQuestionDbo";

export interface IGameTemplateDbo {
  id: string;
  questions: IQuestionDbo[];
}
