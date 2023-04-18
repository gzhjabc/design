<template>
  <div class="nav">
    <div class="nav-wrap">
      <div class="l hidden-xs-only">
        <h1>
          <img src="../assets/hospitallogo.png" alt="" />
        </h1>
      </div>
      <div class="c hidden-xs-only">
        <el-menu :default-active="$route.path" router="true" mode="horizontal" @select="handleSelect">
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
      <el-row class="r hidden-sm-and-up" justify="center">
        <el-col :xs="20">
          <el-menu :default-active="$route.path" router="true" @open="handleOpen" @close="handleClose">
            <el-sub-menu index="/home">
              <template #title>
                <el-icon>
                  <Menu />
                </el-icon>
                <span>菜单</span>
              </template>
              <el-menu-item index="/home">首页</el-menu-item>
              <el-menu-item index="/section">科室</el-menu-item>
              <el-menu-item index="/disease">疾病</el-menu-item>
              <el-menu-item index="/expert">专家</el-menu-item>
              <el-menu-item index="/technique">技术</el-menu-item>
              <el-menu-item index="/article">文章</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    handleOpen(index, indexPath) {
      console.log(index, indexPath);
      this.isMenuOpen = true;
      this.$emit('handleHeaderHeight', this.isMenuOpen)
    },
    handleClose(index, indexPath) {
      console.log(index, indexPath);
      this.isMenuOpen = false;
      this.$emit('handleHeaderHeight', this.isMenuOpen)
    }
  }
  // created () {
  //   this.$router.path = '/home'
  // },

  // 由于element的菜单有路由跳转功能所以 methods的路径跳转方法不用了
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
.nav {
  padding: 2% 0;

  .nav-wrap {
    // height: 118px;
    display: flex;
    // justify-content: space-between;
    align-items: center;

    .l {
      width: 10%;

      h1 {
        display: flex;
        justify-content: center;
      }

      img {
        margin: 0 60px;
        width: 50px;
        height: 50px;
      }
    }


    .c {
      width: 80%;

      ul {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 18px;

        li {
          // width: 200px;
          padding: 10px 55px;
          font-size: 20px;
          font-weight: bold;
        }

      }
    }

    .r {
      min-width: 1024px;

      .el-icon {
        font-size: 40px;
      }

      span {
        padding-left: 20px;
        font-size: 30px;
      }

      .el-menu-item {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>