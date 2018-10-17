var sendData = (function(){

    return {
        init: function () {
            // 装入数据的数组对象
            this.arr=[];
            this.event()
        },
        
        event : function() {
            var _this = this;

            // 点击进行传数据
            $('.ToCar').click(function() {
                _this.saveData()
            })

        },

        // 存入相关数据到arr中
        saveData:function () {
            var _this = this;
            // 跳转页面会清空 arr
            if(localStorage.car_data) {
                _this.arr = JSON.parse(localStorage.car_data);
                _this.nav_car(_this.arr)
            }else {
                $('.localdata').html(` <img src="img/car.png" alt="">
                你的购物车是空的，赶紧选购吧~`)
            }
             // 每次点击加入一个对象
             var obj = {
                name: $('.pro_name')[0].innerText,
                price: $('#price').html().substr(1),
                num: $('.num>input').val(),
                total_price: $('#price').html().substr(1)*$('.num>input').val()
            }

            // 判断数组中的每一个对象中 是否出现相同name
            for(var i = 0; i < _this.arr.length; i++) {
                if(_this.arr[i].name == obj.name) {
                    // 有就直接break 
                    _this.arr[i].num = Number(_this.arr[i].num) + Number(obj.num);
                    _this.arr[i].total_price = Number(_this.arr[i].total_price) + Number(obj.total_price);
                    break;
                }
            }
            // 如果 i == _this.arr.length 说明一定没找到相同name
            if(i == _this.arr.length){
                _this.arr.push(obj)
            }

         // arr 数据加到localstorage
            localStorage.car_data = JSON.stringify(_this.arr);
            
        },

        nav_car:function (arr) {
            var arr = [];
            var allprice;
            var head = `<ul class="localdata_top">`
            arr.push(head);

            for(var i = 0; i < arr.length; i++) {
                var sec = ` <li>
                <em><i class="shop hw-xiaogou"></i></em>
                
                <div class="pro_section clear">
                    <img src="img/car_product.png" alt="">
                    <p>HUAWEI P20 6GB+64GB 全网通版（极光色）</p>
                    <div class="pro_">
                        <span class="pro_price"> ¥ ${arr[i].price}</span><span class="pro_num"> x ${arr[i].num}</span>
                    </div>
                </div>
            </li>`
             allprice += arr[i].price;
                arr.push(sec)
            }
            var foot = `</ul>
            <div class="localdata_down">
                <div class="total_price_list">
                    <span >总计：</span>
                    <h2 class="total_price">¥ ${allprice}</h2>
                </div>
                
                <a href="login.html">结算</a>
            </div>`
            arr.push(foot)
            $('.localdata').html(arr.join(''))
            // $('.localdata').show()
        }

      
    }
}())