$(function() {

    var layer = layui.layer;
    initUserInfo()

    // 退出登陆
    $('#btnLogout').on('click', function() {
        layer.confirm('确认退出登陆?', { icon: 3, title: '提示' }, function(index) {
            // 清除本地缓存的token
            localStorage.removeItem('token')
            location.href = 'login.html'

            layer.close(index);
        });
    })

})

// 渲染用户头像
function renderAvatar(user) {
    // 渲染用户名
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
        // 渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
}

// 获取用户的基本信息
function initUserInfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },
        // complete: function(res) {
        //     console.log(res)
        //     if (res.responseJSON.status === 1 || res.responseJSON.msg == '身份认证失败') {
        //         localStorage.removeItem('token')
        //         location.href = 'login.html'
        //     }
        // }

    });
}