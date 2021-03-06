coordinate = {
  "1": {"location":1, "position":"FW", "x":220,"y":100},
  "2": {"location":2, "position":"FW", "x":320,"y":100},
  "3": {"location":3, "position":"MF", "x":130,"y":230},
  "4": {"location":4, "position":"MF", "x":420,"y":230},
  "5": {"location":5, "position":"MF", "x":320,"y":350},
  "6": {"location":6, "position":"MF", "x":220,"y":350},
  "7": {"location":7, "position":"DF", "x":420,"y":500},
  "8": {"location":8, "position":"DF", "x":320,"y":500},
  "9": {"location":9, "position":"DF", "x":220,"y":500},
  "10": {"location":10, "position":"DF", "x":130,"y":500},
  "11": {"location":11, "position":"GK", "x":275,"y":600},
  "12": {"location":12, "position":"bench", "x":100,"y":710},
  "13": {"location":13, "position":"bench", "x":190,"y":710},
  "14": {"location":14, "position":"bench", "x":280,"y":710},
  "15": {"location":15, "position":"bench", "x":370,"y":710},
  "16": {"location":16, "position":"bench", "x":450,"y":710}
}

const w = 500
const h = 760

function drawD3(){
  var svg = d3.select("#field")
            .append('svg')
            .attr('width', w)
            .attr('height', h)

  // field
  svg.append('rect')
     .attr('x', 50)
     .attr('y', 00)
     .attr('width', 450)
     .attr('height', 660)
     .attr('fill', '#009900')

  // line
  svg.append('rect')
      .attr('x', 60)
      .attr('y', 10)
      .attr('width', 430)
      .attr('height', 640)
      .attr('fill-opacity', 0)
      .attr('stroke', 'white')

  // penalty area
  svg.append('rect')
     .attr('x', 130)
     .attr('y', 500)
     .attr('width', 290)
     .attr('height', 150)
     .attr('fill-opacity', 0)
     .attr('stroke', 'white')

  // goal area
  svg.append('rect')
      .attr('x', 210)
      .attr('y', 600)
      .attr('width', 120)
      .attr('height', 50)
      .attr('fill-opacity', 0)
      .attr('stroke', 'white')

  // center circle
  svg.append('circle')
     .attr('cx', 275)
     .attr('cy', 10)
     .attr('r', 100)
     .attr('stroke', 'white')
     .attr('fill-opacity', 0)

  // bench
  svg.append('rect')
      .attr('x', 50)
      .attr('y', 660)
      .attr('width', 450)
      .attr('height', 100)
      .attr('fill', 'orange')

  var  g = svg.selectAll('g')
              .data(playerData)
              .enter()
              .append('g')


  g.append('circle')
    .attr('r', 25)
    .attr('cx', function(d, i){return coordinate[d.location].x})
    .attr('cy', function(d){return coordinate[d.location].y})
    .attr('stroke', 'gray')
    .attr('fill', '#0000DD')
    .on('click', function(d){
      // d はクリックした要素のデータ
      if(cntFlg == 0 || "pre"){
        $("#changeResult").remove();
        clkList.push(d);
        if(clkList.length == 1){
          console.log("working")
          $("#letSelect").after("<br>" + "<div id='firstSCT'>選択中" + "<br>" + clkList[0]["name"] + "</div>")
          $("#firstSCT").after("<br>" + "<div id='letsendSct'>交代先/移動先の選手を選んで下さい</div>")
        }
        if(clkList.length > 1){
          var firstClk = clkList[0];
          var secondClk = clkList[1];
          changePlayer(firstClk, secondClk);
          $("#firstSCT").remove();
          $("#letsendSct").remove();
          $("#letSelect").after("<br>" + "<div id='changeResult'>" + clkList[0]["name"] + "と" + clkList[1]["name"] + "が交代しました");
          clkList = [];
          d3.select("svg").remove();
          drawD3();
        }
      }
    });

  g.append('text')
    .attr('witdh', 50)
    .attr('x', function(d, i){return coordinate[d.location].x-30})
    .attr('y', function(d){return coordinate[d.location].y})
    .attr('font-size', '0.8em')
    .attr('fill', 'white')
    .text(function(d){return d.name})

};

clkList = [];
drawD3();


changePlayer = function(p1, p2){
  p1_l = p1.location
  p2_l = p2.location
  for(i=0;i<playerData.length;i++){
    if(playerData[i].name == p1.name){
      playerData[i].location = p2_l;
    };
    if(playerData[i].name == p2.name){
      playerData[i].location = p1_l;
    };

  }
}
