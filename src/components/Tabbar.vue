<template>
    <div class="header">
        <div class="header-wrap">
            <div class="l">
                欢迎来到人民医院
            </div>
            <a link rel="stylesheet" href="http://localhost:2800" class="r">
                <el-button type="primary">
                    前往后台登录
                </el-button>
            </a>
        </div>
    </div>
</template>

<script>
    export default{
        data() {
            return{

            }
        }
    }
</script>

<style lang = "less" scoped>
    .header{
        height: 40px;
        background: #337ecc;
        
        .header-wrap{
            color:#FFFEFE;
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
                margin-right: 40px;
            }
        }
    }
</style>