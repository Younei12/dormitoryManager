// 退宿审批
<template lang="pug">
    .building
        .topSearch
            el-input.searchInput(placeholder="请输入想要搜索的楼栋" v-model="inputSearch")
            el-button.searchButton(@click="search") 搜索

            .addBuilding
                el-button.insertButton(@click="" type="success" :dialogVisible="addDialogVisible") 添加楼栋
                el-dialog.studentDialog(title="添加楼栋" :visible.sync="addDialogVisible" width="40%")
                    AddStudentDialog
        
        .buildingTable
            el-table.studentTable(:data="buildings.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe style="width: 100%")
                el-table-column(prop="building" sortable label="楼栋名称")
                el-table-column(prop="buildingType" sortable label="楼栋类别")
                el-table-column(prop="layers" sortable label="楼层数")
                el-table-column(prop="rooms" sortable label="寝室数")
                el-table-column( label="操作")
                    template(slot-scope="scope")
                        // @click="dialogVisible = true" 触发弹框
                        // 将 dialogVisible 的值放在data中，就可以通过点击事件来控制，并同时进行传值操作
                        el-button(size="mini" :dialogVisible="buildingDialogVisible"  @click="edit(scope.$index)") 编辑
                        el-button(@click="handleDelete(scope.$index)" type="danger" size="small") 删除

        el-dialog.buildingDialog(title="楼栋管理" :visible.sync="buildingDialogVisible" width="40%")
            // ref="ruleForms" ruleForms 代指整个表单                      
            el-form(:model="ruleForm" :rules="rules" ref="ruleForms")
                .editRow
                    el-form-item(label="楼栋名称：" prop="building")
                        el-input.editInput(v-model="ruleForm.building")
                .editRow
                    el-form-item(label="楼栋类别：" prop="buildingType")
                        el-input.editInput(v-model="ruleForm.buildingType")
                .editRow
                    el-form-item(label="楼 层 数 ：" prop="layers")
                        el-input.editInput(v-model="ruleForm.layers")
                .editRow
                    el-form-item(label="寝 室 数 ：" prop="rooms")
                        el-input.editInput(v-model="ruleForm.rooms")

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
            buildings:[
                {
                    buildingId:1,
                    building:'男一',
                    buildingType:'男寝',
                    layers:6,
                    rooms:36
                },
                {
                    buildingId:2,
                    building:'男二',
                    buildingType:'男寝',
                    layers:6,
                    rooms:36
                },
                {
                    buildingId:3,
                    building:'女一',
                    buildingType:'女寝',
                    layers:6,
                    rooms:36
                }
            ],
            ruleForm:{
                buildingId:'',
                building:'',
                buildingType:'',
                layers:'',
                rooms:''
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

            this.ruleForm.buildingId = this.buildings[index].buildingId
            this.ruleForm.building = this.buildings[index].building
            this.ruleForm.buildingType = this.buildings[index].buildingType
            this.ruleForm.layers = this.buildings[index].layers
            this.ruleForm.rooms = this.buildings[index].rooms
        },
        // 删除一行
        handleDelete(index){
            // 询问后再关闭
            this.$confirm('确认删除？')
                .then(_ => {
                    this.buildings.splice(index,1)
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
.building{
    padding-left: 20px;
    box-sizing: border-box;
    .topSearch{
        padding-bottom: 30px;
        .searchInput{
            width: 20%;
            margin-right: 15px;
        }
        .addBuilding{
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
