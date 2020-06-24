<template>
    <el-card class="box-card">
        <div slot="header">
            <span
                >🍺 多级表头表格组件(<span style="color:#ec7474;"
                    >通过拼装表格实现多级表头，只是demo，还未真正封装成通用组件</span
                >)</span
            >
        </div>
        <div>
            <el-table class="infinity-multi-level-table" :data="tableData" style="width: 100%;" height="800" border>
                <el-table-column type="selection" width="40" align="center" :resizable="false"> </el-table-column>
                <el-table-column type="expand">
                    <template>
                        <el-card style="width: 1140px;">
                            <div slot="header">
                                <div style="font-weight:bold;">{{ expandTableData['kid'] }}服</div>
                                <div v-html="formatter.formatTemplateName(expandTableData)"></div>
                                <div v-html="formatter.formatTotalNumSettings(expandTableData)"></div>
                                <div v-html="formatter.formatStrategyPlatform(expandTableData)"></div>
                                <div v-html="formatter.formatLoginServerStatus(expandTableData)"></div>
                            </div>
                            <el-table
                                class="expand-table"
                                :data="expandTableData['serverSubImportsItem']"
                                border
                                style="width: 100%;"
                            >
                                <el-table-column prop="gamelang" label="国家" align="center" width="60">
                                </el-table-column>
                                <el-table-column label="总量" align="center" width="200">
                                    <template slot-scope="scope">
                                        <span
                                            v-html="
                                                formatter.formatCountryImportsStatus(
                                                    scope.row['itemTotalPlatformCurrentNum'],
                                                    scope.row['itemTotalPlatformNum']
                                                )
                                            "
                                        ></span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="导量开始时间" align="center" width="250">
                                    <template slot-scope="scope">
                                        <span
                                            v-html="
                                                formatter.formatExpandImportsTime(
                                                    scope.row['androidStartTime'],
                                                    scope.row['iosStartTime']
                                                )
                                            "
                                        ></span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="导量暂停时间" align="center" width="250">
                                    <template slot-scope="scope">
                                        <span
                                            v-html="
                                                formatter.formatExpandImportsTime(
                                                    scope.row['androidStopTime'],
                                                    scope.row['iosStopTime']
                                                )
                                            "
                                        ></span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="导量满量时间" align="center" width="250">
                                    <template slot-scope="scope">
                                        <span
                                            v-html="
                                                formatter.formatExpandImportsTime(
                                                    scope.row['androidEndTime'],
                                                    scope.row['iosEndTime']
                                                )
                                            "
                                        ></span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="优先级" align="center">
                                    <template slot-scope="scope">
                                        <span v-html="formatter.formatPriority(scope.row['priority'])"></span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-card>
                    </template>
                </el-table-column>
                <el-table-column label="服务器" width="100" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span v-html="formatter.formatKid(scope.row)"></span>
                    </template>
                </el-table-column>
                <el-table-column label="服务器状态" width="60" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span v-html="formatter.formatServerStatus(scope.row)"></span>
                    </template>
                </el-table-column>
                <el-table-column label="开服时间" width="100" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span v-html="formatter.formatOpenTime(scope.row)"></span>
                    </template>
                </el-table-column>
                <el-table-column label="导量开始时间" width="100" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span v-html="formatter.formatStartTime(scope.row)"></span>
                    </template>
                </el-table-column>
                <el-table-column label="导量暂停时间" width="100" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span v-html="formatter.formatStopTime(scope.row)"></span>
                    </template>
                </el-table-column>
                <el-table-column label="导量满量时间" width="100" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span v-html="formatter.formatEndTime(scope.row)"></span>
                    </template>
                </el-table-column>
                <el-table-column label="服务器总导量" width="200" align="center" :resizable="false">
                    <template slot-scope="scope">
                        <span v-html="formatter.formatTotalImportsNum(scope.row)"></span>
                    </template>
                </el-table-column>
                <el-table-column
                    class-name="custom-column"
                    label="国家导量状态"
                    width="868"
                    align="center"
                    :resizable="false"
                >
                    <template slot="header">
                        <span style="padding: 12px 0;height:50%;display:block;border-bottom:1px solid #EBEEF5;"
                            >国家导量状态</span
                        >
                        <span style="height:50%;display:block;">
                            <span
                                style="padding:12px 0;float:left;height:100%;border-right:1px solid #EBEEF5;width:59px;"
                                >国家</span
                            >
                            <span
                                style="padding:12px 0;float:left;height:100%;border-right:1px solid #EBEEF5;width:199px;"
                                >android</span
                            >
                            <span
                                style="padding:12px 0;float:left;height:100%;border-right:1px solid #EBEEF5;width:199px;"
                                >ios</span
                            >
                            <span
                                style="padding:12px 0;float:left;height:100%;border-right:1px solid #EBEEF5;width:199px;"
                                >总量</span
                            >
                            <span style="padding:12px 0;float:left;height:100%;width:199px;">本国家已导量占比</span>
                        </span>
                    </template>
                    <template slot-scope="scope">
                        <el-table
                            class="embedded-table"
                            style="height: 100%;"
                            :data="scope.row['serverSubImportsItem']"
                        >
                            <el-table-column prop="gamelang" label="国家" width="60" align="center"> </el-table-column>
                            <el-table-column prop="android" label="android" width="200" align="center">
                                <template slot-scope="embeddedScope">
                                    <span
                                        v-html="formatter.formatCountryImportsStatusAndroid(embeddedScope.row)"
                                    ></span>
                                </template>
                            </el-table-column>
                            <el-table-column label="ios" width="200" align="center">
                                <template slot-scope="embeddedScope">
                                    <span v-html="formatter.formatCountryImportsStatusIos(embeddedScope.row)"></span>
                                </template>
                            </el-table-column>
                            <el-table-column label="总量" width="200" align="center">
                                <template slot-scope="embeddedScope">
                                    <span
                                        v-html="
                                            formatter.formatCountryImportsStatus(
                                                embeddedScope.row['itemTotalPlatformCurrentNum'],
                                                embeddedScope.row['itemTotalPlatformNum']
                                            )
                                        "
                                    ></span>
                                </template>
                            </el-table-column>
                            <el-table-column label="本国家已导量占比" align="center">
                                <template slot-scope="embeddedScope">
                                    <span
                                        v-html="
                                            formatter.formatCountryImportsStatus(
                                                embeddedScope.row['itemTotalPlatformCurrentNum'],
                                                embeddedScope.row['allTotalCurrentNum']
                                            )
                                        "
                                    ></span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <!-- fixed="right" -->
                <el-table-column
                    prop="operator"
                    label="操作"
                    width="250"
                    align="center"
                    fixed="right"
                    :resizable="false"
                >
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
