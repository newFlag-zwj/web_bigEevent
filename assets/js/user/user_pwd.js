  $(function() {
      var form = layui.form

      //   自定义校验规则
      form.verify({
          pwd: [/^[\S]{6,12}$/, '密码必须为6~12位，且不能出现空格'],
          //   pww: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
          newPwd: function(value) {
              if (value === $('[name=oldPwd]').val()) {
                  return '新旧密码不能一样'
              }
          },
          rePwd: function(value) {
              if (value !== $('[name=newPwd]').val()) {
                  return '两次输入的密码不一致'
              }
          }
      })



      // 更新密码
      $('.layui-form').submit(function(e) {
          e.preventDefault();
          $.ajax({
              type: "POST",
              url: "/my/updatepwd",
              data: $(this).serialize(),
              success: function(res) {
                  if (res.status !== 0) {
                      return layui.layer.msg(res.msg)
                  }
                  //   重置表单内容
                  layui.layer.msg('重置密码成功，系统将在3秒后自动退出')
                  $('.layui-form')[0].reset()
                  setTimeout(function() {
                      localStorage.removeItem('token')
                      window.parent.location.href = '../login.html'
                  }, 3000)
              }
          })

      });

      //   重置按钮事件
      $('#btnReset').on('click', function(e) {
          e.preventDefault()
          $('.layui-form')[0].reset()
      })



  })