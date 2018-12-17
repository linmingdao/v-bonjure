<template>
    <el-row>
        <el-col :span="24">
            <el-card class="box-card">
                <div slot="header" class="clearfix"><span>📣 消息中心(@core/Notification)</span></div>
                <ul>
                    <li>
                        <el-button size="mini" @click="showLoading" round>显示loading效果</el-button>
                        <el-button size="mini" type="primary" @click="showAlert" round>显示alert弹窗</el-button>
                        <el-button size="mini" type="warning" @click="showConfirm" round>显示confirm弹窗</el-button>
                        <el-button size="mini" type="danger" @click="showMessage" round>显示message弹窗</el-button>
                    </li>
                </ul>
            </el-card>
        </el-col>
    </el-row>
</template>
<script src="./script.js"></script>
<style scoped src="../../common/style.css"></style>
<style scoped src="./style.css"></style>