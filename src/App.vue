<template>
  <SpinnerComponent v-if="loading" />
  <MainComponent/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SpinnerComponent from './components/SpinnerComponent.vue';
import MainComponent from './components/MainComponent.vue';

@Options({
  components: {
    SpinnerComponent,
    MainComponent,
  },
})
export default class App extends Vue {
  loading = true;

  mounted() {
    window.addEventListener('load', () => {
      this.loading = false;
    });
  }
}
</script>

<style lang="scss">
  html {
    scroll-behavior: smooth;
  }
  * {
    font-family: "Nunito", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; 
    font-weight: 400;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 26px;
  }
  h1 {
    font-size: 40px;
    line-height: 40px;
    text-align: center;
  }
</style>
