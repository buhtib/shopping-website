$(document).ready(function () {
            var index = 0;
            var max = $('.banner_list').children().length-2;
            var timer = setInterval(function () {
                index > max ? index=0 : index ++;
                $(".banner .banner_img li").hide().eq(index).show();
                $('.banner .banner_list li').eq(index).addClass('active').siblings().removeClass('active');
            }, 2000);
            $(".banner .banner_list li").mouseover(function () {
                index = $(this).index();
                $(".banner .banner_img li").eq(index).show().siblings().hide();
                $(this).addClass('active').siblings().removeClass('active');
            })
})