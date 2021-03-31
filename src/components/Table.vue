// 表格模板
<template lang="pug">
    .table
        .tableContent
            el-table.studentTable(:data="showStudents.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe style="width: 100%")
                el-table-column(prop="num" sortable label="学号")
                el-table-column(prop="name" sortable label="姓名")
                el-table-column(prop="sex" sortable label="性别")
                el-table-column(prop="liveStatus" sortable label="住宿状态")
                el-table-column(prop="building" sortable label="宿舍楼")
                el-table-column(prop="room" sortable label="宿舍号")
                el-table-column(prop="major" sortable label="专业")
                el-table-column( label="操作")
                    template(slot-scope="scope")
                        // @click="dialogVisible = true" 触发弹框
                        // 将 dialogVisible 的值放在data中，就可以通过点击事件来控制，并同时进行传值操作
                        el-button(size="mini" :dialogVisible="editDialogVisible"  @click="changeEditDialog(scope.$index)") 编辑
                        el-button(@click="handleDelete(scope.$index)" type="danger" size="small") 删除

        // 编辑学生信息对话框
        el-dialog.studentDialog(title="学生信息" :visible.sync="editDialogVisible" width="40%")
            studentDialog(:editIndex="editIndex" :showStudents="showStudents" @diaFalse="closeDia" ref="stuDia")

        // 分页器 
        Pagination(:currentPage="currentPage" :pageSize="pageSize" :totalNum="totalNum" @updatePage="getNewPage")
</template>

<script>
import Pagination from '../components/pagination'
import studentDialog from '../components/StudentDialog'
export default ({
    components:{    
        Pagination,
        studentDialog
    },
    props:{
        showStudents:Array
    },
    data() {
        return{
            editIndex:'',
            // 学生信息编辑 对话框是否隐藏
            editDialogVisible: false,
            // 添加学生对话框 是否隐藏
            insertDialogVisible:false,
            tableData:[],
            currentPage: 1,//默认显示第一页
            pageSize:10,//默认每页显示10条
            totalNum: 0
        }
    },
    created(){
        // 计算总的页数
        this.totalNum = this.showStudents.length/10
    },
    methods: {
        changeEditDialog(index){
            this.editIndex = index
            this.editDialogVisible = true
            console.log(index);
        },
        //  删除某个学生的信息
        handleDelete(index){
            // 询问后再关闭
            this.$confirm('确认删除？')
                .then(_ => {
                    this.showStudents.splice(index,1)
                    this.$root.$message.success('删除成功');
                })
                .catch(_ => {});
        },
        getNewPage:function(data){
            console.log(data);
            this.currentPage = data
        },
        closeDia(data){
            this.editDialogVisible = data
        }
    }
})
</script>
<style lang="scss" scoped>
.table{
    .tableContent{
        width: 80%;
        margin: 30px 0;
    }
    .studentDialog{
        .editRow{
            padding-left: 100px;
            margin: 20px 0;
            text-align: left;
            .editInput{
                width: 50%;
            }
        }
        .buttons{
            padding-left: 35%;
        }
    }
}
</style>