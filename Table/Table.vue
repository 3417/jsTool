<template>
    <!-- 基于el-table的封装 -->
    <div class="common_table">
        <el-table
            :data="dataList"
            style="width:100%"
            :height="DomH"
            @selection-change="onSelectionChange"
        >
            <el-table-column type="selection" v-if="propConfig.isSelection" width="55"></el-table-column>
            <div v-for="(item,index) in propConfig" :key="index">
                <el-table-column
                    v-if="item.isSlot"
                    :align="align"
                    :width="item.width"
                    show-overflow-tooltip
                >
                    <!-- 自定义头部--根据需求自定义优化 -->
                    <template slot="header" slot-scope="scope">
                        <span>{{ item.propConfig.label }}</span>
                    </template>
                    <template slot-scope="scope">
                        <div v-if="item.render" v-html="item.render(scope.row, item)"></div>
                        <div v-else-if="item.isOperation">
                            <el-button
                                v-for="its in item.btns"
                                :key="its.id"
                                @click.stop="handleClick(scope.row, item)"
                            >{{ its.text }}</el-button>
                        </div>
                        <!-- 插槽--自定义 -->
                        <slot name="custom" v-else-if="item.custom"></slot>
                    </template>
                </el-table-column>
                <el-table-column
                    v-else
                    :label="item.label"
                    :prop="item.prop"
                    :align="item.align"
                    :width="item.width"
                    show-overflow-tooltip
                    :formatter="item.formatterFn"
                ></el-table-column>
            </div>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            background
            layout="prev,sizes,pager,next,jumper"
            :page-sizes="[30, 40, 50, 80]"
            :total="pageConfig.total"
            :page-size="pageConfig.pageSize"
            :current-page="pageConfig.pageNum"
            @current-change="onPageChange"
            @size-change="onSizeChange"
        ></el-pagination>
    </div>
</template>

<script>
export default {
    name: "commmon_table",
    props: {
        pageConfig: {
            type: Object,
            default: () => { }
        },
        propConfig: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        DomH() {
            // 页面的高度小于定的最小宽度  则高度为最小高度   页面的高度大于最小高度  则高度设置为计算后的高度
            const HEIGHT_DOM = document.documentElement.clientHeight - 300
            return HEIGHT_DOM > 400 ? HEIGHT_DOM : 400
        }
    },
    data() {
        return {}
    },
    methods: {
        onSelectionChange(ckList) {
            this.$emit("onSelectChange", ckList)
        },
        //  按钮事件总emit返回开关
        handleClick(rows, item) {
            // switch(item.xxx){
            //     case xxx:
            //     break;
            // }
        },
        onPageChange(page) {
            this.$emit("onPageChange", page);
        },
        onSizeChange(size) {
            this.$emit("onSizeChange", size);
        }
    }
}
</script>

<style lang='scss' scoped>
// 根据相关的UI图实现对应的样式
.common_table {
    // xxxxx
}
</style>