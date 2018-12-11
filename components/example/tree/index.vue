<template>
    <el-tree class="bg_color" :data="data6" node-key="id" default-expand-all @node-drag-start="handleDragStart" @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver" @node-drag-end="handleDragEnd" @node-drop="handleDrop" draggable :allow-drop="allowDrop" :allow-drag="allowDrag"></el-tree>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>