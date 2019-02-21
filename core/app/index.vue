<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view" />
    </transition>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css"></style>