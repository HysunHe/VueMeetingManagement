<template>
    <div style="margin-left:32px; margin-right:52px;">
        <!--el-breadcrumb separator-class="el-icon-arrow-right" class="crumb">
            <el-breadcrumb-item :to="{ path: '/home' }">会议中心</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/organize' }">会议组织</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider-->

        <div class="top-msg-region">
                <span style="display: inline-block; ">会议编号：</span><span>S00000000000-{{selectedMeeting.meetingId}}</span>
                <span style="display: inline-block; margin-left: 100px;">会议名称：</span><span>{{selectedMeeting.meetingName}}</span>
		</div>

        <div  class="clear clearfix" style="margin-top:74px;">
             <el-button style="float:left;" type="text" class="button" @click="openDialog"><img  class="button_img_size" src="../assets/add.png"> 添加</el-button>
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

       <el-dialog id="meetingPoolDialog" title="会议池" :visible.sync="dialogVisible"  width="65%">
            <el-collapse style="height: 180px;" v-model="activeName" accordion>
                <el-collapse-item name="1" title="筛选条件">
                    <el-form :model="form">
                        <el-row style="margin-bottom:0">
                            <el-col :span="8">
                                <el-form-item label="申请人" :label-width="formLabelWidth">
                                    <el-input v-model="form.applier" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="申请类型" :label-width="formLabelWidth">
                                    <el-select v-model="form.topicType" placeholder="请选择">
                                        <el-option v-for="item in vl_topicType"
                                            :key="item.value"
                                            :label="item.key"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="议题名称" :label-width="formLabelWidth">
                                    <el-input v-model="form.name" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="0">
                             <el-button style="float:right; color:#0c7df0" icon="el-icon-search" @click="searchTopics">查询</el-button>
                        </el-row>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
            <el-table
                id="topicSelectTable"
                ref="topicSelectTable"
                :data="topicQueryList"
                tooltip-effect="dark"
                min-height="300"
                style="width: 100%"
                empty-text="所有可用的主题都已经加到了此会议中，暂无更多可添加的主题了"
                stripe
                border
                :header-cell-style="headerCcell"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                    width="60">
                </el-table-column>
                <el-table-column
                    type="selection"
                    min-width="30">
                </el-table-column>
                <el-table-column
                    prop="topicName"
                    label="议题名称"
                    min-width="80">
                </el-table-column>
                <el-table-column
                    prop="topicApplier.name"
                    label="申请人"
                    min-width="50">
                </el-table-column>
                <el-table-column
                    prop="topicType"
                    label="申请类型"
                    min-width="50">
                </el-table-column>
                <el-table-column
                    prop="conclusion"
                    label="状态"
                    min-width="50">
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button style="color:#0c7df0" icon="el-icon-save" @click="addTopics">保存选择</el-button>
            </div>
        </el-dialog>

        <div id="topicsTable" style="margin-top:14px;">
            <el-table
                :data="meetingTopics"
                stripe
                :header-cell-style="headerCcell"
                style="width: 100%; font-size:18px; color:#333333;">
                <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                    width="60">
                </el-table-column>
                <el-table-column
                    label="议题名称">
                        <template slot-scope="scope">
                            <a style="color:#0c7df0;" href="javascript:void(0);" @click="checkTopicDetail(scope.row)">{{scope.row.topic.topicName}}</a>
                        </template>
                </el-table-column>
                <el-table-column
                    prop="topic.topicApplier.name"
                    label="申请人"
                    min-width="60">
                </el-table-column>
                <el-table-column
                    prop="topic.topicType"
                    label="申请类型"
                    min-width="50">
                </el-table-column>
                <el-table-column
                    prop="conclusion"
                    label="状态"
                    min-width="50">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    min-width="50">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">更改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div style="float:right;">
            <el-pagination layout="prev, next, total"  :page-size="20" :total="totalTopics">
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
                showMeetingSelBox: false,
                dialogVisible: false,
                form: {
                    name: '',
                    topicType: '',
                    meetingType: '',
                    status: '',
                    applier: '',
                    duration: ''
                },
                formLabelWidth: '80px',
                vl_meetingStatus: [],
                vl_meetingType: [],
                vl_topicDuration: [],
                vl_topicType: [],
                activeName: '1',
                topicQueryList: [],
                selectedTopics: []
            }
        },
        created() {
            if(this.datacache["organize"]) {
                this._data = this.datacache["organize"];
                return true;
            } 
            this.datacache["organize"] = this._data;

            // Load topic data
            (function(_this){
                _this.meetings = bus.meeting_list;
                if(bus.meeting_list && bus.meeting_list.length > 0) {
                    _this.selectedMeeting = bus.meeting_list[0];
                    _this.loadTopics(_this);
                } else {
                    _this.$router.push({
                        path: "/home"
                    });
                }
            })(this);

            // Initialize value list.
            (function(_this){
                // _this.$http.get(`${_this.baseurl}/getMeetingStatus`).then(function (response) {
                //     _this.vl_meetingStatus = response.data;
                // });
                // _this.$http.get(_this.baseurl + '/getMeetingType').then(function (response) {
                //     _this.vl_meetingType = response.data;
                // });
                // _this.$http.get(_this.baseurl + '/getTopicMaxDuration').then(function (response) {
                //     _this.vl_topicDuration = response.data;
                // });
                _this.$http.get(_this.baseurl + '/getTopicType').then(function (response) {
                    _this.vl_topicType = response.data;
                });
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
                _this.$http.get(`${_this.baseurl}/getMeetingTopics/${_this.selectedMeeting.meetingId}`).then(function (response) {
                    _this.meetingTopics = response.data;
                    _this.totalTopics = _this.meetingTopics.length;
                    // Exclude already included topics in the search result
                    let existedTopics = _this.meetingTopics.map(topic => topic.topicId);
                    _this.topicQueryList = [...bus.topic_list].filter( e => !existedTopics.includes(parseInt(e.topicId)) );
                    console.log("orig: ", bus.topic_list);
                    console.log("meetingTopics: ", _this.meetingTopics);
                    console.log("topicQueryList: ", _this.topicQueryList);
                });
            },
            onMeetingSelect() {
                console.log("onMeetingSelect");
                this.$refs.sel_meeting.blur();
                this.showMeetingSelBox = false;
                this.loadTopics(this);
            },
            handleClick(row) {
                this.$alert('正在操作主题：' + row.topic.topicName, '操作', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                    }
                });
            },
            checkTopicDetail(row) {
                // this.$router.push({
                //   path: "/organize/detail"
                // });
                this.$emit('set_tab', {
                    title: '详情信息展示',
                    name: 'organizedetail'
                });
            },
            handleSelectionChange(val) {
                this.selectedTopics = val.map(topic => topic.topicId);
                console.log("Selected topics: " + this.selectedTopics.join(','));
            },
            openDialog() {
                this.dialogVisible = true;
                if(this.$refs.topicSelectTable) {
                    this.$refs.topicSelectTable.clearSelection();
                }
                // Exclude already included topics in the search result
                let existedTopics = this.meetingTopics.map(topic => topic.topicId);
                this.topicQueryList = [...bus.topic_list].filter( e => !existedTopics.includes(parseInt(e.topicId)) );
            },
            addTopics() {
                let _this = this;
                _this.$http.post(`${_this.baseurl}/addMeetingTopics`, {
                     meetingId: _this.selectedMeeting.meetingId,
                    topicIds: _this.selectedTopics.join(',')
                }).then(function (response) {
                    console.log(response.status + ": " + response.statusText);
                    _this.dialogVisible = false;
                    if(response.status >= 200 && response.status < 300) {
                        _this.loadTopics(_this);
                        _this.$message({
                            type: 'info',
                            message: '保存成功'
                        });
                    }
                });
            },
            searchTopics() {
                let _this = this;
                _this.$http.post(`${_this.baseurl}/searchTopic`, {
                    pageSize: "1000",
                    pageNum:"1",
                    applierName: _this.form.applier,
                    topicName: _this.form.name,
                    topicType: _this.form.topicType
                }) .then(function (response) {
                    console.log(response.status + ": " + response.statusText);
                    // Exclude already included topics in the search result
                    let existedTopics = _this.meetingTopics.map(topic => topic.topicId);
                    _this.topicQueryList = response.data.list.filter( e =>!existedTopics.includes(parseInt(e.topicId)) );
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
    #topicsTable .el-table td, #topicsTable .el-table th.is-leaf {
        border-right: 1px solid #636363;
        border-bottom: 1px solid #636363;
    }
    #topicSelectTable .el-table td, #topicSelectTable .el-table th.is-leaf {
        border-right: 1px solid #636363;
        border-bottom: 1px solid #636363;
    }
    #meetingPoolDialog .el-dialog__body {
        padding-top:5px !important;
    }
</style>
