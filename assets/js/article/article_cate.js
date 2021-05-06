$(function() {

    var layer = layui.layer
    var form = layui.form
    initArticleList()

    // 获取文章分类的列表
    function initArticleList() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function(res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        });
    }


    // 添加文章分类
    var indexAdd = null;
    $('#btnAddCate').click(function(e) {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
        // 通过事件代理形式添加提交事件（因为在绑定时页面中没有一模板建立的表单）
        $('body').on('submit', '#addcate-form', function(e) {
            // e.preventDefault()
            $.ajax({
                type: "POST",
                url: "/my/article/addcates",
                data: $('#addcate-form').serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.msg)
                    }
                    layer.msg(res.msg)
                        // 关闭弹出层
                    layer.close(indexAdd)
                    initArticleList()

                }
            });

        });

    });

    // 编辑文章分类按钮
    var indexEdit = null;
    $('tbody').on('click', '#btn-edit-cate', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });

        // 获取点击哪一行的分类id
        var id = $(this).attr('data-id')
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.msg)
                }
                form.val('form-edit', res.data)
            }
        });
    })


    // 更新修改后的文章分类
    $('body').on('submit', '#editcate-form', function(e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $('#editcate-form').serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.msg)
                }
                layer.msg(res.msg)
                layer.close(indexEdit)
                initArticleList()
            }
        });
    })

    // 删除文章分类事件
    $('tbody').on('click', '#btn-del-cate', function() {
        var id = $(this).attr('data-id')
        layer.confirm('是否确定删除', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/" + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.msg)
                    }
                    layer.msg(res.msg)
                    initArticleList()
                }
            });

            layer.close(index);
        });



    })
})