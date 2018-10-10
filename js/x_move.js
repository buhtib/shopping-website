function move(ele){
    if(typeof ele == 'string'){
        this.ele = $(ele)
    }
 }
move.prototype.x_move = function (distance) {
    var _this = this;
    // 获取包裹的ul
    var g=this.ele.find('ul')
    // 获取被父级隐藏超出的部分
    var max =( g.width()-1200)
    // 给默认移动的距离
    this.distance = distance || max
    
    // 点击左边按钮改变left值
    this.ele.children('.left').click(function() {
        g.animate({left:0}, 100);
        // 按下左键恢复成初始距离
        _this.distance = distance;
    })
     // 点击右边按钮改变left值
    this.ele.children('.right').click(function() {
        // 每次点击右按钮移动距离叠加
        _this.distance = _this.distance +300;
        // 临界
        if(_this.distance>= max){
            _this.distance = max
        }
        left_move = _this.distance * -1
        g.animate({left:left_move}, 200);
    })
}