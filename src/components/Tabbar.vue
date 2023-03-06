<template>
    <div class="header">
        <div class="header-wrap">
            <div class="l">
                欢迎来到人民医院
            </div>
            <div class="r">
                <router-link to="/query">
                    <el-button type="primary">
                        前往查询
                    </el-button>
                </router-link>
                <router-link to="/reserve">
                    <el-button type="primary">
                        前往预约
                    </el-button>
                </router-link>

                <a link rel="stylesheet" href="http://localhost:2800">
                    <el-button type="primary">
                        前往后台登录
                    </el-button>
                </a>
            </div>
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
            margin-left: 40px;
            font-family: 黑体;
        }

        .r {
            display: flex;
            justify-content: space-around;
            width: 30%;
        }
    }
}
</style>