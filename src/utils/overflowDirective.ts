import { Directive } from 'vue';

export const overflowTooltip: Directive<HTMLElement> = {
  mounted(el) {
    if (el.scrollWidth > el.clientWidth) {
      el.title = el.textContent?.trim() || '';
    }
  },
  updated(el) {
    if (el.scrollWidth > el.clientWidth) {
      el.title = el.textContent?.trim() || '';
    } 
    else {
      el.removeAttribute('title');
    }
  }
};