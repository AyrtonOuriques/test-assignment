<template>
  <div class="preloader">
    <div class="spinner"></div>
  </div>
</template>

<style lang="scss" scoped>
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #f8f8f8;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    .spinner {
        width: 48px;
        height: 48px;
        border: 6px solid transparent;
        border-top: 6px solid #00BDD3;
        border-right: 6px solid #00BDD3;
        border-left: 6px solid #00BDD3;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>