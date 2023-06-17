import { ICellState } from "../../types/interfaces/ICell";
import { ICell } from "../../types/interfaces/ICellState";
import { ICoordinates } from "../../types/interfaces/ICoordinates";
import { IGameAction } from "../../types/interfaces/IGameActions";

export class Cell implements ICell {
  modifications: IGameAction[] = []
  correctState: ICellState;
  coordinates: ICoordinates;

  constructor(correctState: ICellState, coordinates: ICoordinates) {
    this.correctState = correctState;
    this.coordinates = coordinates;
  }

  get currentState(): ICellState {
    const latestModification = this.orderedModifications;
    if (!latestModification?.state) return 'NOT_DEFINED';
    return latestModification.state;
  }

  get isCorrect(): boolean {
    if (this.correctState == 'NOT_DEFINED') return false;
    if (this.modifications.length == 0) return false;
    const latestModification = this.currentState;
    if (latestModification == 'NOT_DEFINED') return false;
    return latestModification === this.correctState;
  }

  get orderedModifications(): IGameAction {
    return this.modifications.sort(GameAction.SortByDateDesc)[0];
  }
}
