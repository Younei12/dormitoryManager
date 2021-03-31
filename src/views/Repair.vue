// 退宿审批
<template lang="pug">
    .repair
        TopSearch
        el-table.repairTable(:data="approvals.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe)
            el-table-column(prop="time" :formatter="dateFormat" sortable label="创建时间")
            el-table-column(prop="num" sortable label="学号")
            el-table-column(prop="name" sortable label="姓名")
            el-table-column(prop="building" sortable label="宿舍楼")
            el-table-column(prop="layer" sortable label="楼层")
            el-table-column(prop="room" sortable label="寝室号")
            el-table-column(prop="describe" sortable label="问题描述")
            el-table-column(prop="phone" sortable label="联系方式")
            el-table-column(prop="repairman" sortable label="维修员")
            el-table-column(prop="repairStatus" sortable label="维修状态")
            el-table-column(label="操作")
                template(slot-scope="scope")
                    // @click="dialogVisible = true" 触发弹框
                    // 将 dialogVisible 的值放在data中，就可以通过点击事件来控制，并同时进行传值操作
                    el-button(size="mini"  @click="changeRepairDialog(scope.$index)") 编辑
                    el-button(@click="handleDelete(scope.$index)" type="danger" size="small") 删除

        // 编辑
        el-dialog.repairlDialog(title="学生信息" :visible.sync="repairDialogVisible" width="40%")
            // ref="ruleForms" ruleForms 代指整个表单                      
            el-form(:model="ruleForm" :rules="rules" ref="ruleForms")
                .editRow 创建时间：{{ruleForm.time}}
                    //- el-form-item(label="创建时间" prop="time")
                    //-     {{ruleForm.time}}
                        //- el-input.editInput(v-model="ruleForm.time")

                .editRow
                    el-form-item(label="学号" prop="num")
                        el-input.editInput(v-model="ruleForm.num")

                .editRow
                    el-form-item(label="姓名" prop="name")
                        el-input.editInput(v-model="ruleForm.name")

                .editRow 宿舍楼：
                    // 页面上显示的是 label 的值，实际的 value 是 buildingId 的值
                    el-select(v-model="ruleForm.buildingNum" placeholder="请选择" @change="")
                        el-option(v-for="item in buildings"
                            :key="item.buildingId"
                            :label="item.label"     
                            :value="item.buildingId"
                            :disabled="item.disabled")

                .editRow 楼  层：
                    // 页面上显示的是 label 的值，实际的 value 是 buildingId 的值
                    el-select(v-model="ruleForm.layer" placeholder="请选择" @change="")
                        el-option(v-for="item in layers"
                            :key="item.layerId"
                            :label="item.layer"     
                            :value="item.layer"
                            :disabled="item.disabled")

                .editRow 寝室号：
                    el-select(v-model="ruleForm.room" placeholder="请选择" @change="")
                        el-option(v-for="item in rooms"
                            :key="item.roomId"
                            :label="item.room"
                            :value="item.roomId"
                            :disabled="item.disabled")

                .editRow
                    el-form-item(label="问题描述" prop="describe")
                        el-input(type="textarea" style="height:100px;" autosize v-model="ruleForm.describe")

                el-form-item.buttons
                    // :disabled="saveBtnState"
                    // dialogVisible 对话框是否可见
                    // save(rulesForms) 传整个表单对象
                    el-button(type="primary" :dialogVisible="repairDialogVisible" @click.prevent="save('ruleForms')") 保存
                    el-button(type="danger" @click="repairDialogVisible = false") 取消
        
</template>
<script>
import TopSearch from '../components/TopSearch'
import Table from '../components/Table'
import moment from 'moment'
export default ({
    components:{
        TopSearch,
        Table
    },
    data() {
        return{
            repairDialogVisible:false,
            approvals:[
                {
                    time:1491559642000,
                    num:2020052601,
                    name:'章伞',
                    buildingNum:1,
                    building:'男一',
                    layer:3,
                    room:306,
                    describe:'水龙头漏水',
                    phone:18823452345,
                    repairman:'',
                    repairStatus:2
                },
                {
                    time:1591559642000,
                    num:2020052601,
                    name:'汪柳',
                    buildingNum:1,
                    building:'女一',
                    layer:1,
                    room:104,
                    describe:'空调坏了，饮水机坏了',
                    phone:18812341234,
                    repairman:'',
                    repairStatus:2
                }
            ],
            ruleForm:{
                time:'',
                num:'',
                name:'',
                buildingNum:'',
                building:'',
                layer:'',
                room:'',
                describe:'',
                phone:'',
                repairman:'',
                repairStatus:''
            },
            rules:{

            },
            buildings:[],
            layers:[],
            rooms:[],
            tableDataName: "",
            // 最后渲染的数组
            showStudents: [],
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            flag:false
        }
    },
    created(){
        this.showStudent()
    },
    methods:{
        // showStudent[] 赋初始值（所有的学生信息）
        showStudent(){
            this.showStudents = this.students
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
        },
        dateFormat:function(row,column){
            // 数据的time的值要是毫秒数
            var date = row[column.property];
            if(date == undefined){return ''};
            return moment(date).format("YYYY-MM-DD")
        },
        changeRepairDialog(index){
            this.repairDialogVisible = true
            this.ruleForm.time = this.approvals[index].time
            this.ruleForm.num = this.approvals[index].num
            this.ruleForm.name = this.approvals[index].name
            this.ruleForm.buildingNum = this.approvals[index].buildingNum
            this.ruleForm.building = this.approvals[index].building
            this.ruleForm.layer = this.approvals[index].layer
            this.ruleForm.room = this.approvals[index].room
            this.ruleForm.describe = this.approvals[index].describe
            this.ruleForm.phone = this.approvals[index].phone
            this.ruleForm.repairman = this.approvals[index].repairman
            this.ruleForm.repairStatus = this.approvals[index].repairStatus
        },
        save(){
            this.repairDialogVisible = false
        }
    }
})
</script>

<style lang="scss" scoped>
.repair{
    padding-left: 20px;
    box-sizing: border-box;
    .topSearch{
        padding-bottom: 70px;
    }
    .repairTable{
        width: 95%;
    }
    .repairlDialog{
        .editRow{
        padding-left: 80px;
        margin: 20px 0;
        text-align: left;
            .editInput{
                width: 50%;
            }
            .el-textarea{
                // 组件内置样式是使用的行内样式时，要改变它的样式，需要采用以下写法 /deep/ + !important
                /deep/ .el-textarea__inner{
                    height:100px !important; 
                }
            }
        }
        .buttons{
            padding-left: 35%;
        }
    }
}
</style>
