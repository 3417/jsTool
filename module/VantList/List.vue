<template>
    <div class="list">
        <h2>List And refreshed And Tab Switch</h2>
        <van-tabs v-model="active" @click="onClick">
            <van-tab :title="item.title" :name="item.value" v-for="(item,index) in tabList" :key="index">
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                    >
                        <van-cell v-for="item in list" :key="item" :title="item" />
                    </van-list>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
    </div>
</template>
<!-- 还未测试   暂不完善 -->
<script>
export default {
    data() {
        return {
            tabList:[
                {
                    title:"标签一",
                    value:1
                },
                {
                    title:"标签二",
                    value:2
                },
                {
                    title:"标签三",
                    value:3
                }
            ],
            list:[],  //模拟数据
            active:1,
            loading: false,
            finished: false,
            error: false, //请求出错
            refreshing: false, //下拉刷新
            pageNum:1,  //初始化加载默认为1开始
            pageSize:10 //每页加载多少条数
        }
    },
    methods:{
        // 下拉刷新
        onRefresh(){
            this.finished = false;
            this.loading = true;
            this.onLoad();
        },
        // onLoad加载数据
        onLoad(){
            if(this.refreshing){
                this.list = [];
                this.refreshing = false;
            }
            let params = {
                pageNum:this.pageNum,
                pageSize:this.pageSize,
            }
            axios.post('xxxxx',params).then(resp=>{
                this.pageNum++;
                this.loading = false;
                this.list = resp.list;
                if(resp.curPage == this.pageNum){
                    this.finished = true;
                }
            }).catch(err=>{
                this.error = true;
            })
        },
        // tab(click切换)
        onClick(){
            this.onRefresh();
        }

    }
}
</script>

<style>
</style>