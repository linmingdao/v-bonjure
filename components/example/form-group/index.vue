<template>
  <span class="form-wrapper">
    <span
      class="form-desc"
      :style="descStyle"
    >{{ desc }}</span>
    <span
      ref="formbox"
      class="form-box"
      :style="{ width: formWidth + 'px' }"
    >
      <slot></slot>
    </span>
  </span>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>