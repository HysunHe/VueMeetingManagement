<template>
  <div style="height:100%;">
    <div>
      <el-header v-if="isHome" height="86px" style="text-align:center;background:#6c8eb5;">
        <div style="text-align:center; 100%; width:100%;display:table;">
            <span style="font-size:36px;color:#ffffff;vertical-align:middle;display: table-cell;">首页</span>
        </div>
        <div  style="display:table; justify-content:center; position:absolute; left:0; top:0; height: 86px;color:#ffffff; font-size:45px; background-color: #205796; width:182px; text-align: center; align:center;border-bottom: 2px solid #091c30;">
            <span style="vertical-align:middle;display: table-cell;"> <img src="../../static/img/menu.png" style="width:45px;height:45px; cursor:pointer;" title="菜单开关"  @click="toggleNav"></span>
        </div>
        <div style="position:absolute; right:0;top:0;display:table; ">
            <span style="vertical-align:middle;display: table-cell;"><img src="../../static/img/gys.png" style="width:30px;height:30px; cursor:pointer; margin-top: 28px;margin-right: 25px;"></span>
        </div>
      </el-header>
      <el-header v-if="!isHome" height="86px" style="text-align:center;">
        <div  style="display:flex; justify-content:center; position:absolute; left:0; top:0; height: 83px;color:#ffffff; font-size:45px; background-color: #205796; width:182px; text-align: center; align:center;border-bottom: 2px solid #091c30;">
            <img src="../../static/img/menu.png" style="width:22px;height:20px; position:absolute; left:160px; top:2px; cursor:pointer;" title="菜单开关"  @click="toggleNav">
            <div style="margin-top:5px;"><img  src="../../static/img/avatar.png"> </div>
            <div style="display:flex;flex-direction:column;margin-left: 10px;">
                <span style="font-size:14px;height:26px;margin-top: -16px;">欢迎您</span><span style="font-size:22px;">战飞</span>
             </div>
            <el-tabs v-model="activeTab" type="card" closable @tab-remove="removeTab" style="position:absolute; left:182px; top:0;">
                <el-tab-pane
                    v-for="(item) in editableTabs"
                        :key="item.name"
                        :label="item.title"
                        :name="item.name">
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--div v-if="iscloseNav" style="float: left;height: 83px;color:#ffffff; font-size:45px; background-color: #205796; width:60px; margin-left:-20px; text-align: center; align:center;border-bottom: 2px solid #091c30;">
           <img  style="width: 50%; min-width: 30px; cursor:pointer;" src="../../static/img/menu.png" title="显示菜单面板" @click="expandNav">
          </div-->
        <div class="clear"></div>
      </el-header>
    </div>
 
    <el-container  :class="bg_class">
      <el-aside ref="menu_nav_panel" :width="menvNavPanelWidth" style="background-color: #205796;">
          <div :class="iscloseNav ? 'menu-button-small' : 'menu-button'">
            <span style="cursor:pointer;">
              <img :style="iscloseNav? 'padding-top:15px; width: 50%; min-width: 30px;' : 'padding-top:22px;'" src="../../static/img/tasks.png">
              <span v-if="!iscloseNav" style="display:block; font-size:18px; font-weight:bold;">我的任务</span>
            </span>
          </div>
          <div :class="iscloseNav ? 'menu-button-small' : 'menu-button'">
            <span style="cursor:pointer;">
              <img  :style="iscloseNav? 'padding-top:15px; width: 50%; min-width: 30px;' : 'padding-top:22px;'" src="../../static/img/sm.png">
              <span v-if="!iscloseNav" style="display:block; font-size:18px; font-weight:bold;">供应商管理</span>
            </span>
          </div> 
          <div :class="iscloseNav ? 'menu-button-small' : 'menu-button'">
            <span style="cursor:pointer;">
              <img  :style="iscloseNav? 'padding-top:20px; width: 50%; min-width: 30px;' : 'padding-top:22px;'" src="../../static/img/setup.png">
              <span v-if="!iscloseNav" style="display:block; font-size:18px; font-weight:bold;">我的设置</span>
            </span>
          </div> 
      </el-aside>
  
      <el-container style="overflow-y: auto;">
        <div style="width:100%;">
          <div v-if="!isHome" style="text-align:center; height:85px; background: #6c8eb5; color:#ffffff; width:100%;display:table;">
            <span style="font-size:36px;vertical-align:middle;display: table-cell;">{{headerText}}</span>
          </div>
          <el-main style="padding:0;">
            <!--router-view class="content_size" @set_bg_class="set_bg_class" @set_header_text="set_header" @set_tab="set_tab"></router-view-->
            <div class="content_size" @set_bg_class="set_bg_class" @set_header_text="set_header" @set_tab="set_tab" :is="activeTab" />
          </el-main>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import bus from "../utils/bus.js";
  import  home from '@/components/HomeContent'
  import  meetingcenter from '@/components/MeetingHome'
  import  organize from '@/components/MeetingOrganize'
  import  organizedetail from '@/components/MeetingOrganizeDetail'

  export default {
    data() {
      return {
        userName: "Hysun",
        bg_class: "bg_home",
        headerText: "",
        iscloseNav:  false,
        menvNavPanelWidth: "182px",
        activeTab: home,
        editableTabs: [],
        isHome: true,
        isResizing: false
      };
    },
    components: {
        home,
        meetingcenter,
        organize,
        organizedetail
    },
    mounted() {
      this.zoom(document.body.clientWidth);
      window.onresize = () => {
        if(!this.isResizing) {
          // this.zoom(document.body.clientWidth);
        }
      };
    },
    methods: {
      zoom(w) {
        if(w <= 1000) {
          return;
        } else {
          setTimeout(() => {
            document.getElementsByTagName('body')[0].style.zoom=(w-182 - 26 - 26)/1588;
            this.isResizing = false;
          }, 100);
        }
      },
      set_bg_class(className) {
        console.log("[Home]set bg_class to " + className);
        this.bg_class = className;
      },
      set_header(headerText) {
        console.log("[Home]set headerText to " + headerText);
        this.headerText = headerText;
        this.isHome = false;
      },
      set_tab(tab) {
        let existedTab = [...this.editableTabs].filter(e => e.name === tab.name);
        if(!existedTab || existedTab.length === 0) {
          // console.log("* Adding the tab " + tab);
          this.editableTabs.push({
            title: tab.title,
            name: tab.name
          });
        }
        this.activeTab = tab.name;
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
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.activeTab;
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
        this.activeTab = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        delete this.datacache[targetName];

        if(this.editableTabs.length === 0) {
          this.isHome = true;
          this.activeTab = home;
        }
      }
    }
  };
</script>

<style scoped>
  .bg_home {
    background: url("../../static/img/bg_home.png") no-repeat;  
    background-size: 100% 100%;
    height:100% !important;
  }

  .bg_content {
    background: url("../../static/img/bg-content.png") no-repeat;  
    background-size: 100% 100%;
  }

  .bg_home  .content_size {
    /*margin:auto;*/
    height: 100%;
    min-width: 1560px;
  }

  .bg_content  .content_size {
    margin:auto;
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
