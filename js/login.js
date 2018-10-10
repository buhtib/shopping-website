var login = (function (){
    return {
        init:function(ele){
            if(typeof ele == 'string'){
                this.ele=$(ele);
            }
        // 手机号登陆
           this.$name = this.ele.find('.pop-login>li:first>input');
        //    密码输入
           this.$pass = this.ele.find('.pop-login>li:last>input');
        //    button
           this.$button = this.ele.find('button');
           this.event();
        },
        event(){
            var _this = this;
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

             reg = /^[a-zA-Z\d]{6,16}$/;
            // 验证用户名输入
            this.$name.change(function(){
               _this.check(this)                
            })
            
            // 验证密码输入
            this.$pass.change(function(){
                _this.check(this)              
            })

            //点击 button登陆
            this.$button.click(function(){
                // 当表单验证成功发送ajax
                if(reg.test(_this.$name.val()) && reg.test(_this.$pass.val())){
                    _this.getData()
                }
            })

        },
        // 获取数据，发送ajax
        getData: function (){
            var _this = this
            var obj = {
                // 数据发送
                params : {
                    name : _this.$name.val(),
                    pass : _this.$pass.val()
                },
                success : function (data) {
                    console.log(data)
                    if(data.msg==200){
                        location.href = 'start.html';
                    }else if(data.msg==100){
                        alert('用户存在但密码错误');
                    }else if(data.msg==1000){
                        alert('用户不存在');
                        // location.href = 'register.html';
                    }
                }
            }
            sendAjax('php/login.php',obj);
        },
        // 验证输入值
        check:function(ele){
            // 转为jq
            ele = $(ele)
            // var reg = /^[a-zA-Z\d]{6,16}$/;
              // 成功
              if (reg.test(ele.val())) {
                ele.parent().css("borderColor", "green");
                // 失败
            } else {
                // 密码输入错误不提示文字，（比较dom对象）
                if(ele[0] == this.$name[0]){
                    ele.val('输入6-16位数字或字母')
                }
                ele.parent().css("borderColor", "red");
            }
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