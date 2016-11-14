$(function(){

	$("select[id=select_plan]").val("select")

	$("#startBtn").click(function(e){
		if($("select[id=select_plan]").val() == "select"){
			alert("戦術を選んで下さい！")
		}else{
			cntFlg = 1;
			var plan = $("select[id=select_plan]").val();
			var planName = $("select[id=select_plan] option:selected").text();
			$("select[id=select_plan]").remove();
			$("#startBtn").remove();
			$("#count_min").before("<br>" + "<div id='selectedPlan'>戦術：" + planName + "</div>" + "<br>")
			$("#count_sec").after("<br>" + "<br>" + "<button id='stopBtn'>一時停止</button>")
			$("#stopBtn").after("<br>" + "<br>" + "<div id='tmpScore'></div>");
			$("#tmpScore").after("<br>" + "<br>" + "<div id='eneTmpScore'></div>");
			count_sec = 0;
			count_min = 0;
			time_score = 0;
			timerID = setInterval(function(){ countup(plan); }, 10);

			$("#stopBtn").click(function(e){
				cntFlg = 0;
				$("#tmpScore").remove();
				$("#eneTmpScore").remove();
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
					$("#stopBtn").after("<br>" + "<br>" + "<div id='tmpScore'></div>");
					$("#tmpScore").after("<br>" + "<br>" + "<div id='eneTmpScore'></div>")
					clkList = [];
				})

			})
		}
	})

})

function result(operation){
	totalscore = 0;
	eneTotalscore = 0;
	$("#stopBtn").remove();
	var numOpe = $.grep(scoreSet,
			function(elem, index){
				return (elem.plan == operation)
			})
	console.log(numOpe[0]["Leicester"])
	for(i=0; i<playerData.length; i++){
		totalscore += ((playerData[i].playtime/60) * playerData[i][operation])
	}
	for(i=0; i<enemyData.length; i++){
		eneTotalscore += ((enemyData[i].playtime/60) * enemyData[i].score)
	}

	totalscore = totalscore*(numOpe[0]["Leicester"])
	eneTotalscore = eneTotalscore*(numOpe[0]["Manchester"])
	$("#tmpScore").remove();
	$("#eneTmpScore").remove();

	$("#count_sec").after("<br>" + "<br>" + "<div id='finalScore'>味方合計スコア：" + totalscore + "</div>")
	$("#finalScore").after("<br>" + "<br>" + "<div id='eneFinalScore'>敵合計スコア：" + eneTotalscore + "</div>")

	Point = Math.floor(totalscore/59.58)
	enePoint = Math.floor(eneTotalscore/67.56)

	$("#eneFinalScore").after("<br>" + "<div id='point'>" + Point + "：" + enePoint + "</div>")
}

//タイマー
function countup(operation) {
	if(cntFlg ==　1){
		count_sec++;
		//出場時間監視&適正ポジションチェック
		for(i=0; i<playerData.length; i++){
		 	if(playerData[i].location < 12){
		 		locate = playerData[i].location;
		 		localObj = coordinate[locate]
		 		if(playerData[i].position != localObj.position){
		 			playerData[i].playtime += (1*0.7);
		 		}else{
		 			playerData[i].playtime++;
		 		}
		 	}
		}
		//タイマー処理
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
			//10分ごとのスコア計算
			for(j=1; j<9; j++){
				if(count_min == (j + "0") && count_sec == 0){
					tmp_score = 0;
					for(i=0; i<playerData.length; i++){
						tmp_score += ((playerData[i].playtime/60) * playerData[i][operation])
						$("#tmpScore").html(j + "0分経過、現在の合計スコアは" + tmp_score);
					}
					console.log(j + "0分経過！現在のスコアは" + tmp_score);
				}
			}
		}
		enemyAttack(time_score, count_min, count_sec)
	}
}

function enemyAttack(time_score, count_min, count_sec){
	//交代処理
	if(count_min == 61 && count_sec == 0){
		filed_p = enemyData[6]["location"]
		bench_p = enemyData[7]["location"]

		enemyData[6]["location"] = bench_p
		enemyData[7]["location"] = filed_p
	}else if(count_min == 74 && count_sec == 0){
		filed_p = enemyData[10]["location"]
		bench_p = enemyData[0]["location"]

		enemyData[10]["location"] = bench_p
		enemyData[0]["location"] = filed_p
	}else if(count_min == 81 && count_sec == 0){
		filed_p = enemyData[8]["location"]
		bench_p = enemyData[11]["location"]

		enemyData[8]["location"] = bench_p
		enemyData[11]["location"] = filed_p
	}
	//出場時間監視
	for(i=0; i<enemyData.length; i++){
		 	if(enemyData[i].location < 12){
		 		enemyData[i].playtime++;
		 	}
		}
	//10分ごとのスコア計算
	if(count_min < 90){
		for(j=1; j<9; j++){
				if(count_min == (j + "0") && count_sec == 0){
					eneTmp_score = 0;
					for(i=0; i<enemyData.length; i++){
						eneTmp_score += ((enemyData[i].playtime/60) * enemyData[i].score)
						$("#eneTmpScore").html(j + "0分経過、現在の敵合計スコアは" + eneTmp_score);
					}
					console.log("敵のスコアは" + eneTmp_score);
				}
			}
	}
}