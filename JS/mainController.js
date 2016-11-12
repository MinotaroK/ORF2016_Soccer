$(function(){
	$("select[id=select_plan]").val("select")

	$("#startBtn").click(function(e){
		cntFlg = 1;
		var plan = $("select[id=select_plan]").val();
		$("select[id=select_plan]").remove();
		$("#startBtn").remove();
		$("#count_sec").after("<br>" + "<button id='stopBtn'>一時停止</button>")
		console.log(plan)
		count_sec= 0;
		count_min =0;
		timerID = setInterval("countup()", 10);


		$("#stopBtn").click(function(e){
			cntFlg = 0;
			$("#stopBtn").after("<br>" + "<button id='reStartBtn'>再開</button>")
			$("#stopBtn").hide();

			$("#reStartBtn").click(function(e){
				cntFlg = 1;
				$("#stopBtn").show();
				$("#reStartBtn").remove();
			})

		})
	})

})

function result(){
	$("#stopBtn").remove();
	console.log("試合終わり")
}

//出場中メンバー選定、スコア計算 ※要出場時間値計算
function solve_point(plan){
	var playingMem = $.grep(playerData,
		function(elem, index){
			return (elem.location > 12)
		})
	var sum = 0;
	if(plan == 1){
		for(i=0; i<playingMem.length; i++){
			sum += playerData[i]["planA"]
		}
	}else if (plan == 2){
		for(i=0; i<playingMem.length; i++){
			sum += playerData[i]["planB"]
		}
	}else if (plan == 3){
		for(i=0; i<playingMem.length; i++){
			sum += playerData[i]["planC"]
		}
	}

	console.log(sum);
}

//タイマー
function countup() {
	if(cntFlg ==　1){
		count_sec++;
		if(count_sec < 60){
			$("#count_sec").html(("0" + count_sec).slice(-2));
		}else if(count_min > 88){
			$("#count_min").html(90);
			$("#count_sec").html("0" + 0);
			clearInterval(timerID);
			result();
		}else{
			count_min++
			count_sec = 0;
			$("#count_min").html(("0" + count_min).slice(-2));
			$("#count_sec").html(("0" + count_sec).slice(-2));
		}
	}
}










