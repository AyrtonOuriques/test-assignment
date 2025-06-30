<template>
  <MainComponent/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainComponent from './components/MainComponent.vue';


@Options({
  components: {
    MainComponent,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
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
    text-align: center;
  }
  h1 {
    font-size: 40px;
    line-height: 40px;
  }
</style>
