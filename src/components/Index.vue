<template>
  <Framework>
    <el-row class="onestudio-content">
      <el-col :span="3" class="left-menu">
        <LeftMenu></LeftMenu>
      </el-col>
      <el-col :span="21" class="right-content">
        <router-view/>
      </el-col>
    </el-row>
  </Framework>
</template>

<script>
  import Framework from '@/components/framework/Framework'
  import LeftMenu from '@/components/leftMenu/LeftMenu'
  import busService from '@/services/busService'

  export default {
    name: 'index',
    components: {
      Framework,
      LeftMenu
    },
    mounted(){
      busService.$on('menu-item', data => {
        if (data.index === '2-1') {
          console.log(data)
          this.$router.push({name: 'user'})
        }
        if (data.index === '2-2') {
          console.log(data)
          this.$router.push({name: 'grade'})
        }
      })
    }
  }
</script>

<style lang="less">
  .onestudio-content {
    height: 100%;
    .left-menu {
      height: 100%;
      background: #fff;
    }
    .right-content {
      height: 100%;
      background: #fde2e2;
    }
  }

</style>
