<template>
  <section class="sample-item">
    <h1 class="instrument-title">
      <i></i>
      <span>{{String.fromCharCode((parseInt(keyWord,10)-1)+65)}}组样品</span>
    </h1>
    <section class="sample-form-module" :key="item.id" v-for="(item,index) in config[keyWord+'']" :class="{'sample-form-input':parseInt(item.controlType,10)===3,'sample-form-check':parseInt(item.controlType,10)===2,'sample-form-radio':parseInt(item.controlType,10)===1,'sample-form-text':parseInt(item.controlType,10)===4}">
      <section class="form-panel">
          <span class="label">
            <i v-if="(parseInt(item.isMust,10)===0)">*</i>
            {{item.title}}：
          </span>
          <span class="wrap" v-if="parseInt(item.controlType,10)===3">
            <input type="text" :placeholder="'请输入'+item.title" disabled :value="item.resultTxt">
          </span>
          <span class="wrap" v-if="parseInt(item.controlType,10)===4">
          <textarea name=""   cols="30" rows="10" :placeholder="'请输入'+item.title" disabled :value="item.resultTxt"></textarea>
          </span>
          <span class="wrap" v-if="parseInt(item.controlType,10)===1||parseInt(item.controlType,10)===2">
          <span class="radio-item" v-for="(radioItem,radioIndex) in item.choiceContent.split(',')" :key="index+'-'+radioIndex">
            <i></i>
            <em v-text="radioItem"></em>
          </span>
              <span class="choice-result">【选择结果】:{{item.resultTxt}}</span>
        </span>
          <span class="require" v-if="(parseInt(item.isMust,10)===0)">必填</span>
          <span class="sample-delete" @click="deleteSample(item.id)">
              <i></i>
              删除
            </span>
      </section>
      <section class="tips" v-if="item.tipsContent">
        <i>!</i>
        <em v-text="item.tipsContent"></em>
      </section>
    </section>
    <section class="sample-form-module sample-form-add">
        <section class="addHandle addHandleBack" @click="returnBack">
            <span>返回</span>
        </section>
      </section>
  </section>
</template>
<script>
import { checkInvalid } from '../../../../utils/common'
import { testNum } from '../../../../utils/regularTest'
export default {
  name: 'sampleItem',
  props: {
    config: {
      default () {
        return {}
      },
      type: Object
    },
    keyWord: {
      default () {
        return 0
      },
      type: Number
    }
  },
  data () {
    const _this = this
    const adminId = localStorage.getItem('adminId')
    const id = _this.$route.query.id
    return {
      list: [],
      updateUser: adminId,
      id: id,
      editVisible: false,
      dynamicForm: {},
      form: {
        title: '',
        controlType: '',
        isMust: '',
        choiceNum: '',
        tipsContent: '',
        choiceContent: ''
      },
      originalForm: {
        title: '',
        controlType: '',
        isMust: '',
        choiceNum: '',
        tipsContent: '',
        choiceContent: ''
      }
    }
  },
  computed: {
    choiceContent () {
      const _this = this
      let str = ''
      let num = 0
      for (const key in _this.dynamicForm) {
        if (num === 0) {
          str += _this.dynamicForm[key]
        } else {
          str += ',' + _this.dynamicForm[key]
        }
        num++
      }
      return str
    },
    choiceContentOnOff () {
      const _this = this
      let num = 0
      for (const key in _this.dynamicForm) {
        if (!checkInvalid(_this.dynamicForm[key])) {
          num++
        }
      }
      return parseInt(_this.form.choiceNum, 10) === num
    }
  },
  watch: {
    dynamicForm: {
      handler (n) {
        console.log(n)
      },
      deep: true
    },
    editVisible (n) {
      const _this = this
      if (!n) {
        _this.form = _this.originalForm
      }
    },
    'form.choiceNum' (n) {
      const _this = this
      if (!checkInvalid(n)) {
        if (!testNum(n)) {
          _this.$alert('【选项个数】必须是阿拉伯数字', {
            confirmButtonText: '知道了'
          })
            .then(() => {
              _this.form.choiceNum = ''
            })
            .catch(action => {

            })
        } else {
          const json = {}
          for (let num = 0; num < n; num++) {
            const keyName = 'input' + num
            json[keyName] = ''
          }
          _this.dynamicForm = json
        }
      }
    }
  },
  /* mounted () {
    const _this = this
    _this.getList()
  }, */
  methods: {
    editClose () {
      const _this = this
      _this.editVisible = false
    },
    returnBack () {
      const _this = this
      _this.$router.push({ path: '/012' })
    }
  }
}
</script>
<style lang="scss" scoped>
  .sample-item{
    width: 826px;
      margin: 0 auto;
    position: relative;
    .instrument-title{
      height:25px;
      font-size:18px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(99,99,99,1);
      line-height:25px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
        margin-bottom: 20px;
      i{
        width:5px;
        height:23px;
        background:rgba(64,169,255,1);
        border-radius:3px;
        margin-right: 6px;
      }
        em{
            font-weight: 400;
            font-size: 14px;
        }
    }
    .sample-delete{
        display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      font-size:18px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(199,199,199,1);
      line-height:25px;
        margin-left: 10px;
        cursor: pointer;
        visibility: hidden;
      i{
        width:21px;
        height:21px;
        margin-right: 7px;
        background: url("../../../../static/images/delete.png") no-repeat center center/cover;
      }
    }
    .sample-form-module{
        margin-bottom: 48px;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 83px;
        border:1px dashed rgba(0,0,0,0);
      .form-panel{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        .label{
          margin-right: 5px;
          width:126px;
          height:25px;
          font-size:18px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(99,99,99,1);
          line-height:25px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;
          i{
            font-size:18px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:#F5A623;
            line-height: 25px;
          }
        }

      }
      .require{
        width:36px;
        height:25px;
        font-size:18px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(64,169,255,1);
        line-height:25px;
        margin-left: 11px;
      }
      .tips{
        width:450px;
        height:auto;
        font-size:16px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(204,204,204,1);
        line-height:22px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 14px;
        padding-left: 126px;
        i,em{
          font-style: normal;
        }
        i{
          width:15px;
          height:15px;
          border-radius: 50%;
          border: 1px solid #ccc;
          text-align: center;
          font-size:12px;
          line-height: 15px;
          margin-right: 10px;
        }
          em{
              width: 420px;
          }
      }
        &.nothing{
            cursor: unset;
            height: 300px;
            line-height: 300px;
            text-align: center;
            font-size: 30px;
        }
      &.sample-form-input{
        .form-panel{
          .wrap{
            width:370px;
            height:40px;
            background:rgba(250,250,250,1);
            border-radius:6px;
            padding-left: 13px;
            input{
              outline: none;
              border: none;
              background: none;
              font-size:18px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              height: 100%;
              width: 100%;
              color:#4D4D4D;
              line-height:40px;
              &:disabled,&::placeholder{
                color:rgba(179,179,179,1);
                font-size:18px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                height: 100%;
                width: 100%;
                line-height:40px;
              }
            }
          }
        }
      }
      &.sample-form-text{
        .form-panel{
          .wrap{
            width:357px;
            height:121px;
            background:rgba(250,250,250,1);
            border-radius:6px;
            padding: 8px 13px;
            textarea{
                cursor: move;
              resize: none;
              outline: none;
              border: none;
              background: none;
              font-size:18px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              height: 100%;
              width: 100%;
              color:#4D4D4D;
              line-height:40px;
                &:disabled,&::placeholder{
                color:rgba(179,179,179,1);
                font-size:18px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                height: 100%;
                width: 100%;
                line-height:40px;
              }
            }
          }
        }
      }
      &.sample-form-check,&.sample-form-radio{
        .wrap{
          width:383px;
          height: auto;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .radio-item{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            height: 22px;
            margin-bottom: 10px;
            margin-right: 20px;
            i{
              width:12px;
              height:12px;
              border:1px solid rgba(220,220,220,1);
              border-radius: 50%;
              margin-right: 10px;
            }
            em{
              font-style: normal;
              font-size:16px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(77,77,77,1);
              line-height:22px;
            }
          }
            .choice-result{
                display: block;
                width: 380px;
                font-size: 18px;
                font-family: PingFangSC-Regular,PingFang SC;
                font-weight: 400;
                color: #923733;
                line-height: 22px;
                margin: 10px;
            }
          .check-item{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            height: 22px;
            margin-bottom: 10px;
            margin-right: 20px;
            i{
              width:12px;
              height:12px;
              border:1px solid rgba(220,220,220,1);
              margin-right: 10px;
            }
            em{
              font-style: normal;
              font-size:16px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(77,77,77,1);
              line-height:22px;
            }
          }
        }
      }
        &.sample-form-check {
            .wrap {
                .radio-item {
                    i {
                        border-radius: unset;
                    }
                }
            }
        }
      &.sample-form-add{
          display: none;
          .addHandle{
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              height: 56px;
              width: 300px;
              background:rgba(64,169,255,1);
              border-radius:4px;
              color: #fff;
              font-size: 14px;
              cursor: pointer ;
          }
          .addHandleBack{
              display: none;
              width: 160px;
              background:rgba(203,203,203,1);
              border-radius:4px;
              margin-left: 10px;
              font-size:14px;
              font-family:PingFang-SC-Bold,PingFang-SC;
              font-weight:bold;
              color:rgba(255,255,255,1);
              text-align: center;

          }
        .addIcon{
            width: 46px;
            height: 46px;
            margin-right: 10px;
            text-align: center;
            line-height: 46px;
            font-size: 30px;
        }
     }
    }
      &:nth-last-of-type(1){
          .sample-form-add{
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              height: 60px;
              cursor: unset;
              border: none;
              line-height: 60px;
              .addHandleBack{
                  display: block !important;
              }
          }

      }

  }
</style>
<style lang="scss">
    .sample-item{
        .adminInputEl{
            width:300px;
            margin-right: 10px;
            margin-bottom: 5px;
        }
    }
</style>
