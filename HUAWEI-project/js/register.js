var reg = (function () {
    return {
        init: function (ele) {
            if (typeof ele == 'string') {
                this.ele = $(ele);
            }
            // 手用户名登陆
            this.$name = this.ele.find('#name');
            //    密码输入
            this.$pass = this.ele.find('#pas');
            // 再次输入密码
            this.$again_pass = this.ele.find('#again_pas');
            //   button注册按钮
            this.$button = this.ele.find('.btn');
            this.event();
        },
        event() {
            var _this = this;
            // 第一个输入框的click事件
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

            this.reg = /^[a-zA-Z\d]{6,16}$/;
            // 注册验证
            // 验证用户名输入
            this.$name.change(function () {
                _this.check(this)
            })
            // 验证密码输入
            this.$pass.change(function () {
                _this.check(this)
            })
            // 验证密码输入
            this.$again_pass.change(function () {
                if (_this.$pass.val() == $(this).val()) {
                    _this.check(this)
                } else {
                    $(this).parent().css("borderColor", "red");
                }
            })
            
            //点击 button登陆
            this.$button.click(function () {
                // 当表单验证成功发送ajax
                _this.checkAll();
            })

        },

        // 获取数据，发送ajax
        getData: function () {
            var _this = this
            $.ajax({
                url: 'php/register.php',
                type: 'post',
                // 传过去json格式数据
                contentType: 'application/json',
                // 传回来json对象数据
                dataType: 'json',
                data: JSON.stringify({
                    name: _this.$name.val(),
                    pass: _this.$pass.val()
                }),
                success: function (data) {
                    if (data.msg == 200) {
                        location.href = 'login.html';
                    } else if (data.msg == 100) {
                        alert('用户已存在');
                    }
                },
                // 异步
                async: true,
                // success之前显示图像
                beforeSend: function () {
                    ShowDiv();
                },
                // success之后隐藏图像
                complete: function () {
                    HiddenDiv()
                }
            });
            //显示加载数据
            function ShowDiv() {
                $("#loading").show();
            }
            //隐藏加载数据
            function HiddenDiv() {
                $("#loading").hide();
            }
        },

        // 验证输入值
        check: function (ele) {
            var _this = this;
            // 转为jq
            ele = $(ele)
            // 成功
            if (_this.reg.test(ele.val())) {
                ele.parent().css("borderColor", "green");
                // 失败
            } else {
                // 密码输入错误不提示文字
                if (ele[0] == this.$name[0]) {
                    ele.val('输入6-16位数字或字母')
                }
                ele.parent().css("borderColor", "red");
            }
        },
        // 验证全部表单再发送ajax
        checkAll: function () {
            var _this = this;
            if (_this.reg.test(_this.$name.val()) && _this.reg.test(_this.$pass.val()) && _this.reg.test(_this.$again_pass.val()) && (_this.$pass.val() == _this.$again_pass.val())) {
                _this.getData()
            }
        }
    }

}())