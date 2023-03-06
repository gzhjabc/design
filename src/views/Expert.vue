<template>
    <div class="expert">
        <div class="expert-title">
            <el-icon>
                <User />
            </el-icon>
            <h3>专家列表</h3>
        </div>
        <el-row :gutter="20">
            <el-col
            v-for="experts in expert.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
            :key="experts._id"
            :span="6"
            @click=goToDetail(experts._id)
            >
            <el-card :body-style="{ padding: '10px' }">
                <img
                :src="experts.img"
                class="image"
                />
                <div style="padding: 14px;text-align: center">
                    <p style="font-size:16px;font-weight:bold;">{{ experts.name }}</p>
                    <p style="color: #606266">{{ experts.position }}</p>
                </div>
            </el-card>
            </el-col>
        </el-row>
        <el-pagination
            :current-page="currentPage"
            v-model="pageSize"
            :page-sizes="[4, 8, 12, 16]"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="expert.length"
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
            expert: [],
            currentPage:1, // 当前页码
            pageSize:8 //每页显示的行数
        }
    },
    created() {
    // console.log(cloud)

    // let db = cloud.database()

    // let collection = db.collection('expert')

    // let expert = await collection.get()
    // console.log(expert)
    // this.expert = expert.data
    this.getData()
    // 刷新当前页面保留当前分页
    this.currentPage = Number(sessionStorage.getItem('pagination2')) || 1;
    this.handleCurrentChange(this.currentPage);
    // 把滚动的高度设置为0
    document.documentElement.scrollTop = 0;
    // 刚进入路由时设置当前页码为1
    // this.currentPage = 1;
    },
    beforeUpdate() {
        // 刷新页面保留当前页面，通过会话存储当前页
        sessionStorage.setItem('pagination2',this.currentPage);
    },
    // 离开路由后设置页码为1
    beforeRouteLeave () {
        sessionStorage.setItem('pagination2',1)
    },
    
    methods: {
        goToDetail(id) {
        // this.$router.push(路径)路由跳转
        // 携带query参数 url？id =值
        // 携带param参数 url/值

        this.$router.push(`/expertdetail?id=${id}`)
        },
        async getData() {
            console.log(cloud)

            let db = cloud.database()

            let collection = db.collection('expert')

            let expert = await collection.get()
            console.log(expert)
            this.expert = expert.data
        },
        // 监听 page size 改变的事件
        handleSizeChange (newSize) {
        this.pageSize = newSize
        },
        // 监听 页码值 改变的事件
        handleCurrentChange (newPage) {
        this.currentPage = newPage
        },
    },
    // 监听当前页码，只要当前页码变化，页面就应该设置滚动高度为0
  watch:{
    "currentPage":{
      // 只要页码变化了，就会进入handle方法
      handler(newVal,oldVal){
        // 把滚动的高度设置为0
        document.documentElement.scrollTop = 0;
      }
    },
    }
}
</script>

<style lang="less" scoped>
    .expert {
        padding: 20px;
        display: flex;
        flex-direction: column;
        // align-items: center;
        background-color: #f5f5f5;
        // justify-content: space-around;

        .expert-title {
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
            
            .el-card {
                transition: all 0.4s;
                margin-bottom: 20px;
                &:hover {
                    cursor: pointer;
                    box-shadow: 0 8px 8px 0 grey;  // 设置盒子阴影
                    transform: translate(0, -10px);
                }
                .image {
                width: 100%;
                height: 400px;
                display: block;
                }
            }

            .el-pagination {
                justify-content: center;
            }
    }

</style>