//index.js
//获取应用实例
const app = getApp()
var timer ;

Page({
  data: {
    showRwold: "一代色 wang 是你吗！",        //级别
    imgsrc:"../image/bg.png",
    showhome:false,        //显示游戏页面还是结果页面
    leave: 1,             //关
    counter  : 0,         //答题数量
    questionWord : '',
    questionColor: '',
    answerResule : '',     //答题比对
    texts: ['红', '橙', '黄', '绿', '青', '蓝', '紫'] ,
    color: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple'],
    time : 30,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  initStart(){
    let that = this
    that.setData({
      showhome: true,        //显示游戏页面还是结果页面
      leave: 1,             //关
      counter: 0,         //答题数量
      time: 30,
    })
    timer = setInterval(function () {
      that.restTime()
    }, 1000);
    that.randomQuestion();
    
  },
  restTime : function (){
    let that = this
    that.data.time--
    let _showleave = '一代色 wang 是你吗！'
    if (that.data.time <= 0) {
      if (that.data.counter < 10 ){
        _showleave = "太谦虚了吧，色 mang 啊！"
      } else if (10 <= that.data.counter && that.data.counter <= 30){
        _showleave = "医生说：多看美女有益视力！"
      }else{
        _showleave = "你就是色中之王！"
      }
      that.setData({
        time: 0,
        showRwold: _showleave,
        showhome : false
      })
      //关闭定时
      clearInterval(timer);
    }else{
      that.setData({
        time: that.data.time
      })
    }
  },
  // 随机函数
  randomNum: function (m, n) {
    return Math.floor(Math.random() * (n - m + 1) + m);
  },
  randomArr: function (arr){
    //遍历数组
    for(var i= 0;i<arr.length;i++) {
      //随机出一个下标值
      var ranNum = this.randomNum(0, arr.length - 1);
      //如果随机出的位置下标与 i 不相等
      if (ranNum != i) {
        //交换下标对应元素的位置
        var temp = 0;
        temp = arr[i];
        arr[i] = arr[ranNum];
        arr[ranNum] = temp;
      }
    }
    return arr
	},
  randomA: function () {
    let _textschange = this.randomArr(this.data.texts);
    let _colorchange =  this.randomArr(this.data.color);
    this.setData({
      texts: _textschange,
      color: _colorchange
    })
  },
  //随机问题
  randomQuestion: function  (){
    //随机文字，颜色
    let _answerResule = '';
    let _questionword = this.data.texts[this.randomNum(0, this.data.texts.length - 1)];
    let _questioncolor = this.data.color[this.randomNum(0, this.data.texts.length - 1)];
    if (_questioncolor == 'red') {
      _answerResule = "红";
    } else if (_questioncolor == "orange") {
      _answerResule = "橙";
    }else if (_questioncolor == "yellow") {
      _answerResule = "黄";
    } else if (_questioncolor == "green") {
      _answerResule = "绿";
    } else if (_questioncolor == "cyan") {
      _answerResule = "青";
    } else if (_questioncolor == "blue") {
      _answerResule = "蓝";
    } else if (_questioncolor == "purple") {
      _answerResule = "紫";
    }  else {
      _answerResule = "绿";
    }
    this.setData({
      questionWord: _questionword,
      questionColor: _questioncolor,
      answerResule : _answerResule
    })
  },
  getResult: function(e){
    let that = this
    let _answerResule = that.data.answerResule
    let _questionWord = that.data.questionWord
    let _questionColor = that.data.questionColor
    let _addtime = that.data.time

    let _clickcolor = e.target.dataset.color
    let _clickworld = e.target.dataset.world
    let _testword = "紫"
    if (_clickcolor == 'red') {
      _testword = "红";
    } else if (_clickcolor == "orange") {
      _testword = "橙";
    } else if (_clickcolor == "yellow") {
      _testword = "黄";
    } else if (_clickcolor == "green") {
      _testword = "绿";
    } else if (_clickcolor == "cyan") {
      _testword = "青";
    } else if (_clickcolor == "blue") {
      _testword = "蓝";
    } else if (_clickcolor == "purple") {
      _testword = "紫";
    }
    if (_addtime > 1){
      if (that.data.leave <= 7){
        if (_testword == _questionWord) {
          _addtime = _addtime + 5
          that.data.leave++
          that.data.counter++;
          that.randomQuestion();
          that.randomA();
        } else {
          if (_addtime >= 3) {
            _addtime = _addtime - 3
          } else {
            _addtime = 0
          }
        }
      }else{
        if (_answerResule == _clickworld) {
          _addtime = _addtime + 5
          that.data.leave++
          that.data.counter++;
          that.randomQuestion();
          that.randomA();
        } else {
          if (_addtime >= 3) {
            _addtime = _addtime - 3
          } else {
            _addtime = 0
          }
        }
      }
      
      that.setData({
        counter: that.data.counter,
        time: _addtime,
        leave: that.data.leave
      })
    }
  },
  onShareAppMessage: function (res) {
    return {
      title: '京色',
      path: '/pages/index/index'
    }
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
