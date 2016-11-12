$(function(){
	$("select[id=select_plan]").val("select")

	$("select[id=select_plan]").change(function(){
		var plan = ($("select[id=select_plan]").val());

	solve_point(plan);

	})
})


function solve_point(plan){
	var sum = 0;
	if(plan == 1){
		for(i=0; i<playerData.length; i++){
			sum += playerData[i]["planA"]
		}
	}else if (plan == 2){
		for(i=0; i<playerData.length; i++){
			sum += playerData[i]["planB"]
		}
	}else if (plan == 3){
		for(i=0; i<playerData.length; i++){
			sum += playerData[i]["planC"]
		}
	}

	console.log(sum);
}
