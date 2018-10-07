var login = (function (){
    return {
        init:function(ele){
            if(typeof ele == 'string'){
                ele=document.querySelector(ele);
            }
            this.$top = ele.querySelector('h4');
            this.$off =  this.$top.firstElementChild;
            this.event(ele);
        },
        event(ele){
            var _this=this;
            //点击登陆弹出弹窗
            $('.target-login').click(function(){
                ele.parentNode.style.display = 'block';
            });

            var mar_left = parseInt(getAttr(ele,'margin-left'))
            //移动弹窗
            this.$top.onmousedown = function(e){
                e= e || window.event;
                var x = e.offsetX;
                var y = e.offsetY;
                document.onmousemove = function (e){
                    var max_x = window.innerWidth - ele.offsetWidth;
                    var max_y = window.innerHeight - ele.offsetHeight;
                    _this.left = e.clientX - x;
                    _this.top = e.clientY - y;
                    if (_this.left>max_x||_this.left<0){
                        _this.left=Math.max(0,_this.left)
                        _this.left=Math.min(_this.left,max_x)
                    }
                    if (_this.top <0){
                        _this.top =0;
                    }
                    ele.style.left = _this.left- mar_left+'px';
                    ele.style.top = _this.top+'px';
                }        
            };
            //松开鼠标
            document.onmouseup = function (){
                document.onmousemove = null;
            } ;
            //关闭弹窗
            this.$off.click = function () {
                console.log(555)
                ele.parentNode.style.display = 'none';
            };

            // 切换登陆
            $('.s-login').click(function(){
                $(this).css("color","red");
                $(this).prev().css("color","black");
                $('.pop-down').css("display","none");
                $('.pop-down-right').css("display","block");
            })
            $('.z-login').click(function(){
                $(this).css("color","red");
                $(this).next().css("color","black");
                $('.pop-down').css("display","block");
                $('.pop-down-right').css("display","none");
            })
            //二维码滑动效果
            $('.ma_out').mouseenter(function(){
                $('.ma_out').animate({left:'-20px'},300,function(){
                    $('.box_hide').fadeIn();
                });
            });
            $('.pop-down-right').mouseleave(function(){
                    $('.box_hide').fadeOut();      
                $('.ma_out').animate({left:'0px'},300);
            });
        }
    }

}())

function getAttr(ele,attr){
    if(window.getComputedStyle){
       return window.getComputedStyle(ele,null)[attr];
    }else{
        return ele.currentStyle[attr];
    }
}