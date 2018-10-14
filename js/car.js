var getData = (function() {

    return {
        init : function() {
            this.event()
        },
        
        event : function() {
            var _this = this;
            this.useData()
            // 传入数据之后执行  累加器功能
            this.jian()


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

        },

        // 页面利用数据  显示相应网页
        useData : function() {
            var _this = this;
            // 当localStorage.car_data有无数据时 判断
            if(localStorage.car_data){
                // 有数据，改变高度为自动，数据插入到html中
                $('.section-in').addClass('sec_addto_car');
                var data = JSON.parse(localStorage.car_data);
               _this.rendering(data)
            }else{
                // 没有数据,就显示以前的html
                $('.section-in').removeClass('sec_addto_car');
                $('.addToCar_section').show()
            }

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

        // 把购物车数据渲染到页面中
        rendering:function (data) {
            var arr = [];
            // 先把商品说明 加入 arr
            var header = ` <div class="product">
                <ul class="product_list clear">
                    <li class="check_box">
                        <p><i class="shop hw-xiaogou"></i></p> 全选
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
                <p><i class="shop hw-xiaogou"></i></p>
                <a href="javascript:void(0)" class="product_img clear">
                    <img src="img/car_product.png" alt="">
                </a>
             </li>
             <li class="product_name">${data[i].name}</li>
             <li class="price">¥ ${data[i].price}</li>
             <li class="price  num">
                 <input type="text" value="${data[i].num}"  maxlength="3"/>
                 <div class="count">
                     <p class="shop hw-jiahao jia"></p>
                     <p class="shop hw-jianhao jian"></p>
                 </div>
             </li>
             <li class="price small_price">¥ ${data[i].total_price.toFixed(2)}</li>
             <li class="price product_list_delete">删除</li>
            </ul>`);
            }

            // 最后把结算列表 加入 arr
             var foot = ` <ul class="product_list settlement clear">
                    <li class="check_box">
                        <p><i></i></p>全选&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;删除
                    </li>
                    <div class="settlement_right clear">
                        <p>
                            <span class="total"> 总计：</span> <span class="total_price"> ¥  0.00 <i class="shop hw-wenhao"></i></span><br>
                             已选择 <span class="product_num">0</span> 件商品，优惠：<span class="discount">¥ 0.00</span> 
                        </p>
                        <a href="login.html">立即结算</a>
                    </div>
                </ul>
            </div>`;
            arr.push(foot);
            arr = arr.join('')
            // 最后渲染 arr字符串
            $('.addToCar_section').html(arr)
            $('.addToCar_section').show()
        }

    }
}())