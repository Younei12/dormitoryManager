// 学生管理
<template lang="pug">
    .student
        .topSearch
            el-select.searchSelect(v-model="value" placeholder="请选择查找方式")
                el-option( v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value")
            el-input.searchInput(placeholder="请输入内容" v-model="inputSearch")
            el-button.searchButton(@click="search") 搜索
        .buttomContent
            el-table.studentTable(:data="tableData" border style="width: 100%")
                el-table-column(prop="num" label="学号")
                el-table-column(prop="name" label="姓名")
                el-table-column(prop="sex" label="性别")
                el-table-column(prop="address" label="宿舍楼")
                el-table-column( label="操作")
                    template(slot-scope="scope")
                        // @click="dialogVisible = true" 触发弹框
                        // 将 dialogVisible 的值放在data中，就可以通过点击事件来控制，并同时进行传值操作
                        el-button(size="mini" :dialogVisible="dialogVisible"  @click="edit(scope.$index)") 编辑
                        el-button(@click="handleDelete(scope.$index)" type="danger" size="small") 删除
        // 分页器
        el-pagination.pagination(background layout="prev, pager, next" :total="100")     

        // 弹框出来，弹筐里具体的内容
        el-dialog.studentDialog(title="学生信息" :visible.sync="dialogVisible" width="40%" :before-close="handleClose")
            // ref="ruleForms" ruleForms 代指整个表单                      
            el-form(:model="ruleForm" :rules="rules" ref="ruleForms")
                // 学号唯一，不能修改
                .editRow 学  号：{{editNum}} 
                .editRow
                    el-form-item(label="姓名" prop="name")
                        //- el-input.editInput(v-model="editName" prop="name")
                        el-input.editInput(v-model="ruleForm.name")
                .editRow
                    el-form-item(label="性别")
                        // v-model="locked" 页面显示选中效果
                        el-radio-group(v-model="locked" @change="sexChange")
                            el-radio(label="男")
                            el-radio(label="女")
                .editRow 宿舍楼：
                    //- el-form-item(label="宿舍楼")
                    el-select(v-model="value2" placeholder="请选择" @change="selectAddress")
                        el-option(v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled")

                //- span.editTips(ref="editTips") 请认真核对学生信息
                br 
                br
                //- .btns(slot="footer" class="dialog-footer")
                el-form-item
                    // :disabled="saveBtnState"
                    // dialogVisible 对话框是否可见
                    // save(rulesForms) 传整个表单对象
                    el-button(type="primary" :dialogVisible="dialogVisible" @click.prevent="save('ruleForms')") 保存
                    el-button(type="danger" @click="dialogVisible = false") 取消
</template>

<script>
  export default {
    data() {
      return {
        // 用来判断是按照何种方式搜索
        value:'',
        // 设置宿舍下拉选择框的默认值
        value2:'',
        dialogVisible: false,
        editIndex:'',
        inputSearch: '',
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
        tableData:[
            {
                num:1,
                name:'张三',
                sex:'男',
                address:'男一宿舍楼',
                edit:'删除 编辑'
            },
            {
                num:2,
                name:'李四',
                sex:'男',
                address:'男二宿舍楼'
            },
            {
                num:3,
                name:'李尔',
                sex:'女',
                address:'女一宿舍楼'
            },
            {
                num:4,
                name:'汪柳',
                sex:'女',
                address:'女二宿舍楼'
            },
            {
                num:5,
                name:'程漆',
                sex:'男',
                address:'男二宿舍楼'
            },
            {
                num:6,
                name:'卢飞',
                sex:'男',
                address:'男二宿舍楼'
            },
            {
                num:7,
                name:'娜美',
                sex:'女',
                address:'女二宿舍楼'
            },
            {
                num:8,
                name:'妮可',
                sex:'女',
                address:'女一宿舍楼'
            },
        ],
        editNum:'',
        editName:'',
        editSex:'',
        editAddress:'',
        locked:'',
        options2:[
            {
                value: '选项1',
                label: '男一宿舍',
                type:'男',
                disabled: false
            },
            {
                value: '选项2',
                label: '男二宿舍',
                type:'男',
                disabled: false
            },
            {
                value: '选项3',
                label: '女一宿舍',
                type:'女',
                disabled: false
            },
            {
                value: '选项4',
                label: '女二宿舍',
                type:'女',
                disabled: false
            },
        ],
        saveBtnState:false,
        ruleForm:{
            name:''
        },
        rules:{
            name:[
                { required: true, message: '请输入学生姓名', trigger: 'blur' },
                { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ]
        }
      }
    },
    methods: {
        edit(index){
            // 每次点击编辑按钮的时候，将数组中的状态都重置为true，否则点击一次之后被禁用选项的状态会一直保持
            for(let i=0;i<this.options2.length;i++){
                this.options2[i].disabled=false
            }
            this.editIndex=index
            this.dialogVisible=true
            this.editNum = this.tableData[index].num
            this.ruleForm.name = this.tableData[index].name
            // 性别默认值
            if(this.tableData[index].sex == '女'){
                // 如果当前这一行的性别是女生，则设置单选按钮的默认值为女
                this.locked = '女'
                // 遍历宿舍楼列表，将全部男生宿舍禁用
                for(let i=0;i<this.options2.length;i++){
                    if(this.options2[i].type!='女'){
                        this.options2[i].disabled=true
                    }
                }
            }else{
                this.locked = '男'
                for(let i=0;i<this.options2.length;i++){
                    if(this.options2[i].type!='男'){
                        this.options2[i].disabled=true
                    }
                }
            }
            // 宿舍楼默认值
            this.value2 = this.tableData[this.editIndex].address
        },
        save(formName){
            this.tableData[this.editIndex].name = this.ruleForm.name
            // 修改后的性别值
            if(this.locked == '男'){
                this.tableData[this.editIndex].sex = '男'
            }else{
                this.tableData[this.editIndex].sex = '女'
            }
            this.tableData[this.editIndex].address = this.value2
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$root.$message.success('保存成功');
                    // 表单校验之后才关闭对话框
                    this.dialogVisible = false
                } else {
                    // 控制台报错
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        sexChange(){
            this.value2='请选择'
            // select框禁用重置
            for(let i=0;i<this.options2.length;i++){
                this.options2[i].disabled=false
            }
            // 性别改变为男时
            if(this.locked == '男'){
                for(let i=0;i<this.options2.length;i++){
                    if(this.options2[i].type!='男'){
                        this.options2[i].disabled=true
                    }
                }
            }else{
                // 性别改变为女时
                for(let i=0;i<this.options2.length;i++){
                    if(this.options2[i].type!='女'){
                        this.options2[i].disabled=true
                    }
                }
            }
            this.$root.$message('请选择宿舍');

        },
        selectAddress(value){
            let obj = {}
            // find方法会在options2数组中遍历寻找符合要求的value，之后再将符合要求的 '对象'，赋值给obj，之后再获取obj中的属性
            obj = this.options2.find((item) => {
                return item.value=== value
            })
            // 在这里获取obj的属性，obj就是当前select框中选择的那个完整的对象
            this.value2=obj.label
            console.log(obj);
            // if(this.value2='请选择'){
            //     this.saveBtnState=true
            //     this.$refs.editTips.innerText='请选择学生所在宿舍'
            // }
        },
        handleDelete(index){
            // 询问后再关闭
            this.$confirm('确认删除？')
                .then(_ => {
                    this.tableData.splice(index,1)
                    this.$root.$message.success('删除成功');
                })
                .catch(_ => {});
        },
        handleClose(done) {
            // 点击右上角的 x 直接关闭
            done();
        },
      // ？
        // close(done){
        //     this.$confirm('确认关闭？')
        //         .then(_ => {
        //             done();
        //         })
        //         .catch(_ => {}); 
        // }

        // 搜索功能
        search(){
            if(this.value != 1 && this.value != 2){
                this.$root.$message('请选择查找方式');
            }
            // 按学号查找
            if(this.value==1){
                for(let i=0;i<this.tableData;i++){
                    
                }
            }
            console.log(this.value);
        }
    }
  }
</script>

<style lang="scss" scoped>
.student{
    padding-left: 20px;
    box-sizing: border-box;
    .topSearch{
        padding-bottom: 30px;
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
        }
    }
    .buttomContent{
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
        .editTips{
            color: red;
        }
    }
}

</style>