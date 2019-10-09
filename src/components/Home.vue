<template>
  <div id="app">
    <div>
      <el-header height="85px" style="text-align:center;">
        <span style="font-size:36px;">{{headerText}}</span>
        <div style="float: left;height: 83px;color:#ffffff; font-size:45px; background-color: #205796; width:182px; margin-left:-20px; text-align: center; align:center;border-bottom: 2px solid #091c30;">
           <img  src="../assets/logo.png">
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
      <el-aside width="182px" style="background-color: #205796;">
          <div class="menu-button">
            <span style="cursor:pointer;">
              <img  style="padding-top:22px;" src="../assets/tasks.png">
              <span style="display:block; font-size:18px; font-weight:bold;">我的任务</span>
            </span>
          </div>
          <div class="menu-button">
            <span style="cursor:pointer;">
              <img  style="padding-top:22px;" src="../assets/sm.png">
              <span style="display:block; font-size:18px; font-weight:bold;">供应商管理</span>
            </span>
          </div> 
      </el-aside>
  
      <el-container style="min-width:1605px;">
        <el-main style="padding:0;">
          <router-view @set_bg_class="set_bg_class" @set_header_text="set_header"></router-view>
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
        menuList: [],
        userName: "Hysun",
        bg_class: 'bg_home',
        headerText: "首页"
      };
    },
    mounted() {
      // bus.$on("set_bg_class", function(e) {
      //     console.log("[Home]set bg_class to ", e);
      //     this.bg_class = e;
      //   }.bind(this));
    },
    methods: {
      set_bg_class(className) {
        console.log("[Home]set bg_class to " + className);
        this.bg_class = className;
      },
      set_header(headerText) {
        console.log("[Home]set headerText to " + headerText);
        this.headerText = headerText;
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
</style>
