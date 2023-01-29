<script>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import Tabbar from './components/Tabbar.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

// import { cloud } from '@/utils/laf-cloud'

export default {
  components: {
    RouterLink,
    RouterView,
    // HelloWorld,
    Tabbar,
    Header,
    Footer,
  },

  // async created() {
  //   console.log(cloud)

  //   let db = cloud.database()
  //   let collection = db.collection('links')

  //   let links = await collection.get()
  //   console.log(links)
  //   this.links = links.data
  // },

  data() {
    return {
      links: []
    }
  },
}
</script>

<template>
  <div>
    <!-- 顶部 -->
    <Tabbar></Tabbar>
    <!-- 头部以及导航栏 -->
    <Header></Header>
    <!-- <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />

        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header> -->
  <!-- npm init vue@latest -->
    <!-- 渲染视图组件 -->
    <RouterView />
    <!-- 尾部 -->
    <Footer></Footer>
    <!-- 回到顶部 -->
    <el-backtop :right="20" :bottom="40" />
    <!-- <div class="links">
      <div  v-for="link in links" :key="link._id">
        <img :src="link.logo" alt="" style="width: 30px; height: 30px">
        <a :href="link.url">{{ link.title }}</a>
      </div>
      
    </div> -->
  </div>
</template>

<style lang="less" scoped>

.links a {
  display: inline-block;
  padding: 20px 30px;
}

</style>
