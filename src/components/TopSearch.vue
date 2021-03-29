// 顶部搜索栏
<template lang="pug">
    .topSearch
        el-select.searchSelect(v-model="value" placeholder="请选择查找方式")
                el-option( v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value")
        el-input.searchInput(placeholder="请输入内容" v-model="inputSearch")
        el-button.searchButton(@click="search") 搜索
        //- v-if="addFlag" 用来设置 是否显示添加学生的按钮
        .addStudents(v-if="addFlag")
            el-button.insertButton(@click="addDialogShow" type="success" :dialogVisible="addDialogVisible") 添加学生
            el-dialog.studentDialog(title="添加学生" :visible.sync="addDialogVisible" width="40%")
                AddStudentDialog
            el-upload(
                class="upload"
                action=""
                :multiple="false"
                :show-file-list="false"
                accept="csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                :http-request="httpRequest")
                el-button(type="primary") 批量上传
</template>

<script>
import AddStudentDialog from '../components/AddStudentDialog'
import XLSX from 'xlsx'
export default ({
    components:{
        AddStudentDialog
    },
    props:{
        addFlag:Boolean
    },
    data() {
        return{
            value:'',
            // 学生管理 搜索方式
            searchOptions:[
                {
                    value: 1,
                    label: '按学号搜索'
                },
                {
                    value: 2,
                    label: '按姓名搜索'
                },
            ],
            // 页面输入的用来搜索的内容
            inputSearch:'',
            addDialogVisible:false
        }
    },
    methods:{
        search(){},
        addDialogShow(){
            this.addDialogVisible=true
        },
        // 批量上传
        httpRequest (e) {
            let file = e.file // 文件信息
            if (!file) {
                // 没有文件
                return false
            } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
            // 格式根据自己需求定义
            this.$message.error('上传格式不正确，请上传xls或者xlsx格式')
                return false
            }
            const fileReader = new FileReader()
            fileReader.onload = (ev) => {
                try {
                    const data = ev.target.result
                    const workbook = XLSX.read(data, {
                    type: 'binary' // 以字符编码的方式解析
                    })
                    const exlname = workbook.SheetNames[0] // 取第一张表
                    const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]) // 生成json表格内容
                    console.log(exl)
                    // 将 JSON 数据挂到 data 里
                    this.tableData = exl
                    // document.getElementsByName('file')[0].value = '' // 根据自己需求，可重置上传value为空，允许重复上传同一文件
                    for(let i=0;i<this.tableData.length;i++){
                        this.showStudents.push(this.tableData[i])
                    }
                    // 批量上传后，重新获取计算数据的页数
                    this.totalNum = this.showStudents.length/10
                    console.log(this.totalNum);
                } catch (e) {
                    console.log('出错了：：')
                    return false
                }
            }
            fileReader.readAsBinaryString(file)
        }
    }
})
</script>

<style lang="scss" scoped>
.topSearch{
    // padding-bottom: 30px;
    .searchSelect{
        float: left;
    }
    .searchInput{
        width: 20%;
        float: left;
        margin: 0 15px;
    }
    .searchButton{
        float: left;
        margin-right: 15px;
    }
    .upload{
        display: inline-block;
        margin-left: 10px;
    }
}
</style>
