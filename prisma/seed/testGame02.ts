import { Prisma, QuestionDirectionEnum } from "@prisma/client";
import rawTemplate from "~/lib/scraper/nty/2011-06.04.json";
import { INytTemplate } from "~/lib/scraper/nty/nytScraper";

const GameFromJson = (json: INytTemplate) => {
  const template = json.body[0];
  return template.clues.map((clue) => {
    return {
      direction:
        clue.direction === "Across"
          ? QuestionDirectionEnum.ACROSS
          : QuestionDirectionEnum.DOWN,
      answer: template.cells
        .filter((cell, index) => clue.cells.includes(index))
        .map((cell) => cell.answer)
        .join(""),
      number: Number.parseInt(clue.label),
      rootX: clue.cells[0] % template.dimensions.width,
      rootY: Math.trunc(clue.cells[0] / template.dimensions.height),
      questionText: clue.text[0]?.plain,
    };
  });
};

export const testGame02 = {
  title: "testGame02",
  questions: {
    createMany: {
      data: GameFromJson(rawTemplate as INytTemplate),
    },
  },
};
export const testGame02PrismaArgs: Prisma.GameCreateArgs = {
  data: testGame02,
};
