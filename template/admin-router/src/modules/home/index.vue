<template>
    <el-container>
        <!-- 侧边区域 -->
        <el-aside class="aside-menu-container" :class="{'mini-sidebar': isCollapse, 'full-sidebar': !isCollapse}">
            <!-- 菜单 -->
            <el-menu
                class="aside-menu"
                text-color="#fff"
                background-color="#32586E"
                active-text-color="#1ffdf0"
                :default-active="currentActiveTabId"
                @select="handleSelectMenuItem"
                :collapse="isCollapse"
            >
                <template v-for="mItemL1 in menus">
                    <!-- 一级菜单，无子菜单 -->
                    <el-menu-item v-if="!mItemL1.children && mItemL1.icon" :key="mItemL1.tabId" :index="mItemL1.tabId">
                        <router-link :to="generateUrl(mItemL1.path)">
                            <i :class="mItemL1.icon"></i>
                            <span>{{mItemL1.title}}</span>
                        </router-link>
                    </el-menu-item>
                    <!-- 一级菜单，有子菜单 -->
                    <el-submenu
                        v-else-if="mItemL1.children && mItemL1.children.length"
                        :key="mItemL1.tabId"
                        :index="mItemL1.tabId"
                    >
                        <!-- 一级菜单标题 -->
                        <template slot="title">
                            <i :class="mItemL1.icon"></i>
                            <span>{{mItemL1.title}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <template v-for="mItemL2 in mItemL1.children">
                            <!-- 二级菜单，无子菜单 -->
                            <el-menu-item
                                v-if="!mItemL2.children && mItemL2.icon"
                                :key="mItemL2.tabId"
                                :index="mItemL2.tabId"
                            >
                                <router-link :to="generateUrl(mItemL2.path)">
                                    <i :class="mItemL2.icon"></i>
                                    <span>{{mItemL2.title}}</span>
                                </router-link>
                            </el-menu-item>
                            <!-- 二级菜单，有子菜单，带icon -->
                            <el-submenu
                                v-else-if="mItemL2.children && mItemL2.children.length"
                                :key="mItemL2.tabId"
                                :index="mItemL2.tabId"
                            >
                                <!-- 二级菜单标题 -->
                                <template slot="title">
                                    <i :class="mItemL2.icon"></i>
                                    <span>{{mItemL2.title}}</span>
                                </template>
                                <template v-for="mItemL3 in mItemL2.children">
                                    <!-- 三级菜单，无子菜单 -->
                                    <el-menu-item :key="mItemL3.tabId" :index="mItemL3.tabId">
                                        <router-link :to="generateUrl(mItemL3.path)">
                                            <i :class="mItemL3.icon"></i>
                                            <span>{{mItemL3.title}}</span>
                                        </router-link>
                                    </el-menu-item>
                                </template>
                            </el-submenu>
                        </template>
                    </el-submenu>
                </template>
            </el-menu>
        </el-aside>
        <el-container>
            <!-- 头部区域 -->
            <el-header class="header-region">
                <!-- 头部导航栏 -->
                <div class="nav-bar">
                    <div class="hamburger-box" @click="isCollapse=!isCollapse">
                        <i :class="{'el-icon-s-fold':!isCollapse, 'el-icon-s-unfold':isCollapse}" class="hamburger"></i>
                    </div>
                    <div class="right-menu">
                        <span class="right-menu-item">
                            <i class="el-icon-chat-dot-round"></i>
                        </span>
                        <span class="right-menu-item">
                            <i class="el-icon-search"></i>
                        </span>
                        <span class="right-menu-item" @click="toggleFullScreen">
                            <i class="el-icon-full-screen"></i>
                        </span>
                        <!-- 用户头像区域 -->
                        <el-dropdown trigger="click">
                            <span class="avatar-box">
                                <img
                                    class="avatar"
                                    src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
                                />
                                鲁班大师
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item icon="el-icon-user">个人主页</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-chat-dot-round">论坛系统</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-setting">设置中心</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-tickets">文档系统</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-switch-button">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </el-header>
            <!-- 中间主体内容区域 -->
            <el-main class="main-body">
                <span class="content-blank" v-show="!dynamicTabs.length"></span>
                <!-- tab组件 -->
                <el-tabs
                    class="tabs-view"
                    v-model="currentActiveTabId"
                    closable
                    type="border-card"
                    @tab-remove="removeTab"
                    @tab-click="clickTab"
                >
                    <el-tab-pane v-for="item in dynamicTabs" :key="item.tabId" :label="item.title" :name="item.tabId"></el-tab-pane>
                    <router-view></router-view>
                </el-tabs>
            </el-main>
        </el-container>
    </el-container>
</template>
<script src="./script.js">
</script>
<style scoped src="./style.css">
</style>
