<script setup>
import BaseApp from './components/BaseApp.vue';
import BaseNavBar from './components/BaseNavBar.vue';
import Footer from './components/Footer.vue';

</script>

<template>
  <BaseApp>
    <BaseNavBar></BaseNavBar>
    <router-view></router-view>
    <Footer></Footer>
  </BaseApp>
</template>

<script>
</script>

<style>
</style>
