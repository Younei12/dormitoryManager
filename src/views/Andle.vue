// 办理退宿
<template lang="pug">
    .andle
        TopSearch
        Table(:showStudents="showStudents")
    </div>
</template>
    
<script>
import TopSearch from '../components/TopSearch'
import Table from "../components/Table"
export default {
    components:{
        TopSearch,
        Table
    },
    data() {
        return {
            students:[
                {
                    num:20160102121,
                    name:'张三',
                    sex:'男',
                    liveStatus:'住宿',
                    buildingId:1,
                    building:'男一宿舍楼',
                    room:306,
                    major:'商务英语'
                },
                {
                    num:20160102122,
                    name:'李四',
                    sex:'男',
                    liveStatus:'退宿',
                    buildingId:'',
                    building:'',
                    room:'',
                    major:'商务英语'
                },
                {
                    num:20160102103,
                    name:'李尔',
                    sex:'女',
                    liveStatus:'住宿',
                    buildingId:3,
                    building:'女一宿舍楼',
                    room:205,
                    major:'商务英语'
                },
                {
                    num:20160101201,
                    name:'汪柳',
                    sex:'女',
                    liveStatus:'住宿',
                    buildingId:4,
                    building:'女二宿舍楼',
                    room:103,
                    major:'国际贸易'
                },
                {
                    num:20160101205,
                    name:'程漆',
                    sex:'男',
                    liveStatus:'住宿',
                    buildingId:2,
                    building:'男二宿舍楼',
                    room:403,
                    major:'国际贸易'
                },
                {
                    num:20160101206,
                    name:'卢飞',
                    sex:'男',
                    liveStatus:'住宿',
                    buildingId:2,
                    building:'男二宿舍楼',
                    room:403,
                    major:'国际贸易'
                },
                {
                    num:20160101207,
                    name:'娜美',
                    sex:'女',
                    liveStatus:'住宿',
                    buildingId:4,
                    building:'女二宿舍楼',
                    room:103,
                    major:'国际贸易'
                },
                {
                    num:20160101208,
                    name:'妮可',
                    sex:'女',
                    liveStatus:'未安排',
                    buildingId:'',
                    building:'',
                    room:'',
                    major:'国际贸易'
                },
                {
                    num:20160101205,
                    name:'程漆',
                    sex:'男',
                    liveStatus:'住宿',
                    buildingId:2,
                    building:'男二宿舍楼',
                    room:403,
                    major:'国际贸易'
                },
                {
                    num:20160101206,
                    name:'卢飞',
                    sex:'男',
                    liveStatus:'住宿',
                    buildingId:2,
                    building:'男二宿舍楼',
                    room:403,
                    major:'国际贸易'
                },
                {
                    num:20160101207,
                    name:'娜美',
                    sex:'女',
                    liveStatus:'住宿',
                    buildingId:4,
                    building:'女二宿舍楼',
                    room:103,
                    major:'国际贸易'
                },
                {
                    num:20160101208,
                    name:'妮可',
                    sex:'女',
                    liveStatus:'未安排',
                    buildingId:'',
                    building:'',
                    room:'',
                    major:'国际贸易'
                },
                {
                    num:20160101205,
                    name:'程漆',
                    sex:'男',
                    liveStatus:'住宿',
                    buildingId:2,
                    building:'男二宿舍楼',
                    room:403,
                    major:'国际贸易'
                },
                {
                    num:20160101206,
                    name:'卢飞',
                    sex:'男',
                    liveStatus:'住宿',
                    buildingId:2,
                    building:'男二宿舍楼',
                    room:403,
                    major:'国际贸易'
                },
                {
                    num:20160101207,
                    name:'娜美',
                    sex:'女',
                    liveStatus:'住宿',
                    buildingId:4,
                    building:'女二宿舍楼',
                    room:103,
                    major:'国际贸易'
                },
                {
                    num:20160101208,
                    name:'妮可',
                    sex:'女',
                    liveStatus:'未安排',
                    buildingId:'',
                    building:'',
                    room:'',
                    major:'国际贸易'
                },
            ],
            tableDataName: "",
            // 最后渲染的数组
            showStudents: [],
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            flag:false
        };
    },
    created() {
        this.showStudent()
    },
    methods: {
        // showStudent[] 赋初始值（所有的学生信息）
        showStudent(){
            this.showStudents = this.students
        },
        edit(index){
            // 获取当前这一行的index
            this.editIndex=index
        },
        // 删除一行
        handleDelete(index){
            // 询问后再关闭
            this.$confirm('确认删除？')
                .then(_ => {
                    this.showStudents.splice(index,1)
                    this.$root.$message.success('删除成功');
                })
                .catch(_ => {});
        }
    }
  };
 </script>

 <style lang="scss" scoped>
 .andle{
    padding-left: 20px;
    box-sizing: border-box;
    .topSearch{
        padding-bottom: 40px;
    }
 }
 </style>