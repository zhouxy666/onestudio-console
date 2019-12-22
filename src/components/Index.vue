<template>
  <Framework>
    <div class="onestudio-content">
      <div class="left-menu">
        <LeftMenu></LeftMenu>
      </div>
      <div class="right-content">
        <router-view/>
      </div>
    </div>
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
        const mapRouter = {
          '1': 'overview',
          '2-1': 'user',
          '2-2': 'grade',
          '2-3': 'course',
          '2-4': 'class'
        }
        this.$router.push({name: mapRouter[data.index]})
      })
    },
    methods: {}
  }
</script>

<style lang="less">
  .onestudio-content {
    height: 100%;
    min-width: 1280px;
    .left-menu {
      float: left;
      height: 100%;
      width: 240px;
      background: #fff;
    }
    .right-content {
      float: left;
      padding: 10px;
      width: calc(100% - 260px);
      height: 100%;
    }
    &:after {
      clear: both;
      content: '';
      height: 0;
      display: block;
      visibility: hidden;
    }
  }

</style>
