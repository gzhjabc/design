<template>
    <div class="technique">
        <div class="technique-title">
            <el-icon>
                <Cpu />
            </el-icon>
            <h3>技术介绍</h3>
        </div>
        <el-row :gutter="20">
            <el-col
            v-for="item in technique.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
            :key="item._id"
            :span="24"
            
            >
            <el-card body-style="background-color:  #E6E8EB">
                <template #header>
                <div class="card-header">
                    <span>{{ item.name }}</span>
                </div>
                </template>
                <div class="text" v-html="item.content"></div>
            </el-card>
            </el-col>
        </el-row>
        <el-pagination
            :current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15, 20]"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="technique.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
      </el-pagination>
    </div>
</template>

<script>
import { cloud } from '@/utils/laf-cloud'
export default {
    data() {
        return{
            technique: [],
            currentPage:1, // 当前页码
            pageSize:10 //每页显示的行数
        }
    },
    async created () {
        console.log(cloud)

        let db = cloud.database()

        let collection = db.collection('technique')

        let technique = await collection.get()
        console.log(technique)
        this.technique = technique.data

        // 刷新当前页面保留当前分页
        this.currentPage = Number(sessionStorage.getItem('pagination3')) || 1;
        this.handleCurrentChange(this.currentPage);
        // 把滚动的高度设置为0
        document.documentElement.scrollTop = 0;
        // 刚进入路由时设置当前页码为1
        this.currentPage = 1;
    },
    methods: {
         // 监听 page size 改变的事件
         handleSizeChange (newSize) {
            this.pageSize = newSize
        },
        // 监听 页码值 改变的事件
        handleCurrentChange (newPage) {
            this.currentPage = newPage
        }
    },
    beforeUpdate() {
        // 刷新页面保留当前页面，通过会话存储当前页
        sessionStorage.setItem('pagination3',this.currentPage);
    },
    // 离开路由后设置页码为1
    beforeRouteLeave () {
        sessionStorage.setItem('pagination3',1)
    },
    // 监听当前页码，只要当前页码变化，页面就应该设置滚动高度为0
  watch:{
    "currentPage":{
      // 只要页码变化了，就会进入handle方法
      handler(newVal,oldVal){
        // 把滚动的高度设置为0
        document.documentElement.scrollTop = 0;
      }
    }
    }
}
</script>

<style lang="less" scoped>
        .technique {
        padding: 20px;
        display: flex;
        flex-direction: column;
        // align-items: center;
        background-color: #f5f5f5;
        // justify-content: space-around;

        .technique-title {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            // margin-left: 20px;
            .el-icon{
                font-size: 20px;
                margin-right: 10px;
            }

            h3 {
                font-family: 黑体;
                font-weight: bold;
            }
        }

        .el-row {
            
            .el-card {
                transition: all 0.4s;
                margin-bottom: 20px;
                &:hover {
                    box-shadow: 0 8px 8px 0 grey;  // 设置盒子阴影
                    transform: translate(0, -10px);
                }
                .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                }

                .text {
                text-indent: 20px;
                font-size: 14px;
                line-height: 30px;
                }
  
            }
    }
            .el-pagination {
                justify-content: center;
            }
}
</style>