<template>
    <el-card class="box-card">
        <div slot="header">
            <span>🍺 表单控件包裹器</span>
        </div>
        <form-group desc="你的姓名" :form-width="200">
            <el-input v-model="name" placeholder="请输入姓名" />
        </form-group>
        <form-group desc="开始时间" :form-width="200">
            <el-time-select
                v-model="startTime"
                :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                }"
                placeholder="选择时间"
            />
        </form-group>
        <form-group desc="请选择合适的时间范围" :form-width="400">
            <el-time-picker
                is-range
                arrow-control
                v-model="timeRange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
            />
        </form-group>
    </el-card>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
