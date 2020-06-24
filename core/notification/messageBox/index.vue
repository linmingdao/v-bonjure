<template>
    <div
        class="electric-dialog-mask"
        v-show="isShowMessageBox"
        @click.self="cancel('mask')"
        v-if="isKeep"
        ref="wrap"
        tabindex="0"
    >
        <div class="electric-dialog-content__wrapper">
            <a class="electric-dialog-close-btn" @click="close" v-if="showCloseButton" />
            <div class="electric-dialog-title">
                <span>{{ title }}</span>
            </div>
            <div class="electric-dialog-content cp-scrollbar" :style="contentHeight">
                <div class="electric-dialog-content-message" :style="messageWidth">
                    <i :class="iconClass" v-if="showIcon"></i>
                    <div v-if="dangerouslyUseHTMLString" v-html="message" style="color:#606266;"></div>
                    <span v-else style="color:#606266;">{{ message }}</span>
                </div>
            </div>
            <div class="electric-dialog-footer">
                <el-button size="small" @click="cancel('button')" v-show="showCancelButton">{{
                    cancelButtonText
                }}</el-button>
                <el-button type="success" size="small" @click="confirm">{{ confirmButtonText }}</el-button>
            </div>
        </div>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
