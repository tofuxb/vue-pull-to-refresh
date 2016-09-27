<template>
    <div class="app" transition="app">
        <div class="bd">
            <vue-pull-to-refresh :refresh="handleRefresh">
                <ul class="item_container">
                    <li v-for="item in items" track-by="$index" class="item">
                        Item: {{ $index+1 }}
                    </li>
                </ul>
            </vue-pull-to-refresh>
        </div>
    </div>
</template>

<script>
import VuePullToRefresh from '../src/components/VuePullToRefresh.vue';
export default {
    data() {
        return {
            items: new Array(30)
        }
    },

    components: {
        'vue-pull-to-refresh': VuePullToRefresh
    },

    methods: {
        handleRefresh: function(resolve, reject) {
            let self = this;
            setTimeout(function() {
                self.addItem() ? resolve() : reject();
            }, 500);
        },

        addItem: function() {
            this.items.push(null);
            return true
        }
    }
}
</script>

<style>
    .item_container {
        list-style: none;
        padding-left: 0;
    }
    .item {
        line-height: 50px;
        height: 50px;
        border-bottom: 1px solid #ccc;
        margin-left: 30px;
        margin-right: 30px;
    }
</style>