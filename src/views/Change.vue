// 更换宿舍
<template lang="pug">
    <div>
        el-upload(
            class="upload"
            action=""
            :multiple="false"
            :show-file-list="false"
            accept="csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :http-request="httpRequest")
            el-button(size="small" type="primary") 上传
        el-table(:data="tableData" border style="width: 100%")
            el-table-column(prop="num" label="学号")
            el-table-column(prop="name" label="名字")
            el-table-column(prop="sex" label="性别")
            el-table-column(prop="live" label="住宿状态")
            el-table-column(prop="building" label="宿舍楼")
            el-table-column(prop="building" label="宿舍楼")
            el-table-column(prop="room" label="寝室号")
            el-table-column(prop="major" label="专业")
    </div>
</template>

<script>
import XLSX from 'xlsx'
export default ({
    data() {
        return{
            tableData: []
        }
    },
    methods: {
	    httpRequest (e) {
            let file = e.file // 文件信息
            // console.log('e: ', e)
            // console.log('file: ', e.file)
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
