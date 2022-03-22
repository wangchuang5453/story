<template>
  <div class="bg-wrapper">
    <img class="bg" src="@/assets/images/story/question@1x.jpg" alt="">
    <div class="question-wrapper">
      <div class="title">食品安全</div>
      <Spacer :height="22"/>
      <div class="main">
        <div v-for="(item, index) in questionData" :key="index">
          <div class="question">
            <div class="text">
              {{item.question}}
            </div>
            <div class="img">
              <img src="@/assets/images/story/testImg.jpeg" alt="">
              <!-- <van-image src="~@/assets/images/story/testImg.jpeg" /> -->
            </div>
            <Spacer :height="33"/>
          </div>
          <div class="answer">
            <div class="answer-item" v-for="(itm, idx) in item.choices" :key="idx">
              <div class="icon" @click="select">
                <div class="icon-circle">
                  <div class="icon-text">{{itm.left}}</div>
                </div>
              </div>
              <div class="item-text" @click="select">{{itm.right}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="next">
        <div class="button"><span>下一题</span></div>
      </div>
    </div>
  </div>
</template>
<script>
import Spacer from '_c/spacer/index.vue';
import { getJSON, getAccessToken } from '@/api/user.js'
export default {
  created() {
    this.getData();
  },
  components: {
    Spacer,
  },
  data() {
    return {
      questionData: [],
    }
  },
  methods: {
    async getData() {
      const res = await getJSON()
      console.log(res, '===== init')
      // const { tests } = res || {};
      this.questionData = [
        {
          "step": 0,
          "question": "7、你在不知名网站上，通过游戏大转盘，中了大奖：可以免费获得电脑、手机等高价商品。不过你得先填写个人信息，且预先自付邮费。这时，你应该：",
          "mediaUrl": "",
          "mediaType": "image",
          "choices":[
            { left: 'A', right: '为了获得数码产品，瞒住父母，填写信息，并支付自己的零用钱。'},
            { left: 'B', right: '把情况报告给长辈，让他们评判是否真实'},
            { left: 'C', right: '通过客服询问具体情况，并留下联系方式，便于联络。' }
          ],
          "choiceType": "single",
          "answers": 0
        },
      ]
    },
    select() {

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
  .question-wrapper {
    position: absolute;
    top: 514px;
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;
    width: 700px;
    padding: 35px 53px;
    .title {
      width: 422px;
      height: 40px;
      font-family: PingFangSC-Medium;
      font-size: 40px;
      color: #F5623F;
      text-align: center;
      line-height: 40px;
      font-weight: 500;
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
        background-image: linear-gradient(244deg, #FF8C4F 1%, #FFB57E 83%);
        border-radius: 52px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: PingFangSC-Medium;
        font-size: 40px;
        color: #FFFFFF;
        text-align: center;
        font-weight: 500;
      }
    }
  }
}
</style>