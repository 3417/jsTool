<template>
    <div class="common_search">
        <el-form
            :model="form"
            ref="searchBarForm"
            :label-width="formWidth"
            class="common_search_form"
        >
            <el-form-item :label="item.label" v-for="(item,index) in formList" :key="index">
                <el-input
                    v-model="form[item.key]"
                    :placeholder="item.placeholder"
                    v-if="item.type === 'input'"
                ></el-input>
                <el-select
                    v-else-if="item.type === 'select'"
                    v-model="form[item.key]"
                    :placeholder="item.placeholder"
                    @change="(val) => { handleChange(val, item, item.handleFn) }"
                >
                    <el-option
                        :label="data.n"
                        :value="data.c"
                        v-for="(data, key) in item.options"
                        :key="key"
                    ></el-option>
                </el-select>

                <el-switch v-model="form[item.key]" v-else-if="item.type === 'switch'"></el-switch>
                <!-- date日期控件(根据需求进行更改) -->
                <el-row v-else-if="item.type === 'date'">
                    <el-col :span="11" v-for="(v,k) in item.list" :key="k">
                        <el-form-item>
                            <el-date-picker
                                :type="v.type"
                                :placeholder="v.placeholder"
                                v-model="form[item.key]"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 按钮 -->
                <template v-else-if="item.type === 'button'">
                    <el-button
                        v-for="(btn, key) in item.btns"
                        :key="key"
                        :class="btn.className"
                        @click.stop="handleChange(btn, item, btn.handleFn)"
                    >{{ btn.name }}</el-button>
                </template>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "searchBar",
    data() {
        return {}
    },
    props: {
        formList: {
            type: Array,
            default: () => []
        },
        formWidth: {
            type: String,
            default: "80px"
        },
        form: {
            type: Object,
            default: () => { }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>