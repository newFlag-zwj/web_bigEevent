$(function() {
    var form = layui.form

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })


    getUserinfo()

    // 获取用户基本信息并渲染到表单中
    function getUserinfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.msg)
                }
                // 快速给表单赋值
                form.val('formUserInfo', res.data)
            }
        });
    }


    // 重置按钮事件
    $('#btnReset').on('click', function(e) {
        e.preventDefault()

        getUserinfo()
    })

    // 提交修改后的用户信息
    $('.layui-form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.msg)
                }

                layer.msg(res.msg)
                    // console.log(window.parent.location)
                    // 调用父页面的事件来重新渲染用户信息与头像
                window.parent.initUserInfo()

            }
        });

    })

})