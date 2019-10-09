<template>
    <div style="margin-left:52px; margin-right:52px;">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="crumb">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/organize' }">会议组织</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>

        <div class="top-msg-region">
                <span style="display: inline-block; ">会议编号：</span><span>S00000000000-{{selectedMeeting.meetingId}}</span>
                <span style="display: inline-block; margin-left: 100px;">会议名称：</span><span>{{selectedMeeting.meetingName}}</span>
		</div>

        <div  class="clear clearfix" style="margin-top:74px;">
             <el-button style="float:left;" type="text" class="button"><img  class="button_img_size" src="../assets/add.png"> 添加</el-button>
            <el-button style="float:left; margin-left:26px;"  type="text" class="button"><img  class="button_img_size" src="../assets/add.png"> 结束</el-button>
            <el-button  style="float:right;" type="text" class="button" @click="selectMeeting"><img  class="button_img_size" src="../assets/add.png"> 会议选择</el-button>
            <el-select  id="sel_meeting" ref="sel_meeting" style="float:right; " v-if="showMeetingSelBox" v-model="selectedMeeting" value-key="meetingId"  
                                 @change="onMeetingSelect" filterable placeholder="请选择">
                <el-option
                    v-for="item in meetings"
                    :key="item.meetingId"
                    :label="item.meetingName"
                    :value="item">
                </el-option>
            </el-select>
        </div>

        <div style="margin-top:14px;">
            <el-table
                :data="meetingTopics"
                stripe
                :header-cell-style="headerCcell"
                style="width: 100%; font-size:18px; color:#333333;">
                <el-table-column
                    type="index"
                    label="序号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="topic.topicName"
                    label="议题名称">
                </el-table-column>
                <el-table-column
                    prop="topic.topicApplier.name"
                    label="申请人"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="topicMaxDuration"
                    label="申请类型"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="conclusion"
                    label="状态"
                    width="180">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="180">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">更改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div style="float:right;">
            <el-pagination layout="prev, next, total"  :page-size="15" :total="totalTopics">
            </el-pagination>
        </div>
    </div>
</template>
<script type="text/javascript">
    import bus from "../utils/bus.js";
	export default{
		data(){
			 return {
                meetings: [],
                selectedMeeting: {},
                meetingTopics: [],
                totalTopics: 0,
                showMeetingSelBox: false
            }
        },
        created() {
            (function(_this){
                console.log("Loading topics");
                _this.meetings = bus.meeting_list;
                if(bus.meeting_list && bus.meeting_list.length > 0) {
                    _this.selectedMeeting = bus.meeting_list[0];
                    _this.loadTopics(_this);
                } else {
                    console.warn("Meeting list is not populated yet!");
                }
            })(this);
        },
        mounted() {
            this.$emit('set_header_text', '会议组织');
            this.$emit('set_bg_class', 'bg_content');
        },
        methods: {
            headerCcell(row){ 
                return "font-weight:bold; color:#333333; background-color: #c6d0dd;";
            },
            selectMeeting() {
                this.showMeetingSelBox = true;
                let _this = this;
                setTimeout(() => {
                    _this.$refs.sel_meeting.focus();
                }, 100)
            },
            loadTopics(_this) {
                _this.$http.get(_this.baseurl + '/getMeetingTopics/' + _this.selectedMeeting.meetingId).then(function (response) {
                    _this.meetingTopics = response.data;
                    _this.totalTopics = _this.meetingTopics.length;
                });
            },
            onMeetingSelect() {
                this.$refs.sel_meeting.blur();
                this.showMeetingSelBox = false;
                this.loadTopics(this);
            },
            handleClick(row) {
                console.log(row);
                this.$alert('正在操作主题：' + row.topic.topicName, '操作', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                    }
                });
            }
        }
	}
</script>
<style scoped> 
    .top-msg-region {
        font-size: 22px;
        color:#ffffff;
        margin-top:38px;
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
    .bottom {
        margin-top: 20px;
    }
    .button {
        padding: 0;
        background: #ffffff;
        width:130px;
        height:62px;
        font-size:20px;
        color: #0c7df0;
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
<style>
    #sel_meeting{
        height:62px;
    }
</style>