// 每次调用$.get $.post $.ajax 时都会线调用ajaxPrefilter函数
// 在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://127.0.0.1:3007' + options.url;


    // 统一为有权限的接口设置header属性
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function(res) {
        if (res.responseJSON.status === 1 || res.responseJSON.msg == '身份认证失败') {
            localStorage.removeItem('token')
            location.href = 'login.html'
        }
    }
})