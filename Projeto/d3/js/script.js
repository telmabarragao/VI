$( document ).ready(function() {
      var lastCountryOn = null;

      var yearTimeline = 2014;
      var variableToShow = "EcoFoot";
      var appendTo = "#world_graph";
      var countries_list = [];
      var continents_list = [];
      var minValColorCouFT, maxValColorCouFT;
      var minValColorCouB, maxValColorCouB;
      var minValColorContFT, maxValColorContFT;
      var minValColorContB, maxValColorContB;


      function ramp(minVal, lowColor, highColor, value){


        if(appendTo== "#world_graph"){

            if(variableToShow=="EcoFoot"){

                  var colorup = d3.scaleLinear().domain([minVal,11000000000]).range([lowColor, highColor]);

                  if(value == "mouseEF"){
                    return "#004d12";

                  }else if(value == "mouseB"){

                    return "#663300";

                  }else{
                    return colorup(value);

                  }


            }else{

              var colorup = d3.scaleLinear().domain([minVal,3400000000]).range([lowColor, highColor]);

              if(value == "mouseEF"){
                return "#004d12";

              }else if(value == "mouseB"){

                return "#663300";

              }else{
                return colorup(value);

              }
            }

        }else{

          if(variableToShow=="EcoFoot"){
                var colorup = d3.scaleLinear().domain([minVal,10]).range([lowColor, highColor]);

                if(value == "mouseEF"){
                  return "#004d12";

                }else if(value == "mouseB"){

                  return "#663300";

                }else{
                  return colorup(value);

                }
          }else{
            var colorup = d3.scaleLinear().domain([minVal,10]).range([lowColor, highColor]);

            if(value == "mouseEF"){
              return "#004d12";

            }else if(value == "mouseB"){

              return "#663300";

            }else{
              return colorup(value);

            }

          }

        }

      }

      document.getElementById('search_bar-continent').style.visibility = "visible";
      document.getElementById('search_bar-continent').style.display = "inline-grid";
      document.getElementById('search_bar').style.visibility = "hidden";
      document.getElementById('search_bar').style.display = "none";

      $(".switch-input").on("click", function(){

          if(this.value == "week"){
                if(variableToShow == "EcoFoot"){
                  appendTo = "#world_graph";
                  $("#chart").remove();

                  continents_EcoFootGha();

                  document.getElementById('search_bar-continent').style.visibility = "visible";
                  document.getElementById('search_bar').style.visibility = "hidden";
                  document.getElementById('search_bar-continent').style.display = "inline-grid";
                  document.getElementById('search_bar').style.display = "none";

                  document.getElementById('continents_view').style.visibility = "visible" ;
                  document.getElementById('countries_view').style.visibility = "hidden" ;

                }else{
                  appendTo = "#world_graph";
                  $("#chart").remove();

                  continents_BiocapacityGha();

                  document.getElementById('search_bar-continent').style.visibility = "visible";
                  document.getElementById('search_bar').style.visibility = "hidden";
                  document.getElementById('search_bar-continent').style.display = "inline-grid";
                  document.getElementById('search_bar').style.display = "none";
                  document.getElementById('continents_view').style.visibility = "visible" ;
                  document.getElementById('countries_view').style.visibility = "hidden" ;

                }
          }else{
              if(variableToShow == "EcoFoot"){
                  appendTo = "#countries_graph"
                  $("#chart").remove();

                  countries_EcoFoot();

                  document.getElementById('search_bar-continent').style.visibility = "hidden";
                  document.getElementById('search_bar').style.visibility = "visible";
                  document.getElementById('search_bar-continent').style.display = "none";
                  document.getElementById('search_bar').style.display = "inline-grid";
                  document.getElementById('continents_view').style.visibility = "hidden" ;
                  document.getElementById('countries_view').style.visibility = "visible" ;


              }else{
                  appendTo = "#countries_graph"
                  $("#chart").remove();

                  countries_Biocapacity();

                  document.getElementById('search_bar-continent').style.visibility = "hidden";
                  document.getElementById('search_bar').style.visibility = "visible";
                  document.getElementById('search_bar-continent').style.display = "none";
                  document.getElementById('search_bar').style.display = "inline-grid";
                  document.getElementById('continents_view').style.visibility = "hidden" ;
                  document.getElementById('countries_view').style.visibility = "visible" ;
              }
          }
      });

      $(".switchebinput").on("click", function(){

          if(this.value == "weekeb" && appendTo == "#countries_graph"){

                  variableToShow = "EcoFoot";

                  if(document.getElementById("chart").length != 0){

                    document.getElementById("chart").remove();
                    countries_EcoFoot();
                  }else{
                    countries_EcoFoot();

                  }

          }else if(this.value == "montheb" && appendTo == "#countries_graph"){

                  variableToShow = "Biocapacity";

                  if(document.getElementById("chart").length != 0){
                    document.getElementById("chart").remove();
                    countries_Biocapacity();
                  }else{
                    countries_Biocapacity();


                  }

          }else if(this.value == "montheb"  && appendTo == "#world_graph"){
            variableToShow = "Biocapacity";
            if(document.getElementById("chart").length != 0){
              document.getElementById("chart").remove();
              continents_BiocapacityGha();
            }else{
              continents_BiocapacityGha();

            }

          }else if(this.value == "weekeb"  && appendTo == "#world_graph"){
            variableToShow = "EcoFoot";
            if(document.getElementById("chart").length != 0){
              document.getElementById("chart").remove();
              continents_EcoFootGha();
            }else{
              continents_EcoFootGha();

            }

          }

      });

      var myButtonSearchContinent = document.getElementById('submitSearch-continent');

      myButtonSearchContinent.addEventListener('click', function(event) {
            light_up_search_continent();
      });


      var myButtonSearch = document.getElementById('submitSearch');

      myButtonSearch.addEventListener('click', function(event) {
        light_up_search();
      });


      $("a").on("click", function(){

        if(this.id == ""){

        }else{
          yearTimeline = parseFloat(this.id.replace("a",""));

          if(variableToShow=="EcoFoot"){
            $("#world_graph #chart").remove();
            $("#graphs #stackBarChartCont").remove();

            continents_EcoFootGha();
          }else{
            $("#world_graph #chart").remove();
            $("#graphs #stackBarChartCont").remove();

            continents_BiocapacityGha();

          }
        }
      });

      continents_EcoFootGha();
      autocomplete(document.getElementById("myInput-continent"), continents_list);

////////////////////D3//////////////////

      //Width and height
      var w = 600;
      var h = 450;

      var highColorEF = '#497740'
      var lowColorEF = '#B4AC95'
      var highColorB = '#994d00'
      var lowColorB = '#fff2e6'

      // define map projection      d3.geoNaturalEarth()
      var projection = d3.geoEquirectangular()
                          .translate([w/2, h/2])
                          .scale(w / 2 / Math.PI);

      //Define default path generator
      var path = d3.geoPath().projection(projection);



      ////////////////////CONTINENTS FUNCTIONS//////////////////

      //////////CONTINENTS MAP///////////

      function continents_EcoFootEarths(){
            var svg = d3.select("#world_graph")
              .append("svg")
              .attr("id", "chart")
              .attr("width", 600)
              .attr("height", 480)
              .attr("tranform", "translate(" + 0 + "," + 0 + ")");


            d3.json("../data/ContinentsOutput.json").then(function(json){

              data = json.data;
              var dataArray_efgha = new Array();
              var lastContinentViewed = data[0].country_name;
              var dataContYearsAsia = {};
              var dataContYearsAfrica = {};
              var dataContYearsEurope = {};
              var dataContYearsNorthAmerica = {};
              var dataContYearsSouthAmerica = {};
              var dataContYearsOceania = {};

              var allEmpty = {};

              d3.json("../data/continents.json").then(function(geojson){

                  datageo = geojson;
                  var lastjsonState = datageo.features[0].properties.CONTINENT;


                  for(var n = 0; n < datageo.features.length; n++){

                      var jsonState = datageo.features[n].properties.CONTINENT;


                      for(var i = 0; i < data.length; i++){

                            var dataContinent = data[i].country_name;
                            var dataYear = {};
                            var dataRecord = data[i].Record;


                            if(dataContinent == "Central America"){
                              data[i].country_name = "North America";
                              dataContinent = data[i].country_name;
                            }


                            if(continents_list.indexOf(dataContinent) == -1){
                              continents_list.push(dataContinent);
                            }


                            if(lastContinentViewed.replace(" ", "") != dataContinent.replace(" ", "") && lastContinentViewed.replace(" ", "") == lastjsonState.replace(" ", "")){

                                  if(lastjsonState == "North America"){
                                      datageo.features[1].properties.efgha = dataContYearsNorthAmerica;
                                  }else if(lastjsonState == "South America"){
                                      datageo.features[4].properties.efgha = dataContYearsSouthAmerica;
                                  }else if(lastjsonState == "Asia"){
                                      datageo.features[0].properties.efgha = dataContYearsAsia;
                                  }else if(lastjsonState == "Europe"){
                                      datageo.features[2].properties.efgha = dataContYearsEurope;
                                  }else if(lastjsonState == "Africa"){
                                      datageo.features[3].properties.efgha = dataContYearsAfrica;
                                  }else if(lastjsonState == "Oceania"){
                                      datageo.features[5].properties.efgha = dataContYearsOceania;
                                      datageo.features[6].properties.efgha = dataContYearsOceania;
                                      datageo.features[6].properties.CONTINENT = "Oceania";
                                  }
                                    //faz push e update do continent
                                    lastContinentViewed = dataContinent;

                                    dataYear = allEmpty;
                                    dataYear = {};

                                    console.log(datageo);

                            }

                            if(dataContinent.replace(" ", "") == jsonState.replace(" ", "") && dataRecord == "EFConsTotGHA"){


                                  var year = parseFloat(data[i].year);

                                  //footprint consumo em GHA
                                  var built_up_land_efgha = parseFloat(data[i].built_up_land);
                                  var carbon_efgha = parseFloat(data[i].Carbon);
                                  var cropland_efgha = parseFloat(data[i].Cropland);
                                  var fishing_grounds_efgha = parseFloat(data[i].fishing_grounds);
                                  var forest_products_efgha = parseFloat(data[i].forest_products);
                                  var grazing_land_efgha = parseFloat(data[i].grazing_land);
                                  var total_efgha = parseFloat(data[i].Total);
                                  var continent_name = data[i].country_name;

                                  dataArray_efgha.push(total_efgha);

                                  dataYear["year"] = year;
                                  dataYear["continent_name"] = continent_name;
                                  dataYear["total_efgha"] = total_efgha;
                                  dataYear["grazing_land_efgha"] = grazing_land_efgha;
                                  dataYear["forest_products_efgha"] = forest_products_efgha;
                                  dataYear["fishing_grounds_efgha"] = fishing_grounds_efgha;
                                  dataYear["cropland_efgha"] = cropland_efgha;
                                  dataYear["carbon_efgha"] = carbon_efgha;
                                  dataYear["built_up_land_efgha"] = built_up_land_efgha;


                                  if(continent_name == "Asia"){
                                    dataContYearsAsia["_"+year]=dataYear;

                                  }else if(continent_name == "Europe"){
                                    dataContYearsEurope["_"+year]=dataYear;

                                  }else if(continent_name == "Africa"){
                                    dataContYearsAfrica["_"+year]=dataYear;

                                  }else if(continent_name == "North America"){
                                    dataContYearsNorthAmerica["_"+year]=dataYear;

                                  }else if(continent_name == "South America"){
                                    dataContYearsSouthAmerica["_"+year]=dataYear;

                                  }else if(continent_name == "Oceania"){
                                    dataContYearsOceania["_"+year]=dataYear;

                                  }

                                  dataYear = allEmpty;
                                  dataYear = {};

                            }else{
                                  lastContinentViewed = dataContinent;
                            }

                      }

                      lastjsonState = jsonState;
                      datageo.features[5].properties.efgha = dataContYearsOceania;
                      datageo.features[6].properties.efgha = dataContYearsOceania;

                  }

                  console.log(datageo)
                  minValColorContFT = d3.min(dataArray_efgha)
                  maxValColorContFT = d3.max(dataArray_efgha)

                  stackedBarChartContinent(continentsDataForYear(datageo, yearTimeline), yearTimeline);

                  svg.selectAll("path")
                    .data(datageo.features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .attr("id", function(d) {return d.properties.CONTINENT.replace(/\s/g, "_");})
                    .style("fill", function(d){
                          if(d.properties.CONTINENT == "Antarctica"){
                                return "#bfbfbf"
                          }else{
                                var yeartoshow = "_"+yearTimeline+"";
                                var value = d.properties.efgha[yeartoshow].total_efgha;
                                console.log(yeartoshow)

                                if(value){
                                  return ramp(minValColorContFT,lowColorEF, highColorEF, value);
                                } else {
                                  return "#bfbfbf"
                                }
                          }

                    })
                    .style("stroke", "#333333")
                    .style("stroke-width", "0.2px" )
                    .attr("title", function(d) {return d.properties.CONTINENT;})
                    .on("mouseover", function(d){

                        var mouse = d3.mouse(this);
                        var countryMouseOver = d.properties.CONTINENT.replace(/\s/g, "_");

                        highlightContinent("map",d.properties.CONTINENT);

                        d3.selectAll("path[title=\'"+d.properties.CONTINENT+"\']")
                          .style("fill", function(d){

                                      var yeartoshow = "_"+yearTimeline+"";
                                      var value = d.properties.efgha[yeartoshow].total_efgha;

                                      console.log(yeartoshow)

                                      if(value){
                                        return ramp(minValColorContFT,lowColorEF, highColorEF, "mouseEF")
                                      } else {
                                        return "#bfbfbf"
                                      }
                          })
                          .attr("title", function(d) {return d.properties.CONTINENT;});

                          if(lastCountryOn==countryMouseOver){
                            d3.select("#"+countryMouseOver+"mover").attr("transform","translate("+ mouse[0]+event.clientX+", "+mouse[1]+event.clientY+") ");
                            lastCountryOn = countryMouseOver;
                          }else if(lastCountryOn==null){
                            d3.select("body")
                                  .append("div")
                                  .attr("id", function(){
                                      lastCountryOn = countryMouseOver;
                                      console.log()
                                      return lastCountryOn+"mover";

                                  })
                                  .style("position", "absolute")
                                  .style("z-index", "10")
                                  .style("visibility", "visible")
                                  .style("background", "#000")
                                  .attr("x", mouse[0]+event.clientX)
                                  .attr("y", mouse[1]+event.clientY)
                                  .text(countryMouseOver);
                          }


                      })
                      .on("mouseout", function(d){

                          d3.selectAll("path[title=\'"+d.properties.CONTINENT+"\']")
                            .style("fill", function(d){
                                      var yeartoshow = "_"+yearTimeline+"";
                                      var value = d.properties.efgha[yeartoshow].total_efgha;

                                      console.log(yeartoshow)

                                        if(value){
                                          return ramp(minValColorContFT,lowColorEF, highColorEF, value)
                                        } else {
                                          return "#bfbfbf"
                                        }
                            });

                            if(lastCountryOn.indexOf(" ") != -1 || lastCountryOn.indexOf(".") != -1 || lastCountryOn.indexOf("(") != -1 || lastCountryOn.indexOf(")") != -1){
                              d3.select("#"+lastCountryOn.replace(/\s/g, "_").replace(".", "_").replace("(", "_").replace(")", "_")+"mover").remove();
                              lastCountryOn = null;

                            }else{
                              d3.select("#"+lastCountryOn+"mover").remove();
                              lastCountryOn = null;
                            }

                      });
                      // .on("mouseenter", function(d){
                      //   d3.select("path[title=\'"+d.properties.NAME+"\']").attr("fill", ramp(d.properties.totalBiocapacity+20)).text(d.properties.NAME);
                      // })
                      // .on("mouseleave", function(d){
                      //   d3.select("path[title=\'"+d.properties.NAME+"\']").attr("fill", ramp(d.properties.totalBiocapacity));
                      //
                      // });

              });

            });

            autocomplete(document.getElementById("myInput-continent"), continents_list);


      }

      function continents_EcoFootGha(){
            var svg = d3.select("#world_graph")
              .append("svg")
              .attr("id", "chart")
              .attr("width", 600)
              .attr("height", 480)
              .attr("tranform", "translate(" + 0 + "," + 0 + ")");


            d3.json("../data/ContinentsOutput.json").then(function(json){

              data = json.data;
              console.log(data)
              var dataArray_efgha = new Array();
              var lastContinentViewed = data[0].country_name;
              var dataContYearsAsia = {};
              var dataContYearsAfrica = {};
              var dataContYearsEurope = {};
              var dataContYearsNorthAmerica = {};
              var dataContYearsSouthAmerica = {};
              var dataContYearsOceania = {};

              var allEmpty = {};

              d3.json("../data/continents.json").then(function(geojson){

                  datageo = geojson;
                  var lastjsonState = datageo.features[0].properties.CONTINENT;


                  for(var n = 0; n < datageo.features.length; n++){

                      var jsonState = datageo.features[n].properties.CONTINENT;


                      for(var i = 0; i < data.length; i++){

                            var dataContinent = data[i].country_name;
                            var dataYear = {};
                            var dataRecord = data[i].Record;


                            if(dataContinent == "Central America"){
                              data[i].country_name = "North America";
                              dataContinent = data[i].country_name;
                            }


                            if(continents_list.indexOf(dataContinent) == -1){
                              continents_list.push(dataContinent);
                            }


                            if(lastContinentViewed.replace(" ", "") != dataContinent.replace(" ", "") && lastContinentViewed.replace(" ", "") == lastjsonState.replace(" ", "")){

                                  if(lastjsonState == "North America"){
                                      datageo.features[1].properties.efgha = dataContYearsNorthAmerica;
                                  }else if(lastjsonState == "South America"){
                                      datageo.features[4].properties.efgha = dataContYearsSouthAmerica;
                                  }else if(lastjsonState == "Asia"){
                                      datageo.features[0].properties.efgha = dataContYearsAsia;
                                  }else if(lastjsonState == "Europe"){
                                      datageo.features[2].properties.efgha = dataContYearsEurope;
                                  }else if(lastjsonState == "Africa"){
                                      datageo.features[3].properties.efgha = dataContYearsAfrica;
                                  }else if(lastjsonState == "Oceania"){
                                      datageo.features[5].properties.efgha = dataContYearsOceania;
                                      datageo.features[6].properties.efgha = dataContYearsOceania;
                                      datageo.features[6].properties.CONTINENT = "Oceania";
                                  }
                                    //faz push e update do continent
                                    lastContinentViewed = dataContinent;

                                    dataYear = allEmpty;
                                    dataYear = {};

                                    console.log(datageo);

                            }

                            if(dataContinent.replace(" ", "") == jsonState.replace(" ", "") && dataRecord == "EFConsTotGHA"){


                                  var year = parseFloat(data[i].year);

                                  //footprint consumo em GHA
                                  var built_up_land_efgha = parseFloat(data[i].built_up_land);
                                  var carbon_efgha = parseFloat(data[i].Carbon);
                                  var cropland_efgha = parseFloat(data[i].Cropland);
                                  var fishing_grounds_efgha = parseFloat(data[i].fishing_grounds);
                                  var forest_products_efgha = parseFloat(data[i].forest_products);
                                  var grazing_land_efgha = parseFloat(data[i].grazing_land);
                                  var total_efgha = parseFloat(data[i].Total);
                                  var continent_name = data[i].country_name;

                                  dataArray_efgha.push(total_efgha);

                                  dataYear["year"] = year;
                                  dataYear["continent_name"] = continent_name;
                                  dataYear["total_efgha"] = total_efgha;
                                  dataYear["grazing_land_efgha"] = grazing_land_efgha;
                                  dataYear["forest_products_efgha"] = forest_products_efgha;
                                  dataYear["fishing_grounds_efgha"] = fishing_grounds_efgha;
                                  dataYear["cropland_efgha"] = cropland_efgha;
                                  dataYear["carbon_efgha"] = carbon_efgha;
                                  dataYear["built_up_land_efgha"] = built_up_land_efgha;


                                  if(continent_name == "Asia"){
                                    dataContYearsAsia["_"+year]=dataYear;

                                  }else if(continent_name == "Europe"){
                                    dataContYearsEurope["_"+year]=dataYear;

                                  }else if(continent_name == "Africa"){
                                    dataContYearsAfrica["_"+year]=dataYear;

                                  }else if(continent_name == "North America"){
                                    dataContYearsNorthAmerica["_"+year]=dataYear;

                                  }else if(continent_name == "South America"){
                                    dataContYearsSouthAmerica["_"+year]=dataYear;

                                  }else if(continent_name == "Oceania"){
                                    dataContYearsOceania["_"+year]=dataYear;

                                  }

                                  dataYear = allEmpty;
                                  dataYear = {};

                            }else{
                                  lastContinentViewed = dataContinent;
                            }

                      }

                      lastjsonState = jsonState;
                      datageo.features[5].properties.efgha = dataContYearsOceania;
                      datageo.features[6].properties.efgha = dataContYearsOceania;

                  }

                  console.log(datageo)
                  minValColorContFT = d3.min(dataArray_efgha)
                  maxValColorContFT = d3.max(dataArray_efgha)


                  stackedBarChartContinent(continentsDataForYear(datageo, yearTimeline), yearTimeline);

                  svg.selectAll("path")
                    .data(datageo.features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .attr("id", function(d) {return d.properties.CONTINENT.replace(/\s/g, "_");})
                    .style("fill", function(d){
                          if(d.properties.CONTINENT == "Antarctica"){
                                return "#bfbfbf"
                          }else{
                                var yeartoshow = "_"+yearTimeline+"";
                                var value = d.properties.efgha[yeartoshow].total_efgha;
                                console.log(yeartoshow)

                                if(value){
                                  return ramp(minValColorContFT,lowColorEF, highColorEF, value);
                                } else {
                                  return "#bfbfbf"
                                }
                          }

                    })
                    .style("stroke", "#333333")
                    .style("stroke-width", "0.2px" )
                    .attr("title", function(d) {return d.properties.CONTINENT;})
                    .on("mouseover", function(d){

                        var mouse = d3.mouse(this);
                        console.log(d.properties.CONTINENT)
                        var countryMouseOver = d.properties.CONTINENT.replace(/\s/g, "_");

                        highlightContinent("map",d.properties.CONTINENT);

                        d3.selectAll("path[title=\'"+d.properties.CONTINENT+"\']")
                          .style("fill", function(d){

                                      var yeartoshow = "_"+yearTimeline+"";
                                      var value = d.properties.efgha[yeartoshow].total_efgha;

                                      console.log(yeartoshow)

                                      if(value){
                                        return ramp(minValColorContFT,lowColorEF, highColorEF, "mouseEF")
                                      } else {
                                        return "#bfbfbf"
                                      }
                          })
                          .attr("title", function(d) {return d.properties.CONTINENT;});

                          if(lastCountryOn==countryMouseOver){
                            d3.select("#"+countryMouseOver+"mover").attr("transform","translate("+ mouse[0]+event.clientX+", "+mouse[1]+event.clientY+") ");
                            lastCountryOn = countryMouseOver;
                          }else if(lastCountryOn==null){
                            d3.select("body")
                                  .append("div")
                                  .attr("id", function(){
                                      lastCountryOn = countryMouseOver;
                                      console.log()
                                      return lastCountryOn+"mover";

                                  })
                                  .style("position", "absolute")
                                  .style("z-index", "10")
                                  .style("visibility", "visible")
                                  .style("background", "#000")
                                  .attr("x", mouse[0]+event.clientX)
                                  .attr("y", mouse[1]+event.clientY)
                                  .text(countryMouseOver);
                          }


                      })
                    .on("mouseout", function(d){

                          unhighlightContinent("map", d.properties.CONTINENT);

                          d3.selectAll("path[title=\'"+d.properties.CONTINENT+"\']")
                            .style("fill", function(d){
                                      var yeartoshow = "_"+yearTimeline+"";
                                      var value = d.properties.efgha[yeartoshow].total_efgha;

                                      console.log(yeartoshow)

                                        if(value){
                                          return ramp(minValColorContFT,lowColorEF, highColorEF, value)
                                        } else {
                                          return "#bfbfbf"
                                        }
                            });

                            if(lastCountryOn.indexOf(" ") != -1 || lastCountryOn.indexOf(".") != -1 || lastCountryOn.indexOf("(") != -1 || lastCountryOn.indexOf(")") != -1){
                              d3.select("#"+lastCountryOn.replace(/\s/g, "_").replace(".", "_").replace("(", "_").replace(")", "_")+"mover").remove();
                              lastCountryOn = null;

                            }else{
                              d3.select("#"+lastCountryOn+"mover").remove();
                              lastCountryOn = null;
                            }

                      })
                    .on("click", function(d){

                          //stackedAreaChartContinent(d.properties);

                    });

              });

            });

            autocomplete(document.getElementById("myInput-continent"), continents_list);


      }

      function continents_BiocapacityGha(){
            var svg = d3.select("#world_graph")
              .append("svg")
              .attr("id", "chart")
              .attr("width", 600)
              .attr("height", 480)
              .attr("tranform", "translate(" + 0 + "," + 0 + ")");


            d3.json("../data/ContinentsOutput.json").then(function(json){

              data = json.data;

              var dataArray_biogha = new Array();
              var lastContinentViewed = data[0].country_name;
              var dataContYearsAsia = {};
              var dataContYearsAfrica = {};
              var dataContYearsEurope = {};
              var dataContYearsNorthAmerica = {};
              var dataContYearsSouthAmerica = {};
              var dataContYearsOceania = {};

              var allEmpty = {};


              d3.json("../data/continents.json").then(function(geojson){

                  datageo = geojson;
                  var lastjsonState = datageo.features[0].properties.CONTINENT;


                  for(var n = 0; n < datageo.features.length; n++){

                      var jsonState = datageo.features[n].properties.CONTINENT;


                      console.log("E ESTA DATA")
                      console.log(data)

                      for(var i = 0; i < data.length; i++){

                            var dataContinent = data[i].country_name;
                            var dataYear = {};
                            var dataRecord = data[i].Record;

                            if(dataContinent == "Central America"){
                              data[i].country_name = "North America";
                              dataContinent = data[i].country_name;
                            }


                            if(continents_list.indexOf(dataContinent) == -1){
                              continents_list.push(dataContinent);
                            }


                            if(lastContinentViewed.replace(" ", "") != dataContinent.replace(" ", "") && lastContinentViewed.replace(" ", "") == lastjsonState.replace(" ", "")){

                                  if(lastjsonState == "North America"){
                                      datageo.features[1].properties.biogha = dataContYearsNorthAmerica;
                                  }else if(lastjsonState == "South America"){
                                      datageo.features[4].properties.biogha = dataContYearsSouthAmerica;
                                  }else if(lastjsonState == "Asia"){
                                      datageo.features[0].properties.biogha = dataContYearsAsia;
                                  }else if(lastjsonState == "Europe"){
                                      datageo.features[2].properties.biogha = dataContYearsEurope;
                                  }else if(lastjsonState == "Africa"){
                                    console.log(dataContYearsAfrica)
                                      datageo.features[3].properties.biogha = dataContYearsAfrica;
                                  }else if(lastjsonState == "Oceania"){
                                      datageo.features[5].properties.biogha = dataContYearsOceania;
                                      datageo.features[6].properties.biogha = dataContYearsOceania;
                                      datageo.features[6].properties.CONTINENT = "Oceania";
                                  }
                                    //faz push e update do continent
                                    lastContinentViewed = dataContinent;

                                    dataYear = allEmpty;
                                    dataYear = {};

                                    console.log(datageo);

                            }

                            if(dataContinent.replace(" ", "") == jsonState.replace(" ", "") && dataRecord == "BiocapTotGHA"){

                                  var year = parseFloat(data[i].year);

                                  //biocapacidade em GHA
                                  var built_up_land_biogha = parseFloat(data[i].built_up_land);
                                  var carbon_biogha = parseFloat(data[i].Carbon);
                                  var cropland_biogha = parseFloat(data[i].Cropland);
                                  var fishing_grounds_biogha = parseFloat(data[i].fishing_grounds);
                                  var forest_products_biogha = parseFloat(data[i].forest_products);
                                  var grazing_land_biogha = parseFloat(data[i].grazing_land);
                                  var total_biogha = parseFloat(data[i].Total);
                                  var continent_name = data[i].country_name;

                                  dataArray_biogha.push(total_biogha);

                                  dataYear["year"] = year;
                                  dataYear["continent_name"] = continent_name;
                                  dataYear["total_biogha"] = total_biogha;
                                  dataYear["grazing_land_biogha"] = grazing_land_biogha;
                                  dataYear["forest_products_biogha"] = forest_products_biogha;
                                  dataYear["fishing_grounds_biogha"] = fishing_grounds_biogha;
                                  dataYear["cropland_biogha"] = cropland_biogha;
                                  dataYear["carbon_biogha"] = carbon_biogha;
                                  dataYear["built_up_land_biogha"] = built_up_land_biogha;


                                  if(continent_name == "Asia"){
                                    dataContYearsAsia["_"+year]=dataYear;

                                  }else if(continent_name == "Europe"){
                                    dataContYearsEurope["_"+year]=dataYear;

                                  }else if(continent_name == "Africa"){
                                    dataContYearsAfrica["_"+year]=dataYear;

                                  }else if(continent_name == "North America"){
                                    dataContYearsNorthAmerica["_"+year]=dataYear;

                                  }else if(continent_name == "South America"){
                                    dataContYearsSouthAmerica["_"+year]=dataYear;

                                  }else if(continent_name == "Oceania"){
                                    dataContYearsOceania["_"+year]=dataYear;

                                  }

                                  dataYear = allEmpty;
                                  dataYear = {};

                            }else{
                                  lastContinentViewed = dataContinent;
                            }

                      }

                      lastjsonState = jsonState;
                      datageo.features[5].properties.biogha = dataContYearsOceania;
                      datageo.features[6].properties.biogha = dataContYearsOceania;

                  }

                  console.log(datageo)

                  minValColorContB = d3.min(dataArray_biogha)
                  maxValColorContB = d3.max(dataArray_biogha)

                  svg.selectAll("path")
                    .data(datageo.features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .attr("id", function(d) {
                          console.log(d)
                          return d.properties.CONTINENT.replace(/\s/g, "_");

                    })
                    .style("fill", function(d){
                          if(d.properties.CONTINENT == "Antarctica"){
                                return "#bfbfbf"
                          }else{
                            console.log(d)
                                var yeartoshow = "_"+yearTimeline+"";
                                var value = d.properties.biogha[yeartoshow].total_biogha;

                                console.log(value);

                                if(value){
                                  return ramp(minValColorContB,lowColorB, highColorB, value);
                                } else {
                                  return "#bfbfbf"
                                }
                          }

                    })
                    .style("stroke", "#333333")
                    .style("stroke-width", "0.2px" )
                    .attr("title", function(d) {return d.properties.CONTINENT;})
                    .on("mouseover", function(d){

                        var mouse = d3.mouse(this);
                        console.log(d.properties.CONTINENT)
                        var countryMouseOver = d.properties.CONTINENT.replace(/\s/g, "_");

                        d3.selectAll("path[title=\'"+d.properties.CONTINENT+"\']")
                          .style("fill", function(d){

                                      var yeartoshow = "_"+yearTimeline+"";
                                      var value = d.properties.biogha[yeartoshow].total_biogha;

                                      if(value){
                                        return ramp(minValColorContB,lowColorB, highColorB, "mouseB")
                                      } else {
                                        return "#bfbfbf"
                                      }
                          })
                          .attr("title", function(d) {return d.properties.CONTINENT;});

                          if(lastCountryOn==countryMouseOver){
                            d3.select("#"+countryMouseOver+"mover").attr("transform","translate("+ mouse[0]+event.clientX+", "+mouse[1]+event.clientY+") ");
                            lastCountryOn = countryMouseOver;
                          }else if(lastCountryOn==null){
                            d3.select("body")
                                  .append("div")
                                  .attr("id", function(){
                                      lastCountryOn = countryMouseOver;
                                      console.log()
                                      return lastCountryOn+"mover";

                                  })
                                  .style("position", "absolute")
                                  .style("z-index", "10")
                                  .style("visibility", "visible")
                                  .style("background", "#000")
                                  .attr("x", mouse[0]+event.clientX)
                                  .attr("y", mouse[1]+event.clientY)
                                  .text(countryMouseOver);
                          }


                      })
                      .on("mouseout", function(d){
                          d3.selectAll("path[title=\'"+d.properties.CONTINENT+"\']")
                            .style("fill", function(d){
                                      var yeartoshow = "_"+yearTimeline+"";
                                      var value = d.properties.biogha[yeartoshow].total_biogha;

                                        if(value){
                                          return ramp(minValColorContB,lowColorB, highColorB, value)
                                        } else {
                                          return "#bfbfbf"
                                        }
                            });

                            if(lastCountryOn.indexOf(" ") != -1 || lastCountryOn.indexOf(".") != -1 || lastCountryOn.indexOf("(") != -1 || lastCountryOn.indexOf(")") != -1){
                              d3.select("#"+lastCountryOn.replace(/\s/g, "_").replace(".", "_").replace("(", "_").replace(")", "_")+"mover").remove();
                              lastCountryOn = null;

                            }else{
                              d3.select("#"+lastCountryOn+"mover").remove();
                              lastCountryOn = null;
                            }

                      });
                      // .on("mouseenter", function(d){
                      //   d3.select("path[title=\'"+d.properties.NAME+"\']").attr("fill", ramp(d.properties.totalBiocapacity+20)).text(d.properties.NAME);
                      // })
                      // .on("mouseleave", function(d){
                      //   d3.select("path[title=\'"+d.properties.NAME+"\']").attr("fill", ramp(d.properties.totalBiocapacity));
                      //
                      // });

              });

            });

            autocomplete(document.getElementById("myInput-continent"), continents_list);


      }


      //////////CONTINENTES SMALL CHARTS///////////

      function stackedAreaChartContinent(data){
            console.log(data)

            var campos = new Array();
            var valores = new Array();
            var anos = new Array()

            var efghaCont = data.efgha;

            for( year in efghaCont){

                  theYear = efghaCont[year];

                  for(valor in theYear){

                    if(valor=="continent_name" ){

                    }else if(valor == "year"){
                      anos.push(theYear[valor]);

                    }else{
                      campos.push(valor)
                      valores.push(theYear[valor])
                    }

                  }
            }
            console.log(anos);
            console.log(campos);
            console.log(valores)


            function get_colors(n) {
                    var colors = ["#a6cee3","#1f78b4","#b2df8a","#33a02c",
                    "#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6",
                    "#6a3d9a"];

                     return colors[ n % colors.length];
            }

            var margin = {top: 61, right: 140, bottom: 101, left: 50},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            // var  times = ["12am","1a", "2a", "3a", "4a", "5a", "6a",
            //            "7a", "8a", "9a", "10a", "11a", "12pm", "1p",
            //            "2p", "3p", "4p", "5p", "6p", "7p", "8p",
            //            "9p", "10p", "11p"];

            var x = d3.scale.linear()
                .range([0, width]);

            var y = d3.scale.linear()
                .range([height, 0]);

            var color = d3.scale.category10();

            var xAxis = d3.axisBottom()
                .scale(x)
                .orient("bottom")
            		.ticks(53, "s");

            var yAxis = d3.axisLeft()
                .scale(y)
                .orient("left")
                .ticks(7, "s");

            var area = d3.area()
                .x(function(d) { return x(d.hour); })
                .y0(function(d) { return y(d.y0); })
                .y1(function(d) { return y(d.y0 + d.y); });


            var stack = d3.layout.stack()
                .values(function(d) { return d.values; });

            var svg = d3.select("#graphs").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



                 color.domain(d3.keys(campos).filter(function(key) {return key !== "year"; }));

                 // data.forEach(function(d) {
              		// d.hour = +d.hour;
                 //  d.burglary = +d.burglary;
                 //  d.assault= +d.assault;
                 //  d.larceny_theft= +d.larceny_theft;
                 //  d.vehicle_related = +d.vehicle_related;
                 //  d.missing_person = +d.missing_person;
                 //  d.non_criminal = +d.non_criminal;
                 //  d.other_offenses = +d.other_offenses;
                 //  d.suspicious_occ = +d.suspicious_occ;
                 //  d.warrants = +d.warrants;
                 //   });



              var browsers = stack(color.domain().map(function(name) {
                return {
                  name: data.efgha.year,
                  values: data.efgha.map(function(d) {
                    return {year: d.hour, y: d[name] * 1};
                  })
                };
              }));


            //   // Find the value of the hour with highest total value
              var maxHourVal = d3.max(data, function(d){
                var vals = d3.keys(d).map(
                  function(key){
                    return key !== "hour" ? d[key] : 0 });
                return d3.sum(vals);
              });

            //   // Set domains for axes
              x.domain(d3.extent(data, function(d) { return d.hour; }));
              y.domain([0, 800])

              var browser = svg.selectAll(".browser")
                  .data(browsers)
                	.enter().append("g")
                  .attr("class", "browser");

              browser.append("path")
                  .attr("class", "area")
                  .attr("d", function(d) { return area(d.values); })
                  .style("fill", function(d,i) {
                		return get_colors(i); });


                  browser.append("text")
                  .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
                  .attr("transform", function(d) { return "translate(" + x(d.value.hour) + "," + y(d.value.y0 + d.value.y / 2) + ")"; })
                  .attr("x", -6)
                  .attr("dy", "-0.882em")
                  .text(function(d) {
                			if(d.name == "larceny_theft"){
                        return "larceny/theft";
                      }
                 			if(d.name == "non_criminal"){
                        return "non-criminal";
                      }
                   		if(d.name == "assault"){
                        return d.name;
                      }})
                  .style("font", "15px avenir")
              		.attr("transform", function(d) { return "translate(500," + y(d.value.y0 + d.value.y / 2) + ")"; })

               svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis).append("text")
               		.attr("x", 350)
                  .attr("y", 36)
                  .attr("fill", "#000")
                  .text("Hour of Time")
                	.style("font-weight", "bold");

              svg.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)
                  .append("text")
                  .attr("transform", "rotate(-90)")
              		.attr("x", -250)
                  .attr("y", -40)
                  .attr("dy", "0.3408em")
                  .attr("fill", "#000")
                  .text("Number of Incidents")
               		.style("font-weight", "bold");

               var legend = svg.selectAll(".legend")
                 	.data(color.domain()).enter()
               		.append("g")
                	.attr("class","legend")
                 .attr("transform", "translate(" + (width +20) + "," + 0+ ")");

               legend.append("rect")
                 .attr("x", 0)
                 .attr("y", function(d, i) { return 20 * i; })
                 .attr("width", 10)
                 .attr("height", 10)
                 .style("fill", function(d, i) {
                 	return get_colors(i);});

                legend.append("text")
                 .attr("x", 20)
                 .attr("dy", "0.75em")
                 .attr("y", function(d, i) { return 20 * i; })
                 .text(function(d) {return d});

                legend.append("text")
                 .attr("x",0)
            //      .attr("dy", "0.75em")
                 .attr("y",-10)
                 .text("Categories");


      }


      function stackedBarChartContinent(data, year){

            var dataToShow = data.slice(0,6);
            // Setup svg using Bostock's margin convention

            var margin = {top: 20, right: 160, bottom: 35, left: 80};

            var width = 400;
            var height = 250;

            var svg = d3.select("#graphs")
              .append("svg")
              .attr("id", "stackBarChartCont")
              .attr("width", width+ margin.left + margin.right) // + margin.left + margin.right
              .attr("height", height+ margin.top + margin.bottom) // + margin.top + margin.bottom
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");   //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");




          /* Data in strings like it would be if imported from a csv */
          var parse = d3.time.format("%Y").parse;

          // Transpose the data into layers
          var dataset = d3.layout.stack()(["Built Up Land", "Carbon", "Cropland", "Fishing Ground", "Forest Land", "Grazing Land"].map(function(landtype) {
            return dataToShow.map(function(d) {
              return {x: d.Continent, y: +d[landtype]};
            });
          }));

          // Set x, y and colors
          var x = d3.scale.ordinal()
            .domain(dataset[0].map(function(d) { return d.x; }))
            .rangeRoundBands([10, width-10], 0.02);

          var y = d3.scale.linear()
            .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
            .range([height, 0]);

          var colors = ["#9C8443", "#686736", "#CDBE90", "#8C9A86", "#C1A95E", "#845E36"];

        // Define and draw axes
        var yAxis = d3.axisLeft()
                      .scale(y)
                      .ticks(6)
                      .tickSize(-width, 0, 0)
                      .tickFormat( function(d) { return d/1000000000+ ".000 M" } );

        var xAxis = d3.axisBottom()
                      .scale(x);

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);


      // Create groups for each series, rects for each segment
      var groups = svg.selectAll("g.cost")
        .data(dataset)
        .enter().append("g")
        .attr("class", "cost")
        .style("fill", function(d, i) { return colors[i]; });

      var rect = groups.selectAll("rect")
        .data(function(d) { return d; })
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
        .attr("width", x.rangeBand())
        .attr("id", function(d) { console.log(d.x); return d.x; })
        .on("mouseover", function() { tooltip.style("display", null); })
        .on("mouseout", function() { tooltip.style("display", "none"); })
        .on("mousemove", function(d) {
          var xPosition = d3.mouse(this)[0] - 15;
          var yPosition = d3.mouse(this)[1] - 25;
          tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
          tooltip.select("text").text(d.y);
        });


      // Draw legend
      // var legend = svg.selectAll(".legend")
      //   .data(colors)
      //   .enter().append("g")
      //   .attr("class", "legend")
      //   .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });

      // legend.append("rect")
      //   .attr("x", width - 18)
      //   .attr("width", 18)
      //   .attr("height", 18)
      //   .style("fill", function(d, i) {return colors.slice().reverse()[i];});

      // legend.append("text")
      //   .attr("x", width + 5)
      //   .attr("y", 9)
      //   .attr("dy", ".35em")
      //   .style("text-anchor", "start")
      //   .text(function(d, i) {
      //     switch (i) {
      //       case 0: return "Anjou pears";
      //       case 1: return "Naval oranges";
      //       case 2: return "McIntosh apples";
      //       case 3: return "Red Delicious apples";
      //     }
      //   });

        //var dataset = d3.layout.stack()(["Built Up Land", "Carbon", "Cropland", "Fishing Ground", "Forest Land", "Grazing Land"].map(function(landtype) {



        // Prep the tooltip bits, initial display is hidden
        var tooltip = svg.append("g")
          .attr("class", "tooltip")
          .style("display", "none");

        tooltip.append("rect")
          .attr("width", 30)
          .attr("height", 20)
          .attr("fill", "white")
          .style("opacity", 0.5);

        tooltip.append("text")
          .attr("x", 15)
          .attr("dy", "1.2em")
          .style("text-anchor", "middle")
          .attr("font-size", "12px")
          .attr("font-weight", "bold");


      }




      //////////CONTINENTES SMALL FUNCTIONS///////////

      function continentsDataForYear(datageo, year){

            var dataToShow = new Array();

            var conts = datageo.features;

            console.log(conts)

            for(cont in conts){

                if(conts[cont].properties.CONTINENT == "Antarctica"){


                }else{
                  var rightOne = conts[cont].properties.efgha["_"+year];

                  var valores = {};

                  theYear = rightOne;

                  for(valor in theYear){

                    if(valor=="built_up_land_efgha"){
                      valores["Built Up Land"] = theYear[valor];
                    }else if(valor == "carbon_efgha"){
                      valores["Carbon"] = theYear[valor];
                    }else if(valor == "continent_name"){
                      valores["Continent"] = theYear[valor];
                    }else if(valor == "cropland_efgha"){
                      valores["Cropland"] = theYear[valor];
                    }else if(valor == "fishing_grounds_efgha"){
                      valores["Fishing Ground"] = theYear[valor];
                    }else if(valor == "forest_products_efgha"){
                      valores["Forest Land"] = theYear[valor];
                    }else if(valor == "grazing_land_efgha"){
                      valores["Grazing Land"] = theYear[valor];
                    }

                  }

                  dataToShow.push(valores);

                }


            }
            return dataToShow;

      }

      function highlightContinent(where, continent){

        var svg = d3.select("#continents_view #graphs").select("svg");

        //Container for the gradients
        var defs = svg.append("defs");

        //Filter for the outside glow
        var filter = defs.append("filter")
            .attr("id","glow");
        filter.append("feGaussianBlur")
            .attr("stdDeviation","3.5")
            .attr("result","coloredBlur");
        var feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
            .attr("in","coloredBlur");
        feMerge.append("feMergeNode")
            .attr("in","SourceGraphic");




          if(where == "map"){
                //highlight do resto

                d3.selectAll("rect[id=\'"+continent+"\']")
                .style("stroke", "#FFFFFF")
                .style("stroke-width", "1px")
                .style("filter", "url(#glow)");
          }

      }

      function unhighlightContinent(where, continent){
            if(where == "map"){
                  //highlight do resto

                  d3.selectAll("rect[id=\'"+continent+"\']")
                  .style("stroke", "#333333")
                  .style("stroke-width", "0px")
                  .style("filter", "");
            }

      }



      ////////////////////COUNTRIES FUNCTIONS//////////////////

      //////////COUNTRIES MAP///////////

      function countries_EcoFoot(){
        var svg = d3.select("#countries_graph")
          .append("svg")
          .attr("id", "chart")
          .attr("width", w)
          .attr("height", h)
          .attr("tranform", "translate(" + 0 + "," + 0 + ")");


        d3.json("../data/CountryOutput.json").then(function(json){

          data = json.data;
          console.log(data)
          var dataArray = new Array();

          d3.json("../data/GeoJson.json").then(function(geojson){

              datageo = geojson;

              for(var i = 0; i < data.length; i++){

                  var dataCountry = data[i].country_region;
                  if(countries_list.indexOf(dataCountry) == -1){
                    countries_list.push(dataCountry);
                  }

                  for(var n = 0; n < datageo.features.length; n++){

                      var jsonState = datageo.features[n].properties.NAME;
                      var jsonState1 = datageo.features[n].properties.FORMAL_EN;
                      var jsonState2 = datageo.features[n].properties.NAME_LONG;

                      if(dataCountry == jsonState || dataCountry == jsonState1 || dataCountry == jsonState2){

                        var totalBiocapacity = parseFloat(data[i].total_biocapacity);
                        var totalEcoFootProd = parseFloat(data[i].total_ecological_footprint_production);
                        var totalEcoFootCons = parseFloat(data[i].total_ecological_footprint_consumption);
                        var continent = data[i].region;
                        var population = parseFloat(data[i].population_millions);
                        var gdp = parseFloat(data[i].per_capita_gdp);
                        var earths = parseFloat(data[i].number_of_earths_required);
                        var countriesnumb = parseFloat(data[i].number_of_countries_required);
                        var hdi = parseFloat(data[i].hdi);
                        var deficereserve = parseFloat(data[i].ecological_deficit_or_reserve);

                        var built_up_land_prod = parseFloat(data[i].built_up_land);
                        var built_up_land_cons = parseFloat(data[i].built_up_land_2);
                        var built_up_land_bio = parseFloat(data[i].built_up_land_3);

                        var carbon_footprint_prod = parseFloat(data[i].carbon_footprint);
                        var carbon_footprint_cons = parseFloat(data[i].carbon_footprint_2);

                        var cropland_prod = parseFloat(data[i].cropland_footprint);
                        var cropland_cons = parseFloat(data[i].cropland_footprint_2);
                        var cropland_bio = parseFloat(data[i].cropland);

                        var fish_footprint_prod = parseFloat(data[i].fish_footprint);
                        var fish_footprint_cons = parseFloat(data[i].fish_footprint_2);
                        var fish_footprint_bio = parseFloat(data[i].fishing_ground);

                        var forest_product_footprint_prod = parseFloat(data[i].forest_product_footprint);
                        var forest_product_footprint_cons = parseFloat(data[i].forest_product_footprint_2);
                        var forest_product_footprint_bio = parseFloat(data[i].forest_land);

                        var grazing_footprint_prod = parseFloat(data[i].grazing_footprint);
                        var grazing_footprint_cons = parseFloat(data[i].grazing_footprint_2);
                        var grazing_footprint_bio = parseFloat(data[i].grazing_land);



                        dataArray.push(totalEcoFootCons);

                        datageo.features[n].properties.totalBiocapacity = totalBiocapacity;
                        datageo.features[n].properties.totalEcoFootProd = totalEcoFootProd;
                        datageo.features[n].properties.totalEcoFootCons = totalEcoFootCons;
                        datageo.features[n].properties.continent = continent;
                        datageo.features[n].properties.population = population;
                        datageo.features[n].properties.gdp = gdp;
                        datageo.features[n].properties.earths = earths;
                        datageo.features[n].properties.countriesnumb = countriesnumb;
                        datageo.features[n].properties.hdi = hdi;
                        datageo.features[n].properties.deficereserve = deficereserve;
                        datageo.features[n].properties.built_up_land_prod = built_up_land_prod;
                        datageo.features[n].properties.built_up_land_cons = built_up_land_cons;
                        datageo.features[n].properties.built_up_land_bio = built_up_land_bio;
                        datageo.features[n].properties.carbon_footprint_prod = carbon_footprint_prod;
                        datageo.features[n].properties.carbon_footprint_cons = carbon_footprint_cons;
                        datageo.features[n].properties.cropland_prod = cropland_prod;
                        datageo.features[n].properties.cropland_cons = cropland_cons;
                        datageo.features[n].properties.cropland_bio = cropland_bio;
                        datageo.features[n].properties.fish_footprint_prod = fish_footprint_prod;
                        datageo.features[n].properties.fish_footprint_cons = fish_footprint_cons;
                        datageo.features[n].properties.fish_footprint_bio = fish_footprint_bio;
                        datageo.features[n].properties.forest_product_footprint_prod = forest_product_footprint_prod;
                        datageo.features[n].properties.forest_product_footprint_cons = forest_product_footprint_cons;
                        datageo.features[n].properties.forest_product_footprint_bio = forest_product_footprint_bio;
                        datageo.features[n].properties.grazing_footprint_prod = grazing_footprint_prod;
                        datageo.features[n].properties.grazing_footprint_cons = grazing_footprint_cons;
                        datageo.features[n].properties.grazing_footprint_bio = grazing_footprint_bio;

                        console.log(datageo)
                        break;


                      }else{
                      }
                  }
              }


              minValColorCouFT = d3.min(dataArray)
              maxValColorCouFT = d3.max(dataArray)


              svg.selectAll("path")
                .data(datageo.features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("id", function(d) {return d.properties.NAME.replace(/\s/g, "_").replace(".", "_").replace("(", "").replace(")", "");})
                .style("fill", function(d){
                  var value = d.properties.totalEcoFootCons;

                      if(value){
                        return ramp(minValColorCouFT,lowColorEF, highColorEF, value)
;
                      } else {
                        return "#bfbfbf"
                      }
                })
                .style("stroke", "#333333")
                .style("stroke-width", "0.2px" )
                .attr("title", function(d) {return d.properties.NAME;})
                .on("mouseover", function(d){

                    var mouse = d3.mouse(this);
                    var countryMouseOver = d.properties.NAME.replace(/\s/g, "_").replace(".", "_").replace("(", "").replace(")", "");

                    d3.select("path[title=\'"+d.properties.NAME+"\']")
                      .style("fill", function(d){
                                  var value = d.properties.totalEcoFootCons;

                                  if(value){
                                    return ramp(minValColorCouFT,lowColorEF, highColorEF, "mouseEF")
                                  } else {
                                    return "#bfbfbf"
                                  }
                      })
                      .attr("title", function(d) {return d.properties.NAME;});

                      if(lastCountryOn==countryMouseOver){
                        d3.select("#"+countryMouseOver+"mover").attr("transform","translate("+ mouse[0]+event.clientX+", "+mouse[1]+event.clientY+") ");
                        lastCountryOn = countryMouseOver;
                      }else if(lastCountryOn==null){
                        d3.select("body")
                              .append("div")
                              .attr("id", function(){
                                  lastCountryOn = countryMouseOver;
                                  console.log()
                                  return lastCountryOn+"mover";

                              })
                              .style("position", "absolute")
                              .style("z-index", "10")
                              .style("visibility", "visible")
                              .style("background", "#000")
                              .attr("x", mouse[0]+event.clientX)
                              .attr("y", mouse[1]+event.clientY)
                              .text(countryMouseOver);
                      }


                  })
                .on("mouseout", function(d){
                      d3.select("path[title=\'"+d.properties.NAME+"\']")
                        .style("fill", function(d){
                                var value = d.properties.totalEcoFootCons;

                                    if(value){
                                      return ramp(minValColorCouFT,lowColorEF, highColorEF, value)
                                    } else {
                                      return "#bfbfbf"
                                    }
                        });

                        if(lastCountryOn.indexOf(" ") != -1 || lastCountryOn.indexOf(".") != -1 || lastCountryOn.indexOf("(") != -1 || lastCountryOn.indexOf(")") != -1){
                          d3.select("#"+lastCountryOn.replace(/\s/g, "_").replace(".", "_").replace("(", "_").replace(")", "_")+"mover").remove();
                          lastCountryOn = null;

                        }else{
                          d3.select("#"+lastCountryOn+"mover").remove();
                          lastCountryOn = null;
                        }

                  })
                .on("click", function(d){
                    singlecountry_floatingBar(d.properties.NAME);
                });

          });

        });

        autocomplete(document.getElementById("myInput"), countries_list);

      }

      function countries_Biocapacity(){
              var svg = d3.select("#countries_graph")
                .append("svg")
                .attr("id", "chart")
                .attr("width", w)
                .attr("height", h);

              d3.json("../data/CountryOutput.json").then(function(json){

                data = json.data;
                console.log(data)
                var dataArray = new Array();

                d3.json("../data/GeoJson.json").then(function(geojson){

                    datageo = geojson;

                    for(var i = 0; i < data.length; i++){

                        var dataCountry = data[i].country_region;
                        if(countries_list.indexOf(dataCountry) == -1){
                          countries_list.push(dataCountry);
                        }

                        autocomplete(document.getElementById("myInput"), countries_list);

                        for(var n = 0; n < datageo.features.length; n++){

                            var jsonState = datageo.features[n].properties.NAME;
                            var jsonState1 = datageo.features[n].properties.FORMAL_EN;
                            var jsonState2 = datageo.features[n].properties.NAME_LONG;

                            if(dataCountry == jsonState || dataCountry == jsonState1 || dataCountry == jsonState2){

                              var totalBiocapacity = parseFloat(data[i].total_biocapacity);
                              var totalEcoFootProd = parseFloat(data[i].total_ecological_footprint_production);
                              var totalEcoFootCons = parseFloat(data[i].total_ecological_footprint_consumption);
                              var continent = data[i].region;
                              var population = parseFloat(data[i].population_millions);
                              var gdp = parseFloat(data[i].per_capita_gdp);
                              var earths = parseFloat(data[i].number_of_earths_required);
                              var countriesnumb = parseFloat(data[i].number_of_countries_required);
                              var hdi = parseFloat(data[i].hdi);
                              var deficereserve = parseFloat(data[i].ecological_deficit_or_reserve);

                              var built_up_land_prod = parseFloat(data[i].built_up_land);
                              var built_up_land_cons = parseFloat(data[i].built_up_land_2);
                              var built_up_land_bio = parseFloat(data[i].built_up_land_3);

                              var carbon_footprint_prod = parseFloat(data[i].carbon_footprint);
                              var carbon_footprint_cons = parseFloat(data[i].carbon_footprint_2);

                              var cropland_prod = parseFloat(data[i].cropland_footprint);
                              var cropland_cons = parseFloat(data[i].cropland_footprint_2);
                              var cropland_bio = parseFloat(data[i].cropland);

                              var fish_footprint_prod = parseFloat(data[i].fish_footprint);
                              var fish_footprint_cons = parseFloat(data[i].fish_footprint_2);
                              var fish_footprint_bio = parseFloat(data[i].fishing_ground);

                              var forest_product_footprint_prod = parseFloat(data[i].forest_product_footprint);
                              var forest_product_footprint_cons = parseFloat(data[i].forest_product_footprint_2);
                              var forest_product_footprint_bio = parseFloat(data[i].forest_land);

                              var grazing_footprint_prod = parseFloat(data[i].grazing_footprint);
                              var grazing_footprint_cons = parseFloat(data[i].grazing_footprint_2);
                              var grazing_footprint_bio = parseFloat(data[i].grazing_land);


                              dataArray.push(totalBiocapacity);

                              datageo.features[n].properties.totalBiocapacity = totalBiocapacity;
                              datageo.features[n].properties.totalEcoFootProd = totalEcoFootProd;
                              datageo.features[n].properties.totalEcoFootCons = totalEcoFootCons;
                              datageo.features[n].properties.continent = continent;
                              datageo.features[n].properties.population = population;
                              datageo.features[n].properties.gdp = gdp;
                              datageo.features[n].properties.earths = earths;
                              datageo.features[n].properties.countriesnumb = countriesnumb;
                              datageo.features[n].properties.hdi = hdi;
                              datageo.features[n].properties.deficereserve = deficereserve;
                              datageo.features[n].properties.built_up_land_prod = built_up_land_prod;
                              datageo.features[n].properties.built_up_land_cons = built_up_land_cons;
                              datageo.features[n].properties.built_up_land_bio = built_up_land_bio;
                              datageo.features[n].properties.carbon_footprint_prod = carbon_footprint_prod;
                              datageo.features[n].properties.carbon_footprint_cons = carbon_footprint_cons;
                              datageo.features[n].properties.cropland_prod = cropland_prod;
                              datageo.features[n].properties.cropland_cons = cropland_cons;
                              datageo.features[n].properties.cropland_bio = cropland_bio;
                              datageo.features[n].properties.fish_footprint_prod = fish_footprint_prod;
                              datageo.features[n].properties.fish_footprint_cons = fish_footprint_cons;
                              datageo.features[n].properties.fish_footprint_bio = fish_footprint_bio;
                              datageo.features[n].properties.forest_product_footprint_prod = forest_product_footprint_prod;
                              datageo.features[n].properties.forest_product_footprint_cons = forest_product_footprint_cons;
                              datageo.features[n].properties.forest_product_footprint_bio = forest_product_footprint_bio;
                              datageo.features[n].properties.grazing_footprint_prod = grazing_footprint_prod;
                              datageo.features[n].properties.grazing_footprint_cons = grazing_footprint_cons;
                              datageo.features[n].properties.grazing_footprint_bio = grazing_footprint_bio;


                              console.log(datageo)
                              break;

                            }else{
                            }
                        }
                    }

                    minValColorCouB = d3.min(dataArray)
                    maxValColorCouB = d3.max(dataArray)

                    svg.selectAll("path")
                      .data(datageo.features)
                      .enter()
                      .append("path")
                      .attr("d", path)
                      .attr("id", function(d) {return d.properties.NAME.replace(/\s/g, "_").replace(".", "_").replace("(", "").replace(")", "");})
                      .style("fill", function(d){
                        var value = d.properties.totalBiocapacity;

                            if(value){
                              return ramp(minValColorCouB,lowColorB, highColorB, value);
                            } else {
                              return "#bfbfbf"
                            }
                      })
                      .style("stroke", "#333333")
                      .style("stroke-width", "0.2px" )
                      .attr("title", function(d) {return d.properties.NAME;})
                      .on("mouseover", function(d){


                        var countryMouseOver = d.properties.NAME.replace(/\s/g, "_").replace(".", "_").replace("(", "").replace(")", "");

                          d3.select("path[title=\'"+d.properties.NAME+"\']")
                            .style("fill", function(d){
                                    var value = d.properties.totalBiocapacity;

                                        if(value){
                                          return ramp(minValColorCouB,lowColorB, highColorB, "mouseB")
                                        } else {
                                          return "#bfbfbf"
                                        }
                            })
                            .attr("title", function(d) {return d.properties.NAME;});

                            if(lastCountryOn==countryMouseOver){
                              d3.select("#"+countryMouseOver+"mover").attr("transform","translate("+ event.clientX+", "+event.clientY+") ");
                            }else if(lastCountryOn==null){
                              d3.select("body")
                                    .append("div")
                                    .attr("id", function(){
                                        lastCountryOn= ""+countryMouseOver;
                                        return lastCountryOn+"mover";
                                    })
                                    .style("position", "absolute")
                                    .style("z-index", "10")
                                    .style("visibility", "visible")
                                    .style("background", "#000")
                                    .attr("transform","translate("+ event.clientX+", "+event.clientY+") ")
                                    .text(countryMouseOver);
                            }


                        })
                        .on("mouseout", function(d){
                            d3.select("path[title=\'"+d.properties.NAME+"\']")
                              .style("fill", function(d){
                                      var value = d.properties.totalBiocapacity;

                                          if(value){
                                            return ramp(minValColorCouB,lowColorB, highColorB, value)
                                          } else {
                                            return "#bfbfbf"
                                          }
                              });

                              if(lastCountryOn.indexOf(" ") != -1 || lastCountryOn.indexOf(".") != -1 || lastCountryOn.indexOf("(") != -1 || lastCountryOn.indexOf(")") != -1){
                                d3.select("#"+lastCountryOn.replace(/\s/g, "_").replace(".", "_").replace("(", "_").replace(")", "_")+"mover").remove();
                                lastCountryOn = null;

                              }else{
                                d3.select("#"+lastCountryOn+"mover").remove();
                                lastCountryOn = null;
                              }

                        });
                        // .on("mouseenter", function(d){
                        //   d3.select("path[title=\'"+d.properties.NAME+"\']").attr("fill", ramp(d.properties.totalBiocapacity+20)).text(d.properties.NAME);
                        // })
                        // .on("mouseleave", function(d){
                        //   d3.select("path[title=\'"+d.properties.NAME+"\']").attr("fill", ramp(d.properties.totalBiocapacity));
                        //
                        // });
                });

              });

              autocomplete(document.getElementById("myInput"), countries_list);

      }


      //////////COUNTRIES FLOATING BAR (ONE COUNTRY)///////////

      function singlecountry_floatingBar(country){

          var dataValues;
          var minVal;
          var maxVal;

          d3.json("../data/CountryOutput.json").then(function(json){

            for(var c = 0; c < json.data.length; c++){

                if(json.data[c].country_region == country){

                  dataValues = json.data[c];

                  delete dataValues.region;
                  delete dataValues.hdi;
                  delete dataValues.population_millions;
                  delete dataValues.per_capita_gdp;
                  delete dataValues.number_of_earths_required;
                  delete dataValues.number_of_countries_required;
                  delete dataValues.ecological_deficit_or_reserve;
                  delete dataValues.country_region;

                  minVal = d3.min(dataValues)
                  maxVal = d3.max(dataValues)

                  break;

                }

            }


            var stack = d3.stack();
            var categories = ["Built Up", "Carbon", "Cropland", "Fishing Ground", "Forest Land", "Grazing Land", "Total"];


            var n = 2;
            var m = 7;

            var margin = {top: 50, right: 50, bottom: 50, left: 100},
                  width = 900 - margin.left - margin.right,
                  height = 500 - margin.top - margin.bottom;

            var y = d3.scale.ordinal().domain(categories).rangeRoundBands([0, height], .08);
            var x = d3.scale.linear().domain([0, maxVal]).range([width, 0]);


            var svg = d3.select("#countries_graph")
              .append("svg")
              .attr("id", "chart1")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .attr("tranform", "translate(" + 0 + "," + 0 + ")");


            var xAxis = d3.axisBottom()
                          .scale(x)
                          .tickSize(5)
                          .tickPadding(6);

            var yAxis = d3.axisLeft().scale(y);


          });


      }


      //////////COUNTRIES FLOATING BAR (COMPARISON COUNTRIES)///////////




      ////////////////////SEARCH//////////////////

      function light_up_search(){
        var valueinput = document.getElementById("myInput").value;
        var tryout = document.getElementById(valueinput);
        var country_to_light = d3.select("path[title=\'"+valueinput+"\']");



            country_to_light.style("fill", function(valueinput){

                if(variableToShow=="EcoFoot"){
                    var value = valueinput.properties.totalEcoFootCons;
                    if(value){
                      return ramp(minValColorCouFT,lowColorEF, highColorEF, "mouseEF")
                    } else {
                      return "#bfbfbf"
                    }
                }else if(variableToShow=="Biocapacity"){
                    var value = valueinput.properties.totalBiocapacity;

                    if(value){
                      return ramp(minValColorCouB,lowColorB, highColorB, "mouseB")
                    } else {
                      return "#bfbfbf"
                    }
                }

            })
      };

      function light_up_search_continent(){
        var valueinput_continent = document.getElementById("myInput-continent").value;

        if(valueinput_continent=="north america" || valueinput_continent=="North america" || valueinput_continent=="north America" || valueinput_continent=="North America" || valueinput_continent=="south america" || valueinput_continent=="South america" || valueinput_continent=="south America" || valueinput_continent=="South America"){
              var splitted = valueinput_continent.split(" ");
              valueinput_continent = splitted[0].charAt(0).toUpperCase() + splitted[0].slice(1) + " " + splitted[1].charAt(0).toUpperCase() + splitted[1].slice(1);

        }else{
              valueinput_continent = document.getElementById("myInput-continent").value.charAt(0).toUpperCase() + document.getElementById("myInput-continent").value.slice(1);

        }

        var tryout_continent = document.getElementById(valueinput_continent);
        var continent_to_light = d3.selectAll("path[title=\'"+valueinput_continent+"\']");

        console.log(continent_to_light)

        if(continent_to_light=="Antarctica"){
          return "#bfbfbf"


        }else{

              continent_to_light.style("fill", function(valueinput_continent){

                  if(variableToShow=="EcoFoot"){
                        var yeartoshow = "_"+yearTimeline+"";
                        var value = valueinput_continent.properties.efgha[yeartoshow].total_efgha;

                        if(value){
                            return ramp(minValColorContFT,lowColorEF, highColorEF, "mouseEF")
                          } else {
                            return "#bfbfbf"
                          }
                  }else if(variableToShow=="Biocapacity"){
                      var yeartoshow = "_"+yearTimeline+"";
                      var value = valueinput_continent.properties.biogha[yeartoshow].total_biogha;

                      if(value){
                        return ramp(minValColorContB,lowColorB, highColorB, "mouseB")
                      } else {
                        return "#bfbfbf"
                      }
                  }

              })
        }

      };

      function autocomplete(inp, arr) {

        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
              /*check if the item starts with the same letters as the text field value:*/
              if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
              }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
              /*If the arrow DOWN key is pressed,
              increase the currentFocus variable:*/
              currentFocus++;
              /*and and make the current item more visible:*/
              addActive(x);
            } else if (e.keyCode == 38) { //up
              /*If the arrow UP key is pressed,
              decrease the currentFocus variable:*/
              currentFocus--;
              /*and and make the current item more visible:*/
              addActive(x);
            } else if (e.keyCode == 13) {
              /*If the ENTER key is pressed, prevent the form from being submitted,*/
              e.preventDefault();
              if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
              }
            }
        });
        function addActive(x) {
          /*a function to classify an item as "active":*/
          if (!x) return false;
          /*start by removing the "active" class on all items:*/
          removeActive(x);
          if (currentFocus >= x.length) currentFocus = 0;
          if (currentFocus < 0) currentFocus = (x.length - 1);
          /*add class "autocomplete-active":*/
          x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
          /*a function to remove the "active" class from all autocomplete items:*/
          for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
          }
        }
        function closeAllLists(elmnt) {
          /*close all autocomplete lists in the document,
          except the one passed as an argument:*/
          var x = document.getElementsByClassName("autocomplete-items");
          for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
      /*execute a function when someone clicks in the document:*/
      document.addEventListener("click", function (e) {
          closeAllLists(e.target);
      });
      }

});


function myFunction() {
    return false;
}
