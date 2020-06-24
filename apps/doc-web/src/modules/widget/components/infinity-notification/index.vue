<template>
    <el-card class="box-card">
        <div slot="header">
            <span>🍺 通知组件-重构版</span>
        </div>
        <h3>Alert</h3>
        <el-row class="btnWrap">
            <el-col :md="24">
                <el-button type="primary" @click="alert">alert()</el-button>
                <el-button type="info" @click="alertInfo">alertInfo()</el-button>
                <el-button type="warning" @click="alertWarning">alertWarning()</el-button>
                <el-button type="success" @click="alertSuccess">alertSuccess()</el-button>
                <el-button type="danger" @click="alertError">alertError()</el-button>
            </el-col>
        </el-row>
        <h3>Confirm</h3>
        <el-row class="btnWrap">
            <el-col :md="24">
                <el-button type="primary" @click="confirm">confirm()</el-button>
                <el-button type="info" @click="confirmInfo">confirmInfo()</el-button>
                <el-button type="warning" @click="confirmWarning">confirmWarning()</el-button>
                <el-button type="success" @click="confirmSuccess">confirmSuccess()</el-button>
                <el-button type="danger" @click="confirmError">confirmError()</el-button>
            </el-col>
        </el-row>
        <h3>Message</h3>
        <el-row class="btnWrap">
            <el-col :md="24">
                <el-button type="primary" @click="message">message()</el-button>
                <el-button type="info" @click="messageInfo">messageInfo()</el-button>
                <el-button type="warning" @click="messageWarning">messageWarning()</el-button>
                <el-button type="success" @click="messageSuccess">messageSuccess()</el-button>
                <el-button type="danger" @click="messageError">messageError()</el-button>
            </el-col>
        </el-row>
        <h3>Loading</h3>
        <el-row class="btnWrap">
            <el-col :md="24">
                <el-button type="primary" @click="showLoading">showLoading()</el-button>
            </el-col>
        </el-row>
        <h3>高度适应&指定高度</h3>
        <el-row class="btnWrap">
            <el-col :md="24">
                <el-button type="primary" @click="autoHeight">高度适应</el-button>
                <el-button type="info" @click="astrictHeight">指定高度</el-button>
                <el-button type="primary" @click="autoWidth">宽度适应</el-button>
                <el-button type="info" @click="astrictWidth">指定宽度</el-button>
            </el-col>
        </el-row>
        <h3>自定义HTML支持&ICON</h3>
        <el-row class="btnWrap">
            <el-col :md="24">
                <el-button type="primary" @click="dangerouslyUseHTMLString">自定义HTML</el-button>
                <el-button type="primary" @click="notICON">关闭ICON</el-button>
            </el-col>
        </el-row>
    </el-card>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
