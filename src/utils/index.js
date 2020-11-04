import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import {isObject} from 'lodash'

const uaVersions = function () {
    let u = navigator.userAgent
    return {
        trident: u.includes('Trident'), //IE内核
        presto: u.includes('Presto'), //opera内核
        webKit: u.includes('AppleWebKit'), //苹果、谷歌内核
        gecko: u.includes('Gecko') && !u.includes('KHTML'),//火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.includes('Android') || u.includes('Adr'), //android终端
        iPhone: u.includes('iPhone'), //是否为iPhone或者QQHD浏览器
        iPad: u.includes('iPad'), //是否iPad
        webApp: !u.includes('Safari'), //是否web应该程序，没有头部与底部
        weixin: u.includes('MicroMessenger'), //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) === ' qq', //是否QQ
    }
}()

// 为了兼容某些浏览器的location中不存在 origin 属性
const origin = (function () {
    return location.origin || `${location.protocol}//${location.host}`
})()

const utils = {
    origin,
    store: {
        get(name) {
            const data = window.localStorage.getItem(name)
            try {
                return JSON.parse(data)
            } catch (e) {
                return data
            }
        },
        set(key, value) {
            let data = value
            if (isObject(value)) {
                data = JSON.stringify(value)
            }
            window.localStorage.setItem(key, data)
        },
    },
    dayjs,
    // 设备信息
    browser: {
        versions: uaVersions,
        language: (navigator.browserLanguage || navigator.language).toLowerCase(),
        isIos: uaVersions.ios,
        isAndroid: uaVersions.android,
        isWxEnv: uaVersions.weixin,
        isWxMiniApp: window.__wxjs_environment === 'miniprogram',
    },
    // 设置网页标题
    setTitle(title = '') {
        document.title = title
        let frame = document.createElement('iframe')
        frame.style.display = 'none'
        frame.addEventListener('load', e => {
            setTimeout(() => {
                document.body.removeChild(frame)
            }, 1000)
        })
        document.body.appendChild(frame)
    },
    isJson(str) {
        try {
            JSON.parse(str)
            return true
        } catch (e) {
            return false
        }
    },

    /**
     * 手机号显示 ****
     * @param {String} val 原始数据
     * @return {String}
     * */
    phoneHidden(val) {
        val = val.toString()
        if (val && val.length >= 11) {
            return val.substring(0, 3) + '****' + val.substring(7, 11)
        } else {
            return val
        }
    }
}

export default utils
