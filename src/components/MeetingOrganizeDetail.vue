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
                    <div>
                        <span style="display:block; font-size:24px; color:#80c2fc;">项目背景</span>
                        <span style="display:block; margin-top: 10px; font-size:18px; color:#333333; font-weight:bold;">申请单号：100***766</span>
                        <span style="display:block; margin-top: 10px; font-size:18px; color:#333333; font-weight:bold;">最高投票限价：120万</span>
                        <span style="display:block; margin-top: 10px; font-size:18px; color:#333333; font-weight:bold;">项目预算：100万（含税）</span>
                        <span style="display:block; margin-top: 10px; font-size:18px; color:#333333;">项目工期：2年</span>
                        <span style="display:block; margin-top: 10px; font-size:18px; color:#333333;">项目保持期：30年</span>
                        <span style="display:block; margin-top: 10px; font-size:18px; color:#333333;">项目内容：自动驾使行人主动识别工程</span>
                    </div>
                </el-card>
                <el-card class="box-card" style="margin-left:48px;">
                    <div>
                        <span style="display:block; font-size:24px; color:#80c2fc;">采购方案</span>
                        <span style="display:block; margin-top: 15px; font-size:18px; color:#333333; font-weight:bold;">采购方式：直接采购</span>
                        <span style="display:block; margin-top: 15px; font-size:18px; color:#333333; font-weight:bold;">评估方法：经评审的最低投标价法</span>
                        <span style="display:block; margin-top: 15px; font-size:18px; color:#333333;">推荐供应商：XXX 公司，YYY 公司</span>
                        <span style="display:block; margin-top: 15px; font-size:18px; color:#333333;">付款方式及式：<span style="color:#333333">预付款三分之一，产品交付后再付款三分之一，剩余维护费用</span></span>
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
                        :data="suppliers"
                        stripe
                        :header-cell-style="headerCcell"
                        style="width: 100%; font-size:18px; color:#333333;">
                        <el-table-column
                            type="index"
                            label="序号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="supplierName"
                            label="供应商名称"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="nature"
                            label="公司性质"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="isPlatform"
                            label="是否在采购平台"
                            align="center"
                            min-width="80">
                        </el-table-column>
                        <el-table-column
                            prop="isTaxPayer"
                            label="是否一般纳税"
                            align="center"
                            min-width="80">
                        </el-table-column>
                        <el-table-column
                            prop="quality"
                            label="质量提示认证"
                            align="center"
                            min-width="80">
                        </el-table-column>
                        <el-table-column
                            prop="capital"
                            label="注册资金"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="qualification"
                            label="资金类别及等级"
                            min-width="230">
                        </el-table-column>
                        <el-table-column
                            prop="similarProduct"
                            label="同类产品业绩"
                            min-width="180">
                        </el-table-column>
                        <el-table-column
                            prop="comment"
                            label="备注">
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
                suppliers: []
            }
        },
        methods: {
            headerCcell(row){ 
                return "font-weight:bold; color:#333333; background-color: #accef8;";
            }
        },
        created() {
            (function(_this){
                _this.$http.get("../../static/JSON/supplier.json").then(function(response){
                    console.log(response.data);
                    _this.suppliers = response.data;
                });
            })(this);
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
<style>
    #supplierRecommendTable .el-table td, #supplierRecommendTable .el-table th.is-leaf {
        border-right: 1px solid #7d7d7d;
        border-bottom: 1px solid #7d7d7d;
    }
</style>