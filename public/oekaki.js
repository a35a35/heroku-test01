$(function() {
	var socket = io.connect();
	console.log("conneted", socket);

	socket.on('draw', function(data){
		draw(data.x, data.y);
	});
	
	socket.on('text', function(data){
		if(data.text != '') {
			text(data.text);
		}
	});
	
	socket.on('clear', function(data){
		clear();
	});
	
	var canvas = $('canvas#canvas').get(0);
	canvas.width = window.innerWidth - 30;
	canvas.height = window.innerHeight - 30;
	
	var ctx = canvas.getContext('2d'); // 描画用オブジェクト
	ctx.lineWidth = 5; // 線の太さ
	ctx.strokeStyle = '#9ea1a3'; // 線の色
	
	var isMouseDown = false;
	
	canvas.addEventListener('touchstart', touch, false); // タップ
	canvas.addEventListener('touchmove', touch, false); // シングルタッチ
	canvas.addEventListener('gesturemove', touch, false); // マルチタッチ
	canvas.addEventListener('mousedown', function mousedown(e){ isMouseDown = true; }, false); // マウスDOWN
	canvas.addEventListener('mouseup', function mousedown(e){ isMouseDown = false; }, false); // マウスUP
	canvas.addEventListener('mousemove', mouse, false); // マウスMOVE

	function touch(e){
		for (var i = 0; i < e.touches.length; i++){
			var idxX = e.touches[i].pageX;
			var idxY = e.touches[i].pageY;
			//draw(idxX, idxY);
			// serverへ送信
			socket.emit('draw', {x: idxX, y: idxY});
		}
		e.preventDefault(); // イベントをキャンセルし、画面をスクロールさせない
	}

	function mouse(e){
		if(!isMouseDown) return;
		//draw(e.clientX, e.clientY);
		// serverへ送信
		socket.emit('draw', {x: e.clientX, y: e.clientY});
	}
	
	function draw(idxX, idxY){
		// 丸を描く
		ctx.fillStyle = 'black';
		ctx.beginPath();
		ctx.arc(idxX, idxY, 5, 0, Math.PI * 2, false);
		ctx.fill();
	}
	
	function text(text){
		// 文字を書く
		ctx.fillStyle = "gray";
		ctx.font = "500px 'ＭＳ ゴシック'";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText(text, 10, 75, 1500);
	}
	
	function clear(){
		// Clear
		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
	}

});


