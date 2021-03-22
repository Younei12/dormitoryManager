// 学生管理
<template lang="pug">
    .student
        .topSearch
            el-select.searchSelect(v-model="value" placeholder="请选择查找方式")
                el-option( v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value")
            el-input.searchInput(placeholder="请输入内容" v-model="inputSearch")
            el-button.searchButton(@click="search") 搜索
            el-button.insertButton(@click="insertShow" type="success" :dialogVisible="insertDialogVisible") 添加学生
            el-dialog.studentDialog(title="添加学生" :visible.sync="insertDialogVisible" width="40%" :before-close="handleClose")
                StudentDialog
            el-upload(
                class="upload"
                action=""
                :multiple="false"
                :show-file-list="false"
                accept="csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                :http-request="httpRequest")
                el-button(type="primary") 批量上传
        .buttomContent
            el-table.studentTable(:data="students.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe style="width: 100%")
                el-table-column(prop="num" label="学号")
                el-table-column(prop="name" label="姓名")
                el-table-column(prop="sex" label="性别")
                el-table-column(prop="liveStatus" label="住宿状态")
                el-table-column(prop="building" label="宿舍楼")
                el-table-column(prop="room" label="宿舍号")
                el-table-column(prop="major" label="专业")
                el-table-column( label="操作")
                    template(slot-scope="scope")
                        // @click="dialogVisible = true" 触发弹框
                        // 将 dialogVisible 的值放在data中，就可以通过点击事件来控制，并同时进行传值操作
                        el-button(size="mini" :dialogVisible="dialogVisible"  @click="edit(scope.$index)") 编辑
                        el-button(@click="handleDelete(scope.$index)" type="danger" size="small") 删除
        // 分页器
        el-pagination.pagination(background
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 3, 5, 8]"
            :page-size="pageSize")    

        // 弹框出来，弹筐里具体的内容
        el-dialog.studentDialog(title="学生信息" :visible.sync="dialogVisible" width="40%" :before-close="handleClose")
            // ref="ruleForms" ruleForms 代指整个表单                      
            el-form(:model="ruleForm" :rules="rules" ref="ruleForms")
                // 学号唯一，不能修改
                .editRow 学  号：{{editNum}} 
                .editRow
                    el-form-item(label="姓名" prop="name")
                        el-input.editInput(v-model="ruleForm.name")
                .editRow
                    el-form-item(label="性别")
                        // v-model="locked" 页面显示选中效果
                        el-radio-group(v-model="locked" @change="sexChange")
                            el-radio(label="男")
                            el-radio(label="女")
                .editRow
                    el-form-item(label="住宿状态")
                        el-radio-group(v-model="liveLocked" @change="liveChange")
                            el-radio(label="住宿")
                            el-radio(label="退宿")
                            el-radio(label="未安排")
                .editRow 宿舍楼：
                    // 页面上显示的是 label 的值，实际的 value 是 buildingId 的值
                    el-select(v-model="buildingValue" placeholder="请选择" @change="selectAddress")
                        el-option(v-for="item in buildings"
                            :key="item.buildingId"
                            :label="item.label"     
                            :value="item.buildingId"
                            :disabled="item.disabled")
                .editRow 宿舍号：
                    el-select(v-model="roomsValue" placeholder="请选择" @change="selectRoom")
                        el-option(v-for="item in rooms"
                            :key="item.roomId"
                            :label="item.room"
                            :value="item.roomId"
                            :disabled="item.disabled")
                .editRow
                    el-form-item(label="专业" prop="major")
                        el-input.editInput(v-model="ruleForm.major")
                
                el-form-item.buttons
                    // :disabled="saveBtnState"
                    // dialogVisible 对话框是否可见
                    // save(rulesForms) 传整个表单对象
                    el-button(type="primary" :dialogVisible="dialogVisible" @click.prevent="save('ruleForms')") 保存
                    el-button(type="danger" @click="dialogVisible = false") 取消
</template>
 
<script>
import StudentDialog from '../components/studentDialog'
import XLSX from 'xlsx'
export default {
    components:{
        StudentDialog
    },
    data() {
      return {
        // 用来判断是按照何种方式搜索
        value:'',
        // 楼栋的name
        buildingValue:'',
        // 编辑 对话框是否隐藏
        dialogVisible: false,
        // 添加学生对话框
        insertDialogVisible:false,
        // 楼栋的id
        nowBuilding:'',
        // 宿舍号 room字段值
        roomsValue:'',
        editIndex:'',
        inputSearch: '',
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
        // 学生信息表
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
        ],
        editNum:'',
        editName:'',
        editSex:'',
        editAddress:'',
        // 性别 绑定
        locked:'',
        // 住宿状态绑定
        liveLocked:'',
        // 楼栋列表
        buildings:[
            {
                buildingId: '1',
                label: '男一宿舍',
                buildingType:'男寝',
                disabled: false
            },
            {
                buildingId: '2',
                label: '男二宿舍',
                buildingType:'男寝',
                disabled: false
            },
            {
                buildingId: '3',
                label: '女一宿舍',
                buildingType:'女寝',
                disabled: false
            },
            {
                buildingId: '4',
                label: '女二宿舍',
                buildingType:'女寝',
                disabled: false
            },
        ],
        // 全部宿舍列表
        AllRooms:[
            {
                buildingId:1,
                buildingType:'男寝',
                layer:3,
                roomId:13306,
                room:306,
                count:6,
                now:5,
                surplus:1,
                disabled: false
            },
            {
                buildingId:1,
                buildingType:'男寝',
                layer:3,
                roomId:13304,
                room:304,
                count:6,
                now:6,
                surplus:0,
                disabled: false
            },
            {
                buildingId:1,
                buildingType:'男寝',
                layer:4,
                roomId:14401,
                room:401,
                count:6,
                now:3,
                surplus:3,
                disabled: false
            },
            {
                buildingId:3,
                buildingType:'女寝',
                layer:2,
                roomId:32204,
                room:204,
                count:6,
                now:4,
                surplus:2,
                disabled: false
            },
        ],
        // select 所要渲染的宿舍的列表
        rooms:[],
        saveBtnState:false,
        // 表单验证
        ruleForm:{
            name:'',
            liveStatus:'',
            major:''
        },
        // 表单验证规则
        rules:{
            name:[
                { required: true, message: '请输入学生姓名', trigger: 'blur' },
                { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ],
            major:[
                {required: true, message: '请输入学生所在专业', trigger: 'blur' }
            ]
        },
        tableData:[],
        currentPage: 1,//默认显示第一页
        pageSize:10,//默认每页显示10条
        totalNum: ''
      }
    },
    methods: {
        edit(index){
            // 清空 rooms
            this.rooms=[]
            console.log(this.rooms);
            // 清空 宿舍号
            this.roomsValue = ''
            // 每次点击编辑按钮的时候，将数组中的状态都重置为true，否则点击一次之后被禁用选项的状态会一直保持
            for(let i=0;i<this.buildings.length;i++){
                this.buildings[i].disabled=false
            }
            
            // 获取当前这一行的index
            this.editIndex=index
            // 点击编辑后，修改对话框控制显示隐藏属性的值
            this.dialogVisible=true
            // 获取当前点击这一行的学号
            this.editNum = this.students[index].num
            // 获取当前点击这一行的姓名
            this.ruleForm.name = this.students[index].name
            // 获取当前点击这一行的住宿状态
            this.liveLocked = this.students[index].liveStatus
            // 获取当前点击这一行的性别
            if(this.students[index].sex == '女'){
                // 如果当前这一行的性别是女生，则设置单选按钮的默认值为女
                this.locked = '女'
                // 遍历宿舍楼列表，将全部男生宿舍禁用
                for(let i=0;i<this.buildings.length;i++){
                    if(this.buildings[i].buildingType!='女寝'){
                        this.buildings[i].disabled=true
                    }
                }
            }else{
                this.locked = '男'
                for(let i=0;i<this.buildings.length;i++){
                    if(this.buildings[i].buildingType!='男寝'){
                        this.buildings[i].disabled=true
                    }
                }
            }
            // 获取当前这一行所在的宿舍楼   值：XX宿舍楼
            this.buildingValue = this.students[this.editIndex].building

            // 当前楼栋的 id 
            this.nowBuilding = this.students[this.editIndex].buildingId
            console.log(this.nowBuilding);
            // 当前选择的这一栋楼内 还有床位的寝室
            this.roomsDisabled()

            //  获取当前这一行所在的寝室号
            this.roomsValue = this.students[this.editIndex].room
            // 获取专业
            this.ruleForm.major = this.students[index].major
        },
        // 保存后，把修改的内容替换原来的内容
        save(formName){
            this.students[this.editIndex].name = this.ruleForm.name
            // 修改后的性别值
            if(this.locked == '男'){
                this.students[this.editIndex].sex = '男'
            }else{
                this.students[this.editIndex].sex = '女'
            }
            // 保存修改后的宿舍楼的信息
            this.students[this.editIndex].building = this.buildingValue
            // 保存修改后的 寝室号
            this.students[this.editIndex].room = this. roomsValue
            // 保存修改后的住宿状态信息
            this.students[this.editIndex].liveStatus = this.liveLocked
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
        // 改变性别时触发
        sexChange(){
            this.buildingValue='请选择'
            this.roomsValue=''
            // select框禁用重置
            for(let i=0;i<this.buildings.length;i++){
                this.buildings[i].disabled=false
            }
            // 性别改变为男时
            if(this.locked == '男'){
                for(let i=0;i<this.buildings.length;i++){
                    if(this.buildings[i].buildingType!='男寝'){
                        this.buildings[i].disabled=true
                    }
                }
            }else{
                // 性别改变为女时
                for(let i=0;i<this.buildings.length;i++){
                    if(this.buildings[i].buildingType!='女寝'){
                        this.buildings[i].disabled=true
                    }
                }
            }
            if(this.liveLocked!='退宿'){
                this.$root.$message('请选择宿舍');
            }
        },
        // 住宿状态
        liveChange(){
            if(this.liveLocked != '住宿'){
                this.buildingValue='当前为非住宿状态'
                this.roomsValue = '当前为非住宿状态'
            }
        },
        // 修改宿舍楼栋,这个value是自动传过来的
        selectAddress(value){
            let obj = {}
            // 当 楼栋 发生改变时，清空宿舍号的值
            this.rooms=[]
            this.roomsValue =''
            // find方法会在buildings数组中遍历寻找符合要求的value，之后再将符合要求的 '对象'，赋值给obj，之后再获取obj中的属性
            obj = this.buildings.find((item) => {
                return item.buildingId=== value
            })
            // 在这里获取obj的属性，obj就是当前select框中选择的那个完整的对象
            this.buildingValue=obj.label
            // if(this.liveLocked != '住宿'){
            //     this.buildingValue = ''
            // }
            this.liveChange()
            this.nowBuilding = obj.buildingId
            this.roomsDisabled()
        },
        // 修改所在寝室
        // 思考：AllRooms[]数组中装着所有 room 的信息，拿到 this.buildingValue的值，然后去遍历 AllRooms[]
        // buildingNum == this.buildingValue，则吧 buildingNum 这一条 push 到rooms[]
        // 下拉选择框，渲染的是，和楼栋相匹配的 rooms[] 中的寝室号
        // 渲染之前，先遍历 rooms[]，if 某个宿舍的 surplus == 0，则把这个宿舍的 disabled=true (禁用掉剩余床位为0的宿舍)
        selectRoom(value){
            let obj={}
            obj = this.rooms.find((item) => {
                return item.roomId=== value
            })
            // 在这里获取obj的属性，obj就是当前select框中选择的那个完整的对象
            // console.log(obj);
            // 当前选择的寝室号
            this.roomsValue=obj.room
            this.liveChange()
        },
        // 删除一行
        handleDelete(index){
            // 询问后再关闭
            this.$confirm('确认删除？')
                .then(_ => {
                    this.students.splice(index,1)
                    this.$root.$message.success('删除成功');
                })
                .catch(_ => {});
        },
        // 关闭对话框
        handleClose(done) {
            // 点击右上角的 x 直接关闭
            done();
        },
        // 搜索功能
        search(){
            if(this.value != 1 && this.value != 2){
                this.$root.$message('请选择查找方式');
            }
            // 按学号查找
            if(this.value==1){
                for(let i=0;i<this.students;i++){
                    
                }
            }
            console.log(this.value);
        },
        // 根据所选楼栋，添加该楼栋的宿舍信息，并设置禁用
        roomsDisabled(){
            for(let i=0;i<this.AllRooms.length;i++){
                // console.log(this.AllRooms[i]);
                if(this.AllRooms[i].buildingId == this.nowBuilding){
                    this.rooms.push(this.AllRooms[i])
                }
            }
            for(let j=0;j<this.rooms.length;j++){
                if(this.rooms[j].surplus==0){
                    this.rooms[j].disabled=true
                }
            }
        },
        insertShow(){
            this.insertDialogVisible=true
        },
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
                        this.students.push(this.tableData[i])
                    }
                    this.totalNum = this.students.length
                } catch (e) {
                    console.log('出错了：：')
                    return false
                }
            }
            fileReader.readAsBinaryString(file)
        },
        // 分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;    //动态改变
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;    //动态改变
        }
    }
  }
</script>

<style lang="scss" scoped>
.student{
    padding-left: 20px;
    box-sizing: border-box;
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
        }
        .upload{
            display: inline-block;
            margin-left: 10px;
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
        .buttons{
            padding-left: 35%;
        }
    }
}
</style>