<template>
    <div class="article">
        <div class="article-title">
            <el-icon>
                <Reading />
            </el-icon>
            <h3>文章中心</h3>
        </div>
        <el-row :gutter="20">
            <el-col v-for="item in article.slice((currentPage - 1) * pageSize, currentPage * pageSize)" :key="item._id"
                :span="24" @click=goToDetail(item._id)>
                <el-card
                    body-style="background-color: #E6E8EB;display: flex;justify-content: space-between;align-items: center;">
                    <div class="item">
                        <time>{{ item.time }}</time>
                        <span>{{ item.title }}</span>
                    </div>
                    <div class="detailed">查看详情></div>
                </el-card>
            </el-col>
        </el-row>
        <el-pagination :current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 6, 9, 12]" background
            layout="total, sizes, prev, pager, next, jumper" :total="article.length" @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
import { cloud } from '@/utils/laf-cloud'
export default {
    data() {
        return {
            article: [],    //文章数据
            currentPage: 1, // 当前页码
            pageSize: 6 //每页显示的行数
        }
    },
    async created() {
        console.log(cloud)

        let db = cloud.database()

        let collection = db.collection('article')

        let article = await collection.get()
        console.log(article)
        this.article = article.data
        // 刷新当前页面保留当前分页
        this.currentPage = Number(sessionStorage.getItem('pagination4')) || 1;
        this.handleCurrentChange(this.currentPage);
        // 把滚动的高度设置为0
        document.documentElement.scrollTop = 0;
    },
    beforeUpdate() {
        // 刷新页面保留当前页面，通过会话存储当前页
        sessionStorage.setItem('pagination4', this.currentPage);
    },
    // 离开路由后设置页码为1
    beforeRouteLeave() {
        sessionStorage.setItem('pagination4', 1)
    },

    methods: {
        goToDetail(id) {
            // this.$router.push(路径)路由跳转
            // 携带query参数 url？id =值
            // 携带param参数 url/值

            this.$router.push(`/articledetail?id=${id}`)
        },
        // 监听 page size 改变的事件
        handleSizeChange(newSize) {
            this.pageSize = newSize
        },
        // 监听 页码值 改变的事件
        handleCurrentChange(newPage) {
            this.currentPage = newPage
        },
    },
    // 监听当前页码，只要当前页码变化，页面就应该设置滚动高度为0
    watch: {
        "currentPage": {
            // 只要页码变化了，就会进入handle方法
            handler(newVal, oldVal) {
                // 把滚动的高度设置为0
                document.documentElement.scrollTop = 0;
            }
        },
    }
}
</script>

<style lang="less" scoped>
.article {
    padding: 20px;
    display: flex;
    flex-direction: column;
    // align-items: center;
    background-color: #f5f5f5;
    // justify-content: space-around;

    .article-title {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        // margin-left: 20px;
        .el-icon {
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
                cursor: pointer;
                box-shadow: 0 8px 8px 0 grey; // 设置盒子阴影
                transform: translate(0, -10px);
            }

            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .item {
                // margin-bottom: 18px;
                display: flex;
                flex-direction: column;
                color: #303133;

                time {
                    font-size: 16px;
                }

                span {
                    margin-top: 5px;
                    font-size: 18px;
                }

            }

            .detailed {
                display: flex;
                justify-content: flex-end;
                color: #606266
            }
        }
    }

    .el-pagination {
        justify-content: center;
    }
}
</style>