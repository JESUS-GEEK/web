<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 命名空间
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select> -->
                <!-- <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input> -->
                <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection"  align="center"></el-table-column>
                 <el-table-column  prop="id" label="命名空间ID"> </el-table-column>
                <!-- <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column> -->
                <el-table-column prop="sysName" label="命名空间名称"></el-table-column>
               
                    <!-- <template slot-scope="scope">￥{{scope.row.money}}</template> -->
               
                <!-- <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.thumb"
                            :preview-src-list="[scope.row.thumb]"
                        ></el-image>
                    </template>
                </el-table-column> -->
                <el-table-column prop="desc" label="描述"></el-table-column>
                <!-- <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column> -->

                <!-- <el-table-column prop="date" label="注册时间"></el-table-column> -->
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        
                        <el-button
                            type="text"
                            icon="el-icon-view"
                            class="green"
                            @click="handleModule(scope.$index, scope.row)"
                        >查看模块信息</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div> -->
        </div>
    <!-- 新增 -->
    <el-dialog title="新增" :visible.sync="addVisible" width="30%">
            <el-form  label-width="130px">
                <el-form-item label="命名空间名称">
                    <el-input v-model="sysNameAdd"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="descAdd"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="130px">
                <el-form-item label="命名空间名称">
                    <el-input v-model="form.sysName"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData ,fetchNameSpaceData,deleteNameSpaceData,
addNameSpaceData,updateNameSpaceData} from '../../api/index';
export default {
    name: 'proOne',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible:false,
            pageTotal: 0,
            form: {},
                sysNameAdd:'',
                descAdd:'',
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchNameSpaceData(this.query).then(res => {
                console.log(res);
                this.tableData = res.data;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 触发搜索按钮
        // handleSearch() {
        //     this.$set(this.query, 'pageIndex', 1);
        //     this.getData();
        // },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    deleteNameSpaceData(row.id).then(res=>{
                        if(res.code == 200) {
                            this.$message.success('删除成功')
                        }else{
                            this.$message.error('删除失败')
                        }
                   })
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            console.log(index,row,'row')
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            updateNameSpaceData(this.form).then(res=>{
                 if(res.code == 200) {
                            this.$message.success('修改成功');
                            this.getData();
                        }else{
                            this.$message.error('修改失败')
                        }
             })
           
        },
        handleAdd(){
            this.addVisible = true; 
        },
        saveAdd(){
             this.addVisible = false;
             let form1 = {
                 sysName:this.sysNameAdd,
                 desc:this.descAdd,
             };
             addNameSpaceData(form1).then(res=>{
                 if(res.code == 200) {
                            this.$message.success('新增成功');
                            this.getData();
                        }else{
                            this.$message.error('新增失败')
                        }
             })
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        handleModule(index,row){
            this.$router.push({
                path:'/tabs',
                query:{
                    appId:row.id,
                     name:row.sysName,
                }
            })
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
