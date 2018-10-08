$(document).ready(function () {
    // 点击触发click
    $('.drop').click(function (event) {
        // 下拉框的隐藏和显示
        $('.drop_content').toggle();
        // target赋值
        var $target = $(event.target);
        // 如果点击的target是li，将他子元素span，html内容赋值给上面（span没有占满li 两边会点击到li）
        if ($target.is("li")) {
            $(this).children('span').html($target.children('span').html())
        // 如果点击的target是li里的span，html内容赋值给上面
        } else if ($target.is("span")) {
            $(this).children('span').html($target.html())
        }
    })
})