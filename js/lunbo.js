// 轮播图
var lunbo = function(){
        return {
            init:function(ele){
                if(typeof ele == 'string'){
                    this.ele=$(ele)
                }
                this.$list =this.ele.next()
                this.ele.timer = null;  
                // 设置全局的index索引
                this.index = 0;
                // 获取下方小圆点长度-2，max为到达最后小圆点临界值
                this.max = this.$list.children().length-2;   
                this.autoPlay();
                this.event();
            },
            event:function(){
                var _this = this;
                // 移入相应圆点
                this.$list.children('li').mouseover(function () {
                    clearInterval(_this.ele.timer)
                    // 小圆点对应索引赋值给全局index
                    _this.index = $(this).index();
                    $(this).addClass('active').siblings().removeClass('active');
                    _this.ele.children('li').eq(_this.index).fadeIn('fast').siblings().fadeOut(100);     
                })
                // 移出后恢复自动播放
                this.$list.children('li').mouseleave(function(){
                    _this.autoPlay();
                })
            },
            // 自动播放
            autoPlay:function(){
                var _this=this;
                this.ele.timer = setInterval(function () {
                    // 如果大于临界值清零，否者加1
                    _this.index > _this.max ? _this.index=0 : _this.index ++;
                   //  $(".banner .banner_img li").hide().eq(index).fadeIn('fast');
                     // 同理，小圆点的添加class，active，，siblings()为相邻全部兄弟
                     _this.$list.children('li').eq(_this.index).addClass('active').siblings().removeClass('active');
                    // 对应第_this.index的图片淡入，其他图片全部淡出
                    _this.ele.children('li').eq(_this.index).fadeIn('fast').siblings().fadeOut(100);     
                }, 3000);
            }
        }

    }
       





// $(document).ready(function(){
//     var nowimg=0;
//     var timer=null;
//     var length = $('.banner_list').children().length
//     console.log(length)
//     var distance = $('.banner_img').width()/length * -1
    // 克隆第一张图片，并且放到最后
    // $(".box-in li:first").clone().appendTo('.box-in')
    // 右按钮业务
    // $(".you").click(rightFunc)
    //     function rightFunc(){

    //     if(nowimg<5){
    //         nowimg++
    //         $(".box-in").animate({"left":nowimg*-730},1000)
    //     }else{
    //         nowimg=0
    //         $(".box-in").animate({"left":6*-730},1000,function(){
    //             $(".box-in").css("left",0)

    //         })
    //     }
    //     $(".circle span").eq(nowimg).addClass('current').siblings().removeClass('current')

    // }
    // 左按钮业务
    // $(".zuo").click(function(){
    //     if(nowimg>0){
    //         nowimg--
    //         $(".box-in").animate({"left":nowimg*-730},1000)
    //     }else{
    //         nowimg=5
    //         $(".box-in").css({"left":6*-730},1000)
    //         $(".box-in").animate({"left":nowimg*-730},1000)
    //     }
    //     $(".circle span").eq(nowimg).addClass('current').siblings().removeClass('current')
    // })
    // 小圆点业务
    // $('.banner_list li').click(function(){
    //      nowimg=$(this).index()
    //      console.log($(this).eq(nowimg))
    //      $(this).addClass('active').siblings().removeClass('active');
    //      $(".banner_img").animate({"left":nowimg*distance}, 1000)
    // });

    // 自动轮播
    // timer=setInterval(rightFunc,2000)

    // $(".box").mouseenter(function(){
    //     clearInterval(timer)
    // })
    // $(".box").mouseout(function(){
    //     clearInterval(timer)
    //     timer=setInterval(rightFunc,2000)
    // })

// })
