import { createApp } from 'vue'
import App from './App.vue'
import { overflowTooltip } from './utils/overflowDirective';


const app = createApp(App);
app.directive('overflow-tooltip', overflowTooltip);
app.mount('#app');
