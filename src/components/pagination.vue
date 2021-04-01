// 分页器
<template lang="pug">
    el-pagination.pagination(background
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="cCurrentPage"
            :page-sizes="[1, 3, 5, 8]"
            :page-size="pageSize") 

</template>

<script>
export default ({
    props:{
        currentPage:Number,
        pageSize:Number,
        totalNum:Number
    },
    data() {
        return{
            // 直接修改父元素传过来的值会报错，所以在子组件的data中设置变量接受props的值，然后使用修改的都是data中的值
            cCurrentPage:this.currentPage,
            cPageSize:this.pageSize,
            cTotalNum:this.totalNum
        }
    },
    created(){
        // console.log(this.currentPage,this.pageSize,this.totalNum);
    },
    methods:{
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;    //动态改变
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.cCurrentPage = val;    //动态改变
            // 把修改过后的值传回给父组件
            this.$emit("updatePage",this.cCurrentPage)
        }
    }
})
</script>
