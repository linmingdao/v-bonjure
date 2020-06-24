<template>
    <el-card class="box-card">
        <div slot="header">
            <span
                >🍺 多级表头表格组件(<span style="color:#ec7474;"
                    >通过合并行合并列实现多级表头，只是demo，还未真正封装成通用组件</span
                >)</span
            >
        </div>
        <div>
            <el-table
                class="infinity-multi-level-table"
                :data="tableData"
                style="width: 100%;"
                height="700"
                :span-method="objectSpanMethod"
                border
            >
                <el-table-column type="selection" width="40" align="center"> </el-table-column>
                <el-table-column prop="server" label="服务器" width="80" align="center"> </el-table-column>
                <el-table-column prop="serverStatus" label="服务器状态" width="100" align="center"> </el-table-column>
                <el-table-column prop="startServerTime" label="开服时间" width="100" align="center"> </el-table-column>
                <el-table-column prop="beginImportTime" label="导量开始时间" width="120" align="center">
                </el-table-column>
                <el-table-column prop="stopImportTime" label="导量暂停时间" width="120" align="center">
                </el-table-column>
                <el-table-column prop="fullImportTime" label="导量满量时间" width="120" align="center">
                </el-table-column>
                <el-table-column prop="serverTotalImport" label="服务器总导量" align="center"> </el-table-column>
                <el-table-column label="国家导量状态" align="center">
                    <el-table-column prop="country" label="国家" width="60" align="center"> </el-table-column>
                    <el-table-column prop="android" label="android" width="100" align="center"> </el-table-column>
                    <el-table-column prop="ios" label="ios" width="100" align="center"> </el-table-column>
                    <el-table-column prop="gross" label="总量" width="100" align="center"> </el-table-column>
                    <el-table-column prop="importPercentage" label="本国家已导量占比" width="100" align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column prop="operator" label="操作" fixed="right" width="320" align="center">
                    <template slot-scope="scope">
                        <span>
                            <el-button
                                size="mini"
                                type="success"
                                @click.native.prevent="handleStop(scope.$index, tableData)"
                                >开始/暂停</el-button
                            >
                            <el-button
                                size="mini"
                                type="success"
                                @click.native.prevent="handleEdit(scope.$index, tableData)"
                                >编辑</el-button
                            >
                            <el-button
                                size="mini"
                                type="success"
                                @click.native.prevent="handleView(scope.$index, tableData)"
                                >查看</el-button
                            >
                            <el-button
                                size="mini"
                                type="success"
                                @click.native.prevent="handleRecord(scope.$index, tableData)"
                                >记录</el-button
                            >
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-card>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
