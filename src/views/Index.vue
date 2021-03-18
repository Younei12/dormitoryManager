<template lang="pug">
    .Index 
        // 上下两区域，再分左右
        .top
            .topLeft
                .leftImage
                    .image
                        img.managerImage(:src="image")
                    .text
                        p 宿舍管理员
                        span 管理员
                .imageData 当前学生总数：
                    span {{studentNum}} 
                .imageData 当前宿舍总数: 
                    span {{dormitoryNum}}
            .topRight
                .num1
                    .icon(class="iconfont icon-xuesheng")
                    .text
                        p 29/380
                        span 在住人数/总容纳人数
                .num2
                    .icon(class="iconfont icon-xuesheng")
                    .text
                        p 34
                        span 离校登记人数
                .num3
                    .icon(class="iconfont icon-xuesheng")
                    .text
                        p 21
                        span 待处理的保修设备单
                .num4
                    .icon(class="iconfont icon-xuesheng")
                    .text
                        p 280
                        span 空床位
        .bottom
            #leftEchart
            #rightEchart
</template>

<script>
import ManagerImage from '../assets/images/1.jpg'
export default ({
    data() {
        return{
            chart1Data:[],
            image:ManagerImage,
            studentNum:350,
            dormitoryNum:98,
            leftSeriest:[2, 4, 1, 0, 3, 2, 1]
        }
    },
    created(){
        this.getData()
    },
    mounted(){
        this.createRightEchart();
        this.createLeftEchart()
    },
    methods:{
        getData(){
            this.chart1Data=[
                {value: 351, name: '未分配'},
                {value: 735, name: '在住'},
                {value: 96, name: '退宿'}
            ]
        },
        createRightEchart(){
            //基于准备好的dom，初始化echarts实例
            let rightEChart = this.$echarts.init(document.getElementById('rightEchart'));
            // 绘制图表
            rightEChart.setOption({
                // title表示的是图标标题
                title: {
                    text: '某站点用户访问来源',     // 正标题
                    subtext: '纯属虚构',    // 副标题
                    left: 'center'      // 标题位置
                },
                // tooltip用户设置图标鼠标悬浮时的提示信息
                tooltip: {
                    trigger: 'item'     // 触发类型，默认item(数据触发,鼠标放上区域有数据？？), axis
                },
                // 图例
                legend: {
                    // 与图例相关的属性
                    orient: 'vertical', // 布局方式，默认为horizontal（水平布局），vertical为垂直布局
                    left: 'left',   // 图例的位置
                },
                // 横轴通常为类目型，但条形图时则横轴为数值型，散点图时则横纵均为数值型 
                series: [
                    {
                        name: '访问来源', // 鼠标放上对应区域，弹出提示框，name用于设置提示框的标题
                        type: 'pie',    // 设置图形类型
                        radius: '50%',
                        data: this.chart1Data,  // 数值
                        emphasis: { // 高亮
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ],
                // 自定义的颜色
                color:[ 
                //    'rgb(193,203,215)','rgb(130,150,167)','rgb(156,168,184)'
                    '#425d8a','#abbcda','#cfe0f7'
                ]
            });
        },
        createLeftEchart(){
            //基于准备好的dom，初始化echarts实例
            let leftEChart = this.$echarts.init(document.getElementById('leftEchart'));
            // 绘制图表
            leftEChart.setOption({
               xAxis: {
                    name:'时间',    // x轴名称
                    type: 'category',
                    data: ['03/01', '03/02', '03/03', '03/04', '03/05', '03/06', '03/07']
                },
                yAxis: {
                    name:'保修量',  // y轴名称
                    type: 'value'
                },
                series: [{
                    data: this.leftSeriest,
                    type: 'bar'
                }],
                color:['#336397']
            })
        }
    }
})
</script>

<style lang="scss" scoped>
.Index{
    padding: 20px;
    .top{
        display: flex;
        margin-bottom: 30px;
        .topLeft{
            width: 500px;
            padding: 20px;
            box-sizing: border-box;
            box-shadow: rgb(223, 218, 213) 0 0 0.3rem;
            .leftImage{
                display: flex;
                .image{
                    width: 34%;
                    .managerImage{
                        width: 100%;
                        border-radius: 50%;
                        vertical-align: middle;
                    }
                }
                .text{
                    padding-top: 10%;
                    span{
                        font-size: 14px;
                        color: #425d8a;
                    }
                }
            }
            .imageData{
                padding-left:34px;
                font-size: 16px;
                span{
                    color: #80b5d0;
                }
            }
            .imageData:nth-child(1){
                margin-bottom: 10px;
            }
        }
        .topRight{
            width: 600px;
            margin-left: 30px;
            > div{
                display: flex;
                float: left;
                width: 290px;
                height: 110px;
                box-shadow: rgb(223, 218, 213) 0 0 0.3rem;
                .icon{
                    width: 34%;
                    text-align: center;
                    line-height: 110px;
                    font-size: 32px;
                    color:#fff;
                    background-color: #416eb8;
                }
                .text{
                    font-size: 16px;
                    padding-top: 30px;
                    margin-left: 20px;
                    text-align: center;
                    // height: 110px;
                }
            }
            >div:nth-child(2n){
                margin-left: 16px;
            }
            >div:nth-child(1),div:nth-child(2){
                margin-bottom: 16px;
            }
        }
    }
    .bottom{
        display: flex;
        #leftEchart{
            width: 600px;
            height: 400px;
            margin-right: 30px;
            // background-color: rgb(235, 233, 233); 
            box-shadow: rgb(223, 218, 213) 0 0 0.3rem;
        }
        #rightEchart{
            padding-top: 20px;
            width: 600px;
            height: 380px;
            // background-color: rgb(243, 243, 243); 
            box-shadow: rgb(223, 218, 213) 0 0 0.3rem;
        }
    }
}  
</style>