<template>
    <div class="top-container">
        <div class="widget-container">
            <slot name="default"></slot>
        </div>
        <div class="doc-container">
            <slot name="doc"></slot>
        </div>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
