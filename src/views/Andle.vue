// 办理退宿
<template lang="pug">
    .andle(style="margin-top:50px")
        <el-input v-model="tableDataName" placeholder="请输入姓名" style="width:240px"></el-input>
        <el-button type="primary">搜索</el-button>
        //-   表格
        el-table(:data="showStudents" border style="width: 100%")
            el-table-column(prop="num" sortable label="学号" )
            el-table-column(prop="name" sortable label="姓名" )
            el-table-column(prop="sex" sortable label="性别")
            el-table-column(prop="liveStatus" sortable label="住宿")
            el-table-column(prop="building" sortable label="楼栋")
            el-table-column(prop="room" sortable label="寝室号")
            el-table-column(prop="major" sortable label="专业")
        //-   分页
        el-pagination(
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 2, 3, 4]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalItems")
    </div>
</template>
    
<script>
export default {
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
        //页面初始化时让分页的总条数等于数据的总条数
        this.totalItems = this.students.length/10;
        //如果分页的页数等于当页要展示的条数
        // if (this.totalItems > this.pageSize) {
            for (let index = 0; index < this.pageSize; index++) {
                //那么就将这几条push进展示表格中
                this.showStudents.push(this.students[index]);
            }
        // } else {
            //否则就展示首页
            // this.showStudents = this.students;
        // }
    },
    methods: {
        //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
        //用两个变量接收currentChangePage函数的参数
        // 搜索
        // doFilter() {
        //     if (this.tableDataName == "") {
        //         this.$message.warning("查询条件不能为空！");
        //         return;
        //     }
        //     this.showStudents = []
        //     //每次手动将数据置空,因为会出现多次点击搜索情况
        //     this.filterTableDataEnd=[]
        //     this.students.forEach((value, index) => {
        //         if(value.name){
        //         if(value.name.indexOf(this.tableDataName)>=0){
        //             this.filterTableDataEnd.push(value)
        //         }
        //         }
        //     });
        //     //页面数据改变重新统计数据数量和当前页
        //     this.currentPage=1
        //     this.totalItems=this.filterTableDataEnd.length
        //     //渲染表格,根据值
        //     this.currentChangePage(this.filterTableDataEnd)
        //     //页面初始化数据需要判断是否检索过
        //     this.flag=true
        // },   
        //每页展示条数
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.handleCurrentChange(1);
        },
        // 这里的 val 是传进来的，第几页的值
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;

            this.currentChangePage(this.students);
            console.log(this.showStudents);  
        },
        //组件自带监控当前页码
        //点击下一页,将下一页的内容push到渲染数组中
        currentChangePage(list) {
            let from = (this.currentPage - 1) * this.pageSize;
            let to = this.currentPage * this.pageSize;
            this.showStudents = [];
            for (; from < to; from++) {
                if (list[from]) {
                    this.showStudents.push(list[from]);
                }
            }
        }
    }
  };
 </script>