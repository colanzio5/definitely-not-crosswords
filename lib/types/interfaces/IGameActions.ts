import { GameActionTypeEnum } from "../../utils/game/gameAction";
import { ICellState } from "./ICell";
import { ICoordinates } from "./ICoordinates";

export interface IGameAction {
    submittedById: string;
    submittedAt: Date;
    actionType: GameActionTypeEnum;
    coordinates: ICoordinates;
    previousState: ICellState;
    state: ICellState;
  }
  