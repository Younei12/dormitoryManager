// 寝室管理
<template lang="pug">
    .dormitory
        .topSearch
            el-input.searchInput(placeholder="请输入想要搜索的寝室号" v-model="inputSearch")
            el-button.searchButton(@click="search") 搜索

            .addDormitory
                el-button.insertButton(@click="" type="success" :dialogVisible="addDialogVisible") 添加寝室
                el-dialog.studentDialog(title="添加寝室" :visible.sync="addDialogVisible" width="40%")
                    AddStudentDialog
        
        .buildingTable
            el-table.studentTable(:data="dormitorys.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe style="width: 100%")
                el-table-column(prop="buildingType" sortable label="寝室类别：")
                el-table-column(prop="layer" sortable label="所在楼层：")
                el-table-column(prop="room" sortable label="寝室号")
                el-table-column(prop="count" sortable label="总人数")
                el-table-column(prop="now" sortable label="现住人数")
                el-table-column(prop="surplus" sortable label="剩余床位")
                el-table-column( label="操作")
                    template(slot-scope="scope")
                        // @click="dialogVisible = true" 触发弹框
                        // 将 dialogVisible 的值放在data中，就可以通过点击事件来控制，并同时进行传值操作
                        el-button(size="mini" :dialogVisible="buildingDialogVisible"  @click="edit(scope.$index)") 编辑
                        el-button(@click="handleDelete(scope.$index)" type="danger" size="small") 删除

        el-dialog.buildingDialog(title="寝室管理" :visible.sync="buildingDialogVisible" width="40%")
            // ref="ruleForms" ruleForms 代指整个表单                      
            el-form(:model="ruleForm" :rules="rules" ref="ruleForms")
                .editRow
                    el-form-item(label="寝室类别：" prop="buildingType")
                        el-input.editInput(v-model="ruleForm.buildingType")
                .editRow
                    el-form-item(label="所在楼层：" prop="layer")
                        el-input.editInput(v-model="ruleForm.layer")
                .editRow
                    el-form-item(label="寝 室 号 ：" prop="room")
                        el-input.editInput(v-model="ruleForm.room")
                .editRow
                    el-form-item(label="总 人 数 ：" prop="count")
                        el-input.editInput(v-model="ruleForm.count")

                .editRow
                    el-form-item(label="现住人数：" prop="now")
                        el-input.editInput(v-model="ruleForm.now")

                .editRow
                    el-form-item(label="剩余床位：" prop="surplus")
                        el-input.editInput(v-model="ruleForm.surplus")

                el-form-item.buttons
                    // :disabled="saveBtnState"
                    // dialogVisible 对话框是否可见
                    // save(rulesForms) 传整个表单对象
                    el-button(type="primary" :dialogVisible="buildingDialogVisible" @click.prevent="save('ruleForms')") 保存
                    el-button(type="danger" @click="buildingDialogVisible = false") 取消

        Pagination(:currentPage="currentPage" :pageSize="pageSize" :totalNum="totalNum" @updatePage="getNewPage")
</template>
<script>
import Pagination from '../components/pagination'
export default ({
    components:{
        Pagination
    },
    data() {
        return{
            addDialogVisible:false,
            buildingDialogVisible:false,
            inputSearch:'',
            dormitorys:[
                {
                    buildingNum:1,
                    buildingType:'男寝',
                    layer:3,
                    room:306,
                    roomId:13306,
                    count:6,
                    now:5,
                    surplus:1
                },
                {
                    buildingNum:3,
                    buildingType:'女寝',
                    layer:2,
                    roomId:32204,
                    room:204,
                    count:6,
                    now:4,
                    surplus:2
                },
                {
                    buildingNum:1,
                    buildingType:'男寝',
                    layer:3,
                    roomId:13304,
                    room:304,
                    count:6,
                    now:6,
                    surplus:0,
                    disabled: false
                }
            ],
            ruleForm:{
                buildingNum:'',
                buildingType:'',
                layer:'',
                roomId:'',
                room:'',
                count:'',
                now:'',
                surplus:'',
            },
            rules:{

            },
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            totalNum: 0,
            flag:false
        }
    },
    created(){
    },
    methods:{
        search(){},
        edit(index){
            this.buildingDialogVisible = true
            // 获取当前这一行的index
            this.editIndex=index

            this.ruleForm.buildingNum = this.dormitorys[index].buildingNum
            this.ruleForm.buildingType = this.dormitorys[index].buildingType
            this.ruleForm.layer = this.dormitorys[index].layer
            this.ruleForm.roomId = this.dormitorys[index].roomId
            this.ruleForm.room = this.dormitorys[index].room
            this.ruleForm.count = this.dormitorys[index].count
            this.ruleForm.now = this.dormitorys[index].now
            this.ruleForm.surplus = this.dormitorys[index].surplus
        },
        // 删除一行
        handleDelete(index){
            // 询问后再关闭
            this.$confirm('确认删除？')
                .then(_ => {
                    this.dormitorys.splice(index,1)
                    this.$root.$message.success('删除成功');
                })
                .catch(_ => {});
        },
        getNewPage:function(data){
            console.log(data);
            this.currentPage = data
        }
    }
})
</script>

<style lang="scss" scoped>
.dormitory{
    padding-left: 20px;
    box-sizing: border-box;
    .topSearch{
        padding-bottom: 30px;
        .searchInput{
            width: 20%;
            margin-right: 15px;
        }
        .addDormitory{
            display: inline-block;
            margin-left: 15px;
        }
    }
    .buildingDialog{
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
