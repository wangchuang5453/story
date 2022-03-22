<template>
  <div class="study">
    <div class="head" style="display:none">
        <div class="circle" @click="back">
         <img src="../../assets/study/moco_back.png" />
         <img src="../../assets/study/moco_learn_share_share.png" />
        </div>
    </div>
    <div class="content">
            <div class="moco-head-content">
                <img class="moco-head" src="../../assets/study/moco_learn_over.png" alt="">
                <img class='moco-star1' src="../../assets/study/moco_learn_star02.png" alt="">
                <img class='moco-star2' src="../../assets/study/moco_learn_star.png" alt="">
                <img class='moco-star3' src="../../assets/study/moco_learn_star.png" alt="">
                <img class='moco-star4' src="../../assets/study/moco_learn_star.png" alt="">
            </div>
            <div class="base-info margin-top">
                <div class="info">
                    <div class="user-info">
                        <img :src="studyBaseInfo.headImgUrl" alt="">
                        <div class="name">
                            <span class="name-txt">{{studyBaseInfo.nickName}}</span>
                            <span>{{studyBaseInfo.birthday|formatBirthday}}</span>
                        </div>
                    </div>
                    <div class="name right">
                        <span class="name-txt">{{studyBaseInfo.courseName}}</span>
                        <span>{{studyBaseInfo.courseSubName}}</span>
                    </div>
                </div>
                <div class="data">
                    <div class="single">
                        <span class="blue">{{studyBaseInfo.finishCourseAmount}}</span>
                        <span class="gray">累计上课次数</span>
                    </div>
                    <div class="line"></div>
                    <div class="single">
                        <span class="blue">{{studyBaseInfo.practiceCount}}</span>
                        <span class="gray">完成练习数</span>
                    </div>
                     <div class="line"></div>
                    <div class="single">
                        <span class="blue">{{studyBaseInfo.codeBlockCount}}</span>
                        <span class="gray">今日编码数</span>
                    </div>
                </div>
            </div>
            <div class="home-work">
                <div class="veticle-line possition-left"></div>
                <div class="veticle-line possition-right"></div>
                <div class="base-info">
                    <div class="title">
                        <img src="../../assets/study/moco_learn_stare.png" alt="">
                        <span>今日作业</span>
                        <img src="../../assets/study/moco_learn_stare.png" alt="">
                    </div>

                    <div class="swiper-content">
                        <img class="arrow" style="padding-right:5px" @click="preview" src="../../assets/study/moco_learn_left_icon.png" alt="">
                        <van-swipe  class="my-swipe" ref="swipe" :show-indicators='false'  :autoplay="3000">
                        <van-swipe-item  v-for="(image, index) in swperImages" :key="index">
                            <img v-lazy="image" />
                        </van-swipe-item>
                        </van-swipe>
                        <img class="arrow" style="padding-left:5px" @click="next" src="../../assets/study/moco_learn_right_icon.png" alt="">
                    </div>
                    <div class="enter">
                        <span class="blue fs21">查看学生作品</span>
                        <img src="../../assets/study/moco_learn_jiantou.png" alt="">
                    </div>

                     <div class="data" >
                        <div class="single">
                            <span class="blue">{{studyBaseInfo.homeWork.debugCount}}</span>
                            <span class="gray">调试次数</span>
                        </div>
                        <div class="single">
                            <span class="blue">{{studyBaseInfo.homeWork.codeBlockCount}}</span>
                            <span class="gray">使用代码数</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 今日所学 -->
            <div class="home-work">
                <div class="veticle-line possition-left"></div>
                <div class="veticle-line possition-right"></div>
                <div class="base-info">
                    <div class="title">
                        <img src="../../assets/study/moco_learn_stare.png" alt="">
                        <span>今日所学</span>
                        <img src="../../assets/study/moco_learn_stare.png" alt="">
                    </div>

                    <div v-for="(item,index) in courseDetail" :key="index">
                        <div class="lear-title">
                            <span>{{item.detailTitle}}</span>
                        </div>
                        <div class="lear-desc" v-if="item.detailDesc">
                                <span>{{item.detailDesc}}</span>
                            </div>
                        <div class="lear-desc">
                            <div v-for="(val,i) in item.codeBlock" :key="i" class="code-desc" :style="`${i==0?'margin-bottom:10px':''}`">
                                <img class="left-block-img" v-if="val.blockUrl" :src="val.blockUrl" alt="">
                                <span>{{val.blockDesc}}</span>
                            </div>
                            <!-- <div class="code-desc">
                                <img src="../../assets/study/moco_learn_shang.png" alt="">
                                <span>了解向前指令的含义，能够使用向前积木块控制角色向前移动。</span>
                            </div> -->
                        </div>
                    </div>

                </div>
            </div>

            <!-- 课堂发言 -->
            <div class="home-work">
                <div class="veticle-line possition-left"></div>
                <div class="veticle-line possition-right"></div>
                <div class="base-info">
                    <div class="title">
                        <img src="../../assets/study/moco_learn_stare.png" alt="">
                        <span>课堂发言</span>
                        <img src="../../assets/study/moco_learn_stare.png" alt="">
                    </div>
                      <div class="chat-part">
                        <div :class="`${item.type==1?'':'flex-end'} chat-item`" v-for="(item,index) in audioList" :key="index" @click="changeStatus(index)">
                            <img v-if="item.type==1" :src="item.head" alt="">
                            <div :class="`${item.type==1?'left-pop01':'right-pop01'} chat-pop`">
                                    <div v-if="item.type==1" :class="`${item.isPlay?'video-ani01':''} video-img video-img-left`"></div>
                                    <div v-else :class="`${item.isPlay?'video-ani02':''} video-img video-img-right`"></div>
                                    <span>{{item.duration|formatVideoTime}}”</span>
                            </div>
                            <img v-if="item.type==2" :src="item.head" alt="">
                            <audio :id="`audio${index}`"   @ended="audioEnd(index)" @pause="audioPause(index)">
                            <source :src="item.videoUrl"/>您的浏览器不支持音频播放
                            </audio>
                        </div>
                        <!-- <div class="chat-item" @click="changeStatus02" style="justify-content: flex-end">
                            <img src="../../assets/study/moco_girl.png" alt="">
                            <div class="chat-pop right-pop01">
                                <div :class="`${isPlay02?'video-ani02':''} video-img video-img-right`"></div>
                                <span>6”</span>
                            </div>
                            <audio id="audio02">
                            <source :src="music"/>您的浏览器不支持音频播放
                            </audio>
                        </div>

                         <div class="chat-item" style="justify-content: flex-end">
                           <div class="chat-pop right-pop01">
                                <div class="video-img video-img-right"></div>
                                <span>6”</span>
                            </div>
                            <img src="../../assets/study/moco_girl.png" alt="">
                        </div>

                        <div class="chat-item">
                            <img src="../../assets/study/moco_moco.png" alt="">
                            <div class="chat-pop left-pop01">
                                    <div class="video-img video-img-left"></div>
                                    <span>6”</span>
                            </div>
                        </div> -->
                        <div class="cloud left-cloud"></div>
                        <div class="cloud right-cloud"></div>
                    </div>
                </div>
            </div>

            <!-- 编程挑战 -->
            <div class="home-work">
                <div class="veticle-line possition-left"></div>
                <div class="veticle-line possition-right"></div>
                <div class="base-info">
                    <div class="title">
                        <img src="../../assets/study/moco_learn_stare.png" alt="">
                        <span>编程挑战</span>
                        <img src="../../assets/study/moco_learn_stare.png" alt="">
                    </div>
                    <div class="lear-desc">
                            <span>{{challenge.detailDesc}}</span>
                        <div class="code-desc" style="justify-content: space-between;padding:0 35px">
                            <img class="code-img01" v-for="(val,index) in challenge.codeBlock" :key="index" :src="val.blockUrl" alt="">
                            <!-- <img class="code-img" src="../../assets/study/moco_learn_yunxing02.png" alt=""> -->
                        </div>

                    </div>
                </div>
            </div>

            <div class="botton-img">
                <img class="dog" src="../../assets/study/moco_learn_dog.png" alt="">
                <img class='star1' src="../../assets/study/moco_learn_star.png" alt="">
                <img class='star2' src="../../assets/study/moco_learn_star.png" alt="">
                <div class="share">
                     <div class="share-txt">
                         <p>快去分享</p>
                         <p>宝贝的作品吧～</p>
                    </div>
                    <div class="share-btn">
                        <span>分享</span>
                    </div>
                </div>
                <img class="shadow" src="../../assets/study/moco_learn_touying.png" alt="">
            </div>
    </div>
  </div>
</template>

<script>
const url0 = require('../../assets/study/moco_bg_bg01.png')
const teacherHeadUrl = require('../../assets/study/moco_moco.png')
const studentHeadUrl = require('../../assets/study/moco_girl.png')
import { formatSecond } from '../../utils/index'
import { getStudyReports } from '@/api/user.js'
export default {
  data() {
    return {
      isPlay: false,
      isPlay02: false,
      swperImages: [url0],
      music: [
        {
          videoUrl: 'https://outin-b4e152f3a41b11ebbe1400163e1c35d5.oss-cn-shanghai.aliyuncs.com/customerTrans/c9fa44d65971f55f26db4f6f251bf9fb/1be61cad-179adb1c528-0004-86b1-d00-06422.m4a',
          type: 1,
          isPlay: false,
          head: teacherHeadUrl,
          duration: 5
        },
        {
          videoUrl: 'https://outin-b4e152f3a41b11ebbe1400163e1c35d5.oss-cn-shanghai.aliyuncs.com/customerTrans/c9fa44d65971f55f26db4f6f251bf9fb/4ae2c173-179adbb225f-0004-86b1-d00-06422.m4a',
          type: 2,
          isPlay: false,
          head: studentHeadUrl,
          duration: 2
        },
        {
          videoUrl: 'https://outin-b4e152f3a41b11ebbe1400163e1c35d5.oss-cn-shanghai.aliyuncs.com/customerTrans/c9fa44d65971f55f26db4f6f251bf9fb/3a6b6d17-179adb1c530-0004-86b1-d00-06422.m4a',
          type: 1,
          isPlay: false,
          head: teacherHeadUrl,
          duration: 11
        },
        {
          videoUrl: 'https://outin-b4e152f3a41b11ebbe1400163e1c35d5.oss-cn-shanghai.aliyuncs.com/customerTrans/c9fa44d65971f55f26db4f6f251bf9fb/22348a62-179adbb2271-0004-86b1-d00-06422.m4a',
          type: 2,
          isPlay: false,
          head: studentHeadUrl,
          duration: 4
        },
        {
          videoUrl: 'https://outin-b4e152f3a41b11ebbe1400163e1c35d5.oss-cn-shanghai.aliyuncs.com/customerTrans/c9fa44d65971f55f26db4f6f251bf9fb/307c56b2-179adb1c548-0004-86b1-d00-06422.m4a',
          type: 1,
          isPlay: false,
          head: teacherHeadUrl,
          duration: 11
        },
        {
          videoUrl: 'https://outin-b4e152f3a41b11ebbe1400163e1c35d5.oss-cn-shanghai.aliyuncs.com/customerTrans/c9fa44d65971f55f26db4f6f251bf9fb/1a50bb3a-179adbb2283-0004-86b1-d00-06422.m4a',
          type: 2,
          isPlay: false,
          head: studentHeadUrl,
          duration: 3
        }
      ],
      studyBaseInfo: {
        homeWork: {},
        courseDetail: {
          codeBlock: []
        }
      },
      studyHomework: {},
      challenge: {}, // 编程挑战
      courseDetail: [], // 今日所学
      audioList: []
    }
  },
  mounted() {
    const { courseId, mobile } = this.$route.query
    getStudyReports({
      courseId: courseId,
      mobile: mobile
    }).then((res) => {
      const {
        headImgUrl, // 学生头像
        birthday,
        teacherHeadImgUrl, // 老师头像
        nickName, // 学生昵称
        codeBlockCount, // 今日编码数
        finishCourseAmount, // 累计上课次数
        practiceCount, // 完成练习数
        courseName, // 课程名称
        courseSubName, // 课程小节
        homeWork // 今日作业
      } = res.data
      this.studyBaseInfo = {
        headImgUrl,
        teacherHeadImgUrl,
        birthday,
        nickName,
        codeBlockCount,
        finishCourseAmount,
        practiceCount,
        courseName,
        courseSubName,
        homeWork
      }

      this.swperImages = this.studyBaseInfo.homeWork.snapshotUrl

      const courseDetailData = res.data.courseDetail// 今日所学
      const courseDetail = []
      let challenge
      courseDetailData.forEach(item => {
        if (item.detailCode === 'challenge') {
          challenge = item
        } else {
          courseDetail.push(item)
        }
      })
      this.courseDetail = courseDetail
      this.challenge = challenge

      const audioData = res.data.speech// 课堂发言
      const audioList = []
      audioData.forEach((item, index) => {
        let audioItem = {}
        if (item.teacherMoco) {
          item.teacherMoco.forEach(val => {
            if (val.urlType === 1) {
              audioItem = {
                videoUrl: val.teacherVideo,
                type: 1,
                head: teacherHeadUrl,
                duration: val.duration,
                isPlay: false
              }
              audioList.push(audioItem)
            }
          })
        }
        if (item.userMoco) {
          item.userMoco.forEach(val => {
            if (val.urlType === 1) {
              audioItem = {
                videoUrl: val.answerVideo,
                type: 2,
                head: headImgUrl,
                duration: val.duration,
                isPlay: false
              }
              audioList.push(audioItem)
            }
          })
        }
      })
      this.audioList = audioList

      this.audioList.forEach((val, index) => {
        const id = `audio${index}`
        const audio = document.getElementById(id)
        console.log('-0-00-', val)

        audio.oncanplay = function() {
          console.log('-0-oncanplay0')
          val.duration = formatSecond(audio.duration)
        }
      //   console.log('-0-00-', formatSecond(audio.duration))
      //   val.duration = formatSecond(audio.duration)
      })
    }).catch(() => {
    })
  },
  methods: {
    changeStatus(index) {
      const id = `audio${index}`
      const audio0 = document.getElementById(id)
      if (!this.audioList[index].isPlay) {
        audio0.play()
        this.audioList[index].isPlay = true
        this.audioList.forEach((val, i) => {
          if (val.isPlay && i !== index) {
            const id = `audio${i}`
            const audio = document.getElementById(id)
            audio.pause()
            val.isPlay = false
          }
        })
      } else {
        audio0.pause()
        this.audioList[index].isPlay = false
      }
    },
    audioEnd(index) {
      this.audioList[index].isPlay = false
    },
    audioPause(index) {
      this.audioList[index].isPlay = false
    },
    preview() {
      this.$refs.swipe.prev()
    },
    next() {
      this.$refs.swipe.next()
    },
    back() {
      console.log('nativeNavigationBack')
      //   window.flutter_inappwebview && window.flutter_inappwebview.nativeNavigationBack()
      window.flutter_inappwebview.callHandler('nativeNavigationBack')
    }
  },

  filters: {
    formatBirthday(totalTime) {
      if (!totalTime) {
        return ''
      }
      const now = new Date().getTime()
      const time2 = now - totalTime
      const date = new Date(time2)
      const year = date.getFullYear() - 1970
      const months = date.getMonth()
      const age = year + '岁' + months + '个月'
      return age
    },
    formatVideoTime(time) {
      if (time) {
        return parseInt(time)
      } else {
        return 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.blue{
    color: #44BAFF;
    font-size: 47px;
    font-weight: bold;
}
.gray{
    color: #979797;
    font-size: 23px;
}
.fs21{
    font-size: 26px;
}
.flex-end{
    justify-content: flex-end;
}
.study {
  display: flex;
  flex-direction: column;
  background-size: 100% 100%;
  font-family: 'TrueType';
  background: #b3e2ff;
  background-image: url('../../assets/study/moco_bg_pic.png');
                width: 750px;
                position: absolute;
                background-size: 100%;
                background-repeat: repeat;
  .head {
    display: flex;
    // position: fixed;
    top: 0;
    height: 132px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background: transparent;
    .circle {
        width: 100%;
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
    }
    img{
      height: 80px;
      width: 80px;
    }
  }
  .content {
    margin-top: 90px;
    // margin-top: -40px;
    display: flex;
    flex-direction: column;
    align-items: center;
        .margin-top{
            margin-top: -64px;
        }
        .moco-head-content{
             z-index: 10;
             position: relative;
            .moco-head{
                width: 394px;
                height: 229px;
            }
            .moco-star1{
                width: 12px;
                height: 12px;
                left: 185px;
                top: 25px;
                position: absolute;
                animation:star  3s ease-in infinite;
            }
            .moco-star2{
                width: 14px;
                height: 14px;
                left: 198px;
                top: 15px;
                position: absolute;
                animation:star  3s ease-in infinite;
            }
             .moco-star3{
                width: 16px;
                height: 16px;
                left: 128px;
                top: 85px;
                position: absolute;
                opacity: 0.2;
                animation:star  5s ease-in infinite;
            }
             .moco-star4{
                width: 11px;
                height: 11px;
                left: 258px;
                top: 65px;
                position: absolute;
                animation:star  2s ease-in infinite;
            }
        }
        .base-info{
            background: #FFFFFF;
            border: 10px solid rgba(64,184,255,0.60);
            border-radius: 60px;
            width: 600px;padding-bottom: 35px;
            .info{
                margin: 70px 38px 58px;
                display: flex;
                height: 80px;
                justify-content: space-between;
                .user-info{
                    display: flex;
                    align-items: center;
                    img{
                        height: 70px;
                        width: 70px;
                        border-radius: 50%;
                    }
                }
                .name{
                        display: flex;
                        flex-direction: column;
                        font-size: 23px;
                        color: #979797;
                        justify-content: space-between;
                        margin-left: 10px;
                        height: 100%;
                        .name-txt{
                            font-size: 32px;
                            font-weight: bold;
                            color: #3E4967;
                            font-family: "TrueType";
                        }
                }
                .right{
                    align-items: flex-end;
                }
            }
            .data{
                display: flex;
                 margin: 40px 48px 25px;
                 justify-content: space-between;
                .single{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    :last-child{
                        margin-top: 10px;
                    }
                }
                .line{
                    height: 55px;
                    width: 1px;
                    background: #E5E5E5;
                }
            }
        }
        .home-work{
            position: relative;
            margin-top: 20px;
            .title{
                display: flex;
                align-items: center;
                font-size: 37px;
                color: #3E4967;
                justify-content: center;
                margin-top: 30px;
                span{
                    margin: 0 15px;
                }
                img{
                    height: 26px;
                    width: 26px;
                }
            }
        }
        .veticle-line{
            width: 17px;
            height: 75px;
            position: absolute;
            background: #EEF7FE;
            box-shadow: inset -10px 0 0 0 #A8DDFD;
            border-radius: 33px;
            border-radius: 16.5px;
            top: -48px;
        }
        .possition-left{
             left: 82px;
        }
        .possition-right{
             right: 82px;
        }
        .swiper-content{
            display: flex;
            align-items: center;
            margin-top: 37px;
            padding: 0 10px;
            .arrow{
                height: 55px;
                width: 55px;
            }
        }
        .enter{
            display: flex;
            justify-content: flex-end;
            margin: 5px 79px 0 0;
            align-items: center;
            img{
                margin-left: 10px;
                height: 14px;
                width: 9px;
            }
        }

        .lear-title{
            height: 65px;
            margin: 30px 30px 15px;
            background: rgba(217,236,250,0.58);
            border-radius: 15px;
            display: flex;
            align-items: center;
            span{
                font-size: 29px;
                color: #3E4967;
                margin-left: 30px;
            }
        }
        .lear-desc{
            font-family: 'HYZhengYuan-EEJ';
            font-size: 24px;
            color: #3E4967;
            padding: 10px 60px 0;
            word-break: break-all;
            word-wrap: break-word;
            .code-desc{
                display: flex;
                align-items: center;
                .left-block-img{
                    height: 53px;
                    width: 68px;
                }
                span{
                    margin-left: 10px;
                }
                .code-img01{
                    width: 73px;
                    height: auto;
                    margin-top: 20px;
                }
                .code-img{
                    width: 73px;
                    height: 184px;
                    margin-top: 20px;
                }
            }
        }

        .botton-img{
            height: 257px;
            width: 750px;
            background-image: url('../../assets/study/moco_learn_pic.png');
            background-position:  bottom;
            background-size: 750px 257px;
            background-repeat: no-repeat;
            position: relative;
            .dog{
                height: 142px;
                width: 128px;
                position: absolute;
                right: 60px;
                bottom: 30px;
            }
            .star1{
                width: 22px;
                height: 22px;
                position: absolute;
                top: 109px;
                left: 48px;
                animation:star  2s ease-in infinite;
            }
            .star2{
                width: 18px;
                height: 18px;
                right: 55px;
                top: 120px;
                position: absolute;
                animation:star  3s ease-in infinite;
            }
            @keyframes star {
            10% {
                opacity: 0;
            }

            90% {
                opacity: 1;
            }
}
        }

        .chat-part{
            background-color: #b3e2ff;
            min-height: 200px;
            border-radius: 25px;
            margin: 30px 30px 0;
            padding: 30px 25px;
            position: relative;
            background-image: url('../../assets/study/moco_bg_pic.png');
            background-size: 100%;
            .chat-item{
                display: flex;
                align-items: flex-end;
                margin-bottom: 30px;
                img{
                    height: 79px;
                    width: 79px;
                    border-radius: 50%;
                    border: 4px solid white;
                }
                .chat-pop{
                     background-position:  bottom;
                      background-repeat: no-repeat;
                      background-size: 100%;
                      margin-bottom: 5px;
                      margin-left: 5px;
                      font-size: 32px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      color: white;
                      position: relative;

                }
                .left-pop01{
                    background-image: url('../../assets/study/moco_learn_talk01.png');
                     width: 200px;
                     height: 63px;
                }
                .right-pop01{
                    background-image: url('../../assets/study/moco_learn_talk04.png');
                     width: 200px;
                     height: 68px;
                     span{
                          color: #44BAFF;
                        font-size: 32px;
                     }
                }
                .video-img{
                     width: 24px;
                     height: 34px;
                     background-size: 100%;
                     position: absolute;
                    background-repeat: no-repeat;
                }
                .video-img-left{
                    background-image: url('../../assets/study/moco_bofang02.png');
                     background-position:  left ;
                     left: 30px;
                }
                .video-img-right{
                    background-image: url('../../assets/study/moco_bofang05.png');
                     background-position:  right ;
                     right: 30px;
                }
                .video-ani01{
                    animation: change01 1s infinite;
                }
                .video-ani02{
                    animation: change02 1s infinite;
                }
                @keyframes change01 {
                    0%{
                        background-image: url('../../assets/study/moco_bofang01.png');
                    }
                    50%{
                        background-image: url('../../assets/study/moco_bofang09.png');
                    }
                    100%{
                        background-image: url('../../assets/study/moco_bofang02.png');
                    }
                }
                @keyframes change02 {
                    0%{
                        background-image: url('../../assets/study/moco_bofang06.png');
                    }
                    50%{
                        background-image: url('../../assets/study/moco_bofang10.png');
                    }
                    100%{
                        background-image: url('../../assets/study/moco_bofang05.png');
                    }
                }
            }
            .cloud{
                position: absolute;
                background-size: 100% 100%;
            }
            .left-cloud{
                background-image: url('../../assets/study/moco_learn_yun01.png');
                left: 0;
                bottom: 0;
                 height: 88px;
                width: 160px;
            }
            .right-cloud{
                 background-image: url('../../assets/study/moco_learn_yun02.png');
                right: 0;
                bottom: 0;
                height: 102px;
                width: 168px;
            }
        }

        .share{
            background-image: url('../../assets/study/moco_learn_share_pic.png');
            width: 436px;
            height: 113px;
            background-size: 100%;
            position: absolute;
            background-repeat: no-repeat;
            bottom: 50px;
            left: 130px;
            z-index: 10;
            &-txt{
                font-size: 34px;
                color: #FFFFFF;
                margin-top: 16px;
                margin-left: 39px;
                text-shadow: 0 5px 5px #B85416;
            }
            &-btn{
                background-image: url('../../assets/study/moco_learn_share_icon.png');
                width: 130px;
                height: 85px;
                position: absolute;
                background-size: 100%;
                background-repeat: no-repeat;
                right: 23px;
                 font-size: 34px;
                color: #FFFFFF;
                text-shadow: 0 5px 5px #3E4967;
                top: 14px;
                display: flex;
                justify-content: center;
                align-items: center;
                span{
                    margin-bottom: 3px;
                    text-shadow: 0 5px 5px #357f00;
                }
            }
        }
            .shadow{
                width: 402px;
                height: 21px;
                position: absolute;
                 bottom: 37px;
            left: 148px;
            }
  }
}
</style>
<style lang="scss">
.my-swipe{
    border-radius: 15px;
    flex: 1;
    // width: 100%;
    img{
        border-radius: 15px;
        width: 100%;
        height: 290px;
        object-fit: cover;
    }
}

</style>
