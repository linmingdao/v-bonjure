<template>
  <div
    tabindex="-1"
    ref="electricSelect"
    class="electric-select"
  >
    <!-- :class="{'drop-down': true}" -->
    <input
      readonly
      ref="previewBar"
      class="preview-bar"
      placeholder="请选择"
      @click="handleClickSelect"
    />
    <a
      class="preview-button"
      @click="handleClickPreviewButton"
    >
    </a>
  </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>