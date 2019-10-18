<template>
	<div id="homepage" style="width:1588px;">
        <div style="width:100%"  class="card-button-section">
            <div class="card-button" v-for="(item,i) in shortlist" :key="item.name">
                <span style="cursor:pointer;" @click="go(item)">
                    <img  style="padding-top:25px;" :src="item.icon">
                    <span style="display:block; ">{{item.name}}</span>
                </span>
            </div>
            <div class="card-button" style="flex-grow:2px;">
                <span style="cursor:pointer;" @click="add">
                    <img  style="padding-top:25px;" src="../../static/img/tj.png">
                    <span style="display:block; ">添加快捷键</span>
                </span>
            </div>
        </div>

        <div class="homepanel">
            <el-card class="tablefull-card2">
                <div slot="header" class="clearfix">
                    <span style="font-size:1.25rem; color:#333333; font-weight:600;">采购申请状态跟踪卡</span>
                </div>
                <div>
                    <el-table
                        :data="stateList"
                        stripe
                        :header-cell-style="headerCcell"
                        style="width: 100%; font-size:1.125rem; color:#333333;">
                        <el-table-column
                            prop="sn"
                            label="申请编号"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            prop="desc"
                            label="申请描述"
                            min-width="100">
                        </el-table-column>
                        <el-table-column
                            prop="dt"
                            label="提出日期"
                            min-width="80">
                        </el-table-column>
                        <el-table-column
                            prop="state"
                            label="状态跟踪"
                            width="700">
                            <template slot-scope="scope">
                                <div style="display:flex;flex-direction: row;align-items:center; ">
                                    <span :class="scope.row.state===0 ? 'statetext-now' : scope.row.state>0 ? 'statetext-passed' : 'statetext'">指标公告</span>
                                    <img  class="statearrow" :src="scope.row.state>=1 ? './static/img/ljt.png': './static/img/hjt.png'">
                                    <span :class="scope.row.state===1 ? 'statetext-now' : scope.row.state>1 ? 'statetext-passed' : 'statetext'">招标文件</span>
                                    <img  class="statearrow" :src="scope.row.state>=2 ? './static/img/ljt.png': './static/img/hjt.png'">
                                    <span :class="scope.row.state===2 ? 'statetext-now' : scope.row.state>2 ? 'statetext-passed' : 'statetext'">开标</span>
                                    <img  class="statearrow" :src="scope.row.state>=3 ? './static/img/ljt.png': './static/img/hjt.png'">
                                    <span :class="scope.row.state===3 ? 'statetext-now' : scope.row.state>3 ? 'statetext-passed' : 'statetext'">评标</span>
                                    <img  class="statearrow" :src="scope.row.state>=4 ? './static/img/ljt.png': './static/img/hjt.png'">
                                    <span :class="scope.row.state===4 ? 'statetext-now' : scope.row.state>4 ? 'statetext-passed' : 'statetext'">候选人公示</span>
                                    <img  class="statearrow" :src="scope.row.state>=5 ? './static/img/ljt.png': './static/img/hjt.png'">
                                    <span :class="scope.row.state===5 ? 'statetext-now' : scope.row.state>5 ? 'statetext-passed' : 'statetext'">结果通知</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
        </div>

        <div id="statustrack" class="homepanel">
            <el-card class="tablefull-card">
                <div slot="header" class="clearfix">
                    <span style="font-size:1.25rem; color:#333333; font-weight:600;">采购申请状态汇总卡</span>
                </div>
                <div style="display:flex">
                    <div class="sumcard sumcard-active">
                         <span style="color: #f92020 !important; font-size: 1.625rem !important">10</span>
                         <span>待分配申请</span>
                    </div>
                    <div class="bigarrow">
                        <img  style="padding-top:20px;" src="../../static/img/djt.png">
                    </div>
                    <div class="sumcard">
                        <span>12</span>
                         <span>已分配</span>
                    </div>
                     <div class="bigarrow">
                        <img  style="padding-top:20px;" src="../../static/img/djt.png">
                    </div>
                    <div class="sumcard">
                        <span>９</span>
                         <span>方案中</span>
                    </div>
                     <div class="bigarrow">
                        <img  style="padding-top:20px;" src="../../static/img/djt.png">
                    </div>
                    <div class="sumcard">
                        <span>12</span>
                         <span>招标中</span>
                    </div>
                     <div class="bigarrow">
                        <img  style="padding-top:20px;" src="../../static/img/djt.png">
                    </div>
                    <div class="sumcard">
                        <span>8</span>
                         <span>合同中</span>
                    </div>
                     <div class="bigarrow">
                        <img  style="padding-top:20px;" src="../../static/img/djt.png">
                    </div>
                    <div class="sumcard">
                        <span>28</span>
                         <span>已完成</span>
                    </div>                                                                            
                </div>
            </el-card>
        </div>

        <div class="homepanel" style="display:flex; flex-wrap:nowrap;">
            <el-card class="table-card" style="margin-right:18px;">
                <div slot="header" class="clearfix">
                    <span style="font-size:1.25rem; color:#333333; font-weight:600;">待办事项</span>
                    <el-button type="text" class="button"> 更多 <img style="width:18px; height:15px;" src="../../static/img/sjt.png"></el-button>
                </div>
                <div>
                    <el-table
                        :data="pendingTasks"
                        stripe
                        :header-cell-style="headerCcell"
                        style="width: 100%; font-size:1.125rem; color:#333333;">
                        <el-table-column
                            prop="type"
                            label="内容类型"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="desc"
                            label="内容描述"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="notify"
                            label="通知类型"
                            min-width="180">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
            <el-card class="table-card" >
                <div slot="header" class="clearfix">
                    <span style="font-size:1.25rem; color:#333333; font-weight:600;">上会申请</span>
                    <el-button type="text" class="button"> 更多 <img style="width:18px; height:15px;" src="../../static/img/sjt.png"></el-button>
                </div>
                <div>
                    <el-table
                        :data="topicList"
                        stripe
                        :header-cell-style="headerCcell"
                        style="width: 100%; font-size:1.125rem; color:#333333;">
                        <el-table-column
                            prop="type"
                            label="内容类型"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="desc"
                            label="内容描述"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="applyDate"
                            label="申请日期"
                            min-width="90">
                        </el-table-column>
                        <el-table-column
                            prop="applier"
                            label="申请人"
                            min-width="130">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
        </div>
	</div>
</template>
<script type="text/javascript">
    import bus from "../utils/bus.js";
	export default{
		data(){
			 return {
                shortlist: [],
                topicList: [],
                stateList: [],
                pendingTasks: [],
                totalStateTk: 0,
                totalTasks: 0,
                totalTopics: 0
            }
        },
        methods: {
            headerCcell(row){ 
                return "font-weight:bold; color:#333333; ";
            },
            go(item) {
                let tabtitle = item.tabtitle, tabname = item.tabname;
                if(tabtitle && tabname) {
                    this.$emit('set_tab', {
                        title: tabtitle,
                        name: tabname
                    });
                } else {
                    console.log("*Destination is not set.");
                    this.$message({
                        type: 'info',
                        message: `您正在点击 ${item.name}`
                    });
                }
            },
            add() {
                this.$message({
                    type: 'info',
                    message: `添加快捷操作`
                });
            }
        },
        created() {
            (function(_this){
                _this.$http.get(process.env.CONTEXT_PATH + "/static/JSON/shortcards.json").then(function(response){
                    _this.shortlist = response.data;
                    _this.shortlist .map(e =>e.icon = process.env.CONTEXT_PATH + e.icon);
                });
            })(this);

             (function(_this){
                _this.$http.get(process.env.CONTEXT_PATH + "/static/JSON/hometable.json").then(function(response){
                    _this.stateList = response.data.table0;
                    _this.totalStateTk = _this.stateList.length;
                    _this.pendingTasks = response.data.table1;
                    _this.totalTasks = _this.pendingTasks.length;
                    _this.topicList = response.data.table2;
                    _this.totalTopics = _this.topicList.length;
                });
            })(this);
        }
	}
</script>
<style scoped> 
		.table-card {
            width:calc(50% - 26px);
            display: inline-table;
            border: 1px solid;
            border-color: #4f718a;
            overflow: scroll;
        }
		.tablefull-card2 {
            width:calc(100% - 29px);
            display: inline-table;
            border: 1px solid;
            border-color: #4f718a;
            overflow: scroll;
		}
		.tablefull-card {
            width:calc(100% - 27px);
            display: inline-table;
            border: 1px solid;
            border-color: #4f718a;
            overflow: scroll;
		}
		.el-row {
			margin-bottom: 30px;
			&:last-child {
			margin-bottom: 0;
			}
		}
		.el-col {
			border-radius: 4px;
        }
        .sumcard {
            border-radius: 10px;
            border: solid 1px #0f62a9;
            display:flex;
            flex-direction:column; 
            justify-content: center;
            align-items: center;
            color: #333333;
            background-color: #d6edff;
            font-size:1.125rem;
            width:140px;
            height:73px;
        }

        .sumcard-active {
            border-color: #f92020 !important;
        }

        .bigarrow {
            margin-left:30px; 
            margin-right:30px;
        }
        .statetext {
            font-size:1.125rem;
            color:#666666;
        }
        .statetext-passed {
            font-size:1.125rem;
            color:#0b9958 !important;
        }
        .statetext-now {
            font-size:1.375rem !important;
            color:#f92020 !important;
        }
        .statearrow {
            padding-left:10px; 
            padding-right:10px;
        }
        .card-button-section {
            margin:0 0 26px 26px; 
            display:flex;
            width: 100%;
        }
        .card-button {
            color:#333333;
            font-size:1.625rem;
            background: #ffffff;
            text-align: center;
            margin:0 26px 0 0;
            width:234px;
            height:168px;
            margin-top:26px;
        }
        .button {
            padding: 0;
            float: right;
            background: transparent;
            font-size:1.125rem;
            color: #666666;
        }
        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }
        .clearfix:after {
            clear: both
        }
        .homepanel {  
            margin-left:26px; 
            margin-top:26px;
            width: 1560px;
        }
</style>

<style>
    #homepage   .el-card__body {
        padding-top:0 !important;
    }

    #statustrack  .el-card__header {
        border-bottom: none;
        padding-bottom: 26px;
    }
</style>