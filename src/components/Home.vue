<template>
  <div id="app">
    <!-- header -->
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
              <el-dropdown-item>
                <div @click="jumpTo()">
                  <span style="color: #555;font-size: 14px;">个人信息</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="jumpTo('/user/changepwd')">
                  <span style="color: #555;font-size: 14px;">修改密码</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span @click="aaa()">{{userName}}</span>
        </div>
        <div class="clear"></div>
      </el-header>
    </div>
    <!-- body -->
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
        <el-menu style="background-color: #16181D;" class="el-menu-vertical-demo" :default-active="$route.path" router :unique-opened='true'
          @select="handleSelect" :collapse='iscloseNav'>
          <template v-for="(item,index) in menuList">
            <el-submenu :index="index+''" :key="index">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title" style="color:#b3c0d1">{{item.name}}</span>
              </template>
              <el-menu-item v-for="(ll,ii) in item.snippet" :key="ii" :index="'/'+ll.urlf.split('.')[0]">{{ll.title}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      
      <!-- 右侧路由信息 -->
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
        defaultActiveIndex: ["0"],
        menuList: [],
        userName: "",
        collapsed: false,
        iscloseNav: false,
        welcome: true,
        bg_class: 'bg_home',
        headerText: "首页"
      };
    },
    mounted2() {
      var w = window.innerWidth;
      if (w < 500) {
        this.welcome = false;
      }
      this.userName = getCookie("username");
      var url = window.location.href;
      if (url.split("#")[1] == "/") {
      } else {
        this.collapsed = true;
      }
      var tt = this;
      // if (getCookie("token")) {
        this.$http
          .get("../../static/JSON/GetMenus.json"
          // , {
          //   params: {
          //     Token: getCookie("token")
          //   }
          // }
          )
          .then(
            function(response) {
              var status = response.data.Status;
              if (status === 1) {
                this.menuList = response.data.Result;
                localStorage.setItem(
                  "menulist",
                  JSON.stringify(response.data.Result)
                );
              } else if (status === 40001) {
                this.$message({
                  showClose: true,
                  type: "warning",
                  message: response.data.Result
                });
                setTimeout(() => {
                  tt.$router.push({
                    path: "/login"
                  });
                }, 1500);
              }
            }.bind(this)
          )
          .catch(
            function(error) {
              this.$notify.error({
                title: "错误",
                message: "错误：请检查网络"
              });
            }.bind(this)
          );
      // } else {
      //   this.$message({
      //     showClose: true,
      //     type: "warning",
      //     message: "请先登陆"
      //   });
      //   setTimeout(() => {
      //     tt.$router.push({
      //       path: "/login"
      //     });
      //   }, 1500);
      // }
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
      },
      // 	index: 选中菜单项的 index, indexPath: 选中菜单项的 index path
      handleSelect(index) {
        this.collapsed = true;
        // this.defaultActiveIndex = [index];
        // console.log(this.$route.path);
      },
      // 个人中心  修改密码
      jumpTo(url) {
        this.defaultActiveIndex = url;
        this.$router.push(url);
      },
      // 退出
      logout() {
        let that = this;
        this.$confirm("确认退出吗?", "提示", {
          confirmButtonClass: "el-button--warning"
        })
          .then(() => {
            //确认
            that.loading = true;
            delCookie("token");
            this.$router.push("/login");
          })
          .catch(() => {});
      },
      closeNav() {
        this.iscloseNav = !this.iscloseNav;
        if (this.iscloseNav) {
          $(".el-aside").css({
            width: "60px"
          });
        }
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
