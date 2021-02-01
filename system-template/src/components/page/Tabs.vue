<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 【{{this.$route.query.name}}】模块信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane  v-for="(name,index) in ModuleNameList" :key="index"  :label="`${name.moduleName}`" name="first">
                    <el-table :data="ModuleConfigList"  style="width: 100%">
                        <el-table-column label="键" >
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.paramName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="paramValue"  label="值"></el-table-column>
                        <el-table-column width="120" label="操作">
                            <template slot-scope="scope">
                                <el-button  @click="handleRead(scope.$index,scope.row)">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="primary" @click="saveAppConfigs">新增</el-button>
                    </div>
                </el-tab-pane>
                <!-- <el-tab-pane :label="`已读消息(${read.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="read" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="recycle" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button @click="handleRestore(scope.$index)">还原</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger">清空回收站</el-button>
                        </div>
                    </template>
                </el-tab-pane> -->
            </el-tabs>
        </div>
            <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="键">
                    <el-input v-model="form.paramName"></el-input>
                </el-form-item>
                <el-form-item label="值">
                    <el-input v-model="form.paramValue"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新增" :visible.sync="addVisible" width="30%">
            <el-form   label-width="70px">
                <el-form-item label="键">
                    <el-input v-model="configKey"></el-input>
                </el-form-item>
                <el-form-item label="值">
                    <el-input v-model="configValue"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveConfig">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {getAppModuleData,getAppConfigData,updateAppModule,saveAppModule,saveAppConfig,updateAppConfig} from '../../api/index';
    export default {
        name: 'tabs',
        data() {
            return {
                message: 'first',
                showHeader: false,
                unread: [{
                    date: '2018-04-19 20:00:00',
                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                },{
                    date: '2018-04-19 21:00:00',
                    title: '今晚12点整发大红包，先到先得',
                }],
                read: [{
                    date: '2018-04-19 20:00:00',
                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
                }],
                recycle: [{
                    date: '2018-04-19 20:00:00',
                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
                }],
                ModuleNameList:[],
                ModuleConfigList:[],
                addVisible:false,
                editVisible:false,
                configValue:'',
                configKey:'',
                form:{},
            }
        },
        methods: {
            getModlueData(){
                console.log(this.$route.query.appId)
                getAppModuleData({appId:this.$route.query.appId}).then(res=>{
                    if(res.code == 200) {
                            // this.$message.success('查询成功');
                            this.ModuleNameList = res.data
                        }else{
                            this.$message.error('查询失败')
                        }
                })
            },
            getAppConfigData(){
                let obj={
                    appId:this.$route.query.appId,
                    // moduleId:this.$route.query.id,
                }
                getAppConfigData({appId:this.$route.query.appId,}).then((res)=>{
                    console.log(res,'res')
                     this.ModuleConfigList = res.data
                })
            },
            // 新增配置
            saveAppConfigs(){
                this.addVisible =true;
            },
            //保存配置
            saveConfig(){
                this.addVisible =false;
                let obj={
                    appId:this.$route.query.appId,
                    paramName:this.configKey,
                    paramValue:this.configValue,
                }
                saveAppConfig(obj).then(res=>{
                    if(res.code == 200) {
                        this.getAppConfigData();
                    }
                })
            },
            saveEdit(){
                console.log(this.form,'form')
                 let obj={
                      id:this.form.id,
                      appId:this.form.appId,
                      moduleName:this.form.paramName,
                      moduleValue:this.form.paramValue,
                      moduleCode:this.form.paramCode,
                }
                updateAppConfig(obj).then(res=>{
                    if(res.code == 200){
                       this.editVisible = false; 
                       this.getAppConfigData();
                    }
                })
            },
            handleRead(index,row) {
                this.editVisible = true;
                this.form = row;
                // const item = this.unread.splice(index, 1);
                // console.log(item);
                // this.read = item.concat(this.read);
               
            },
            handleDel(index) {
                const item = this.read.splice(index, 1);
                this.recycle = item.concat(this.recycle);
            },
            handleRestore(index) {
                const item = this.recycle.splice(index, 1);
                this.read = item.concat(this.read);
            }
        },
        computed: {
            unreadNum(){
                return this.unread.length;
            }
        },
        mounted(){
            this.getModlueData();
            this.getAppConfigData();
        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
</style>

