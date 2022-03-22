<template>
  <div class="add-teacher">
    <Spacer :height="52"/>
    <p class="main-title"><span>扫码添加老师</span></p>
    <Spacer :height="60"/>
    <div class="qrCode card">
      <div class="qrCode-title">
        <p class="qrCode-title__content">宝贝的专属老师</p>
      </div>
      <Spacer :height="88"/>
      <div class="list">
        <div class="list-item">
          <img class="list-item__img" src="@/assets/images/H5_right@3x.png" alt="">
          <span class="list-item__text">提供个性化反馈</span>
        </div>
        <div class="list-item">
          <img class="list-item__img" src="@/assets/images/H5_right@3x.png" alt="">
          <span class="list-item__text">解答学习问题</span>
        </div>
      </div>
      <Spacer :height="41"/>
      <div class="qrCode-module">
        <img class="qrCode-module__img" :src="teacherWeixinUrl" alt="">
      </div>
      <Spacer :height="37"/>
      <div class="qrCode-prompt">
        <p class="qrCode-prompt__text">{{`长按识别二维码添加${operateTeacher(teacherName)}`}}</p>
      </div>
      <Spacer :height="41"/>
      <div class="qrCode-desc">
        <p class="qrCode-desc__text">添加老师微信后，专属老师会在48小时内联系您确认。</p>
      </div>
      <Spacer :height="42"/>
    </div>
    <Spacer :height="40"/>
    <div class="title">
      <div class="title-main">
        <img class="title-main__img" src="@/assets/images/H5_zhuanshi@3x.png" alt="">
        <p class="title-main__text">优优狗编程 0 元体验课</p>
        <img class="title-main__img" src="@/assets/images/H5_zhuanshi@3x.png" alt="">
      </div>
    </div>
    <Spacer :height="40"/>
    <div class="class-info">
      <Spacer :height="50"/>
      <div class="class-info__main">
        <p class="info-item">
          <span>开课时间：</span><span>{{courseOpenDate}}</span>
          <!-- 8月19日-8月26日 -->
        </p>
        <p class="info-item">
          <span>上课地点：</span><span class="mg-20">【优优狗编程】App -【学习】</span>
        </p>
        <p class="info-item">
          <span>专属老师：</span><span>{{teacherName}}</span>
        </p>
      </div>
      <Spacer :height="50"/>
    </div>
    <Spacer :height="40"/>
    <div class="title">
      <div class="title-main">
        <img class="title-main__img" src="@/assets/images/H5_zhuanshi@3x.png" alt="">
        <p class="title-main__text">上课须知</p>
        <img class="title-main__img" src="@/assets/images/H5_zhuanshi@3x.png" alt="">
      </div>
    </div>
    <Spacer :height="40"/>
    <div class="notice">
      <Spacer :height="49"/>
      <div class="notice-item">
        <p class="notice-item__title">上课软件</p>
        <Spacer :height="20"/>
        <p class="notice-item__desc">下载【优优狗编程】App</p>
        <img class="notice-item__img" src="@/assets/images/H5_bg@3x.png" alt="">
      </div>
      <Spacer :height="57"/>
      <div class="notice-item">
        <p class="notice-item__title">登录账号</p>
        <Spacer :height="20"/>
        <p class="notice-item__desc">注册账号时使用的手机号</p>
        <img class="notice-item__img" src="@/assets/images/H5_bg@3x.png" alt="">
      </div>
      <Spacer :height="57"/>
      <div class="notice-item">
        <p class="notice-item__title">学习通知</p>
        <Spacer :height="20"/>
        <p class="notice-item__desc">关注【优优狗编程】公众号</p>
        <img class="notice-item__img" src="@/assets/images/H5_bg@3x.png" alt="">
      </div>
      <Spacer :height="42"/>
    </div>
    <Spacer :height="32"/>
  </div>
</template>
<script>
import Spacer from '_c/spacer/index.vue';
import Button from '_c/button/index.vue';
import { getTeacherInfo } from '@/api/user.js';
export default {
  created() {
    this.getPageInfo();
  },
  components: {
    Spacer,
    Button,
  },
  data() {
    return {
      teacherName: '',
      teacherWeixinUrl: '',
      courseOpenDate: '',
    }
  },
  methods: {
    async getPageInfo() {
      try {
        // const courseId = localStorage.getItem('courseId');
        const openId = localStorage.getItem('openId');
        const res = await getTeacherInfo({ teamId: 1, openId });
        const { openDate = '', teacherName = '', teacherWeixinUrl = '' } = res.data || {};
        // console.log(openDate, teacherName, teacherWeixinUrl);
        if (openDate == 'null' || !openDate) {
          this.courseOpenDate = '暂无';
        } else {
          const date = new Date(openDate);
          this.courseOpenDate = (date.getMonth() + 1) + '月' + date.getDay() + '日';
        }
        this.teacherName = teacherName;
        this.teacherWeixinUrl = teacherWeixinUrl;
      } catch (error) {
        console.log(error, '教师信息获取失败');
      }
    },
    operateTeacher(value) {
      if (value.slice(-2) == '老师') {
        return value;
      }
      return value + '老师';
    },
  }
}
</script>
<style lang="less" scoped>
.add-teacher {
  padding: 0 30px;
  background-color: #f1f5f7;
  .van-divider {
    border-color: #e2e2e2;
    margin: 0;
  }
  .main-title {
    font-family: PingFangSC-Regular;
    font-size: 38px;
    color: #333333;
    line-height: 1;
    text-align: center;
  }
  .card {
    background: #FFFFFF;
    box-shadow: 0 0 4px 0 rgba(7, 6, 6, 0.05);
    border-radius: 30px;
  }
  .qrCode {
    width: 690px;
    height: 660px;
    position: relative;
    .qrCode-title {
      width: 461px;
      height: 73px;
      background-image: url('~@/assets/images/H5_biaoti@3x.png');
      background-size: cover;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, -30px);
      text-align: center;
      .qrCode-title__content {
        font-family: PingFangSC-Regular;
        font-size: 38px;
        color: #FFFFFF;
        width: 371px;
        height: 62px;
        line-height: 62px;
        text-align: center;
        margin: 0 auto;
      }
    }
    .list {
      display: flex;
      justify-content: space-between;
      padding: 0 48px;
      .list-item {
        display: flex;
        align-items: center;
        .list-item__img {
          width: 36px;
          height: 36px;
          margin-right: 8px;
        }
        .list-item__text {
          font-family: PingFangSC-Regular;
          font-size: 26px;
          color: #333333;
          line-height: 32px;
        }
      }
    }
    .qrCode-module {
      text-align: center;
      .qrCode-module__img {
        width: 314px;
        height: 311px;
      }
    }
    .qrCode-prompt {
      text-align: center;
      .qrCode-prompt__text {
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #FF7300;
        line-height: 32px;
      }
    }
    .qrCode-desc {
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 26px;
      color: #9DA0A3;
      line-height: 32px;
    }
  }
  .title {
    display: flex;
    justify-content: center;
    .title-main {
      display: flex;
      align-items: center;
      .title-main__img {
        width: 27px;
        height: 16px;
      }
      .title-main__text {
        padding: 0 20px;
      }
    }
  }
  .class-info {
    width: 690px;
    height: 256px;
    background: #FFFFFF;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.05);
    border-radius: 30px;
    .class-info__main {
      height: 156px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .info-item {
        font-family: PingFangSC-Regular;
        color: #333333;
        padding-left: 23px;
        span {
          line-height: 1;
          font-size: 32px;
          &.mg-20 {
            margin-left: -20px;
          }
        }
      }
    }
  }
  .notice {
    width: 690px;
    height: 457px;
    background: #FFFFFF;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.05);
    border-radius: 30px;
    .notice-item {
      position: relative;
      padding-left: 91px;
      .notice-item__title {
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #333333;
        line-height: 32px;
      }
      .notice-item__desc {
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #9DA0A3;
        line-height: 32px;
      }
      .notice-item__img {
        width: 45px;
        height: 45px;
        position: absolute;
        top: -7px;
        left: 23px;
      }
    }
  }
}
</style>