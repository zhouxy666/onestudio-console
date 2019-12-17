<template>
  <div class="framework-wrapper">
    <Header>
      <slot #head></slot>
    </Header>
    <Main>
      <slot #default></slot>
    </Main>
    <Footer>
      <slot #foot></slot>
    </Footer>
  </div>
</template>

<script>
  import Header from '@/components/framework/Header'
  import Footer from '@/components/framework/Footer'
  import Main from '@/components/framework/Main'

  export default {
    name: 'index',
    components: {
      Header,
      Footer,
      Main
    }
  }
</script>

<style lang="less">
  .framework-wrapper {
    height: 100%;
  }
</style>
