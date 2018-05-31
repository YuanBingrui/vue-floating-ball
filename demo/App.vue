<template>
  <div id="app">
    <img src="./logo.png">
    <h2>悬浮球(floating ball)功能键组（网页版）</h2>
    <div class="parameter-box">
      <div class="col-box">
        <div class="col-label"><strong>主题色</strong></div>
        <el-color-picker
          v-model="themeColor"></el-color-picker>
      </div>
      <div class="col-box">
        <div class="col-label"><strong>初始位置</strong></div>
        <el-select
          v-model="initPositionList.initPosition"
          placeholder="请选择初始位置">
          <el-option
            v-for="(item, index) in initPositionList.options"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="col-box">
        <div class="col-label"><strong>事件数</strong></div>
        <el-select
          v-model="popoverEventNum.currentValue"
          placeholder="请选择事件数"
          @change="changePopoverEvents">
          <el-option
            v-for="(item, index) in popoverEventNum.options"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <el-dialog
        title="popover事件"
        :visible.sync="dialogVisible"
        width="30%">
        <span>{{ dialogMessage }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <floating-ball
      :theme-color="themeColor"
      :init-position="initPositionList.initPosition"
      :popover-events="popoverEvents">
    </floating-ball>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      themeColor: '#595857',
      initPositionList: {
        initPosition: '',
        options: [
          { label: '上左', value: 'top left' },
          { label: '上中', value: 'top 50' },
          { label: '上右', value: 'top right' },
          { label: '中左', value: '50 left' },
          { label: '中中', value: '50 50' },
          { label: '中右', value: '50 right' },
          { label: '下左', value: 'bottom left' },
          { label: '下中', value: 'bottom 50' },
          { label: '下右', value: 'bottom right' },
          { label: '随意', value: '77 77' }
        ]
      },
      popoverEventNum: {
        currentValue: 0,
        options: [1, 2, 3, 4, 5, 6, 7, 8]
      },
      popoverEvents: [{ parentName: 'App', eventName: 'show-data-airplane', iconName: 'ion ion-ios-airplane', showName: 'airplane' },
        { parentName: 'App', eventName: 'show-data-football', iconName: 'ion ion-ios-american-football', showName: 'football' },
        { parentName: 'App', eventName: 'show-data-appstore', iconName: 'ion ion-ios-appstore', showName: 'appstore' },
        { parentName: 'App', eventName: 'show-data-github', iconName: 'ion ion-logo-github', showName: 'github' },
        { parentName: 'App', eventName: 'show-data-css3', iconName: 'ion ion-logo-css3', showName: 'css3' },
        { parentName: 'App', eventName: 'show-data-html5', iconName: 'ion ion-logo-html5', showName: 'html5' }],
      allPopoverEvents: [
        { parentName: 'App', eventName: 'show-data-add', iconName: 'ion ion-ios-add', showName: 'add' },
        { parentName: 'App', eventName: 'show-data-heart', iconName: 'icon ion-ios-heart', showName: 'heart' },
        { parentName: 'App', eventName: 'show-data-airplane', iconName: 'ion ion-ios-airplane', showName: 'airplane' },
        { parentName: 'App', eventName: 'show-data-football', iconName: 'ion ion-ios-american-football', showName: 'football' },
        { parentName: 'App', eventName: 'show-data-appstore', iconName: 'ion ion-ios-appstore', showName: 'appstore' },
        { parentName: 'App', eventName: 'show-data-github', iconName: 'ion ion-logo-github', showName: 'github' },
        { parentName: 'App', eventName: 'show-data-css3', iconName: 'ion ion-logo-css3', showName: 'css3' },
        { parentName: 'App', eventName: 'show-data-html5', iconName: 'ion ion-logo-html5', showName: 'html5' }],
        dialogMessage: '',
        dialogVisible: false
    }
  },
  created () {
    this.$on('show-data-add', this.ShowDataAdd)
    this.$on('show-data-heart', this.ShowDataHeart)
    this.$on('show-data-airplane', this.ShowDataAirplane)
    this.$on('show-data-football', this.ShowDataFootball)
    this.$on('show-data-appstore', this.ShowDataAppstore)
    this.$on('show-data-github', this.ShowDataGithub)
    this.$on('show-data-css3', this.ShowDataCss3)
    this.$on('show-data-html5', this.ShowDataHtml5)
  },
  methods: {
    ShowDataAdd () {
      this.dialogVisible = true
      this.dialogMessage = '点击了Add图标'
    },
    ShowDataHeart () {
      this.dialogVisible = true
      this.dialogMessage = '点击了Heart图标'
    },
    ShowDataAirplane () {
      this.dialogVisible = true
      this.dialogMessage = '点击了Airplane图标'
    },
    ShowDataFootball () {
      this.dialogVisible = true
      this.dialogMessage = '点击了Football图标'
    },
    ShowDataAppstore () {
      this.dialogVisible = true
      this.dialogMessage = '点击了Appstore图标'
    },
    ShowDataGithub () {
      this.dialogVisible = true
      this.dialogMessage = '点击了Github图标'
    },
    ShowDataCss3 () {
      this.dialogVisible = true
      this.dialogMessage = '点击了Css3图标'
    },
    ShowDataHtml5 () {
      this.dialogVisible = true
      this.dialogMessage = '点击了Html5图标'
    },
    changePopoverEvents() {
      this.popoverEvents = []
      this.allPopoverEvents.some((currentValue, index) => {
        this.popoverEvents.push(currentValue)
        return index === this.popoverEventNum.currentValue -1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  .parameter-box {
    display: flex;
    justify-content: center;
    .col-box {
      display: flex;
      flex-direction: column;
      align-content: space-around;
      margin: 0 20px;
      .col-label {
        margin: 10px 0;
        text-align: left;
      }
    }
  }
}
</style>
