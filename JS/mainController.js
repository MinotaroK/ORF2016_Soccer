$(function(){

	$("select[id=select_plan]").val("select")

	$("#startBtn").click(function(e){
		cntFlg = 1;
		var plan = $("select[id=select_plan]").val();
		var planName = $("select[id=select_plan] option:selected").text();
		$("select[id=select_plan]").remove();
		$("#startBtn").remove();
		$("#count_min").before("<br>" + "<div id='selectedPlan'>戦術：" + planName + "</div>" + "<br>")
		$("#count_sec").after("<br>" + "<br>" + "<button id='stopBtn'>一時停止</button>")
		$("#stopBtn").after("<br>" + "<br>" + "<div id='tmpScore'></div>");
		console.log(plan)
		count_sec = 0;
		count_min = 0;
		time_score = 0;
		timerID = setInterval(function(){ countup(plan); }, 10);

		$("#stopBtn").click(function(e){
			cntFlg = 0;
			$("#tmpScore").remove();
			$("#stopBtn").after("<br>" + "<button id='reStartBtn'>再開</button>")
			$("#stopBtn").hide();
			$("#reStartBtn").after("<br>" + "<br>" + "<div id='letSelect'>選手交代/ポジションチェンジ")

			$("#reStartBtn").click(function(e){
				cntFlg = 1;
				$("#changeResult").remove();
				$("#firstSCT").remove();
				$("#letsendSct").remove();
				$("#letSelect").remove();
				$("#reStartBtn").remove();
				$("#letSelect").remove();
				$("#stopBtn").show();
				$("#stopBtn").after("<br>" + "<div id='tmpScore'></div>");
				clkList = [];
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
		 		locate = playerData[i].location;
		 		localObj = coordinate[locate]
		 		if(playerData[i].position != localObj.position){
		 			playerData[i].playtime += ((time_score/60 - playerData[i].playtime)*0.7);
		 		}else{
		 			playerData[i].playtime += (time_score/60 - playerData[i].playtime);
		 		}
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
					tmp_score = 0;
					for(i=0; i<playerData.length; i++){
						tmp_score += (playerData[i].playtime * playerData[i][operation])
						$("#tmpScore").html(j + "0分経過、現在の合計スコアは" + tmp_score);
					}
					console.log(j + "0分経過！現在のスコアは" + tmp_score);
				}
			}
		}
	}
}