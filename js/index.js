var index = (function () {
    return {
        init: function () {
            this.event();
            this.search();
            this.draggable();
        },
        event: function () {
            var _this = this;

            // 锚点隐藏显示
            $(window).scroll(function () {
                if (window.scrollY >= 1300) {
                    $('#go-top').show();
                } else {
                    $('#go-top').hide();
                }
            })

            //   锚点置顶
            $("#go-top").click(function () {
                $("html, body").animate({
                    scrollTop: 0
                }, 'slow');
                return false;

            });
        },
          
        search:function(){
              // 点击包裹input的大盒子时隐藏上面的字（搜索框）
              $('.search').click(function () {
                $(this).children('.input_on').hide();
            })
            // input失去焦点就显示字
            $('#search_input').blur(function () {
                $(this).next().show();
            })
        },

        draggable:function(){
              // 把长滚动里面的img和a都设置禁止拖拽
              console.log()
              $('.swiper-slide').children('a').attr("draggable", "false");
              $('.swiper-slide').children('a').find('img').attr("draggable", "false");
        }
    }
}())