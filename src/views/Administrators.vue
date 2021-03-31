// 管理员管理
<template lang="pug">
    .Administrators
        .topSearch
            el-select.searchSelect(v-model="value" placeholder="请选择查找方式")
                    el-option( v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value")
            el-input.searchInput(placeholder="请输入内容" v-model="inputSearch")
            el-button.searchButton(@click="search") 搜索

        .adminTable
            el-table.adminTable(:data="admins.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe)
                el-table-column(prop="id" sortable label="管理员id")
                el-table-column(prop="name" sortable label="姓名")
                el-table-column(prop="sex" sortable label="性别")
                el-table-column(prop="age" sortable label="年龄")
                el-table-column(prop="phone" sortable label="联系电话")
                el-table-column(prop="account" sortable label="账号")
                el-table-column(prop="statusName" sortable label="管理员状态")
                el-table-column(prop="roleName" sortable label="管理员角色")
                el-table-column(label="操作")
                    template(slot-scope="scope")
                        // @click="dialogVisible = true" 触发弹框
                        // 将 dialogVisible 的值放在data中，就可以通过点击事件来控制，并同时进行传值操作
                        el-button(size="mini"  @click="changeAdminlDialog(scope.$index)") 编辑
                        el-button(@click="handleDelete(scope.$index)" type="danger" size="small") 删除

        el-dialog.adminDialog(title="管理员信息" :visible.sync="adminlDialogVisible" width="40%")
            // ref="ruleForms" ruleForms 代指整个表单                      
            el-form(:model="ruleForm" :rules="rules" ref="ruleForms")
                .editRow 管理员id：{{ruleForm.id}}
                .editRow
                    el-form-item(label=" 姓  名 ：" prop="name")
                        el-input.editInput(v-model="ruleForm.name")
                .editRow
                    el-form-item(label=" 性  别 ：" prop="sex")
                        el-input.editInput(v-model="ruleForm.sex")
                .editRow
                    el-form-item(label=" 年  龄 ：" prop="age")
                        el-input.editInput(v-model="ruleForm.age")
                .editRow
                    el-form-item(label="联系电话:" prop="phone")
                        el-input.editInput(v-model="ruleForm.phone")
                .editRow
                    el-form-item(label=" 账  号 ：" prop="account")
                        el-input.editInput(v-model="ruleForm.account")
                .editRow
                    el-form-item(label=" 密  码 ：" prop="password")
                        //- el-input.editInput(v-model="ruleForm.password")
                        el-button(type="danger") 重置密码
                .editRow 管理员状态:
                    el-select(v-model="ruleForm.statusName")
                        el-option(v-for="item in status"
                            :key="item.statusId"
                            :label="item.statusName"
                            :value="item.statusId"
                            :disabled="item.disabled")
                .editRow
                    el-form-item(label="管理员角色:" prop="roleName") {{ruleForm.roleName}}
                        

                el-form-item.buttons
                    // :disabled="saveBtnState"
                    // dialogVisible 对话框是否可见
                    // save(rulesForms) 传整个表单对象
                    el-button(type="primary" :dialogVisible="adminlDialogVisible" @click.prevent="save('ruleForms')") 保存
                    el-button(type="danger" @click="adminlDialogVisible = false") 取消

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
            value:'',
            // 学生管理 搜索方式
            searchOptions:[
                {
                    value: 1,
                    label: '按姓名搜索'
                },
                {
                    value: 2,
                    label: '按手机号搜索'
                },
            ],
            // 页面输入的用来搜索的内容
            inputSearch:'',
            adminlDialogVisible:false,
            admins:[
                {
                    id:1,
                    name:'张黎黎',
                    sex:'女',
                    age:26,
                    phone:13232325454,
                    account:'adminlili',
                    password:'654321',
                    status:1,
                    statusName:'启用',
                    role:2,
                    roleName:'超级管理员'
                },
                {
                    id:2,
                    name:'陆万',
                    sex:'男',
                    age:30,
                    phone:18956566565,
                    account:'adminwan',
                    password:'565656',
                    status:1,
                    statusName:'启用',
                    role:1,
                    roleName:'管理员'
                }
            ],
            ruleForm:{
                id:'',
                name:'',
                sex:'',
                age:'',
                phone:'',
                account:'',
                password:'',
                status:'',
                statusName:'',
                role:'',
                roleName:''
            },
            rules:{

            },
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            totalNum:0,
            status:[
                {
                    statusId:1,
                    statusName:'启用'
                },
                {
                    status:2,
                    statusName:"禁用"
                }
            ]
        }
    },
    methods:{
        search(){},
        changeAdminlDialog(index){
            this.adminlDialogVisible = true
            this.ruleForm.id = this.admins[index].id
            this.ruleForm.name = this.admins[index].name
            this.ruleForm.sex = this.admins[index].sex
            this.ruleForm.age = this.admins[index].age
            this.ruleForm.phone = this.admins[index].phone
            this.ruleForm.account = this.admins[index].account
            this.ruleForm.password = this.admins[index].password
            this.ruleForm.status = this.admins[index].status
            this.ruleForm.statusName = this.admins[index].statusName
            this.ruleForm.role = this.admins[index].role
            this.ruleForm.roleName = this.admins[index].roleName
        },
        // 删除一行
        handleDelete(index){
            this.$confirm('确认删除？')
                .then(_ => {
                    this.admins.splice(index,1)
                    this.$root.$message.success('删除成功');
                })
                .catch(_ => {});
        }
    }
})
</script>

<style lang="scss" scoped>
.Administrators{
    padding-left: 20px;
    .topSearch{
        padding-bottom: 40px;
        .searchInput{
            width: 20%;
            margin: 0 15px;
        }
        .searchButton{
            margin-right: 15px;
        }
    }
    .adminTable{
        width: 94%;
    }
    .adminDialog{
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