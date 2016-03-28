var chessBoard = [];
var me = true;

for(var i=0; i<15; i++){
	chessBoard[i] = [];
	for (var j=0; j<15; j++){
		chessBoard[i][j] = 0;
	}
}

var chess = document.getElementById("chess");
var context = chess.getContext("2d");

context.strokeStyle = "#BFBFBF";

window.onload = function(){
	drawchessbox();
}

/*var backimg = new Image();
backimg.src ="img/backimg.png";
backimg.onload = function(){
	context.drawImage(backimg, 25, 25, 400, 400);
	drawchessbox();
} */
/*
这样写的原因是一开始电脑会自动先绘制线条再绘制
图片，所以一打开就只能看到图片而不能看到棋盘。
所以要把绘制棋盘的代码封装起来，放在绘图后面，则可以呈现出想要的画面、结果
*/

var drawchessbox =function(){
	for(var i=0; i<15; i++){
		context.moveTo(15 + i*30, 15);
		context.lineTo(15 + i*30, 435);
		context.moveTo(15, 15 + i*30);
		context.lineTo(435, 15 + i*30);
		context.stroke();
	}
}


var oneStep = function(i, j, me){  //i,j为索引，me为黑或白棋
	context.beginPath();  
	context.arc(15 + i*30, 15 + j*30, 13, 0, 2*Math.PI);  //坐标，坐标，半径，起始弧度，终止弧度（2*Math.PI就是圆)
	context.closePath();
	var gradient = context.createRadialGradient(15 + i*30 + 2, 15 + j*30 - 2, 13, 15 + i*30 + 2, 15 + j*30 - 2, 0); //渐变  参数前三个为第一个圆的坐标坐标半径，后三个参数为第二个圆的
		if(me){
			gradient.addColorStop(0, "#0A0A0A");
			gradient.addColorStop(1, "#636766");
		}else{
			gradient.addColorStop(0, "#D1D1D1");
			gradient.addColorStop(1, "#F9F9F9");
		}
	context.fillStyle = gradient;
	context.fill();
}

chess.onclick = function(e){
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x /30);
	var j = Math.floor(y /30);
	if(chessBoard[i][j]==0){
	oneStep(i, j, me);
	if(me){
		chessBoard[i][j]=1;
	}else{
		chessBoard[i][j]=2;
	}
	me = !me;
	}
}