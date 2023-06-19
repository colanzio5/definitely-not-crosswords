import { GameAction, GameActionTypeEnum } from "@prisma/client";
import { ICellState } from "./cell";

export interface IGameAction extends GameAction {}

export class CGameAction implements IGameAction {
  submittedAt: Date;
  actionType: GameActionTypeEnum;
  cordX: number;
  cordY: number;
  previousState: ICellState;
  state: ICellState;
  id: string;
  type: string;
  activeGameId: string;
  userId: string;

  constructor(action: GameAction) {
    this.submittedAt = action.submittedAt;
    this.actionType = action.actionType;
    this.cordX = action.cordX;
    this.cordY = action.cordY;
    this.previousState = action.previousState;
    this.state = action.state;
    this.id = action.id;
    this.type = action.type;
    this.activeGameId = action.activeGameId;
    this.userId = action.userId;
  }

  static SortByDateDesc = (a: IGameAction, b: IGameAction) =>
    a.submittedAt > b.submittedAt ? -1 : a.submittedAt <= b.submittedAt ? 1 : 0;
}
