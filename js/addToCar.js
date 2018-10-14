var sendData = (function(){

    return {
        init: function () {
            this.event()
        },
        
        event : function() {
            var _this = this;

            $('.ToCar').click(function() {
                
                localStorage.car_sec = '';
            })
        }
    }
}())