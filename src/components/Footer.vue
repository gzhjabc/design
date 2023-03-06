<template>
  <div class="footer-b">
    <div class="heart">
      <div class="footer-i">
        <h2 style="display:flex;justify-content: center;">
          <a href=""><img src="../assets/hospitallogo.png" alt="" width="60" height="60" /></a>
        </h2>
        <p style="line-height: 1.6em">
          广东省人民医院将始终坚持以习近平新时代中国特色社会主义思想为指导，深入贯彻落实党中央决策部署及省委工作安排，按照广东省卫生健康委工作要求，与时俱进深化“1+1+9”工作部署，以国际视野、战略高度、前瞻性规划和脚踏实地的精神，不断推进高水平医院建设，为争创全国卫生健康高质量发展示范省、建设健康中国贡献智慧和力量！
        </p>
      </div>
      <div class="footer-m">
        <el-card shadow="hover" class="links" body-style="display:flex;flex-direction: column;">
          <p>友情链接</p>
          <div>
            <div v-for="link in links" :key="link._id">
              <img :src="link.logo" alt="" style="width: 20px; height: 20px">
              <el-link :underline="false" :href="link.url">{{ link.title }}</el-link>
            </div>
          </div>
        </el-card>
      </div>
      <div class="footer-r">
        <p>主办单位：广东省人民医院 (粤ICP备14099214号)</p>
        <p>地址：广州市中山二路106号</p>
        <h3>总机：（020）83827812</h3>
      </div>
    </div>
  </div>
</template>
  
<script>
import { cloud } from '@/utils/laf-cloud'
export default {
  data() {
    return {
      // 友情链接数据
      links: []
    };
  },
  async created() {
    console.log(cloud)

    let db = cloud.database()
    let collection = db.collection('links')
    // 请求友情链接数据
    let links = await collection.get()
    console.log(links)
    this.links = links.data
  },
};
</script>
   
<style lang = "less" scoped>
.links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  a {
    font-size: 16px;
    display: inline-block;
    margin: 20px;
    outline: none;
  }

  div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
}

.footer-b {
  width: 100%;
  /* margin-top: 20px; */
  // height: 300px;
  padding: 20px;
  background: #337ecc;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;

  .heart {
    display: flex;
    justify-content: space-between;
    width: 1250px;

    .footer-i {
      padding-right: 32px;

      p {
        padding-top: 27px;
        width: 426px;
        height: 55px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
      }
    }

    //   ul {
    //     margin-top: 123px;
    //     width: 293px;
    //     display: flex;
    //     justify-content: space-between;
    //     li {
    //       border-right: 1px solid #9e9e9e;
    //       height: 20px;
    //       position: relative;
    //       text-align: center;
    //       img {
    //         position: absolute;
    //         left: -20%;
    //         top: -110px;
    //         display: none;
    //       }
    //       &:hover {
    //         img {
    //           display: block;
    //         }
    //       }
    //       a {
    //         height: 19px;
    //         font-size: 16px;
    //         font-family: Microsoft YaHei;
    //         font-weight: 400;
    //         color: #7d879a;
    //         padding-right: 16px;
    //         text-decoration: none;
    //       }
    //       &:last-child {
    //         border-right: 0;
    //       }
    //     }
    //   }
    .footer-r {
      padding-left: 32px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      p {
        width: 400px;
        height: 14px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
      }

      h3 {
        margin-top: 10px;
        //   width: 220px;
        //   height: 22px;
        font-size: 25px;
        font-family: SourceHanSansSC;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
}</style>