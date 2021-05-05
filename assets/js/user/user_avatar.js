 $(function() {
     // 1.1 获取裁剪区域的 DOM 元素
     var $image = $('#image')
         // 1.2 配置选项
     const options = {
         // 纵横比
         aspectRatio: 1,
         // 指定预览区域
         preview: '.img-preview'
     }

     // 1.3 创建裁剪区域
     $image.cropper(options)




     //  选择图片事件
     $('#btnSelectImg').click(function() {
         $('#file').click()
     });

     $('#file').change(function(e) {
         //  获取用户选择的文件
         var fileList = e.target.files
         if (fileList.length === 0) {
             return layui.layer.msg('请选择图片')
         }

         //  拿到用户选择的文件夹
         var file = e.target.files[0]

         var imgURL = URL.createObjectURL(file)
         console.log(imgURL)

         $image
             .cropper('destroy') // 销毁旧的裁剪区域
             .attr('src', imgURL) // 重新设置图片路径
             .cropper(options) // 重新初始化裁剪区域
     });

     //  上传图片到服务器
     $('#btnUpdate').click(function() {
         // 将裁剪的图片输出位base64格式的字符串
         var dataURL = $image
             .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                 width: 100,
                 height: 100
             })
             .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串



         $.ajax({
             type: "POST",
             url: "/my/update/avatar",
             data: {
                 avatar: dataURL
             },
             success: function(res) {
                 if (res.status !== 0) {
                     return layui.layer.msg('图像更新失败')
                 }
                 layui.layer.msg('头像更新成功')
                 window.parent.initUserInfo()
             }
         });

     });

 })