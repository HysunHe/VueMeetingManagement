<template>
  <div>
    <div>
      <el-header height="85px" style="text-align:center;">
        <img v-if="!iscloseNav" src="../assets/menu.png" style="width:30px;height:30px;position: absolute;left: 182px; cursor:pointer;" title="最小化菜单"  @click="minimizeNav">
        <span style="font-size:36px;">{{headerText}}</span>
        <div v-if="!iscloseNav" style="float: left;height: 83px;color:#ffffff; font-size:45px; background-color: #205796; width:182px; margin-left:-20px; text-align: center; align:center;border-bottom: 2px solid #091c30;">
           <img  src="../assets/logo.png">
          </div>
        <div v-if="iscloseNav" style="float: left;height: 83px;color:#ffffff; font-size:45px; background-color: #205796; width:60px; margin-left:-20px; text-align: center; align:center;border-bottom: 2px solid #091c30;">
           <img  style="width: 50%; min-width: 30px; cursor:pointer;" src="../assets/menu.png" title="显示菜单面板" @click="expandNav">
          </div>
        <div style="float: right;color:#fff; font-size: 12px;margin-right:50px;">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px;color:#fff;"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{userName}}</span>
        </div>
        <div class="clear"></div>
      </el-header>
    </div>
 
    <el-container  :class="bg_class">
      <el-aside ref="menu_nav_panel" :width="menvNavPanelWidth" style="background-color: #205796;">
          <div :class="iscloseNav ? 'menu-button-small' : 'menu-button'">
            <span style="cursor:pointer;">
              <img :style="iscloseNav? 'padding-top:15px; width: 50%; min-width: 30px;' : 'padding-top:22px;'" src="../assets/tasks.png">
              <span v-if="!iscloseNav" style="display:block; font-size:18px; font-weight:bold;">我的任务</span>
            </span>
          </div>
          <div :class="iscloseNav ? 'menu-button-small' : 'menu-button'">
            <span style="cursor:pointer;">
              <img  :style="iscloseNav? 'padding-top:15px; width: 50%; min-width: 30px;' : 'padding-top:22px;'" src="../assets/sm.png">
              <span v-if="!iscloseNav" style="display:block; font-size:18px; font-weight:bold;">供应商管理</span>
            </span>
          </div> 
          <div :class="iscloseNav ? 'menu-button-small' : 'menu-button'">
            <span style="cursor:pointer;">
              <img  :style="iscloseNav? 'padding-top:20px; width: 50%; min-width: 30px;' : 'padding-top:22px;'" src="../assets/setup.png">
              <span v-if="!iscloseNav" style="display:block; font-size:18px; font-weight:bold;">我的设置</span>
            </span>
          </div> 
      </el-aside>
  
      <el-container>
        <el-main style="padding:0;">
          <router-view class="content_size" @set_bg_class="set_bg_class" @set_header_text="set_header"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import bus from "../utils/bus.js";
  export default {
    data() {
      return {
        userName: "Hysun",
        bg_class: 'bg_home',
        headerText: "会议中心",
        iscloseNav:  false,
        menvNavPanelWidth: "182px"
      };
    },
    mounted() {
      this.minimizeNav();
    },
    methods: {
      set_bg_class(className) {
        console.log("[Home]set bg_class to " + className);
        this.bg_class = className;
      },
      set_header(headerText) {
        console.log("[Home]set headerText to " + headerText);
        this.headerText = headerText;
      },
      minimizeNav() {
        this.iscloseNav = true;
        this.menvNavPanelWidth="60px"
      },
      expandNav() {
        this.iscloseNav = false;
        this.menvNavPanelWidth="182px";
      }
    }
  };
</script>

<style scoped>
/* @import "../../static/css/index.css"; */

.bg_home {
  background: url("../assets/bg_home.png") no-repeat;  
  background-size: 100% 100%;
}

.bg_content {
  background: url("../assets/bg-content.png") no-repeat;  
  background-size: 100% 100%;
}

.bg_home .content_size {
  margin:auto;
  height: 100%;
  width: fit-content;
  min-width: 1502px;
}

.bg_content .content_size {
  width: 100%;
  height: 100%;
  margin-left:52px;
}

.el-header {
  background-color: #587a97;
  color: #ffffff;
  line-height: 85px;
}

.el-menu--popup {
  background-color: #16181d;
}

.menu-button {
  color:white;
  text-align: center;
  margin:0;
  border-bottom: 1px solid #091c30;
  width:100%;
  height:120px;
}

.menu-button-small {
  color:white;
  text-align: center;
  margin:0;
  border-bottom: 1px solid #091c30;
  width:100%;
  height:68px;
}
</style>
