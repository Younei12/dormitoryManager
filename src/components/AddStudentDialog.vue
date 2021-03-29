// 添加学生 对话框
<template lang="pug">
    .studentDialog
        // ref="ruleForms" ruleForms 代指整个表单                      
        el-form(:model="ruleForm" :rules="rules" ref="ruleForms")
            // 学号唯一
            .editRow
                el-form-item(label="学号" prop="num")
                    el-input.editInput(v-model="ruleForm.num")
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
export default ({
    props: {
        
    },
    data() {
        return {
            dialogVisible:false,
            // 楼栋的name
            buildingValue:'',
            // 楼栋的id
            nowBuilding:'',
            // 宿舍号 room字段值
            roomsValue:'',
            editIndex:'',
            inputSearch: '',
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
                num:'',
                name:'',
                liveStatus:'',
                major:''
            },
            // 表单验证规则
            rules:{
                num:[
                    { required: true, message: '请输入学生学号', trigger: 'blur' },
                    { min: 11, max: 11, message: '长度11 个字符', trigger: 'blur' }
                ],
                name:[
                    { required: true, message: '请输入学生姓名', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                major:[
                    {required: true, message: '请输入学生所在专业', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        sexChange(){},
        liveChange(){},
        selectAddress(){},
        selectRoom(){},
        save(){
            this.dialogVisible = false
        }
    }
})
</script>
<style lang="scss" scoped>
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
</style>