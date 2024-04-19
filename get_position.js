var target_element = document.getElementById('target'); //画像要素を取得
var x;            //原点からの座標(X)
var y;            //原点からの座標(Y)
var origin_x;     //原点(X)
var origin_y;     //原点(Y)
var pre_origin_x; //前回の原点(X) 
var pre_origin_y; //前回の原点(Y)
var width;        //画像(横幅)
var height;       //画像(縦幅)
var x_max_value;  //x座標の最大値(cm)
var y_max_value;  //y座標の最大値(cm)
var sum_distance; //2点間の距離の合計(cm)
var img_click_flg;//画像初回クリックフラグ 

//実際の横幅縦幅を取得
const showMessage = () => {
    x_max = document.getElementById("x_max");
    x_max_value = x_max.value;
    y_max = document.getElementById("y_max");
    y_max_value = y_max.value;
    document.getElementById('set_scale').textContent = ('現在設定中の横幅:' + x_max_value + 'cm ' + '縦幅' + y_max_value + 'cm');
}

//原点の初期化処理
const origin_clear = () => {
    origin_x = 0.00;
    origin_y = 0.00;
    document.getElementById('origin').textContent  = ("原点:" + 'x軸：' + origin_x.toFixed(2) + 'cm Y軸：' + origin_y.toFixed(2) + 'cm');
}

//2点間の距離の合計
const sum_distance_clear = () => {
    sum_distance = 0;
	pre_origin_x = 0;
    pre_origin_y = 0;
	img_click_flg = 0;
    document.getElementById('sum_distance').textContent  = ("2点間の距離合計" + ":" + sum_distance.toFixed(2) + "cm");
}

//画像の範囲内でマウスカーソルを移動したときにする処理
target_element.onmousemove  = function(e) {
	if (e) event = e;
    // マウス位置を取得する
	var mouseX = e.pageX ;	// X座標
	var mouseY = e.pageY ;	// Y座標

	// 要素の位置を取得
	var elem = e.target || e.srcElement || window.event.target || window.event.srcElement || element;
	var rect = elem .getBoundingClientRect() ;

	// 要素の位置座標を計算
	var positionX = rect.left + window.pageXOffset ;	// 要素のX座標
	var positionY = rect.top + window.pageYOffset ;	// 要素のY座標

	// 要素の左上からの距離を計算
	var x = ( ( ( mouseX - positionX ) / width ) * (x_max_value - 0) + 0) ;
	var y = ( ( ( mouseY - positionY ) / height ) * (y_max_value - 0) + 0) ;

	x = x - origin_x;
	y = -(y - origin_y);
    
    document.getElementById('sample').textContent  = ('原点からの相対座標' + 'x軸：' + x.toFixed(2) + 'cm Y軸：' + y.toFixed(2) + 'cm');
};

//画像範囲内でクリックしたときにする処理
target_element.onclick  = function(e) {
	if (e) event = e;
    // マウス位置を取得する
	var mouseX = e.pageX ;	// X座標
	var mouseY = e.pageY ;	// Y座標

	// 要素の位置を取得
	var elem = e.target || e.srcElement || window.event.target || window.event.srcElement || element;
	var rect = elem .getBoundingClientRect() ;

	// 要素の位置座標を計算
	var positionX = rect.left + window.pageXOffset ;	// 要素のX座標
	var positionY = rect.top + window.pageYOffset ;	    // 要素のY座標

	// 要素の左上からの距離を計算(スケール変換後)
	origin_x = ( ( ( mouseX - positionX ) / width ) * (x_max_value - 0) + 0) ;
	origin_y = ( ( ( mouseY - positionY ) / height ) * (y_max_value - 0) + 0);

    if ( img_click_flg == 1 )
	{
		sum_distance = sum_distance + Math.sqrt( (pre_origin_x - origin_x)**2 + (pre_origin_y - origin_y)**2);
	}
	img_click_flg = 1;
	pre_origin_x = origin_x;
    pre_origin_y = origin_y;
    
    document.getElementById('sum_distance').textContent  = ("2点間の距離合計" + ":" + sum_distance.toFixed(2) + "cm");
    document.getElementById('origin').textContent  = ("原点:" + 'x軸：' + origin_x.toFixed(2) + 'cm Y軸：' + origin_y.toFixed(2) + 'cm');
};

//画面更新時処理
window.onload = function() {
	x_max_value  = 366.00;
    y_max_value  = 543.00;
	sum_distance = 0;
	pre_origin_x = 0;
    pre_origin_y = 0;
    img_click_flg = 0;
    var intervalId = setInterval( function () {
        if ( target_element.complete ) {
            width  = target_element.naturalWidth ;
            height = target_element.naturalHeight ;
    
            clearInterval( intervalId ) ;
        }
        document.getElementById('img_size').textContent  = ("画像サイズ：" + "縦幅" + width + "px" + "　　横幅" + height + "px");
    }, 500 ) ;
}