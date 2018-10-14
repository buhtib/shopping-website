var getData = (function() {

    return {
        init : function() {
            this.event()
            // this.useData()
            this.jian()
        },
        
        event : function() {
            var _this = this;

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

        useData : function() {
            var _this = this;
            // 当localStorage.car_sec有无数据时判断
            if(localStorage.car_sec){
                // 有数据，改变高度为自动，数据插入到html中
                $('.section-in').addClass('sec_addto_car');
                $('.addToCar_section').html(localStorage.car_sec)
                $('.addToCar_section').show()

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
    }
}())