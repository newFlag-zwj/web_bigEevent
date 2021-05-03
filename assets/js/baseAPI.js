// 每次调用$.get $.post $.ajax 时都会线调用ajaxPrefilter函数
// 在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://127.0.0.1:3007' + options.url;
})