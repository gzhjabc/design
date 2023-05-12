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
      links: [],
      isMenuOpen: false
    }
  },
  methods: {
    handleHeaderHeight(value) {
      this.isMenuOpen = value
    }
  },
  computed: {
    headerHeight() {
      return this.isMenuOpen ? '420px' : '150px';
    }
  }
}
</script>

<template>
  <div>
    <el-container>
      <!-- 顶部 -->
      <el-header class="hidden-xs-only" height="150px">
        <Tabbar></Tabbar>
        <!-- 头部以及导航栏 -->
        <Header></Header>
      </el-header>
      <el-header class="hidden-sm-and-up" :height="headerHeight">
        <Tabbar></Tabbar>
        <!-- 头部以及导航栏 -->
        <Header @handleHeaderHeight="handleHeaderHeight"></Header>
      </el-header>
      <!-- npm init vue@latest -->
      <!-- 渲染视图组件 -->
      <el-main>
        <RouterView />
      </el-main>
      <!-- 尾部 -->
      <el-footer height="320px">
        <Footer></Footer>
      </el-footer>
    </el-container>
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
.el-header {
  padding: 0;
}

.el-main {
  padding: 0;
}

.el-footer {
  padding: 0;
}

.links a {
  display: inline-block;
  padding: 20px 30px;
}
</style>
