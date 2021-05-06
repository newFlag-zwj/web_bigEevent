$(function() {
    var layer = layui.layer
    var form = layui.form

    initCate()

    // 初始化富文本编辑器
    initEditor()

    // 获取文章分类下拉菜单事件
    function initCate() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.msg)
                }

                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        });
    }


    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)



    // 选择封面按钮事件
    $('#select-cover').on('click', function() {
        $('#cover-img').click()
    })

    // 选择封面文件
    $('#cover-img').change(function(e) {
        // 获取文件列表
        var files = e.target.files
        if (files.length === 0) {
            console.log('选择图片')
            return
        }
        // 对选择的文件创建一个URL地址
        var newImgURL = URL.createObjectURL(files[0])

        // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });

    // 定义文章默认状态
    var art_state = '已发布'

    // 存为草稿
    $('#btnSave2').on('click', function() {
        art_state = '草稿'
    })

    // 发布事件
    $('#form-pub').on('submit', function(e) {
        e.preventDefault()

        // 基于form表单创建一个form对象
        var fd = new FormData($(this)[0])
        fd.append('state', art_state)

        // 将裁剪后的图片，输出为文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {
                fd.append('cover_img', blob)
                publishArticle(fd)
            })
    })

    // 定义分布文章事件函数
    function publishArticle(fd) {
        $.ajax({
            type: "POST",
            url: "/my/article/add",
            data: fd,
            // 如果向服务器发送的时FormDate格式的数据必须添加以下两个配置
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.msg)
                }
                layer.msg(res.msg)
                console.log(33)
                location.href = '/article/article_list.html '
            }
        });
    }

})