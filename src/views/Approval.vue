// 退宿审批
<template lang="pug">
    .approval
        TopSearch
        
        el-table.approvalTable(:data="approvals.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe style="width: 100%")
            el-table-column(prop="num" sortable label="学号")
            el-table-column(prop="name" sortable label="姓名")
            el-table-column(prop="sex" sortable label="性别")
            el-table-column(prop="status" sortable label="住宿状态")
            el-table-column(prop="building" sortable label="宿舍楼")
            el-table-column(prop="room" sortable label="寝室号")
            el-table-column(prop="opinion" sortable label="老师意见")
            el-table-column(prop="inspect" sortable label="宿管检查")
            el-table-column(prop="handleStatus" sortable label="办理状态")
            el-table-column(label="操作")
                template(slot-scope="scope")
                    // @click="dialogVisible = true" 触发弹框
                    // 将 dialogVisible 的值放在data中，就可以通过点击事件来控制，并同时进行传值操作
                    el-button(size="mini"  @click="changeApprovalDialog(scope.$index)") 编辑
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
                .editRow 老师意见：{{ruleForm.opinion}}
                .editRow 宿管检查：{{ruleForm.inspect}}
                .editRow 办理状态：{{ruleForm.handleStatus}}

                el-form-item.buttons
                    // :disabled="saveBtnState"
                    // dialogVisible 对话框是否可见
                    // save(rulesForms) 传整个表单对象
                    el-button(type="primary" :dialogVisible="approvalDialogVisible" @click.prevent="save('ruleForms')") 保存
                    el-button(type="danger" @click="approvalDialogVisible = false") 取消

</template>
<script>
import TopSearch from '../components/TopSearch'
export default ({
    components:{
        TopSearch
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
                    inspect:1,
                    handleStatus:1
                },
                {
                    num:20160102135,
                    name:'泸溪',
                    sex:'女',
                    status:1,
                    buildingNum:1,
                    building:'女一',
                    room:302,
                    opinion:1,
                    inspect:1,
                    handleStatus:1
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
                inspect:'',
                handleStatus:''
            },
            rules:{

            },
            showStudents: [],
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            flag:false
        }
    },
    created(){
       
    },
    methods:{
       changeApprovalDialog(index){
           this.ruleForm.num = this.approvals[index].num
           this.ruleForm.name = this.approvals[index].name
           this.ruleForm.sex = this.approvals[index].sex
           this.ruleForm.status = this.approvals[index].status
           this.ruleForm.building = this.approvals[index].building
           this.ruleForm.room = this.approvals[index].room
           this.ruleForm.opinion = this.approvals[index].opinion
           this.ruleForm.inspect = this.approvals[index].inspect
           this.ruleForm.handleStatus = this.approvals[index].handleStatus
           this.approvalDialogVisible = true
       },
       save(){
           this.approvalDialogVisible = false
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
    .approvalDialog{
        .editRow{
            padding-left: 80px;
            margin: 20px 0;
            text-align: left;
        }
        .buttons{
            padding-left: 35%;
        }
    }
}
</style>
