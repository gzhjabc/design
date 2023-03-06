<template>
    <div class="disease">
        <div class="disease-title">
            <el-icon>
                <List />
            </el-icon>
            <h3>疾病介绍</h3>
        </div>
        <div class="table-box">
            <el-table :data="disease.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border="true" stripe
                style="width:100%" :row-style="tableRowStyle" :header-row-style="tableHeaderColor">
                <el-table-column type="expand" align="center" header-align="center">
                    <template #default="props">
                        <div class="disease-content">
                            <p>疾病症状:</p>
                            <p class="disease-item" v-html="props.row.content"></p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="疾病名称" prop="name" align="center" header-align="center" />
                <el-table-column label="疾病类型" align="center" header-align="center">
                    <template #default="scope">
                        <el-tag>
                            {{ scope.row.type }}
                        </el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]" background
                layout="total, sizes, prev, pager, next, jumper" :total="disease.length" @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { cloud } from '@/utils/laf-cloud'
export default {
    data() {
        return {
            disease: [],
            currentPage: 1, // 当前页码
            pageSize: 10 //每页显示的行数
        }
    },
    created() {
        this.getData();
        // 刷新当前页面保留当前分页
        this.currentPage = Number(sessionStorage.getItem('pagination1')) || 1;
        this.handleCurrentChange(this.currentPage);
        // 把滚动的高度设置为0
        document.documentElement.scrollTop = 0;
    },
    beforeUpdate() {
        // 刷新页面保留当前页面，通过会话存储当前页
        sessionStorage.setItem('pagination1', this.currentPage);
    },
    beforeDestroy() {
        sessionStorage.setItem('pagination1', 1)
    },
    methods: {
        async getData() {
            console.log(cloud)

            let db = cloud.database()

            let collection = db.collection('disease')

            let disease = await collection.get()
            console.log(disease)
            this.disease = disease.data
            this.total = this.disease.length
        },

        //设置表格行的样式
        tableRowStyle({ row, rowIndex }) {
            return 'font-size:16px;'
        },
        //设置表头行的样式
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {
            return 'background-color: #79bbff;color: #303133;font-weight:bold;font-family:黑体;font-size:18px;'
        },

        // 监听 page size 改变的事件
        handleSizeChange(newSize) {
            this.pageSize = newSize
        },
        // 监听 页码值 改变的事件
        handleCurrentChange(newPage) {
            this.currentPage = newPage
        }

    }

}
</script>

<style lang="less" scoped>
.disease {
    overflow: auto;
    padding: 50px;
    display: flex;
    flex-direction: column;
    // align-items: center;
    background-color: #f5f5f5;

    .disease-title {
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

    .table-box {
        display: flex;
        flex-direction: column;
        align-items: center;

        .el-table {
            box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, .04), 0px 8px 20px rgba(0, 0, 0, .08);
            word-break: break-all;
            margin-bottom: 20px;
            transition: all 0.4s;

            &:hover {
                box-shadow: 0 8px 8px 0 grey; // 设置盒子阴影
                transform: translate(0, -10px);
            }

            .disease-content {
                padding: 20px;

                .disease-item {
                    text-indent: 20px;
                }
            }
        }
    }
}
</style>