var goods = (function () {
    return {
        init: function () {
            this.event()
            this.jian()
        },

        event: function () {
            var _this = this;

            // header  hover下滑效果
            // $('header').on('mouseenter', 'li', function () {
            //     // 找到对应索引让对应块下滑
            //     index = $(this).index() + 1
            //     str = '.header_down' + index + '_out'
            //     $(str).siblings().hide();
            //     $(str).slideDown('slow');
            //     // 当滑块鼠标离开就滑上去
            // })

            // $('header').on('mouseleave', 'li', function () {
            //     $(str).slideUp('slow');
            //     // return false;
            // })


            // 改变 商品选择 的小框颜色
            $('.box_hover').on('click','li',function () {
                $(this).css('borderColor', '#ca151d').siblings().css('borderColor', '#a4a4a4');
                // 选择颜色，配置 相应改变上方文字
                if($(this).parent().attr('id')=='change_color'){
                    $('#color').html(this.innerText)
                }else if($(this).parent().attr('id')=='change_type'){
                    var str = this.innerText;
                    str = str.replace('|','-8250U  ');
                    str = str.replace(/[|]/g,' ');
                    $('#type').html(str)
                }
            });

            // 小图片  hover后切换大图片
            $('.swiper-slide').on('mouseenter','img',function(){
               _this.hover_bigger(this)
            });

            // 放大镜的移动
            $('.pro_img').mouseover(function() {
                // 获取盒子宽高
                var x = $(this).width();
                var y = $(this).height();
                // 移进中图片的框：放大镜，和放大框都要淡入
                $('.bigger').fadeIn();
                $('.pro_imgL').fadeIn();
                $('.pro_img').mousemove(function(e){
                    e = e || window.event
                    // 获取放大镜的left，和top
                    var X = e.pageX - $(this).offset().left-$('.bigger').width()/2;
                    var Y = e.pageY - $(this).offset().top-$('.bigger').height()/2;
                    // 边界值
                    var max_x = x - $('.bigger')[0].offsetWidth;
                    var max_y = y - $('.bigger')[0].offsetHeight;
                    // 边界处理
						if (X>max_x||X<0){
							X=Math.max(0,X)
							X=Math.min(X,max_x)
						}
                       
						if (Y >max_y||Y <0){
							Y =Math.max(0,Y )
							Y =Math.min(Y ,max_y)
                        }
                    // 赋值
                    $('.bigger').css({left:X})
                    $('.bigger').css({top:Y})
                    // 改变移动大图倍率（800/450）
                    X=X*1.78
                    Y=Y*1.78
                    $('.pro_imgL').css({'backgroundPosition':`-${X}px -${Y}px`});
                })
            });

            // 离开盒子，放大镜消失，放大图消失
            $('.pro_img').mouseleave(function() {
                $('.bigger').fadeOut();
                $('.pro_imgL').fadeOut('500');
            });

            // 商品计数功能
            // 加
            $('.count .jia').click(function() {
                  // 每次进来将input值给_this.pro_num 
                _this.pro_num = $('.num>input').val();
                _this.pro_num ++;
                $('.num>input').val(_this.pro_num)
                _this.jian()
            });
            // 减
            $('.count .jian').click(function() {
                // 每次进来将input值给_this.pro_num 
                _this.pro_num = $('.num>input').val();
                _this.pro_num --;
                if(_this.pro_num <= 1){
                    _this.pro_num = 1;
                }
                $('.num>input').val(_this.pro_num)
                // 按钮完成点击,执行判断是否小于1,
                _this.jian()
            });
            // jq事件监听才有input事件，input值时改变执行jian（）
            $('.num>input').on('input',function(e){ 
                // 判断是不是number类型
                if(isNaN($('.num>input').val()) == true){
                  $('.num>input').val(1)
                }
                _this.jian()
             });
           
            //  关联商品nav点击事件
             $('.Jump_nav').on('click','a',function() { 
                _this.fixed_nav(this)
             })

            // 滚动到一定位置就改变关联商品nav的状态
             $(window).scroll(function() {
                _this.scroll();
             })


            //  图片展示  隐藏和收起功能
             $('.pro_imgintro .pro_toggle_up').click(function() {
                //  隐藏自己按钮
                 $(this).hide();
                //  展示下方图片
                 $('.pro_imgintro').addClass('show_hide');
                //  显示下方按钮
                $('.pro_imgintro .pro_toggle_down').show()
             })
             $('.pro_imgintro .pro_toggle_down').click(function() {
                 $(this).hide();
                 $('.pro_imgintro').removeClass('show_hide');
                $('.pro_imgintro .pro_toggle_up').show()
                // 设置滚动高度
                $(window).scrollTop($('.toggle_down_target').offset().top)
             })

            //  规格展示  隐藏和收起功能
             $('.params_out .pro_toggle_up').click(function() {
                //  隐藏自己按钮
                 $(this).hide();
                //  展示下方图片
                 $('.params_out').addClass('show_hide');
                //  显示下方按钮
                $('.params_out .pro_toggle_down').show()
             })
             $('.params_out .pro_toggle_down').click(function() {
                 $(this).hide();
                 $('.params_out').removeClass('show_hide');
                $('.params_out .pro_toggle_up').show()
                // 设置滚动高度
                $(window).scrollTop($('.params_target').offset().top)
             })

        },

         // 小图片  hover后切换大图片
        hover_bigger:function(s_img){
            var par = $(s_img).parent().parent()
            // 图片对应索引+1(改变大图)
            var index = par.index()+1
            // 改变边框
            par.siblings().children('a').css('border', '1px solid transparent')
            $(s_img).parent().css('border', '1px solid #ca151d');
            // 改变图片路径从而改变上方两个盒子的大图片
            var str_m =$(s_img).attr("src");
            // 改变中图片
            str_m = str_m.replace('s','m');
            $('.pro_img img').attr("src",str_m);
            // 改变大图片
            $('.pro_imgL').css('backgroundImage',`url(img/pro_left_l${index}.jpg)`)
         },

         // 限制计数框为1
        jian:function() {
             var _this =this ;
               // 每次进来将input值给_this.pro_num 
            _this.pro_num = $('.num>input').val();
            // 判断input值从而改变减号状态
            if(_this.pro_num <= 1){
                _this.pro_num = 1;
                $('.count .jian').css({'cursor':' not-allowed','color':'#C3C3C3'});
            }else{
                $('.count .jian').css({'cursor':' pointer','color':'#767676'});
            }
         },

        //  关联商品nav状态变化函数
        fixed_nav:function(fixed_nav) {
            $(fixed_nav).parent().siblings().children('a').removeClass('selected')
            $(fixed_nav).addClass('selected');
        },

         // 滚动事件
         scroll:function() {
             var _this = this;
            if($(window).scrollTop() >= $('.Jump_nav_out').offset().top) {
                $('.Jump_nav').addClass('scroll_change')
                $('.Jump_nav_btn').show()
                
                // 当滚动高度到达指定块，执行顶部 nav 状态变化
                // 第1个变化
                if($(window).scrollTop() <= ($('.params_out').offset().top - 150)){
                    _this.fixed_nav($('#Jump_nav_a1')[0])
                // 第2个变化
                }else if($(window).scrollTop() <= $('.package').offset().top - 150){
                    _this.fixed_nav($('#Jump_nav_a2')[0])
                // 第3个变化
                }else if($(window).scrollTop() <= $('.discuss').offset().top){
                    _this.fixed_nav($('#Jump_nav_a3')[0])
                }
             }else{
                $('.Jump_nav_btn').hide()
                $('.Jump_nav').removeClass('scroll_change')
             }
         }

    }
}())