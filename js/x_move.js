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
    var max =( g.width()-1200)*-1
    // 点击左边按钮改变left值
    this.ele.children('.left').click(function() {
        g.animate({left:0}, 300);
    })
     // 点击右边按钮改变left值
    this.ele.children('.right').click(function() {
        g.animate({left:max}, 300);
    })
}