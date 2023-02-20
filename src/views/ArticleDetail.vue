<template>
    <div class="articledetail">
        <el-row>
            <el-col
            :span="24"
            
            >
            <el-card body-style="display: flex;flex-direction: column;align-items: center;">
                <h1 style="text-align: center;line-height: 40px;">{{ article.title }}</h1>
                <div class="item">
                    <span>点击数：{{ article.hit }}</span>
                    <span>作者：{{ article.author }}</span>
                    <time>发布时间：{{ article.time }}</time>
                </div>
                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>
                <div class="content" v-html="article.content"></div>
            </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { cloud } from '@/utils/laf-cloud'
export default {
    data() {
    return {
        article: [],
        id: 0
    }
  },
  created () {

    let _id = this.$route.query.id;
    this.getArticlesDetailInfo(_id);
    // 设置初始页面高度
    document.documentElement.scrollTop = 0;
  },
  methods: {
    // 封装获取当前id的专家信息的方法
        async getArticlesDetailInfo(id) {
        
            this.id = this.article._id;
            console.log(id);
            let res = await cloud.database().collection('article').doc(id).get()
            this.article = res.data
            console.log(res)
            // 增加阅读量
            this.article.hit = res.data.hit + 1
            // 更新数据
            let res2 = await cloud.database().collection('article').doc(id).update({
                hit: this.article.hit
            })
            console.log(res2)
        },
    }
}
</script>

<style lang="less" scoped>
        .articledetail {
        padding: 20px;
        display: flex;
        flex-direction: column;
        // align-items: center;
        background-color: #f5f5f5;
        // justify-content: space-around;
            
            .el-card {
                line-height: 30px;
                transition: all 0.4s;
                margin-bottom: 20px;
                &:hover {
                    cursor: pointer;
                    box-shadow: 0 8px 8px 0 grey;  // 设置盒子阴影
                    transform: translate(0, -10px);
                }

                .item {
                // margin-bottom: 18px;
                display: flex;
                color: #303133;
                font-size: 16px;
                justify-content: space-between;
                width: 40%;
                margin-top: 20px;
                }
                
                .content {
                    font-size: 16px;
                    line-height: 40px;
                    display: flex;
                    color: #606266;
                    text-indent: 20px;
                    flex-direction: column;
                }
            }
    }

</style>