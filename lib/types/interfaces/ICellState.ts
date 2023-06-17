import { ICellState } from "./ICell";
import { ICoordinates } from "./ICoordinates";
import { IGameAction } from "./IGameActions";

export interface ICell {
modifications: IGameAction[];
correctState: ICellState;
coordinates: ICoordinates;
}