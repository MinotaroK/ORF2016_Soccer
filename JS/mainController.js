$(function(){

	$("select[id=select_plan]").val("select")
	cntFlg = "pre";
	drawGraph(50, 50)

	$("#startBtn").click(function(e){
		if($("select[id=select_plan]").val() == "select"){
			alert("戦術を選んで下さい！")
		}else{
			rmdNum = random()
			console.log(rmdNum)
			cntFlg = 1;
			var plan = $("select[id=select_plan]").val();
			var planName = $("select[id=select_plan] option:selected").text();
			$("select[id=select_plan]").remove();
			$("#startBtn").remove();
			$("#count_min").before("<br>" + "<div id='selectedPlan'>戦術：" + planName + "</div>" + "<br>")
			$("#count_sec").after("<br>" + "<br>" + "<button id='stopBtn'>一時停止</button>")
			$("#stopBtn").after("<br>" + "<br>" + "<div id='tmpScore'></div>");
			$("#tmpScore").after("<br>" + "<br>" + "<div id='eneTmpScore'></div>");
			$("#eneTmpScore").after("<br>" + "<br>" + "<div id='tmpPoint'></div>");
			count_sec = 0;
			count_min = 0;
			tmpenePoint = 0;
			tmpPoint = 0;
			eneTmp_sum = 0;
			tmp_sum = 0;
			timerID = setInterval(function(){ countup(plan); }, 10);
			$("#stopBtn").click(function(e){
				cntFlg = 0;
				// $("#tmpScore").remove();
				// $("#eneTmpScore").remove();
				// $("#chart").remove();
				$("#tmpPoint").remove();
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
					// $("#tmpScore").remove();
					// $("#eneTmpScore").remove();
					$("#stopBtn").show();
					$("#stopBtn").after("<br>" + "<br>" + "<div id='tmpScore'></div>");
					$("#tmpScore").after("<br>" + "<br>" + "<div id='eneTmpScore'></div>")
					$("#eneTmpScore").after("<br>" + "<br>" + "<div id='tmpPoint'></div>");
					clkList = [];
					$("#eneTmpScore").after("<br>" + "<div id='chart'></div>")
					drawGraph(tmp_score, eneTmp_score)
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


	totalscore = totalscore*(numOpe[0]["Leicester"])
	eneTotalscore = eneTotalscore*(numOpe[0]["Manchester"])
	$("#tmpScore").remove();
	$("#eneTmpScore").remove();
	$("#count_sec").after("<br>" + "<div id='point'>" + tmpPoint + "：" + tmpenePoint + "</div>")
	$("#tmpPoint").remove();
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
		if(count_min > 90){
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
					}
					// console.log("味方のスコアは" + tmp_score); ///
					// solveScore(operation, tmp_score, "Leicester", 59.58, tmp_sum)
					for(i=0; i<enemyData.length; i++){
					 	playerData[i].playtime = 0;
					}
					var numOpe = $.grep(scoreSet,
					function(elem, index){
						return (elem.plan == operation)
					})
					tmp_sum += (tmp_score*(numOpe[0]["Leicester"]))
					console.log(tmp_sum)
					tmpPoint = Math.floor(tmp_sum/59.58)
					$("#tmpScore").html(j + "0分経過、現在の合計スコアは" + tmp_sum);
				}
			}
		}
		enemyAttack(count_min, count_sec, operation);

		$("#tmpPoint").html(tmpPoint + " - " + tmpenePoint)

		for(j=1; j<10; j++){
			if(count_min == (j + "0") && count_sec == 0){
				// drawGraph(tmp_sum, eneTmp_sum)
				console.log(tmp_sum)
				console.log(eneTmp_sum)
			}
		}
	}
}

function drawGraph(data1, data2){

	var chart = c3.generate({
						bindto: '#chart',
					    data: {
					        columns: [
										["Manchester", Math.round(data2)],
										["Leicester", Math.round(data1)],


					        ],
					        type : 'donut',
									colors: {
					            Leicester: '#0000CC',
					            Manchester: '#CC0000',
					        },
									order: null
					    },
					    donut: {
					        title: "勝負の勢い"
					    }
					});



	d3.selectAll('.c3-chart-arcs')
		.selectAll('text')
		.attr('fill', 'white');
}

function enemyAttack(count_min, count_sec, operation){
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
	if(count_min < 91){
		for(j=1; j<10; j++){
			if(count_min == (j + "0") && count_sec == 0){
				if(j == rmdNum){
					eneTmp_score = 0;
					for(i=0; i<enemyData.length; i++){
						eneTmp_score += (((enemyData[i].playtime/60) * enemyData[i].score))*5
					}
					console.log("FEVER!!!!!!!!!!!!!!!!!!!!!!")
					for(i=0; i<enemyData.length; i++){
					 	enemyData[i].playtime = 0;
					}
				}else{
					eneTmp_score = 0;
					for(i=0; i<enemyData.length; i++){
						eneTmp_score += ((enemyData[i].playtime/60) * enemyData[i].score)
					}
					for(i=0; i<enemyData.length; i++){
					 	enemyData[i].playtime = 0;
					}
				}
				var numOpe = $.grep(scoreSet,
				function(elem, index){
					return (elem.plan == operation)
				})
				eneTmp_sum += (eneTmp_score*(numOpe[0]["Manchester"]))
				tmpenePoint = Math.floor(eneTmp_sum/67.56)
				$("#eneTmpScore").html(j + "0分経過、現在の敵合計スコアは" + eneTmp_sum);
				drawGraph(tmp_sum, eneTmp_sum);
			}
		}
	}
}

function random(){
	return Math.floor( Math.random() * 7 ) + 1;
}
