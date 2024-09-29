<template>
  <div class="loading-wrapper">
    <div class="loading-content">
      <svg t="1706060541285" class="loading-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6832" width="200" height="200">
        <path
          d="M854 335.3l-0.3 0.2c-5.6-9.3-15.9-15.6-27.6-15.6-17.8 0-32.2 14.4-32.2 32.1 0 5.3 1.3 10.3 3.6 14.7h-0.1c22 43.4 34.4 92.5 34.4 144.5C831.8 687.8 688.6 831 512 831S192.2 687.9 192.2 511.2c0-152.4 106.5-279.2 249.1-311.2l-33.6 43.7c-10.8 14-8.1 34.2 5.9 45 14 10.8 34.2 8.1 45-5.9l75.3-97.8c6.5-5.9 10.6-14.4 10.6-23.8 0-11.3-5.9-21.2-14.7-27L429.3 57.1c-13.8-10.6-33.8-8-44.4 5.7l-0.6 0.8c-10.6 13.8-8 33.7 5.8 44.3l38.4 29.5C257 175.9 128.9 329.1 128.9 512.2c0 212.1 172 384.1 384.1 384.1s384.1-172 384.1-384.1c0-63.8-15.5-124-43.1-176.9z"
          fill="#1296db"
          p-id="6833"
        ></path>
        <path d="M708.9 258.1a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z" fill="#1296db" p-id="6834"></path>
      </svg>
    </div>
  </div>
</template>

<script>
  export default {
    name: "loading",
  }
</script>

<style lang="scss" scoped>
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .loading-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(179, 179, 183, 0.795);
    z-index: 2000;
    .loading-content {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      svg {
        &.loading-icon {
          height: 100%;
          max-height: 50px;
          max-width: 50px;
          animation: spin 1s linear infinite;
        }
      }
    }
  }
</style>
