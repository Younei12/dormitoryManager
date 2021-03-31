// 退宿审批
<template lang="pug">
    .approval
        TopSearch 
        el-table.approvalTable(:data="approvals.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe)
            el-table-column(prop="num" sortable label="学号")
            el-table-column(prop="name" sortable label="姓名")
            el-table-column(prop="sex" sortable label="性别")
            el-table-column(prop="status" sortable label="住宿状态")
            el-table-column(prop="building" sortable label="宿舍楼")
            el-table-column(prop="room" sortable label="寝室号")
            el-table-column(prop="opinionName" sortable label="老师意见")
            el-table-column(prop="inspectName" sortable label="宿管检查")
            el-table-column(prop="statusName" sortable label="办理状态")
            el-table-column(label="操作")
                template(slot-scope="scope")
                    // @click="dialogVisible = true" 触发弹框
                    // 将 dialogVisible 的值放在data中，就可以通过点击事件来控制，并同时进行传值操作
                    el-button(size="mini"  @click="changeApprovalDialog(scope.$index)") 办理
                    el-button(@click="handleDelete(scope.$index)" type="danger" size="small") 删除
                    
        el-dialog.approvalDialog(title="退宿审批" :visible.sync="approvalDialogVisible" width="40%")
            // ref="ruleForms" ruleForms 代指整个表单                      
            el-form(:model="ruleForm" :rules="rules" ref="ruleForms")
                .editRow 学  号：{{ruleForm.num}}
                .editRow 姓  名：{{ruleForm.name}}
                .editRow 性  别：{{ruleForm.sex}}
                .editRow 住宿状态：{{ruleForm.status}}
                .editRow 宿舍楼：{{ruleForm.building}}
                .editRow 寝室号：{{ruleForm.room}}
                .editRow 老师意见：{{ruleForm.opinionName}}
                .editRow 宿管检查：{{ruleForm.inspectName}}
                .editRow 办理状态：
                    el-select(v-model="ruleForm.statusName")
                        el-option(v-for="item in status"
                            :key="item.statusId"
                            :label="item.statusName"
                            :value="item.statusId"
                            :disabled="item.disabled")

                el-form-item.buttons
                    // :disabled="saveBtnState"
                    // dialogVisible 对话框是否可见
                    // save(rulesForms) 传整个表单对象
                    el-button(type="primary" :dialogVisible="approvalDialogVisible" @click.prevent="save('ruleForms')") 保存
                    el-button(type="danger" @click="approvalDialogVisible = false") 取消
        
        Pagination(:currentPage="currentPage" :pageSize="pageSize" :totalNum="totalNum" @updatePage="getNewPage")
</template>
<script>
import TopSearch from '../components/TopSearch'
import Pagination from '../components/pagination'
export default ({
    components:{
        TopSearch,
        Pagination
    },
    data(){
        return{
            approvalDialogVisible:false,
            approvals:[
                {
                    num:20160102124,
                    name:'莉丝',
                    sex:'女',
                    status:1,
                    buildingNum:1,
                    building:'女一',
                    room:204,
                    opinion:1,
                    opinionName:'同意',
                    inspect:1,
                    inspectName:'通过',
                    handleStatus:1,
                    statusName:"未办理"
                },
                {
                    num:20160102135,
                    name:'泸溪',
                    sex:'女',
                    status:1,
                    buildingNum:1,
                    building:'女一',
                    room:302,
                    opinion:2,
                    opinionName:'驳回',
                    inspect:2,
                    inspectName:'驳回',
                    handleStatus:1,
                    statusName:"办理成功"
                }
            ],
            ruleForm:{
                num:'',
                name:'',
                sex:'',
                status:'',
                building:'',
                room:'',
                opinion:'',
                opinionName:'',
                inspect:'',
                inspectName:'',
                handleStatus:'',
                statusName:''
            },
            rules:{

            },
            showStudents: [],
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            totalNum:0,
            flag:false,
            // 审核状态
            status:[
                {
                    statusId:1,
                    statusName:'办理成功',
                    disabled:false
                },
                {
                    status:2,
                    statusName:"未办理",
                    disabled:false
                }
            ]
        }
    },
    created(){
       
    },
    methods:{
        changeApprovalDialog(index){
            // 重置按钮状态 
            for(let i=0;i<this.status.length;i++){
                this.status[i].disabled = false
            }
            this.approvalDialogVisible = true
            this.ruleForm.num = this.approvals[index].num
            this.ruleForm.name = this.approvals[index].name
            this.ruleForm.sex = this.approvals[index].sex
            this.ruleForm.status = this.approvals[index].status
            this.ruleForm.building = this.approvals[index].building
            this.ruleForm.room = this.approvals[index].room
            this.ruleForm.opinion = this.approvals[index].opinion
            this.ruleForm.opinionName = this.approvals[index].opinionName
            this.ruleForm.inspect = this.approvals[index].inspect
            this.ruleForm.inspectName = this.approvals[index].inspectName
            this.ruleForm.handleStatus = this.approvals[index].handleStatus
            this.ruleForm.statusName = this.approvals[index].statusName
            if(this.ruleForm.opinion != 1 && this.ruleForm.inspect!=1){
                this.ruleForm.statusName = "无法办理"
                for(let i=0;i<this.status.length;i++){
                    this.status[i].disabled = true
                }
            }
       },
       save(){
           this.approvalDialogVisible = false
       },
       getNewPage:function(data){
            console.log(data);
            this.currentPage = data
        },
        // 删除一行
        handleDelete(index){
            // 询问后再关闭
            this.$confirm('确认删除？')
                .then(_ => {
                    this.approvals.splice(index,1)
                    this.$root.$message.success('删除成功');
                })
                .catch(_ => {});
        }
    }
})
</script>

<style lang="scss" scoped>
.approval{
    padding-left: 20px;
    box-sizing: border-box;
    .topSearch{
        padding-bottom: 70px;
    }
    .approvalTable{
        width: 87%;
    }
    .approvalDialog{
        .editRow{
            padding-left: 80px;
            margin: 20px 0;
            text-align: left;
            .el-dialog__body{
                font-size: 16px;
            }
        }
        .buttons{
            padding-left: 35%;
        }
    }
}
</style>
