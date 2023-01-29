<template>
    <div class="home">
        <el-carousel :interval="4000" style="width:1000px;margin:20px auto" height="400px">
            <el-carousel-item v-for="item in banner" :key="item._id">
                <img :src="item.img" alt="" width="1000" height="400">
            </el-carousel-item>
        </el-carousel>
        <el-card>
            <div class="card-title">
                <el-icon><Notebook /></el-icon>
            <h2>医院介绍</h2>
            </div>
            <p>广东省人民医院（广东省医学科学院）创建于1946年，其前身为广州中央医院。经过几代人的共同努力，广东省人民医院已成为集医教研于一体的大型现代化三级甲等综合型医院，在国内外享有盛誉。2019年国家三级公立医院绩效考核获评最高等级A++，位列全国第10；2020年在国家公立医院绩效考核总分891.8分，全国排名第15名，位列A+级别。获评2020年度医疗机构最佳雇主最受大学生欢迎医院。</p>
            <p>广东省人民医院首任院长李廷安博士，毕业于北京协和医学院，获哈佛大学博士学位，是我国公共卫生事业先驱。第二任院长钟世藩博士，也毕业于北京协和医学院，获美国纽约州立大学博士学位，是我国著名儿科学专家、国家一级教授。1949年，全国解放前夕，他拒绝国民党令其携带巨额资金连夜撤到台湾的命令，1950年将医院完整移交给新中国。</p>
            <p>医院创建之初，大批名家聚集，奠定坚实的发展基础。一代代省医人矢志不渝护卫人民健康，坚持不懈攻克疑难重症，屡次创造国内省内第一。1964年，成功应用国产Ⅱ型人工心肺机进行低温低流量分量半体外循环心内直视手术，为中南首例。1972年实施全国首例冠状动脉造影术。1975年成功完成国内首例主动脉瓣人工瓣膜置换术。1985年率先在国内开展皮球囊二尖瓣成形手术治疗风湿性心脏病人。1987年完成广东省内首例连体婴分离手术。1997年完成全国第二例、广东省首例非血缘关系的造血干细胞移植手术。2000年实施全国首创经鼻腔蝶窦入路神经内窥镜下脑垂体腺瘤切除术。2006年多专科联合施行省内首例心肺联合移植术。2015年成功施行国内首例胎儿心脏病外科手术。同年完成国内首例体外膜肺氧合技术（ECMO）支持下的冠状动脉慢性完全闭塞病变（CTO）病变介入治疗手术。2019年开展全国首场AI＋5G远程心脏微创手术。同年完成世界首例经股动脉TAVR+TEVAR一站式手术、全国首例孕妇微创心脏手术。2021年成功实施华南最小龄双肺移植。</p>
        </el-card>
        <div class="news">
            <div class="demo-collapse">
            <div class="card-header">
                <div class="news-title">
                    <el-icon><Memo /></el-icon>
                    <span>资讯</span>
                </div>
                <router-link to="/article">
                    <span>查看更多></span>
                </router-link>
            </div>
            <el-collapse v-for="info in information" :key="info._id" v-model="activeName" accordion>
            <el-collapse-item :title="info.title" name="1">
                <div v-html="info.content" style="text-indent:20px"></div>
            </el-collapse-item>
            </el-collapse>
            </div>
            <div class="demo-collapse">
            <div class="card-header">
                <div class="news-title">
                    <el-icon><Memo /></el-icon>
                    <span>通知公告</span>
                </div>
                <router-link to="/article">
                    <span>查看更多></span>
                </router-link>
            </div>
            <el-collapse v-for="notices in notice" :key="notices._id" v-model="activeName" accordion>
            <el-collapse-item :title="notices.title" name="1">
                <div>
                {{ notices.content }}
                </div>
            </el-collapse-item>
            </el-collapse>
            </div>
        </div>
        
    </div>
</template>

<script>
import { cloud } from '@/utils/laf-cloud'
export default {
    data() {
        return{
            banner: [],
            information: [],
            notice: []
        }
    },
    async created() {
    console.log(cloud)

    let db = cloud.database()

    let collection = db.collection('banner')

    let banner = await collection.get()
    console.log(banner)
    this.banner = banner.data

    let collection1 = db.collection('information')

    let information = await collection1.get()
    console.log(information)
    this.information = information.data

    let collection2 = db.collection('notice')

    let notice = await collection2.get()
    console.log(notice)
    this.notice = notice.data
    },
}
</script>

<style lang="less" scoped>
    .home {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f5f5f5;
        // margin: 20px auto;
        // height: 1200px;
        justify-content: space-around;
    

    .news {
        display: flex;
        justify-content: space-between;
        width: 1000px;
        margin: 20px;

        .demo-collapse {
            width: 470px;
            border:1px solid #e4e7ed;
            border-radius: 5px;
            margin-bottom: 20px;
            padding:20px;
            background-color: #fff;
            box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, .04), 0px 8px 20px rgba(0, 0, 0, .08);
            transition: all 0.4s;

            &:hover {
                box-shadow: 0 8px 8px 0 grey;  // 设置盒子阴影
                transform: translate(0, -10px);
            }


            .card-header {
            line-height:48px;
            font-size: 18px;
            display: flex;
            justify-content: space-between;

            a {
                display: inline-flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                vertical-align: middle;
                position: relative;
                text-decoration: none;
                outline: 0;
                cursor: pointer;
                padding: 0;
                font-size: var(--el-link-font-size);
                font-weight: var(--el-link-font-weight);
                color: var(--el-link-text-color);

                span {
                    font-size: 14px;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                }
            }

            .news-title {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                .el-icon{
                    font-size: 20px;
                    margin-right: 10px;
                }
            }
        }
      }  
    }
}

    .el-card {
        width: 1000px;
        border:1px solid #e4e7ed;
        border-radius: 5px;
        padding:20px;
        margin-bottom: 20px;
        transition: all 0.4s;

        &:hover {
            box-shadow: 0 8px 8px 0 grey;  // 设置盒子阴影
            transform: translate(0, -10px);
        }

        .card-title {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            .el-icon{
                font-size: 20px;
                margin-right: 10px;
            }
        }

        p {
            text-indent: 20px;
        }
    }
</style>