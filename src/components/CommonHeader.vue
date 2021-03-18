<template lang="pug">
    .CommonHeader
        el-tag(
            :key="tag.name"
            size="small"
            v-for="(tag, index) in tags"
            :closable="tag.name !== 'index'"
            :disable-transitions="false"
            @close="handleClose(tag, index)"
            @click="changeMenu(tag)"
            :effect="$route.path === tag.path ? 'dark' : 'plain'") {{tag.name}}
        
</template>

<script>
  //js部分
    import { mapState ,mapMutations } from 'vuex'
    export default {
        computed: {
            //获取vuex数据的另一种写法
            // mapState 的作用就是帮我们把一个对象或数组里的值转化成计算属性的写法
            ...mapState({
                tags: state => state.tabsList
            })
        } ,
        methods:{
            ...mapMutations({
                closeTab: 'closeTab'
            }),
            //关闭标签
            handleClose(tag, index) {
                let length = this.tags.length - 1
                //vuex调方法的另一种写法
                this.closeTab(tag)
                // 如果关闭的标签的路由不是当前路由的话，就不跳转
                if (tag.path != this.$route.path) {
                    return
                }
                // 关闭的标签是最右边的话，往左边跳转一个
                if (index == length) {
                    // 改变面包屑的显示
                    this.$router.push({ path: this.tags[index - 1].path })
                    // 改变左侧菜单栏的显示
                    this.$store.commit('changePath',this.tags[index - 1].path)
                } else {
                    // 否则往右边跳转
                    this.$router.push({ path: this.tags[index].path })
                    this.$store.commit('changePath',this.tags[index].path)
                }
            },
            //选择标签跳转路由
            changeMenu(item) {
                // 改变当前路由，使跳转到新的页面
                this.$router.push({ path: item.path })
                // 更新面包屑数组
                this.$store.commit('selectMenu', item)
                // 改变左侧菜单栏当前激活的菜单选项
                this.$store.commit('changePath',item.path)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .CommonHeader{
        margin-left: 20px;
        margin-bottom: 20px;
        .el-tag{
            margin-right: 10px;
            cursor: pointer;
        }
    }
</style>