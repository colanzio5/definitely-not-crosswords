import { generateUUID } from 'three/src/math/MathUtils';
import { GameFactory } from '../gameFactory';
import { QuestionDirectionEnum } from '../question';


export interface INytTemplate {
  body: Body[];
}

export interface Body {
    cells:      Cell[];
    clueLists:  ClueList[];
    clues:      Clue[];
    dimensions: Dimensions;
}

export interface Cell {
    answer?: string;
    clues?:  number[];
    label?:  string;
    type?:   number;
}

export interface ClueList {
    clues: number[];
    name:  Name;
}

export type Name = "Across" | "Down";

export interface Clue {
    cells:      number[];
    direction:  Name;
    label:      string;
    text:       Text[];
    relatives?: number[];
    list?:      number;
}

export interface Text {
    plain: string;
}

export interface Dimensions {
    height: number;
    width:  number;
}


export async function NYTToGameTemplate(nytTemplate: INytTemplate) {
  const gameFactory = new GameFactory();
  const template = nytTemplate.body[0];
  console.log(nytTemplate);
  template.clues.forEach((clue) => {
    gameFactory.addQuestion({
      direction: clue.direction === 'Across'
        ? QuestionDirectionEnum.ACROSS
        : QuestionDirectionEnum.DOWN,
      answer: template.cells
        .filter((cell, index) => clue.cells.includes(index))
        .map((cell) => cell.answer)
        .join(''),
      number: Number.parseInt(clue.label),
      root: {
        x: clue.cells[0] % template.dimensions.width,
        y: Math.trunc(clue.cells[0] / template.dimensions.height),
      },
      id: generateUUID(),
      questionText: clue.text[0]?.plain
    });
  });
}
