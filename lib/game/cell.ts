import { ICoordinates } from './boardState';
import { CGameAction, IGameAction } from './gameAction';

export type ICellState = string | null;
export interface ICell {
  modifications: IGameAction[];
  correctState: ICellState;
  coordinates: ICoordinates;
}
export class CCell implements ICell {
  modifications: IGameAction[] = []
  correctState: ICellState;
  coordinates: ICoordinates;

  constructor(correctState: ICellState, coordinates: ICoordinates) {
    this.correctState = correctState;
    this.coordinates = coordinates;
  }

  get currentState(): ICellState {
    const latestModification = this.orderedModifications;
    if (!latestModification?.state) return null;
    return latestModification.state;
  }

  get isCorrect(): boolean {
    if (this.correctState == null) return false;
    if (this.modifications.length == 0) return false;
    const latestModification = this.currentState;
    if (latestModification == null) return false;
    return latestModification === this.correctState;
  }

  get orderedModifications(): IGameAction {
    return this.modifications.sort(CGameAction.SortByDateDesc)[0];
  }
}
