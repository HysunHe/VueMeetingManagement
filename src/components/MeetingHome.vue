<template>
	<div > 
		<div class="top-msg-region">
			<el-row  style=" font-size:1.25rem;">
				<el-col :span="12" style="margin:0; padding:0;">
					<span style="padding-left:52px; display: inline-block; margin-top: 45px;">最近会议时间：</span><span>2019/09/24 16:08:23 </span>
				</el-col>
				<el-col :span="12" style="margin:0; padding:0;">
					<span style="display: inline-block; margin-top: 45px;">未加入会议议题：</span><span style=" font-size:2.125rem; color:#ffed27;">年末销售提升方案</span>
				</el-col>				
			</el-row>
		</div>

        <div id="meetingHome" style="margin-left:52px;" >
            <div style="display:flex; flex-wrap: nowrap;">
                <el-card class="box-card">
                    <div class="menu-button">
                        <span style="cursor:pointer;">
                            <img  style="padding-top:25px;" src="../../static/img/mc.png">
                            <span style="display:block; ">会议创建</span>
                        </span>
                    </div>
                </el-card>
                <el-card class="box-card" style="margin-left:86px;">
                    <div class="menu-button">
                        <span style="cursor:pointer;" @click="go_meeting_organize()">
                            <img  style="padding-top:25px;" src="../../static/img/mo.png">
                            <span style="display:block; ">会议组织</span>
                        </span>
                    </div>
                </el-card>
                <el-card class="box-card" style="margin-left:86px;">
                    <div class="menu-button">
                        <span style="cursor:pointer;">
                            <img  style="padding-top:25px;" src="../../static/img/mq.png">
                            <span style="display:block; ">会议查询</span>
                        </span>
                    </div>
                </el-card>
            </div>

            <div id="tablesection" class="tablesection" style="display:flex; flex-wrap: nowrap; margin-bottom:40px;">
                <el-card class="table-card" style="margin-right:22px;">
                    <div slot="header" class="clearfix">
                        <span style=" font-size:1.5rem; color:#333333; font-weight:600;">上会申请（当前有<span style="color:#ff200f;">{{totalMeetings}}</span>会议申请等待安排）</span>
                    </div>
                    <div>
                        <el-table
                            :data="meetingList"
                            stripe
                            :header-cell-style="headerCcell"
                            style="width: 100%; font-size:1.125rem; color:#333333;">
                            <el-table-column
                                prop="meetingName"
                                label="方案名称"
                                min-width="200">
                            </el-table-column>
                            <el-table-column
                                prop="owner.name"
                                label="申请人"
                                min-width="180">
                            </el-table-column>
                            <el-table-column
                                prop="meetingTime"
                                label="申请时间"
                                :formatter="truncDatetime2Mins"
                                min-width="180">
                            </el-table-column>
                        </el-table>
                    </div>
                    <!--div class="bottom clearfix">
                        <el-button type="text" class="button" @click="showAllMeetingList()">查看申请列表</el-button>
                    </div-->
                </el-card>
                <el-card class="table-card" style="margin-left:22px;">
                    <div slot="header" class="clearfix">
                        <span style=" font-size:1.5rem; color:#333333; font-weight:600;">会议安排（当前有<span style="color:#ff200f;">{{totalTopics}}</span>会议申请等待安排）</span>
                    </div>
                    <div>
                        <el-table
                            :data="topicList"
                            stripe
                            :header-cell-style="headerCcell"
                            style="width: 100%; font-size:1.125rem; color:#333333;">
                            <el-table-column
                                prop="topicName"
                                label="会议议题"
                                min-width="200">
                            </el-table-column>
                            <el-table-column
                                prop="applyTime"
                                label="日期"
                                :formatter="truncDate"
                                min-width="180">
                            </el-table-column>
                            <el-table-column
                                prop="applyTime"
                                label="时间"
                                :formatter="truncTime"
                                min-width="90">
                            </el-table-column>
                            <el-table-column
                                prop="topicMaxDuration"
                                label="时长"
                                min-width="130">
                            </el-table-column>
                        </el-table>
                    </div>
                    <!--div class="bottom clearfix">
                        <el-button type="text" class="button" @click="showAllTopicList()">查看申请列表</el-button>
                    </div-->
                </el-card>
            </div>
        </div>
	</div>
</template>
<script type="text/javascript">
    import bus from "../utils/bus.js";
	export default{
		data(){
			 return {
                meetingList: [],
                topicList: [],
                totalMeetings: 0,
                totalTopics: 0
            }
        },
        mounted() {
            this.$emit('set_header_text', '会议中心');
            this.$emit('set_bg_class', 'bg_home');
        },
        methods: {
            go_meeting_organize(){
                // this.$emit('set_header_text', '会议组织');
                // this.$emit('set_bg_class', 'bg_content');
                // this.$router.push({
                //   path: "/organize"
                // });
                this.$emit('set_tab', {
                    title: '会议组织',
                    name: 'organize'
                });
            },
            headerCcell(row){ 
                return "font-weight:bold; color:#333333; ";
            },
            showAllMeetingList(){
                if(this.meetingList === bus.meeting_list && bus.meeting_list.length > 5) {
                    this.meetingList = bus.meeting_list.slice(0,5);
                } else {
                    this.meetingList = bus.meeting_list;
                }
            },
            showAllTopicList(){
                if(this.topicList === bus.topic_list && bus.topic_list.length > 5) {
                    this.topicList = bus.topic_list.slice(0,5);
                } else {
                    this.topicList = bus.topic_list;
                }
            },
            truncDate(row, column, cellValue, index){
                const daterc = row[column.property]
                return daterc.substring(0, daterc.indexOf(' '));
            },
            truncTime(row, column, cellValue, index){
                const daterc = row[column.property]
                return daterc.substring(daterc.indexOf(' '), daterc.lastIndexOf(':'));
            },
            truncDatetime2Mins(row, column, cellValue, index){
                const daterc = row[column.property]
                return daterc.substring(0, daterc.lastIndexOf(':'));
            }
        },
        created() {
            if(this.datacache["meetingcenter"]) {
                this._data = this.datacache["meetingcenter"];
                return true;
            } 
            this.datacache["meetingcenter"] = this._data;

            // Initialize meeting table data 
            (function(_this){
                _this.$http.get(`${_this.baseurl}/listMeetingsByPage/1000/1`).then(function (response) {
                    bus.meeting_list = response.data.list;
                    // if(bus.meeting_list.length > 5) {
                    //     _this.meetingList = bus.meeting_list.slice(0,5);
                    // } else {
                        _this.meetingList = bus.meeting_list;
                    // }
                    _this.totalMeetings = bus.meeting_list.length;
                });
            })(this);

            // Initialize topics table data
            (function(_this){
                _this.$http.get(`${_this.baseurl}/listTopicsByPage/1000/1`).then(function (response) {
                    bus.topic_list = response.data.list;
                    // if(bus.topic_list.length > 5) {
                    //     _this.topicList = bus.topic_list.slice(0,5);
                    // } else {
                        _this.topicList = bus.topic_list;
                    // }
                    _this.totalTopics = bus.topic_list.length;
                });
            })(this);
        }
	}
</script>
<style scoped> 
		.box-card {
			width:438px;
			height:auto;
		}
		.table-card {
            width:723px;
            height:416px;
            border: 1px solid;
            border-color: #4f718a;
            overflow-y: auto;
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
	/*		background: #505f67; */
			color:#ffffff;
		}
		.grid-content {
			border-radius: 4px;
			min-height: 36px;
		}
        .menu-button {
            color:#333333;
             font-size:2.125rem;
            text-align: center;
            justify-content: center;
            align-items: center;
            margin:0;
            width:100%;
            /*height:120px;*/
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
            font-size:1.125rem;
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
        .tablesection {
            margin-top:60px;
            /*height:calc(100vh - 685px);*/
        }
</style>

<style>
    #meetingHome  .el-table__body-wrapper {
        overflow-y: auto !important;
        min-height: 220px;
        max-height: 268px;
    }
    #tablesection .el-card__body {
        padding-top:0 !important;
    }
</style>