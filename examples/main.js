import Vue from 'vue'
import VueRouter from 'vue-router'
import fastclick from 'fastclick'
import './app.less'
import App from './app.vue'

Vue.use(VueRouter)

const router = new VueRouter()
router.map({
	'/': {
		component: App
	}
})

router.start(Vue.extend({}), '#container')

fastclick.attach(document.body)