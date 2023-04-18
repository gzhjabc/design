<template>
    <div class="header">
            <div class="header-wrap">
                <el-row>
                <el-col :span="12">
                    <div class="l">
                        欢迎来到人民医院
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-row justify="end">
                        <el-col :lg="4" :md="5" :sm="5" :xs="5">
                            <router-link to="/query">
                                <el-button type="primary">
                                    前往查询
                                </el-button>
                            </router-link>
                        </el-col>
                        <el-col :lg="4" :md="5" :sm="5" :xs="5">
                            <router-link to="/reserve">
                                <el-button type="primary">
                                    前往预约
                                </el-button>
                            </router-link>
                        </el-col>
                        <el-col :lg="5" :md="6" :sm="6" :xs="6">
                            <a link rel="stylesheet" href="https://e5i8o0-scui.site.laf.dev/#/">
                                <el-button type="primary">
                                    前往后台登录
                                </el-button>
                            </a>
                        </el-col>
                    </el-row>
                </el-col>    
                </el-row>
            </div>
</div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style lang = "less" scoped>
.header {
    height: 40px;
    background: #337ecc;

    .header-wrap {
        color: #FFFEFE;
        height: 40px;
        font-size: 14px;
        /*     background-color: #fcf; */
        display: flex;
        justify-content: space-between;
        align-items: center;

        .l {
            line-height: 32px;
            margin-left: 40px;
            font-family: 黑体;
        }
    }

    .el-row {
        width: 100%;
    }
}
</style>