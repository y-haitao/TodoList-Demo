// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input: '', //代办事项内容
    todos: [], //待办事项数组列表
    leftCount: 0, //默认待办事项为0个
    allCompleted: false, //默认不全选
    logs: [], //日志
  },

  // wx.setStorageSync(Object object) 将数据存储在本地缓存中指定的 key 中.
  save: function () {
    wx.setStorageSync('todo_list', this.data.todos);
    wx.setStorageSync('todo_logs', this.data.logs);
  },

  load: function () {
    var todos = wx.getStorageSync('todo_list')
    if (todos) {
      var leftCount = todos.filter(function (item) {
        return !item.completed
      }).length
      this.setData({ todos: todos, leftCount: leftCount })
    };
    var logs = wx.getStorageSync('todo_logs')
    if (logs) {
      this.setData({ logs: logs })
    };
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.load();
  },

  //添加代办事项清单 (键盘输入时触发)
  inputChangeHandle: function (e) {
    this.setData({
      input: e.detail.value
    })
  },

  //点击完成时添加待办事项 (点击完成按钮时触发)
  addTodoHandle: function () {
    if (!this.data.input || !this.data.input.trim()) return
    var todos = this.data.todos
    todos.push({ name: this.data.input, completed: false })
    var logs = this.data.logs
    logs.push({ timestamp: new Date(), action: '添加', name: this.data.input })
    this.setData({
      input: '',
      todos: todos,
      leftCount: this.data.leftCount + 1,
      logs: logs
    })
    this.save()
  },

  //点击待办事项列表的选项卡
  toggleTodoHandle: function (e) {
    var index = e.currentTarget.dataset.index
    var todos = this.data.todos
    todos[index].completed = !todos[index].completed
    var logs = this.data.logs
    logs.push({
      timestamp: new Date(),
      action: todos[index].completed ? '完成' : '未完成',
      name: todos[index].name
    })
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount + (todos[index].completed ? -1 : 1),
      logs: logs
    })
    this.save()
  },

  //删除代办事项选项卡
  removeTodoHandle: function (e) {
    var index = e.currentTarget.dataset.index
    var todos = this.data.todos
    var remove = todos.splice(index, 1)[0]
    var logs = this.data.logs
    logs.push({ timestamp: new Date(), action: '删除', name: remove.name })
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount - (remove.completed ? 0 : 1),
      logs: logs
    })
    this.save()
  },

  //全选
  toggleAllHandle: function (e) {
    this.data.allCompleted = !this.data.allCompleted
    var todos = this.data.todos
    for (var i = todos.length - 1; i >= 0; i--) {
      todos[i].completed = this.data.allCompleted
    }
    var logs = this.data.logs
    logs.push({
      timestamp: new Date(),
      action: this.data.allCompleted ? '完成' : '未完成',
      name: '全部待办事项'
    })
    this.setData({
      todos: todos,
      leftCount: this.data.allCompleted ? 0 : todos.length,
      logs: logs
    })
    this.save()
  },

  //清空
  clearCompletedHandle:function(e){
    var todos = this.data.todos
    var remains = []
    for (var i = 0; i < todos.length; i++) {
      todos[i].completed || remains.push(todos[i])
    }
    var logs = this.data.logs
    logs.push({
      timestamp: new Date(),
      action: '清空',
      name: '全部待办事项'
    })
    this.setData({ todos: remains, logs: logs })
    this.save()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})