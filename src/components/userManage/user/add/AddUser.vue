<template>
  <div class="add-user-wrapper">
    <el-dialog
      :visible="isShow"
      @close="close"
    >
      <div slot="title">
        <div class="el-icon-user-solid title-icon">
          <span class="title-font">添加会员</span>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default{
    name: 'AddUser',
    props: {
      isShow: false
    },
    computed: {
      isShowDialog(){
        return this.isShow
      }
    },
    methods: {
      close(event){
        this.$emit('closeDialog')
      },
      submit(){
        console.log('提交')
      }
    }
  }
</script>

<style lang="less">
  .add-user-wrapper {
    .title-icon {
      color: #409eff;
      font-size: 20px;
      .title-font {
        padding-left: 10px;
        color: #333;
      }
    }
  }

</style>
