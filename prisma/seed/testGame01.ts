import { Prisma, QuestionDirectionEnum } from "@prisma/client";


export const testGame01 = {
  published: true,
  title: "testGame01",
  questions: {
    create: [
      {
        direction: QuestionDirectionEnum.ACROSS,
        rootX: 1,
        rootY: 0,
        answer: "LEFT",
        number: 1,
        questionText: "It's just not right.",
      },
      {
        direction: QuestionDirectionEnum.ACROSS,
        rootX: 1,
        rootY: 1,
        answer: "YALE",
        number: 5,
        questionText: "School parodied on 'Kale' sweatshirts.",
      },
      {
        direction: QuestionDirectionEnum.ACROSS,
        rootX: 0,
        rootY: 2,
        answer: "ARGON",
        number: 6,
        questionText: "Element #18, a noble gas.",
      },
      {
        direction: QuestionDirectionEnum.ACROSS,
        rootX: 0,
        rootY: 3,
        answer: "VILE",
        number: 7,
        questionText: "Apt anagram of 'evil.'",
      },
      {
        direction: QuestionDirectionEnum.ACROSS,
        rootX: 0,
        rootY: 4,
        answer: "ACES",
        number: 8,
        questionText: "They top kings.",
      },
      // DOWN QUESTIONS
      {
        direction: QuestionDirectionEnum.DOWN,
        rootX: 1,
        rootY: 0,
        answer: "LYRIC",
        number: 1,
        questionText: "Line from a song.",
      },
      {
        direction: QuestionDirectionEnum.DOWN,

        rootX: 2,
        rootY: 0,
        answer: "EAGLE",
        number: 2,
        questionText: "Highest rank in Scouting.",
      },
      {
        direction: QuestionDirectionEnum.DOWN,
        rootX: 3,
        rootY: 0,
        answer: "FLOES",
        number: 3,
        questionText: "Chunks of ice.",
      },
      {
        direction: QuestionDirectionEnum.DOWN,
        rootX: 4,
        rootY: 0,
        answer: "TEN",
        number: 4,
        questionText: "Height, in feet, of an N.B.A. hoop.",
      },
      {
        direction: QuestionDirectionEnum.DOWN,
        rootX: 0,
        rootY: 2,
        answer: "AVA",
        number: 6,
        questionText: "Hannah Einbinder's role on 'Hacks.'",
      },
    ]
  }
}

export const testGame01CreateArgs: Prisma.GameCreateArgs = {
  data: testGame01
}
