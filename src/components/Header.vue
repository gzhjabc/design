<template>
    <div class="nav">
    <div class="nav-wrap">
      <div class="l">
        <h1>
          <img src="../assets/hospitallogo.png" alt="" />
        </h1>
      </div>
      <div class="c">
        <el-menu
    :default-active="$route.path"
    router="true"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
          <!-- 点击的时候，路由跳转 -->
          <!-- 动态添加样式 当前项的效果 -->
          <!-- 判断条件 ：当前路径是/home 就首页这个li加active -->
          <!-- 此处的index作为路由的路径使用，详见element的菜单功能 -->
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/section">科室</el-menu-item>
          <el-menu-item index="/disease">疾病</el-menu-item>
          <el-menu-item index="/expert">专家</el-menu-item>
          <el-menu-item index="/technique">技术</el-menu-item>
          <el-menu-item index="/article">文章</el-menu-item>
        </el-menu>
      </div>
      <!-- <div class="r">
        <input type="text" placeholder="请输入" />
        <span class="search-btn"
          ><img src="../assets/img/search.png" alt=""
        /></span>
      </div> -->
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
    };
  },
  // created () {
  //   this.$router.path = '/home'
  // },

  // 由于element的菜单有路由跳转功能所以 method的路径跳转方法不用了
  // methods:{
    // toPage(url) {
    //   console.log(url);
      // 作用路径跳转
      // this.$router.push(路径)
      // this.$router.push(url)
      // 只要使用了push方法就要一定写catch(err=>{})
      // this.$router.push(url).catch(err=>{})
    // },
    
  // }
}
</script>

<style lang="less" scoped>
    .nav-wrap {
  height: 118px;
  display: flex;
  // justify-content: space-between;
  align-items: center;

  .l img{
    margin: 0 60px;
    width: 50px;
    height: 50px;
  }
  .c ul {
    width: 1000px;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    li{
      // width: 200px;
      padding: 10px 55px;
      font-size: 20px;
      font-weight: bold;
    }
    
  }
  // .r {
  //   display: flex;
  //   input {
  //     width: 214px;
  //     height: 40px;
  //     border: 1px solid #dedede;
  //     border-radius: 20px 0 0 20px;
  //     float: left;
  //     box-sizing: border-box;
  //     padding-left: 19px;
  //     outline-style: none;
  //   }
  //   .search-btn {
  //     width: 50px;
  //     height: 40px;
  //     background: #0a328e;
  //     border-radius: 0px 20px 20px 0px;
  //     text-align: center;
  //     line-height: 44px;
  //   }
  // }
}
</style>