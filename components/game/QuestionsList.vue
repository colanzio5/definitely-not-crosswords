<script lang="ts">
import { vxm } from '@/store';
import { IQuestion } from '@/utils/game/question';
import { Options, Vue } from 'vue-class-component';
import {
  GameActionTypeEnum,
  IGameAction
} from '../../utils/game/gameAction';
import { QuestionDirectionEnum } from '../../utils/game/question';
import BoardCell from './BoardCell.vue';
import { nextTick } from 'vue';

@Options({
  components: {
    BoardCell
  }
})
export default class QuestionsList extends Vue {
  isEditing = false;
  actionData: IGameAction[] = [];
  direction = QuestionDirectionEnum.DOWN;
  get questions(): IQuestion[] {
    if(this.direction === QuestionDirectionEnum.DOWN) return vxm.activeGame.downQuestions;
    else return vxm.activeGame.acrossQuestions;
  }

  get vxm() {
    return vxm;
  }

  onQuestionClick(selectedQuestion: IQuestion) {
    vxm.activeGame.selectCoordinates({coordinates: selectedQuestion.answerMap[0].coordinates})
    this.actionData = selectedQuestion.answerMap.map((cell) => {
      const previousCellState = cell.currentState;
      const action: IGameAction = {
        coordinates: cell.coordinates,
        previousState:
          previousCellState == 'NOT_DEFINED' ? '' : previousCellState,
        state: previousCellState == 'NOT_DEFINED' ? '' : previousCellState,
        submittedById: vxm.user.activeUser?.uid,
        submittedAt: new Date(),
        actionType: GameActionTypeEnum.PLACEHOLDER,
      };
      return action;
    });
  }

  isQuestionSelected(question: IQuestion) {
    if (!vxm.activeGame.selectedQuestions.length) return false;
    const questionMatch = vxm.activeGame.selectedQuestions.find(
      (q) => q.id === question.id && this.direction === q.direction
    );
    if(!questionMatch) return false;
    this.focusOnSelected();
    return questionMatch != null;
  }

  focusOnSelected() {
    if(!vxm.activeGame.selectedQuestions.length) return;
    try {
      const questionMatch = vxm.activeGame.selectedQuestions.find(q =>
        q.direction === this.direction
      ) as IQuestion;
      if(!questionMatch || !this.$refs || !this.$refs[questionMatch?.id]) return;
      const ref = (this.$refs[questionMatch?.id] as Element[])[0];
      if(!ref) return;
      const target = (this.$refs[questionMatch.id] as any)[0].firstChild?.firstChild;
      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
        // inline: "nearest"
      });
    } catch (error) {
      console.error(error);
    }
  }

  async submit(
    actionType: 'placeholder' | 'guess' | 'cancel',
    question: IQuestion
  ) {
    if (!this.actionData)
      throw new Error('action was not defined during submit event.');
    switch (actionType) {
      case 'guess':
        this.actionData = this.actionData.map((a) => {
          a.actionType = this.checkIfCorrect(question, this.actionData)
            ? GameActionTypeEnum.CORRECT_GUESS
            : GameActionTypeEnum.INCORRECT_GUESS;
          return a
        });
        break;
      case 'cancel':
        break;
      default:
        break;
    }
    this.actionData = this.actionData.map((a) => {
      if (a.previousState == '') a.previousState = 'NOT_DEFINED'
      if (a.state == '') a.state = 'NOT_DEFINED'
      return a;
    });
    await vxm.activeGame.submitActions({ actions: this.actionData, question });
  }

  checkIfCorrect(question: IQuestion, actionData: IGameAction[]) {
    return question.answerMap.every(
      (q, index) => q.correctState === actionData[index].state
    );
  }

  toggleDirection() {
    switch (this.direction) {
      case (QuestionDirectionEnum.ACROSS):

        this.direction = QuestionDirectionEnum.DOWN;
        this.questions = vxm.activeGame.downQuestions;
        break;
      case (QuestionDirectionEnum.DOWN):
        this.direction = QuestionDirectionEnum.ACROSS;
        this.questions = vxm.activeGame.acrossQuestions;
        break;
    };
  }

  selectDown() {
    // vxm.activeGame.selectedQuestions = []
    // this.questions = vxm.activeGame.downQuestions;
    this.direction = QuestionDirectionEnum.DOWN;
    // vxm.activeGame.selectedQuestions = vxm.activeGame.selectedQuestions;
    // const questionMatch = vxm.activeGame.selectedQuestions.find(q =>
    //   q.direction === QuestionDirectionEnum.DOWN
    // );
    nextTick(() => this.focusOnSelected());
  }
  selectAcross() {
    // this.questions = vxm.activeGame.acrossQuestions;
    this.direction = QuestionDirectionEnum.ACROSS;
    // vxm.activeGame.selectedQuestions = vxm.activeGame.selectedQuestions;


    nextTick(() => this.focusOnSelected());
  }
}
</script>

<template>
  <div class="h-full max-h-full overflow-scroll flex flex-col">
    <div class="app-border text-lg flex flex-row">
      <div :class="direction == 'DOWN' ? 'rainbow-text-animated app-border' : 'text-white app-border link'"
        @click="selectDown">DOWN</div>
      <div class="w-full"></div>
      <div :class="direction == 'ACROSS' ? 'rainbow-text-animated app-border' : 'text-white app-border link'"
        @click="selectAcross">ACROSS</div>
    </div>
    <div class="h-full flex-grow overflow-scroll scroll-smooth " ref="questionList">
      <div v-for="question in questions" :key="question.id" @click="onQuestionClick(question)" :ref="question.id">
        <div class="flex flex-row border border-white hover:link">
          <div class="max-w-min p-1 border border-primary-500 text-white">
            {{ question.number }}
          </div>
          <div class="flex flex-col w-full">
            <div class="flex-grow text-white">
              {{ question.questionText }}
            </div>

            <div v-if="isQuestionSelected(question)" class="flex flex-row hover:link">
              <BoardCell v-for="(cell, cellIndex) of question.answerMap" :key="cellIndex" :cell="cell" />
              <div class="w-full"></div>
              <button class="app-button text-sm link" @click="submit('guess', question)">
                guess
              </button>
              <button class="app-button text-sm link" @click="submit('cancel', question)">
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.question-list {
  overflow: -moz-hidden-unscrollable;
}

.direction-button {
  @apply min-w-full m-1;
}

.selected {
  @apply bg-red-400;
}
</style>
