<template>
	<div> 
		<div class="top-msg-region">
			<el-row  style="font-size:20px;">
				<el-col :span="12" style="margin:0; padding:0;">
					<span style="padding-left:52px; display: inline-block; margin-top: 45px;">最近会议时间：</span><span>2019/09/24 16:08:23 </span>
				</el-col>
				<el-col :span="12" style="margin:0; padding:0;">
					<span style="display: inline-block; margin-top: 45px;">未加入会议议题：</span><span style="font-size:34px; color:#ffed27;">年末销售提升方案</span>
				</el-col>				
			</el-row>
		</div>

        <div style="margin-left:52px;">
            <el-row type="flex" :gutter="50">
                <el-col :span="24">
                    <el-card class="box-card">
                        <div class="menu-button">
                            <span style="cursor:pointer;">
                                <img  style="padding-top:25px;" src="../assets/mc.png">
                                <span style="display:block; ">会议创建</span>
                            </span>
                        </div>
                    </el-card>
                    <el-card class="box-card" style="margin-left:86px;">
                        <div class="menu-button">
                            <span style="cursor:pointer;" @click="go_meeting_organize()">
                                <img  style="padding-top:25px;" src="../assets/mo.png">
                                <span style="display:block; ">会议组织</span>
                            </span>
                        </div>
                    </el-card>
                    <el-card class="box-card" style="margin-left:86px;">
                        <div class="menu-button">
                            <span style="cursor:pointer;">
                                <img  style="padding-top:25px;" src="../assets/mq.png">
                                <span style="display:block; ">会议查询</span>
                            </span>
                        </div>
                    </el-card>
                </el-col>					
            </el-row>

            <el-row type="flex" style="margin-top:60px;">
                <el-col :span="24">
                    <el-card class="table-card" style="margin-right:22px;">
                        <div slot="header" class="clearfix">
                            <span style="font-size:24px; color:#333333; font-weight:600;">上会申请（当前有<span style="color:#ff200f;">{{totalMeetings}}</span>会议申请等待安排）</span>
                        </div>
                        <div>
                            <el-table
                                :data="meetingList"
                                stripe
                                :header-cell-style="headerCcell"
                                style="width: 100%; font-size:18px; color:#333333;">
                                <el-table-column
                                prop="meetingName"
                                label="方案名称"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="owner"
                                label="申请人"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="meetingTime"
                                label="申请时间">
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="bottom clearfix">
                            <el-button type="text" class="button" @click="showAllMeetingList()">查看申请列表</el-button>
                        </div>
                    </el-card>
                   <el-card class="table-card" style="margin-left:22px;">
                        <div slot="header" class="clearfix">
                            <span style="font-size:24px; color:#333333; font-weight:600;">上会申请（当前有<span style="color:#ff200f;">30</span>会议申请等待安排）</span>
                        </div>
                        <div>
                            <el-table
                                :data="tableData"
                                stripe
                                :header-cell-style="headerCcell"
                                style="width: 100%; font-size:18px; color:#333333;">
                                <el-table-column
                                prop="date"
                                label="会议议题"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="日期"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="时间">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="时长">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-col>			
            </el-row>
        </div>
	</div>
</template>
<script type="text/javascript">
    import bus from "../utils/bus.js";
	export default{
		data(){
			 return {
                meetingList: [],
                meetingListOrig: [],
                totalMeetings: 0,
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        methods: {
            go_meeting_organize(){
                this.$emit('set_header_text', '会议组织');
                this.$emit('set_bg_class', 'bg_content');
                 this.$router.push({
                  path: "/organize"
                });
            },
            headerCcell(row){ 
                return "font-weight:bold; color:#333333; ";
            },
            showAllMeetingList(){
                if(this.meetingList === this.meetingListOrig && this.meetingListOrig.length > 5) {
                    this.meetingList = this.meetingListOrig.slice(0,5);
                } else {
                    this.meetingList = this.meetingListOrig;
                }
            }
        },
        mounted() {
            // Dynamic header text & background image.
            (function(_this){
                if(_this.$route.path === '/home') {
                    _this.$emit('set_header_text', '首页');
                    _this.$emit('set_bg_class', 'bg_home');
                } else if(_this.$route.path === '/organize') {
                    _this.$emit('set_header_text', '会议组织');
                    _this.$emit('set_bg_class', 'bg_content');
                } else if(_this.$route.path === '/organize/detail') {
                    _this.$emit('set_header_text', '详情信息展示');
                    _this.$emit('set_bg_class', 'bg_content');
                }
             })(this);

            // Initialize table data
            (function(_this){
                _this.$http.get(_this.baseurl + '/listMeetingsByPage/1000/１').then(function (response) {
                    _this.meetingListOrig = response.data.list;
                    if(_this.meetingListOrig.length > 5) {
                        _this.meetingList = _this.meetingListOrig.slice(0,5);
                    } else {
                        _this.meetingList = _this.meetingListOrig;
                    }
                    _this.totalMeetings = _this.meetingListOrig.length;
                });
            })(this);
        }
	}
</script>
<style scoped> 
		.box-card {
			width:438px;
			height:314px;
            display: inline-table;
		}
		.table-card {
            width:723px;
            height:476px;
  /*          
			max-height:476px;
            min-height: 476px;
*/
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
		.top-msg-region {
			min-height:111px;
			background: #505f67;
			color:#ffffff;
		}
		.grid-content {
			border-radius: 4px;
			min-height: 36px;
		}
        .menu-button {
            color:#333333;
            font-size:34px;
            text-align: center;
            margin:0;
            width:100%;
            height:120px;
        }
        .bottom {
            margin-top: 20px;
        }

        .button {
            padding: 0;
            float: right;
            background: #2595cf;
            width:144px;
            height:52px;
            font-size:18px;
            color: #ffffff;
        }
        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }
        .clearfix:after {
            clear: both
        }
</style>