$(document).ready(function () {
    // 点击包裹input的大盒子时隐藏上面的字
    $('.search').click(function () {
        $(this).children('.input_on').hide();
    })
    // input失去焦点就显示字
    $('#search_input').blur(function () {
        $(this).next().show();
    })
})