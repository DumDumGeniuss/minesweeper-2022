/**
 * Area
 * @field hasMines boolean Does this area has a mine?
 * @field adjMinesCount number How many adjaent mines does this area has?
 * @field revealed boolean Has this area been revealed?
 * @field boomed boolean Have you revealed this area when it has a mine?
 */
export type Area = {
  hasMines: boolean;
  adjMinesCount: number;
  revealed: boolean;
  boomed: boolean;
  flagged: boolean;
  coord: Coordinate;
};

export type Field = Area[][];

export type Size = {
  width: number;
  height: number;
};

export type Status = 'SLEEPING' | 'STARTED' | 'SUCCEEDED' | 'FAILED';

export type Coordinate = [number, number];

export type Progress = {
  field: Field;
  status: Status;
  minesCount: number;
  size: Size;
  duration: number;
};

export type DurationChangeListener = (duration: number) => any;

export enum EventType {
  DurationChange = 'durationChange',
}
