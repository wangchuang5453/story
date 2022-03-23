<template>
  <div class="bg-wrapper">
    <img class="bg" src="@/assets/images/story/question@1x.jpg" alt="">
    <div class="shanshan-progress">
      <Progress :percentage="percentage"></Progress>
    </div>
    <div class="question-wrapper">
      <div class="title">
        <img class="title-icon" src="@/assets/images/story/b.svg" alt="">
        <span class="title-text">{{questionData.category}}</span>
        <img class="title-icon" src="@/assets/images/story/a.svg" alt="">
      </div>
      <Spacer :height="22"/>
      <div class="main">
        <div class="question">
          <div class="text">
            {{questionData.step}}、{{questionData.question}}
          </div>
          <div class="img">
            <img :src="questionData.mediaUrl" alt="">
          </div>
          <Spacer :height="33"/>
        </div>
        <div class="answer">
          <div class="answer-item" v-for="(itm, idx) in questionData.choices" :key="itm.step">
            <div class="icon" :class="{selected: selected == idx}" @click="select(idx,itm, questionData.answers)">
              <div class="icon-circle">
                <div class="icon-text">{{itm.left}}</div>
              </div>
            </div>
            <div class="item-text" :class="{selected: selected == idx}" @click="select(idx, itm, questionData.answers)">{{itm.right}}</div>
          </div>
        </div>
      </div>
      <div class="next">
        <div class="button" :class="{ noSelect: !allSelected[currentQtIndex] }" v-if="currentQtIndex == allQtData.length - 1" @click="submit(!allSelected[currentQtIndex])">
          <span >交卷</span>
        </div>
        <div v-else class="button" :class="{ noSelect: !allSelected[currentQtIndex] }" @click="nextQt(!allSelected[currentQtIndex])">
          <span>下一题</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Spacer from '_c/spacer/index.vue';
import Progress from '_c/progress/Progress.vue';
import { getJSON, getAccessToken } from '@/api/user.js'
export default {
  created() {
    this.getData();
  },
  components: {
    Spacer,
    Progress,
  },
  data() {
    return {
      questionData: [],
      selected: -1,
      allSelected: [],
      allAnswerState: [],
      rightAnswerNumber: 0,
      allQtData: [],
      currentQtIndex: 0,
      percentage: 0,
      unit: 10,
    }
  },
  methods: {
    async getData() {
      const res = await getJSON()
      console.log(res, '===== init')
      const { tests = [] } = res || {};
      this.allQtData = tests;
      this.setQtData();
      const len = this.allQtData.length;
      this.unit = Math.ceil(100 / len);
    },
    setQtData() {
      this.questionData = this.allQtData[this.currentQtIndex]
    },
    select(index, selectedData, rightAnswer) {
      this.selected = index;
      const { left } = selectedData;
      this.allSelected[this.currentQtIndex] = left;
      this.allAnswerState[this.currentQtIndex] = (left == rightAnswer);
      console.log(this.allAnswerState, '======');
    },
    nextQt(noSelect) {
      if (noSelect) {
        return;
      }
      this.currentQtIndex = this.currentQtIndex + 1;
      this.setQtData();
      this.selected = -1;
      this.percentage = this.percentage + this.unit;
    },
    submit(noSelect) {
      if (noSelect) {
        return;
      }
      // TODO:
      const code = this.getCode(this.allAnswerState);
      this.$router.replace({ name: 'complete', query: { code } });
    },
    getCode(answerStateArray) {
      let code = '0000';
      return code;
    }
  }
}
</script>
<style lang="less" scoped>
.bg-wrapper {
  position: relative;
  .bg {
    width: 750px;
  }
  .shanshan-progress {
    position: absolute;
    top: 322px;
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;
    // margin-top: 50px;
    padding-top: 92px;
    width: 700px;
    height: 175px;
    // height: 83px;
    background-color: rgba(255, 255, 255, 0.56);
    border-radius: 35px;
    display: flex;
    justify-content: center;
  }
  .question-wrapper {
    position: absolute;
    top: 514px;
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;
    width: 700px;
    padding: 35px 53px;
    background: #FFFFFF;
    border-radius: 35px;
    .title {
      // width: 422px;
      height: 40px;
      font-family: PingFangSC-Medium;
      font-size: 40px;
      color: #F5623F;
      text-align: center;
      line-height: 40px;
      font-weight: 500;
      .title-icon {
        width: 34px;
        height: 26px;
      }
      .title-text {
        margin: 0 23px;
      }
    }
    .main {
      .question {
        .text {
          font-family: PingFangSC-Medium;
          font-size: 28px;
          color: #F57900;
          line-height: 38px;
          font-weight: 500;
          height: 152px;
        }
        .img {
          display: flex;
          justify-content: center;
          img {
            width: 528px;
            height: 294px;
          }
        }
      }
      .answer {
        .answer-item {
          height: 68px;
          margin-bottom: 48px;
          &:last-child {
            margin-bottom: 40px;
          }
          .icon {
            float: left;
            width: 29px;
            height: 29px;
            &.selected {
              .icon-circle {
                background: #53B260;
              }
            }
            .icon-circle {
              width: 100%;
              padding-bottom: 100%;
              background: #F57900;
              border-radius: 50%;
              position: relative;
              .icon-text {
                font-size: 24px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-family: PingFangSC-Medium;
                font-size: 24px;
                color: #FFFFFF;
                font-weight: 500;
              }
            }
          }
          .item-text {
            &.selected {
              color: #53B260;
            }
            margin-left: 40px;
            font-family: PingFangSC-Medium;
            font-size: 24px;
            color: #363636;
            line-height: 34px;
            font-weight: 500;
          }
        }
      }
    }
    .next {
      .button {
        width: 570px;
        height: 104px;
        background: linear-gradient(244deg, #FF8C4F 1%, #FFB57E 83%);
        border-radius: 52px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: PingFangSC-Medium;
        font-size: 40px;
        color: #FFFFFF;
        text-align: center;
        font-weight: 500;
        &.noSelect {
          background: #848484;
        }
      }
    }
  }
}
</style>