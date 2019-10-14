<template>
  <div>
    <div>
      <el-header height="86px" style="text-align:center;">
        <img src="../assets/menu.png" style="width:22px;height:20px; position:absolute; left:182px; top:2px; cursor:pointer;" title="菜单开关"  @click="toggleNav">
        <div  style="display:flex; justify-content:center; position:absolute; left:0; top:0; height: 83px;color:#ffffff; font-size:45px; background-color: #205796; width:182px; text-align: center; align:center;border-bottom: 2px solid #091c30;">
           <div style="margin-top:5px;"><img  src="../assets/avatar.png"> </div>
          <div style="display:flex;flex-direction:column;margin-left: 10px;">
          <span style="font-size:14px;height:26px;margin-top: -16px;">欢迎您</span><span style="font-size:22px;">战飞</span>
        </div>
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" style="position:absolute; left:182px; top:0;">
          <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
          </el-tab-pane>
        </el-tabs>
        </div>
        <!--div v-if="iscloseNav" style="float: left;height: 83px;color:#ffffff; font-size:45px; background-color: #205796; width:60px; margin-left:-20px; text-align: center; align:center;border-bottom: 2px solid #091c30;">
           <img  style="width: 50%; min-width: 30px; cursor:pointer;" src="../assets/menu.png" title="显示菜单面板" @click="expandNav">
          </div-->
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
  
      <el-container style="overflow-y: auto;">
        <div style="width:100%;">
          <div style="text-align:center; height:85px; background: #6c8eb5; color:#ffffff; width:100%;display:table;">
            <span style="font-size:36px;vertical-align:middle;display: table-cell;">{{headerText}}</span>
          </div>
          <el-main style="padding:0;">
            <router-view class="content_size" @set_bg_class="set_bg_class" @set_header_text="set_header"></router-view>
          </el-main>
        </div>
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
        menvNavPanelWidth: "182px",

          editableTabsValue: '2',
          editableTabs: [{
            title: 'Tab 1',
            name: '1',
            content: 'Tab 1 content'
          }, {
            title: 'Tab 2',
            name: '2',
            content: 'Tab 2 content'
          }],
          tabIndex: 2
      };
    },
    mounted() {
      // this.minimizeNav();
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
        this.menvNavPanelWidth="0px"
      },
      expandNav() {
        this.iscloseNav = false;
        this.menvNavPanelWidth="182px";
      },
      toggleNav() {
        if(this.iscloseNav) {
          this.expandNav();
        } else {
          this.minimizeNav();
        }
      },
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
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
  background-color: #3f5d76;
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
