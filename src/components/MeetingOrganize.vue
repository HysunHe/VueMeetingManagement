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
                                 @change="onMeetingSelect" default-first-option placeholder="请选择">
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
                :data="tableData"
                stripe
                :header-cell-style="headerCcell"
                style="width: 100%; font-size:18px; color:#333333;">
                <el-table-column
                prop="date"
                label="日期"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>
            </el-table>
        </div>

        <div style="float:right;">
            <el-pagination layout="prev, next, total"  :page-size="10" :total="15">
            </el-pagination>
        </div>
    </div>
</template>
<script type="text/javascript">
    import bus from "../utils/bus.js";
	export default{
		data(){
			 return {
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
                }],
                meetings: [],
                selectedMeeting: {},
                showMeetingSelBox: false
            }
        },
        mounted() {
            this.$emit('set_header_text', '会议组织');
            this.$emit('set_bg_class', 'bg_content');
            this.meetings = bus.meeting_list;
            if(bus.meeting_list && bus.meeting_list.length > 0) {
                this.selectedMeeting = bus.meeting_list[0];
            } else {
                console.warn("Meeting list is not populated yet!");
            }
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
            onMeetingSelect() {
                this.$refs.sel_meeting.blur();
                this.showMeetingSelBox = false;
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