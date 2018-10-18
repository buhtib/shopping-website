var getData = (function() {
   // 计算总价
   var total_price = 0;
   // 总数
   var total_num = 0;

    return {
        init : function() {
            // 现将无商品状态中间显示页面保存起来
            // this.no_section = $('.addToCar_section').html()
            // 删除数据对应的该行的索引
            this.draggable();
            this.delete_index;
            this.event()
        },
        
        event : function() {
            var _this = this;
            // 保证数据传过来之后 加载某些功能
            // 渲染商品列表
            this.useData()
            // 渲染删除商品列表
            this.reload_data_rendering()
            // 小计
            this.change_small_price()

            
         // 小框加减数量功能
            // 加
        $('.product_list_detailed').on('click','.jia',function() {
                 // 每次进来将input值给_this.pro_num 
                 _this.pro_num =  $(this).parent().prev().val()
                 _this.pro_num ++;
                //  input框先加数再执行小计
                 $(this).parent().prev().val(_this.pro_num)
                 _this.change_small_price(1)
                  // 按钮完成点击,执行判断是否小于1,
                 _this.jian(_this.pro_num ,$(this).next())
                });
          // 减
        $('.product_list_detailed').on('click','.jian',function() {
              // 每次进来将input值给_this.pro_num 
              _this.pro_num =  $(this).parent().prev().val()
              _this.pro_num --;
              if(_this.pro_num <= 1){
                  _this.pro_num = 1;
                }
                //  input框先减数再执行小计
                $(this).parent().prev().val(_this.pro_num)
                _this.change_small_price(-1)
              // 按钮完成点击,执行判断是否小于1,
              _this.jian(_this.pro_num ,$(this))
        });
        // 每次input里的值改变 事件
        $('.product_list_detailed').on('input','input',function() {
            // 当input里为NAN  里面的值直接变为1
            if(isNaN($(this).val()) == true) {
                $(this).val(1)
            }
            _this.change_small_price($(this).val())
        });


        // 商品列表选中框的功能
        $('.check_box').click(function() {
            var num = 0 ;
            _this.check_box_checked(this , num)
            var index = $(this).parent().index() - 1;
            // 加上选中状态后  结算列表相应改变
            _this.count_total_price(index)
        })
        // 全选框的功能
        $('.select_all').click(function() {
            _this.select_all()
        })


        // 删除数据功能
        $('.product_list_delete').click(function() {
            // 记录要删除的  商品列表索引
            _this.delete_index = $(this).parent().index() - 1
            // 显示弹窗
            _this.delete_list(this)
        })
        // 结算的删除按钮
        $('.settlement_delete_check').click(function() {
            // 将商品列表索引变为 -1  搞特殊化
            _this.delete_index = -1
            _this.delete_list(this)
            // for(var i = 0; i < _this.index; i++ ) {
            //     if($('.product_list_detailed').find('i').attr('class') == 'shop hw-xiaogou') {
            //         $('.product_list_detailed').eq(i).remove()
            //     }
            // }
        })
        // 选择否
        $('.ask_delete .no').click(function() {
            $('.ask_delete').hide()
        })
        // 选择是
        $('.ask_delete .yes').click(function() {
            $('.ask_delete').hide()
                // 判断为 结算的删除按钮  点击触发小弹窗，将选中的列表删除
                if(_this.delete_index == -1) {
                    for(var i = 0; i < _this.index; i++ ) {
                        if($('.product_list_detailed').eq(i).find('i').attr('class') == 'shop hw-xiaogou') {
                            // 删除数据后将自身选中后累加的价格删除
                            $('.product_list_detailed').eq(i).find('i').removeClass()
                            _this.count_total_price(i)

                            $('.product_list_detailed').eq(i).remove()
                            _this.reload_data(i)
                            i --
                        }
                    }
                }else{
                    // 删除数据后将自身选中后累加的价格删除
                    if($('.product_list_detailed').eq(_this.delete_index).find('i').attr('class') == 'shop hw-xiaogou') {
                        $('.product_list_detailed').eq(_this.delete_index).find('i').removeClass()
                        _this.count_total_price(_this.delete_index)
                    }

                    $('.product_list_delete').parent().eq(_this.delete_index).remove()
                   
                    _this.reload_data(_this.delete_index)
                }
            // 当没数据时，显示为空的页面
            if($('.product_list_detailed').length == 0) {
                $('.localData').hide()
                $('.addToCar_section').show()
            }
        })


        // 重新购买商品按钮
          $('.reload_btn').on('click',function() {
           
              let reload_index = $(this).parent().index() - 1;
              if(localStorage.car_data == '') {
                _this.data = []
                // window.location.reload()
              }
              _this.data.push(_this.data_reload[reload_index]);
                localStorage.car_data = JSON.stringify(_this.data)

                _this.useData()

              _this.data_reload.splice(reload_index,1)
              if(JSON.stringify(_this.data_reload) == '[]') {
                  $('.local_del_data').hide()
            }
            localStorage.car_reload = JSON.stringify(_this.data_reload)
            //   window.location.reload()
          }) 
       
      

        },


        // 页面利用数据  显示相应网页
        useData : function() {
            var _this = this;
            // 当localStorage.car_data有无数据时 判断
            if(localStorage.car_data){
                // 有数据，改变高度为自动，数据插入到html中
                _this.data = JSON.parse(localStorage.car_data);
                // 有几条数据，记录在index中
                _this.index = _this.data.length;
               _this.rendering(_this.data)
            }else{
                // 没有数据,就显示以前的html
                $('.addToCar_section').show()
            }

        },

        // 把购物车数据渲染到页面中
        rendering:function (data) {
            var arr = [];
            // 先把商品说明 加入 arr
            var header = ` <div class="product">
                <ul class="product_list clear Description">
                    <li class="check_box select_all">
                        <p><i ></i></p> 全选
                    </li>
                    <li class="product_name">商品</li>
                    <li class="price">单价</li>
                    <li class="price">数量</li>
                    <li class="price">小计</li>
                    <li class="price">操作</li>
                </ul>`;
            arr.push(header);

            // 再把商品详细列表 加入 arr
            for(var i = 0; i < data.length; i++){
            arr.push(` <ul class="product_list product_list_detailed clear">
            <li class="check_box">
                <p><i></i></p>
                <a href="javascript:void(0)" class="product_img clear">
                    <img src="img/car_product.png" alt="">
                </a>
             </li>
             <li class="product_name">${data[i].name}</li>
             <li class="price">¥ ${data[i].price}</li>
             <li class="price  num">
                 <input type="text" value="${data[i].num}"  maxlength="3" />
                 <div class="count">
                     <p class="shop hw-jiahao jia"></p>
                     <p class="shop hw-jianhao jian"></p>
                 </div>
             </li>
             <li class="price small_price">¥ ${data[i].total_price.toFixed(2)}</li>
             <li class="price product_list_delete"> 删除</li>
            </ul>`);
            }

            // 最后把结算列表 加入 arr
             var foot = ` <ul class="product_list settlement clear">
                    <li class="check_box select_all">
                        <p><i></i></p>全选
                    </li>
                    <li>
                    <a class="settlement_delete_check">删除</a>
                    </li>
                    <div class="settlement_right clear">
                        <p>
                            <span class="total"> 总计：</span> <span class="total_price"> ¥  0.00 </span><i class="shop hw-wenhao"></i><br>
                             已选择 <span class="product_num">0</span> 件商品，优惠：<span class="discount">¥ 0.00</span> 
                        </p>
                        <a href="login.html">立即结算</a>
                    </div>
                </ul>
            </div>`;
            arr.push(foot);
            arr = arr.join('')
            // 最后渲染 arr字符串
            $('.addToCar_section').hide()
            $('.localData').html(arr)
            $('.localData').show()
        },


        // 重新购买商品列表数据  存储
        reload_data: function(index) {
            var _this = this
            index = Number(index)
            var arr = []
            if(localStorage.car_reload) {
                arr = JSON.parse(localStorage.car_reload)
            }
            // 将car_data中的数据转移到 car_reload 上
            arr.push(_this.data[index])
            localStorage.car_reload = JSON.stringify(arr)
            // 删除car_data数据
            _this.data.splice(index, 1)
           
                localStorage.car_data = JSON.stringify(_this.data)
                // 删到最后  localStorage.car_data 为 '[]' 要把它变为''才能 显示原始页面
                if(localStorage.car_data == '[]') {
                    localStorage.car_data = ''
                }
             _this.reload_data_rendering()
        },

        // 重新购买商品列表数据  渲染
        reload_data_rendering:function() {
             // 数据存到  data_reload上
            this.data_reload =  JSON.parse(localStorage.car_reload);

            if(localStorage.car_reload && localStorage.car_reload != '[]'){
                var arr = [];
                // 先把商品说明 加入 arr
                var header = `  <div class="reload">
                <div class="reload_top">
                    <h2>已删除商品</h2>
                    <ul class="reload_list clear">
                        <li class="reload_name">商品</li>
                        <li class="reload_common">数量</li>
                        <li class="reload_common">金额</li>
                        <li  class="reload_common">操作</li>
                    </ul>
                </div>`;
                arr.push(header);
    
                // 再把商品详细列表 加入 arr
                for(var i = 0; i < this.data_reload.length; i++){
                arr.push(`  <ul class="reload_list clear">
                <li class="reload_name">${this.data_reload[i].name}</li>
                <li class="reload_common">x${this.data_reload[i].num}</li>
                <li class="reload_common">¥${this.data_reload[i].total_price}</li>
                <li  class="reload_common reload_btn">重新购买</li>
        </ul>`);

                }
    
                var foot = `</div>`;
                arr.push(foot);
                arr = arr.join('')

                // 最后渲染 arr字符串
                $('.local_del_data').html(arr)
                $('.local_del_data').show()
            }else{
                // 没有数据,就隐藏
                $('.local_del_data').hide()
            }
              
        },

       
        // 限制计数框最小为1，且不为NAN
        jian:function(this_val,this_jian) {
            var _this =this ;
        // 每次进来判断input 里的值
           if(this_val <= 1){
              this_jian.css({'cursor':' not-allowed','color':'#C3C3C3'});
           }else{
              this_jian.css({'cursor':' pointer','color':'#767676'});
           }
        },

        // input框值改变  改变小计的值
        change_small_price:function(num) {
           num = Number(num)
            var _this = this;
            for(var j = 0 ; j < _this.index ; j++) {
                // 循环，将每条商品数据的 小计价格改变为(单价*数量)
                // 每条input 里的数量
            var input_num = Number($('.product_list_detailed ').eq(j).find('input').val())
            // 计算小计的值
            var small_price = Number($('.product_list_detailed ').eq(j).find('.price').html().substr(1)) * input_num
            $('.product_list_detailed ').eq(j).find('.small_price').html('￥ '+small_price.toFixed(2));
            //  如果被选中  ，改变小计的同时 改变下方总计
            //  if($('.product_list_detailed').eq(j).find('i').attr('class') == 'shop hw-xiaogou') {
            //     total_num +=  num;
            //     total_price += Number($('.product_list_detailed').eq(j).find('.price').html().substr(1)) * num;
            //     if(Number($('.product_list_detailed').eq(j).find('input').val()) > 1) {

            //         $('.product_num').html(total_num)
            //         $('.total_price').html('￥ '+total_price.toFixed(2))
            //     }
            //  }
            }
        },
        
        // 当物品列表里的选择框全部选中，上下的全选框选中，再次选择反选其中一个物品框时，上下全选框取消选中
        check_box_checked:function(check_box_this , num) {
            var _this = this;
            // 每一个点击选择框加一个toggle
            $(check_box_this).find('i').toggleClass('shop hw-xiaogou');
            
            // 循环判断
              for(var i = 0; i<_this.index ; i++) {
                //   当已被选中
                  if($('.product_list_detailed').eq(i).find('.check_box i').attr('class') == 'shop hw-xiaogou') {
                      num ++
                  }
              }
            //   此时,物品选择框已全部选中
              if(num == _this.index) {
                  $('.select_all').find('i').addClass('shop hw-xiaogou');
              }
            //   再次点击物品选择框 取消全选框的选中
              if(num == _this.index - 1) {
                  $('.select_all').find('i').removeClass('shop hw-xiaogou');
              }
             
        },

        // 全选框的功能
        select_all:function() {
            var _this = this;
            // 当都被选中时
            if($('.select_all').eq(0).find('i').attr('class') == 'shop hw-xiaogou' && $('.select_all').eq(1).find('i').attr('class') == 'shop hw-xiaogou') {
                $('.check_box').find('i').removeClass('shop hw-xiaogou');
                // 移出选中状态  并把总计清零
                // total_price = 0;
                // total_num = 0;
            }else{
                $('.check_box').find('i').addClass('shop hw-xiaogou');
                // 添加选中状态， 并清空再全部累加
            //     total_price = 0;
            //     total_num = 0;
            //    for(var v = 0; v < _this.index; v ++) {
            //     total_price  += Number($('.product_list_detailed').eq(v).find('.small_price').html().substr(1));
            //     total_num  += Number($('.product_list_detailed').eq(v).find('input').val());
            //    }
            }
            // 最后渲染到页面中
            // $('.product_num').html(total_num)
            // $('.total_price').html('￥ '+total_price.toFixed(2))
        },

        // 选中时计算商品价格总计
        count_total_price:function (check_box_index) {
            var _this = this;
            // product_list_detaild是每条数据的类名
            if((check_box_index != -1) && (check_box_index !=_this.index)) {
                if($('.product_list_detailed').eq(check_box_index).find('i').attr('class')) {
                        total_price  += Number($('.product_list_detailed').eq(check_box_index).find('.small_price').html().substr(1));
                        total_num  += Number($('.product_list_detailed').eq(check_box_index).find('input').val());
                    }else {
                        total_price  -= Number($('.product_list_detailed').eq(check_box_index).find('.small_price').html().substr(1));
                        total_num  -= Number($('.product_list_detailed').eq(check_box_index).find('input').val());
                }
            }
            // 商品数量加到localstorage中
            // _this.data[j].num = input_num;
            // localStorage.car_data = JSON.stringify(_this.data);
            // 渲染数据到页面中
            $('.product_num').html(total_num)
            $('.total_price').html('￥ '+total_price.toFixed(2))
        },

        // 删除数据弹窗
        delete_list:function(delete_list_this) {
            var top= $(delete_list_this).offset().top - 130;
            var left= $(delete_list_this).offset().left - 130;
            $('.ask_delete').css({left : left, top : top});
            $('.ask_delete').show()
        },

        // 把长滚动里面的img和a都设置禁止拖拽
        draggable:function() {
            $('.swiper-slide').children('a').attr("draggable", "false");
            $('.swiper-slide').children('a').find('img').attr("draggable", "false");
        }





        // 将页面数据存到localstorage





    }
}())