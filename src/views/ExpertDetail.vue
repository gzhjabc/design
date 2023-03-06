<template>
    <div class="expertdetail">
        <el-row :gutter="20">
            <el-col
            v-for="(o) in 1"
            :key="o"
            :span="24"
            
            >
            <el-card body-style="display: flex;justify-content: space-between;flex-direction: column;">
                <div class="item">
                    <div>
                        <img :src="expert.img" alt="" width="180" height="240">
                        <h3>{{ expert.name }}————{{ expert.position }}</h3>
                    </div>
                </div>
                <h2>专家介绍</h2>
                <div class="content">
                    <p v-html="expert.content"></p>
                </div>
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
        expert: [],
        id: 0
    }
  },
  created () {

    let _id = this.$route.query.id;
    this.getExpertsDetailInfo(_id);
    // 设置初始页面高度
    document.documentElement.scrollTop = 0;
  },
  methods: {
    // 封装获取当前id的专家信息的方法
        async getExpertsDetailInfo(id) {
        
            this.id = this.expert._id;
            console.log(id);

            let res = await cloud.database().collection('expert').doc(id).get()
            this.expert = res.data
            console.log(res)

        },

    }
}
</script>

<style lang="less" scoped>
        .expertdetail {
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

                h2 {
                    margin-bottom: 10px;
                    color:  #337ecc;
                    font-weight: bold;
                }

                .item {
                display: flex;
                font-size: 16px;
                color: #303133;
                justify-content: center;

                div {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 30%;

                    h3 {
                        margin-left: 20px;
                        font-size: 22.5px;
                        font-weight: bold;
                        white-space: nowrap;
                    }
                }
                }    
                .content {
                    display: flex;
                    color: #606266;
                    text-indent: 20px;
                }
                
            }
    }
</style>