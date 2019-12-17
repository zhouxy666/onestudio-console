<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @select="handleSelect"
  >
    <el-menu-item index="1">
      <template slot="title">
        <i class="el-icon-date"></i>
        <span>总览</span>
      </template>
    </el-menu-item>

    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item index="2-1">会员目录</el-menu-item>
      <el-menu-item index="2-2">班级划分</el-menu-item>
      <el-menu-item index="2-3">课件管理</el-menu-item>
      <el-menu-item index="2-4">考勤管理</el-menu-item>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span>订单管理</span>
      </template>
      <el-menu-item index="3-1">产品目录</el-menu-item>
      <el-menu-item index="3-2">订单目录</el-menu-item>
      <el-menu-item index="3-2">优惠卷</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  import busService from '@/services/busService'
  export default {
    name: 'leftMenu',
    methods: {
      handleSelect(key, keyPath) {
        busService.$emit('menu-item', {
          index: key
        })
      }
    }
  }
</script>

<style lang="less">

</style>
