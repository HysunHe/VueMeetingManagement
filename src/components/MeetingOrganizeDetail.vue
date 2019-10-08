<template>
    <div style="margin-left:52px; margin-right:52px;">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="crumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/organize' }">会议组织</el-breadcrumb-item>
             <el-breadcrumb-item :to="{ path: '/organize/detail' }">详情信息展示</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>

        <div  class="clear clearfix" style="margin-top:20px;">
             <el-button type="text" class="button button-active">基本信息</el-button>
            <el-button   type="text" style="margin-left:-4px;" class="button button-inactive">会议材料</el-button>
        </div>

        <el-row type="flex"  style="margin-top:30px;">
            <el-col :span="24">
                <el-card class="box-card">
                    <div class="menu-button">
                        <span style="cursor:pointer;">
                        <img  style="padding-top:25px;" src="../assets/mc.png">
                        <span style="display:block; ">会议创建</span>
                        </span>
                    </div>
                </el-card>
                <el-card class="box-card" style="margin-left:48px;">
                    <div class="menu-button">
                        <span style="cursor:pointer;">
                        <img  style="padding-top:25px;" src="../assets/mo.png">
                        <span style="display:block; ">会议组织</span>
                        </span>
                    </div>
                </el-card>
                </el-card>
            </el-col>					
        </el-row>
            
        <el-row style="margin-top:35px;">
            <el-col :span="24">
                <span style="font-size:22px; color:#ffffff;">供应商推荐</span>
            </el-col>
        </el-row>
        <el-row type="flex" >
            <el-col :span="24">
                <div id="supplierRecommendTable">
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
            </el-col>			
        </el-row>

        <div style="float:right;">
            <el-pagination layout="prev, next, total"  :page-size="10" :total="15">
            </el-pagination>
        </div>
    </div>
</template>
<script type="text/javascript">
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
                }]
            }
        },
        methods: {
            headerCcell(row){ 
                return "font-weight:bold; color:#333333; background-color: #accef8;";
            }
        },
        mounted() {
            this.$emit('set_header_text', '详情信息展示');
            this.$emit('set_bg_class', 'bg_content');
        }
	}
</script>
<style scoped> 
    .top-msg-region {
        font-size: 22px;
        color:#ffffff;
        margin-top:38px;
    }
    .box-card {
        width:602px;
        height:288px;
        display: inline-table;
    }
    .el-row {
        margin-bottom: 20px;
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
        margin:0;
        background: transparent;
        width:122px;
        height:50px;
        font-size:20px;
        color: #ffffff;
    }

    .button-active {
        background-color: #4fbafd;
    }

    .button-inactive {
        border: 1px solid;
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