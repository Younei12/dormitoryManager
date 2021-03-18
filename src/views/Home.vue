<template lang="pug">
  .home
    el-container
      el-header 
        span.title 
          i(class="iconfont icon-xuexiaogaikuang")
          span 和平学校学生宿舍管理系统
      el-container
        el-aside(width="200px")
          // 导航栏
          el-col
            el-menu(
              :default-active="currentPath"
              class="el-menu-vertical-demo"
              background-color="#3c485c"
              text-color="#fff"
              :router="true",
              active-text-color="#409EFF")
              
              // :index="index.name" 辨别当前点击的是哪一行
              el-menu-item(v-for="(item,index) in navList" :index="item.path" :router="item.path" @click="clickMenu(item)")
                //- router-link(:to="item.path")
                i.icon(:class="item.icon")
                span {{item.name}}
        // 路由出口
        el-main
          CommonHeader
          Router-view
</template>

<script>
import CommonHeader from '../components/CommonHeader.vue'
import { mapState } from 'vuex'
export default {
  data(){
    return {
      navList:[
        {
          path:'/index',
          name:'首页',
          icon:'iconfont icon-shouye-'
        },
        {
          path:'/student',
          name:'学生管理',
          icon:'iconfont icon-xuesheng'
        },
         {
          path:'/distribution',
          name:'分配宿舍',
          icon:'iconfont icon-fenpei'
        },
        {
          path:'/change',
          name:'更换宿舍',
          icon:'iconfont icon-gaishan'
        },
        {
          path:'/andle',
          name:'办理退宿',
          icon:'iconfont icon-tui'
        },
        {
          path:'/approval',
          name:'退宿审批',
          icon:'iconfont icon-shenpi'
        },
        {
          path:'/building',
          name:'楼栋管理',
          icon:'iconfont icon-lou'
        },
        {
          path:'/dormitory',
          name:'宿舍管理',
          icon:'iconfont icon-sushe'
        },
        {
          path:'/repair',
          name:'设备报修单',
          icon:'iconfont icon-xiuli'
        },
        {
          path:'/administrators',
          name:'管理员管理',
          icon:'iconfont icon-guanliyuan'
        }
      ]
    }
  },
  components: {
    CommonHeader
  },
  methods:{
    clickMenu(item) {
      //调用vuex的selectMenu方法存储数据
      this.$store.commit('selectMenu', item)
    }
  },
  created(){
  },
  mounted(){
  },
  computed: mapState({
        currentPath: state => state.currentPath
    })
}
</script>

<style lang="scss" scoped>
.home{
  background-color:#293344;
  .el-header{
      color: #fff;
      line-height: 60px;
      font-size: 22px;
      i{
        margin-right: 10px;
        font-size: 22px;
      }
    }

  .el-aside {
    height: 100%;
    position: fixed;
    background-color: #3c485c;
    color: #fff;
    line-height: 50px;
    .el-col-12{
      width: auto;
      .el-menu{
        padding-left: 40px;
        border: none;
      }
    }
    a{
      font-size: 16px;
    }
    .icon{
      display: inline-block;
      margin-right: 20px;
    }
  }
  
  .el-main {
    margin-left: 200px;
    background-color: #fff;
    color: #333;
  }
}
</style>