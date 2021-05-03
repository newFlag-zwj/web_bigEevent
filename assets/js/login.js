$(function() {
    // 登陆表单跳转注册表单
    $('#toLogin').on('click', function() {
        $('.regBox').hide();
        $('.loginBox').show();
    });
    // 注册表单跳转登陆表单
    $('#toReg').on('click', function() {
        $('.loginBox').hide();
        $('.regBox').show();
    });
    // 自定义layui校验规则
    // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            // 获取密码框的值
            var pwd = $('.regBox [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单提交事件
    $('#form_reg').on('submit', function(e) {
            //  阻值表单默认的提交事件
            e.preventDefault();
            $.ajax({
                type: "post",
                url: "/api/reguser",
                data: { username: $('.regBox [name=username]').val(), password: $('.regBox [name=password]').val() },
                success: function(res) {
                    if (res.status !== 0) {
                        // return console.log(res.msg)
                        return layer.msg(res.msg)
                    }
                    layer.msg('注册成功')
                        // 模拟点击行为
                    $('#toLogin').click()

                }
            });
        })
        // 监听登陆表单提交事件 
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            //序列化表单的值创建url编码表示的文本字符串(快速获取表单数据)
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功')
                    // console.log(res.token)
                    // 将成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = 'index.html'
            }
        });
    })

})