<template>
    <div style="margin-left:52px; margin-right:52px;">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="crumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/organize' }">会议组织</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>

        <div class="top-msg-region">
                <span style="display: inline-block; ">会议编号：</span><span>2019/09/24 16:08:23 </span>
                <span style="display: inline-block; margin-left: 100px;">会议名称：</span><span>年末销售提升方案</span>
		</div>

        <div  class="clear clearfix" style="margin-top:74px;">
             <el-button style="float:left;" type="text" class="button">＋ 添加</el-button>
            <el-button style="float:left;"  type="text" class="button">＋ 结束</el-button>
            <el-button style="float:right;" type="text" class="button">＋ 会议选择</el-button>
        </div>

        <el-row type="flex" style="margin-top:14px;">
            <el-col :span="24">
                <el-card class="table-card">
                    <div>
                        <el-table
                            :data="tableData"
                            stripe
                            header-cell-style="font-weight:bold; color:#333333;"
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
                </el-card>
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
    .crumb {
        height: 36px;
        line-height: 36px;
        font-size:16px;
        color:#ffffff;
    }
</style>