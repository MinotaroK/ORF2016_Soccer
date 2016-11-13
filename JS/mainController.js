$(function(){
	$("select[id=select_plan]").val("select")

	$("#startBtn").click(function(e){
		cntFlg = 1;
		var plan = $("select[id=select_plan]").val();
		$("select[id=select_plan]").remove();
		$("#startBtn").remove();
		$("#count_sec").after("<br>" + "<button id='stopBtn'>一時停止</button>")
		console.log(plan)
		count_sec = 0;
		count_min = 0;
		time_score = 0;
		tmp_score = 0;
		timerID = setInterval(function(){ countup(plan); }, 10);

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

function result(operation){
	totalscore = 0;
	$("#stopBtn").remove();
	for(i=0; i<playerData.length; i++){
		totalscore += (playerData[i].playtime * playerData[i][operation])
	}
	console.log("試合終わり、合計スコアは" + totalscore)
}

//タイマー
function countup(operation) {
	if(cntFlg ==　1){
		time_score++;
		count_sec++;
		for(i=0; i<playerData.length; i++){
		 	if(playerData[i].location < 12){
		 			playerData[i].playtime += (time_score/60 - playerData[i].playtime);
		 	}
		}
		if(count_min > 89){
			$("#count_min").html(90);
			$("#count_sec").html("0" + 0);
			clearInterval(timerID);
			result(operation);
		}else if(count_sec < 60){
			$("#count_sec").html(("0" + count_sec).slice(-2));
		}else{
			count_min++
			count_sec = 0;
			$("#count_min").html(("0" + count_min).slice(-2));
			$("#count_sec").html(("0" + count_sec).slice(-2));
			for(j=1; j<10; j++){
				if(count_min == (j + "0") && count_sec == 0){
					for(i=0; i<playerData.length; i++){
						tmp_score += (playerData[i].playtime * playerData[i][operation])
					}
					console.log(j + "0分経過！");
				}
			}
		}
	}
}










