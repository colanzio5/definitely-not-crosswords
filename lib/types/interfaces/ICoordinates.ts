export class ICoordinates {
    x: number = 0
    y: number = 0
  
    public static IsEqual(a: ICoordinates, b: ICoordinates): boolean {
      return (a.x === b.x) && (a.y == b.y);
    }
  };
  