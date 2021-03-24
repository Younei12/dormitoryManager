import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 当前菜单
    currentPath:'/index',
    currentMenu: null,
    tabsList: [
      {
          path: '/index',
          name: '首页',
          icon: ''
      }
    ]
  },
  mutations: {
    //选择标签 选择面包屑
    selectMenu(state, val) {
      //如果点击应该是首页的话 要把这份数据清空 因为头部组件已经把首页写死了 
      if (val.name === '首页') {
          state.currentMenu = null
      } else {
          // 只有点击不是首页菜单才存储当前菜单
          state.currentMenu = val
          //如果等于-1说明tabsList不存在,那么将当前目录的值插入数组，否则什么都不做
          let result = state.tabsList.findIndex(item => item.name === val.name)
          // 数组中没有当前点击的菜单的信息，则将新的菜单信息添加到数组中去
          result === -1 ? state.tabsList.push(val) : ''

      }
    },
    //关闭 面包屑标签
    closeTab(state, val) {
      let result = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(result, 1)
    },
    // 点击面包屑进行跳转时，激活对应的左侧的菜单栏
    changePath(state,newPath){
      state.currentPath = newPath
    }
  },
  actions: {
  },
  modules: {
  }
})
