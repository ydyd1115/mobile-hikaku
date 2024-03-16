<script setup>
import { RouterView } from 'vue-router';
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import ToSelectButton from "@/components/ToSelectButton.vue";

</script>

<template>
  <HeaderComponent class="fixed top-0 w-full z-50"/>
  <div class="main-content w-4/5 mt-16 mx-auto md:pt-32">
    <RouterView />
    <ToSelectButton/>
  </div>
  <FooterComponent/>
</template>

<style scoped>
@media(max-width:478px) {
  .main-content{
    width:98%;
  }
}
</style>


