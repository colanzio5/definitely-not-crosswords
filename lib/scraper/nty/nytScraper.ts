export interface INytTemplate {
  body: Body[];
}

export interface Body {
  cells: Cell[];
  clueLists: ClueList[];
  clues: Clue[];
  dimensions: Dimensions;
}

export interface Cell {
  answer?: string;
  clues?: number[];
  label?: string;
  type?: number;
}

export interface ClueList {
  clues: number[];
  name: Name;
}

export type Name = "Across" | "Down";

export interface Clue {
  cells: number[];
  direction: Name;
  label: string;
  text: Text[];
  relatives?: number[];
  list?: number;
}

export interface Text {
  plain: string;
}

export interface Dimensions {
  height: number;
  width: number;
}


export async function NYTToGameTemplate(nytTemplate: INytTemplate) {
  const template = nytTemplate.body[0];
  const questions = template.clues.map((clue) => {
    return {
      direction: clue.direction === 'Across'
        ? "ACROSS"
        : "DOWN",
      answer: template.cells
        .filter((cell, index) => clue.cells.includes(index))
        .map((cell) => cell.answer)
        .join(''),
      number: Number.parseInt(clue.label),
      root: {
        x: clue.cells[0] % template.dimensions.width,
        y: Math.trunc(clue.cells[0] / template.dimensions.height),
      },
      questionText: clue.text[0]?.plain
    };
  });
  return questions;
}
