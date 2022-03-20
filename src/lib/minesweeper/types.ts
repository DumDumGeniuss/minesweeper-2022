/**
 * Cell
 * @field hasMine boolean Does this cell has a mine?
 * @field adjMinesCount number How many adjaent mines does this cell has?
 * @field revealed boolean Has this cell been revealed?
 * @field boomed boolean Have you revealed this cell when it has a mine?
 */
export type Cell = {
  key: string;
  hasMine: boolean;
  adjMinesCount: number;
  revealed: boolean;
  boomed: boolean;
};

export type CellMap = Cell[][];

export type Size = {
  width: number;
  height: number;
};

export type Status = 'SLEEPING' | 'STARTED' | 'SUCCEEDED' | 'FAILED';

export type Coordinate = [number, number];

export type Progress = {
  cellMap: CellMap;
  status: Status;
};
