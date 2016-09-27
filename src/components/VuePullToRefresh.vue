<template>
  <div v-el:body>
    <div v-el:ptr class="ptr-element">
      loading...
    </div>
    <div v-el:refresh class="refresh-view">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import WebPullToRefresh from '../pull-to-refresh/wptr';

export default {
  
  data() {
    return {
      initialized: false
    }
  },

  props: {

    refresh: {
      type: Function,
      required: true
    },

    disabled: Boolean,

    distanceToRefresh: Number,

    resistance: Number,

    hammerOptions: Object

  },

  ready() {
    this.init();
  },

  methods: {
    
    init: function() {
      if (!this.initialized) {
        WebPullToRefresh().init({
          contentEl: this.$els.refresh,
          ptrEl: this.$els.ptr,
          bodyEl: this.$els.body,
          distanceToRefresh: this.distanceToRefresh || undefined,
          loadingFunction: this.handleRefresh,
          resistance: this.resistance || undefined,
          hammerOptions: this.hammerOptions || undefined
        });

        this.initialized = true;
      }
    },

    handleRefresh: function() {
      return new Promise((resolve, reject) => {
        this.refresh(resolve, reject)
      })
    }

  }

}
</script>