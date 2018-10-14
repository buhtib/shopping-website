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
            if(localStorage.car_data) {

                _this.arr.push = JSON.parse(localStorage.car_data);
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

      
    }
}())