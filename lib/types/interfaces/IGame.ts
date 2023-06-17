import { IQuestion } from "../../utils/game/question";
import { GameStatusEnum } from "../enums/GameStatusEnum";
import { IBoardState } from "./IBoardState";
import { ICoordinates } from "./ICoordinates";
import { IGameAction } from "./IGameActions";

export interface IGame {
    id: string;
    ownerId: string;
    gameTemplateId: string;
    status: GameStatusEnum;
    actions: IGameAction[];
    boardSize: ICoordinates;
    questions: IQuestion[];
  
    get boardState(): IBoardState;
  }