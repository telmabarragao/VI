$( document ).ready(function() {
      var lastCountryOn = null;

      var yearTimeline = 2014;
      var variableToShow = "EcoFoot";
      var appendTo = "#world_graph";
      var lastContinentSearched = "";
      var countries_list = [];
      var continents_list = [];
      var minValColorCouFT, maxValColorCouFT;
      var minValColorCouB, maxValColorCouB;
      var minValColorContFT, maxValColorContFT;
      var minValColorContB, maxValColorContB;
      var measureToSee ="gha";

      var filterArrayStackedAreaCC=[];

      var dataToFloatingBars = {"categories":[], "continents":[], "colors":[], "layers":[]};

      $("#selectEarthsGha").on("change", function(){
        measureToSee = document.getElementById("selectEarthsGha").value;
        $("#chart").remove();
        $("#legend1 svg").remove();
        $("#stackBarChartCont").remove();
        $("#stackAreaChartCont g").remove();
        $("#stackedAreaTitle").remove();

        if(measureToSee=="gha"){
          continents_EcoFootGha();

        }else if(measureToSee == "earths"){
          continents_EcoFootEarths();

        }
      });

      function ramp(minVal, lowColor, highColor, value){


        if(appendTo== "#world_graph"){

            if(variableToShow=="EcoFoot"){

              if(measureToSee=="earths"){
                var colorup = d3.scaleLinear().domain([minVal,6]).range([lowColor, highColor]);

                if(value == "mouseEF"){
                  return "#315631";

                }else if(value == "mouseB"){

                  return "#663300";

                }else{
                  return colorup(value);

                }
              }else{
                var colorup = d3.scaleLinear().domain([minVal,11000000000]).range([lowColor, highColor]);

                if(value == "mouseEF"){
                  return "#315631";

                }else if(value == "mouseB"){

                  return "#663300";

                }else{
                  return colorup(value);

                }
              }


            }else{

              var colorup = d3.scaleLinear().domain([minVal,3400000000]).range([lowColor, highColor]);

              if(value == "mouseEF"){
                return "#315631";

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

                  $("#world_graph #chart").remove();
                  $("#world_graph #legend1 svg").remove();
                  $("#graphs #stackBarChartCont").remove();
                  $("#stackAreaChartCont g").remove();
                  $("#stackedAreaTitle").remove();

                  document.getElementById("selectMeasure").style.visibility="visible";

                  if(measureToSee=="gha"){
                    continents_EcoFootGha();

                  }else if(measureToSee == "earths"){
                    continents_EcoFootEarths();

                  }

                  document.getElementById('search_bar-continent').style.visibility = "visible";
                  document.getElementById('search_bar').style.visibility = "hidden";
                  document.getElementById('search_bar-continent').style.display = "inline-grid";
                  document.getElementById('search_bar').style.display = "none";

                  document.getElementById('continents_view').style.visibility = "visible" ;
                  document.getElementById('countries_view').style.visibility = "hidden" ;

                }else{
                  appendTo = "#world_graph";
                  $("#world_graph #chart").remove();
                  $("#world_graph #legend1 svg").remove();
                  $("#graphs #stackBarChartCont").remove();
                  $("#stackAreaChartCont g").remove();
                  $("#stackedAreaTitle").remove();


                  $(".main")
                  document.getElementById("selectEarthsGha").value = "gha";
                  measureToSee="gha";
                  document.getElementById("selectMeasure").style.visibility="hidden";
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
                  $("#legend1 svg").remove();

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
                  $("#legend1 svg").remove();

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

                    $("#chart").remove();
                    $("#legend1 svg").remove();
                    $("#stackBarChartCont").remove();
                    $("#stackAreaChartCont g").remove();
                    $("#stackedAreaTitle").remove();


                    countries_EcoFoot();
                  }else{
                    countries_EcoFoot();

                  }

          }else if(this.value == "montheb" && appendTo == "#countries_graph"){

                  variableToShow = "Biocapacity";

                  if(document.getElementById("chart").length != 0){
                    $("#chart").remove();
                    $("#legend1 svg").remove();
                    $("#stackBarChartCont").remove();
                    $("#stackAreaChartCont g").remove();
                    $("#stackedAreaTitle").remove();

                    countries_Biocapacity();
                  }else{
                    countries_Biocapacity();


                  }

          }else if(this.value == "montheb"  && appendTo == "#world_graph"){
            variableToShow = "Biocapacity";
            if(document.getElementById("chart").length != 0){
              $("#chart").remove();
              $("#legend1 svg").remove();
              $("#stackBarChartCont").remove();
              $("#stackAreaChartCont g").remove();
              $("#stackedAreaTitle").remove();


              document.getElementById("selectEarthsGha").value = "gha";
              measureToSee="gha";
              document.getElementById("selectMeasure").style.visibility="hidden";
              continents_BiocapacityGha();
            }else{
              document.getElementById("selectEarthsGha").value = "gha";
              measureToSee="gha";
              document.getElementById("selectMeasure").style.visibility="hidden";
              continents_BiocapacityGha();

            }

          }else if(this.value == "weekeb"  && appendTo == "#world_graph"){
            variableToShow = "EcoFoot";
            if(document.getElementById("chart").length != 0){
              $("#chart").remove();
              $("#legend1 svg").remove();
              $("#stackBarChartCont").remove();
              $("#stackAreaChartCont g").remove();
              $("#stackedAreaTitle").remove();

              document.getElementById("selectMeasure").style.visibility="visible";

              if(measureToSee=="gha"){

                continents_EcoFootGha();

              }else if(measureToSee == "earths"){
                continents_EcoFootEarths();

              }
            }else{
              $("#stackBarChartCont").remove();
              $("#stackAreaChartCont g").remove();
              $("#stackedAreaTitle").remove();

              document.getElementById("selectMeasure").style.visibility="visible";

              if(measureToSee=="gha"){
                continents_EcoFootGha();

              }else if(measureToSee == "earths"){
                continents_EcoFootEarths();

              }
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
            $("#world_graph #legend1 svg").remove();
            $("#graphs #stackBarChartCont").remove();

            if(measureToSee=="earths"){
              continents_EcoFootEarths();

            }else{
              continents_EcoFootGha();

            }
          }else{
            $("#world_graph #chart").remove();
            $("#world_graph #legend1 svg").remove();
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
      var h = 100;

      var highColorEF = '#607744'
      var lowColorEF = '#DFF4C6'
      var highColorB = '#994d00'
      var lowColorB = '#fff2e6'

      // define map projection      d3.geoNaturalEarth()
      var projection = d3.geoEquirectangular()
                          .translate([w/2, h+60])
                          .scale(w/2/Math.PI);

      //Define default path generator
      var path = d3.geoPath().projection(projection);



      ////////////////////CONTINENTS FUNCTIONS//////////////////

      //////////CONTINENTS MAP///////////

      function continents_EcoFootEarths(){
        console.log("E FOOT PRINT EARTHS")
        var svg = d3.select("#world_graph")
          .append("svg")
          .attr("id", "chart")
          .attr("width", 600)
          .attr("height", 480)
          .attr("tranform", "translate(" + 0 + "," + 0 + ")");

        var div = d3.select("body").append("div")
              .attr("class", "tooltip")
              .style("opacity", 0);

        d3.json("../data/ContinentsOutput.json").then(function(json){

          data = json.data;
          var dataArray_efearths = new Array();
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
                                  datageo.features[1].properties.efearths = dataContYearsNorthAmerica;
                              }else if(lastjsonState == "South America"){
                                  datageo.features[4].properties.efearths = dataContYearsSouthAmerica;
                              }else if(lastjsonState == "Asia"){
                                  datageo.features[0].properties.efearths = dataContYearsAsia;
                              }else if(lastjsonState == "Europe"){
                                  datageo.features[2].properties.efearths = dataContYearsEurope;
                              }else if(lastjsonState == "Africa"){
                                  datageo.features[3].properties.efearths = dataContYearsAfrica;
                              }else if(lastjsonState == "Oceania"){
                                  datageo.features[5].properties.efearths = dataContYearsOceania;
                                  datageo.features[6].properties.efearths = dataContYearsOceania;
                                  datageo.features[6].properties.CONTINENT = "Oceania";
                              }
                                //faz push e update do continent
                                lastContinentViewed = dataContinent;

                                dataYear = allEmpty;
                                dataYear = {};

                                console.log(datageo);

                        }

                        if(dataContinent.replace(" ", "") == jsonState.replace(" ", "") && dataRecord == "Earths"){


                              var year = parseFloat(data[i].year);

                              //footprint consumo em GHA
                              var built_up_land_efearths = parseFloat(data[i].built_up_land);
                              var carbon_efearths = parseFloat(data[i].Carbon);
                              var cropland_efearths = parseFloat(data[i].Cropland);
                              var fishing_grounds_efearths = parseFloat(data[i].fishing_grounds);
                              var forest_products_efearths = parseFloat(data[i].forest_products);
                              var grazing_land_efearths = parseFloat(data[i].grazing_land);
                              var total_efearths = parseFloat(data[i].Total);
                              var continent_name = data[i].country_name;

                              dataArray_efearths.push(total_efearths);

                              dataYear["year"] = year;
                              dataYear["continent_name"] = continent_name;
                              dataYear["total_efearths"] = total_efearths;
                              dataYear["grazing_land_efearths"] = grazing_land_efearths;
                              dataYear["forest_products_efearths"] = forest_products_efearths;
                              dataYear["fishing_grounds_efearths"] = fishing_grounds_efearths;
                              dataYear["cropland_efearths"] = cropland_efearths;
                              dataYear["carbon_efearths"] = carbon_efearths;
                              dataYear["built_up_land_efearths"] = built_up_land_efearths;


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
                  datageo.features[5].properties.efearths = dataContYearsOceania;
                  datageo.features[6].properties.efearths = dataContYearsOceania;

              }

              minValColorContFT = d3.min(dataArray_efearths)
              maxValColorContFT = d3.max(dataArray_efearths)

              stackedBarChartContinent(continentsDataForYear(datageo, yearTimeline), yearTimeline);

              svg.selectAll("path")
                .data(datageo.features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("x", (d, i) => i * 30)
                .attr("y", (d, i) => h - 3 * d)
                .attr("id", function(d) {return d.properties.CONTINENT.replace(/\s/g, "_");})
                .style("fill", function(d){
                      if(d.properties.CONTINENT == "Antarctica"){
                            return "#bfbfbf"
                      }else{
                            var yeartoshow = "_"+yearTimeline+"";
                            var value = d.properties.efearths[yeartoshow].total_efearths;
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

                  var img = "../img/icons/earth.png";


                    var countryMouseOver = d.properties.CONTINENT.replace(/\s/g, "_");

                    var xPosition = d3.mouse(this)[0] - 15;
                    var yPosition = d3.mouse(this)[1] - 25;

                    var yeartoshow = "_"+yearTimeline+"";
                    var value = d.properties.efearths[yeartoshow].total_efearths;

                    div.transition()
                          .duration(200)
                          .style("opacity", .9);
                    div.html(d.properties.CONTINENT+  "<br/>"  + " <img src="+img+" alt='Avatar' class='avatar'> " + "<br/>"  + value.toFixed(2)+ " Earths" )
                          .style("left", (d3.event.pageX) + "px")
                          .style("top", (d3.event.pageY - 28) + "px");


                    highlightContinent("map",d.properties.CONTINENT);

                    d3.selectAll("path[title=\'"+d.properties.CONTINENT+"\']")
                      .style("fill", function(d){

                                  var yeartoshow = "_"+yearTimeline+"";
                                  var value = d.properties.efearths[yeartoshow].total_efearths;

                                  if(value){
                                    return ramp(minValColorContFT,lowColorEF, highColorEF, "mouseEF")
                                  } else {
                                    return "#bfbfbf"
                                  }
                      })
                      .attr("title", function(d) {return d.properties.CONTINENT;});

                      if(lastCountryOn==countryMouseOver){
                        d3.select("#"+countryMouseOver+"mover").attr("transform","translate("+ xPosition +", "+yPosition+") ");
                        lastCountryOn = countryMouseOver;
                      }else if(lastCountryOn==null){
                        lastCountryOn = countryMouseOver;
                                //return lastCountryOn+"mover";
                      }



                  })
                .on("mouseout", function(d){

                      div.transition()
                          .duration(500)
                          .style("opacity", 0);

                      unhighlightContinent("map", d.properties.CONTINENT);

                      d3.selectAll("path[title=\'"+d.properties.CONTINENT+"\']")
                        .style("fill", function(d){
                                  var yeartoshow = "_"+yearTimeline+"";
                                  var value = d.properties.efearths[yeartoshow].total_efearths;

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

                  stackedAreaChartContinent(d.properties);
                  d3.select("path[title=\'"+d.properties.NAME+"\']").attr("fill", ramp(d.properties.totalEcoFootCons+20)).text(d.properties.NAME);


                })
                .on("dblclick", function(d){
                  floatingBarChartContinent(d.properties, yearTimeline);
                });
                    // ADD COLOR SCALE LEGEND
                    var w = 50, h = 272;

                    var key = d3.select("#legend1")
                      .append("svg")
                      .attr("width", w+ 50)
                      .attr("height", h);

                    var legend = key.append("defs")
                      .append("svg:linearGradient")
                      .attr("id", "gradient")
                      .attr("x1", "100%")
                      .attr("y1", "100%")
                      .attr("x2", "100%")
                      .attr("y2", "0%")
                      .attr("spreadMethod", "pad");

                    legend.append("stop")
                      .attr("offset", "0%")
                      .attr("stop-color", lowColorEF)
                      .attr("stop-opacity", 1);

                    legend.append("stop")
                      .attr("offset", "100%")
                      .attr("stop-color", highColorEF)
                      .attr("stop-opacity", 1);

                    key.append("rect")
                      .attr("width", w -40)
                      .attr("height", h)
                      .style("fill", "url(#gradient)")
                      .attr("transform", "translate(20,0)");

                    var y = d3.scaleLinear()
                      .range([0, 271])
                      .domain([maxValColorContFT, minValColorContFT]);

                    var yAxis = d3.axisRight()
                      .scale(y)
                      .ticks(5)
                      .tickFormat( function(d) {
                        return d.toFixed(2)+ " Earths"
                      });


                    key.append("g")
                      .attr("class", "y axis")
                      .attr("transform", "translate(30,0)")
                      .call(yAxis)
                      .append("text")
                      .attr("transform", "rotate(-90)")
                      .attr("y", 0)
                      .attr("dy", ".71em")
                      .style("text-anchor", "end")
                      .text("axis title");


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

            var div = d3.select("body").append("div")
                  .attr("class", "tooltip")
                  .style("opacity", 0);

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

                  minValColorContFT = d3.min(dataArray_efgha)
                  maxValColorContFT = d3.max(dataArray_efgha)

                  stackedBarChartContinent(continentsDataForYear(datageo, yearTimeline), yearTimeline);

                  svg.selectAll("path")
                    .data(datageo.features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .attr("x", (d, i) => i * 30)
                    .attr("y", (d, i) => h - 3 * d)
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


                      var img = "../img/icons/footprint.png";
                      var mouse = d3.mouse(this);


                        var countryMouseOver = d.properties.CONTINENT.replace(/\s/g, "_");

                        var xPosition = d3.mouse(this)[0] - 15;
                        var yPosition = d3.mouse(this)[1] - 25;

                        var yeartoshow = "_"+yearTimeline+"";

                        var value = d.properties.efgha[yeartoshow].total_efgha;


                        div.transition()
                              .duration(200)
                              .style("opacity", .9);
                        div.html(d.properties.CONTINENT+  "<br/>"  + " <img src="+img+" alt='Avatar' class='avatar'> " + "<br/>"  +  round(value/1000000, 6).toFixed(2)+ " M" )
                              .style("left", (d3.event.pageX) + "px")
                              .style("top", (d3.event.pageY - 28) + "px");


                        highlightContinent("map",d.properties.CONTINENT);

                        d3.selectAll("path[title=\'"+d.properties.CONTINENT+"\']")
                          .style("fill", function(d){

                                      var yeartoshow = "_"+yearTimeline+"";
                                      var value = d.properties.efgha[yeartoshow].total_efgha;

                                      if(value){
                                        return ramp(minValColorContFT,lowColorEF, highColorEF, "mouseEF")
                                      } else {
                                        return "#bfbfbf"
                                      }
                          })
                          .attr("title", function(d) {return d.properties.CONTINENT;});

                          if(lastCountryOn==countryMouseOver){
                            d3.select("#"+countryMouseOver+"mover").attr("transform","translate("+ xPosition +", "+yPosition+") ");
                            lastCountryOn = countryMouseOver;
                          }else if(lastCountryOn==null){
                            lastCountryOn = countryMouseOver;
                                    //return lastCountryOn+"mover";
                          }
                      })
                    .on("mouseout", function(d){

                          div.transition()
                              .duration(500)
                              .style("opacity", 0);

                          unhighlightContinent("map", d.properties.CONTINENT);

                          d3.selectAll("path[title=\'"+d.properties.CONTINENT+"\']")
                            .style("fill", function(d){
                                      var yeartoshow = "_"+yearTimeline+"";
                                      var value = d.properties.efgha[yeartoshow].total_efgha;

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

                          stackedAreaChartContinent(d.properties);

                          //popUpContinent(this, yearTimeline, d.properties.CONTINENT);

                          d3.select("path[title=\'"+d.properties.NAME+"\']").attr("fill", ramp(d.properties.totalEcoFootCons+20)).text(d.properties.NAME);


                    })
                    .on("dblclick", function(d){
                      floatingBarChartContinent(d.properties, yearTimeline);
                    });
                    // ADD COLOR SCALE LEGEND
                    var w = 50, h = 272;

                    var key = d3.select("#legend1")
                      .append("svg")
                      .attr("width", w+ 50)
                      .attr("height", h);

                    var legend = key.append("defs")
                      .append("svg:linearGradient")
                      .attr("id", "gradient")
                      .attr("x1", "100%")
                      .attr("y1", "100%")
                      .attr("x2", "100%")
                      .attr("y2", "0%")
                      .attr("spreadMethod", "pad");

                    legend.append("stop")
                      .attr("offset", "0%")
                      .attr("stop-color", lowColorEF)
                      .attr("stop-opacity", 1);

                    legend.append("stop")
                      .attr("offset", "100%")
                      .attr("stop-color", highColorEF)
                      .attr("stop-opacity", 1);

                    key.append("rect")
                      .attr("width", w -40)
                      .attr("height", h)
                      .style("fill", "url(#gradient)")
                      .attr("transform", "translate(20,0)");

                    var y = d3.scaleLinear()
                      .range([0, 271])
                      .domain([maxValColorContFT, minValColorContFT]);

                    var yAxis = d3.axisRight()
                      .scale(y)
                      .ticks(5)
                      .tickFormat( function(d) {
                        return (d/1000000).toFixed(0)+ " M"
                      });


                    key.append("g")
                      .attr("class", "y axis")
                      .attr("transform", "translate(30,0)")
                      .call(yAxis)
                      .append("text")
                      .attr("transform", "rotate(-90)")
                      .attr("y", 0)
                      .attr("dy", ".71em")
                      .style("text-anchor", "end")
                      .text("axis title");



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

              var div = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);

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

                  minValColorContB = d3.min(dataArray_biogha)
                  maxValColorContB = d3.max(dataArray_biogha)

                  stackedBarChartContinent(continentsDataForYear(datageo, yearTimeline), yearTimeline);

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
                        var countryMouseOver = d.properties.CONTINENT.replace(/\s/g, "_");

                        highlightContinent("map",d.properties.CONTINENT);


                        var yeartoshow = "_"+yearTimeline+"";

                        var value = d.properties.biogha[yeartoshow].total_biogha;
                        var img = "../img/icons/biocapacity.png";


                        div.transition()
                              .duration(200)
                              .style("opacity", .9);
                        div.html(d.properties.CONTINENT+  "<br/>"  + " <img src="+img+" alt='Avatar' class='avatar'> " + "<br/>" + round(value/1000000, 6).toFixed(2)+ " M")
                              .style("left", (d3.event.pageX) + "px")
                              .style("top", (d3.event.pageY - 28) + "px");


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
                              lastCountryOn = countryMouseOver;
                                      //return lastCountryOn+"mover";
                          }


                    })
                    .on("mouseout", function(d){

                          unhighlightContinent("map",d.properties.CONTINENT);

                          div.transition()
                              .duration(500)
                              .style("opacity", 0);

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

                      })
                    .on("click", function(d){

                        stackedAreaChartContinent(d.properties);

                        d3.select("path[title=\'"+d.properties.NAME+"\']").attr("fill", ramp(d.properties.totalBiocapacity+20)).text(d.properties.NAME);
                      })
                    .on("mouseleave", function(d){
                        d3.select("path[title=\'"+d.properties.NAME+"\']").attr("fill", ramp(d.properties.totalBiocapacity));

                    })
                    .on("dblclick", function(d){
                      floatingBarChartContinent(d.properties, yearTimeline);
                    });


                    // ADD COLOR SCALE LEGEND
                    var w = 50, h = 272;

                    var key = d3.select("#legend1")
                      .append("svg")
                      .attr("width", w+ 50)
                      .attr("height", h);

                    var legend = key.append("defs")
                      .append("svg:linearGradient")
                      .attr("id", "gradient")
                      .attr("x1", "100%")
                      .attr("y1", "100%")
                      .attr("x2", "100%")
                      .attr("y2", "0%")
                      .attr("spreadMethod", "pad");

                    legend.append("stop")
                      .attr("offset", "0%")
                      .attr("stop-color", lowColorB)
                      .attr("stop-opacity", 1);

                    legend.append("stop")
                      .attr("offset", "100%")
                      .attr("stop-color",highColorB)
                      .attr("stop-opacity", 1);


                    key.append("rect")
                      .attr("width", w -40)
                      .attr("height", h)
                      .style("fill", "url(#gradient)")
                      .attr("transform", "translate(20,0)");

                    var y = d3.scaleLinear()
                      .range([0, 271])
                      .domain([maxValColorContB, minValColorContB]);

                    var yAxis = d3.axisRight()
                      .scale(y)
                      .ticks(5)
                      .tickFormat( function(d) {
                        return (d/1000000).toFixed()+ " M"
                      });


                    key.append("g")
                      .attr("class", "y axis")
                      .attr("transform", "translate(30,0)")
                      .call(yAxis)
                      .append("text")
                      .attr("transform", "rotate(-90)")
                      .attr("y", 0)
                      .attr("dy", ".71em")
                      .style("text-anchor", "end")
                      .text("axis title");


              });

            });

            autocomplete(document.getElementById("myInput-continent"), continents_list);


      }


      //////////CONTINENTES SMALL CHARTS///////////

      function stackedAreaChartContinent(data){

            var original = data;
            var originalData = data;
            $("#stackAreaChartCont g").remove();
            $("#stackedAreaTitle").remove();
            document.getElementById("filterdivstackedAreaCC").style.display= "block";

            var continent = data.CONTINENT;
            if(measureToSee=="gha")
            {
              if(variableToShow=="Biocapacity"){
                data = data.biogha;
              }else{
                data = data.efgha;
              }
            } else if(measureToSee=="earths"){
              data = data.efearths;
            }

            var svg = d3.select("#bottomgraphs svg")

            var container = d3_container.container();

            container
              .height(170)
              .width(500)
              .margin(0, 0, 0, 55);

            var width = container.contentWidth(),
              height = container.contentHeight();

            svg.call(container);

            //GRAPH_TITLE
            svg.append("text")
            .attr("id", "stackedAreaTitle")
            .attr("x", 3*width/5)
            .attr("y", 11.5)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "strong")
            .style("fill", "#888844")
            .text(continent+" Landtype Values Over Time");

            var content = container.content();

            var tooltip = d3.select("body").append("g")
                      .attr("class", "tooltipstackedarea")
                      .style("opacity", 0);


          var statusArray = ["Built Up Land", "Carbon", "Cropland", "Fishing Ground", "Forest Land", "Grazing Land"];
          var colors = ["#9C8443", "#686736", "#CDBE90", "#8C9A86", "#C1A95E", "#845E36"];

          var dataArray = [];

          var dateParse = d3.timeParse("%Y");

          var bisectDate = d3.bisector(function(d) { return d.year; }).left;

          for ( var year in data) {
            var dataYearArray = [];
            var info = data[year];
            //dataYearArray.push(info)
            for ( var inf in info){
                if(inf=="continent_name"){

                }else{
                  dataYearArray.push([inf,info[inf]]);

                }
            }
            dataArray.push(dataYearArray);
          }

          var parsedData = dataArray.map(function (d) {
              var dataObject = {year: dateParse(d[0][1])};

              statusArray.forEach(function (s) {
                switch (s) {
                  case "Built Up Land":
                    dataObject[s] = +d[7][1];

                    break;
                  case "Carbon":
                    dataObject[s] = +d[6][1];

                    break;
                  case "Cropland":
                    dataObject[s] = +d[5][1];

                    break;
                  case "Fishing Ground":
                    dataObject[s] = +d[4][1];

                    break;
                  case "Forest Land":
                    dataObject[s] = +d[3][1];

                    break;
                  case "Grazing Land":
                    dataObject[s] = +d[2][1];

                    break;

                  default:

                }
              })
              return dataObject;
          });

          var stack = d3.stack()
               .keys(statusArray)
               .offset(d3.stackOffsetNone)
               ;

          var layers = stack(parsedData);

          function getDate(d) {
             return d.year;
          }

            var x = d3.scaleTime()
                 .domain([parsedData[0].year, parsedData[parsedData.length - 1].year])
                 .range([0, width]);

            var y = d3.scaleLinear()
                 .domain([0, d3.max(layers, stackMax)])
                 .range([height, 0]);



            var xAxis = d3.axisBottom(x);

            if(measureToSee=="earths"){
              var yAxis = d3.axisLeft(y)
                              .tickFormat( function(d) { return (d).toFixed(2)+ " Earths" } );
            }else{
              var yAxis = d3.axisLeft(y)
                              .tickFormat( function(d) { return round(d/1000000, 6).toFixed()+ " M" } );
            }



          var gX = content.append("g")
               .attr("transform", "translate(0," + height + ")")
               .attr("class", "axis axis--x")
               .call(xAxis)
               .select(".domain")
               .remove();

          var gY = content.append("g")
               .attr("class", "axis axis--y")
               .call(yAxis);

          var colors = statusArray.map(function (d, i) {
               return colors[i];
          });

          var colorScale = d3.scaleOrdinal()
               .domain(statusArray)
               .range(colors);

          var legendOffset = container.margin().left() + width - 32 * statusArray.length;

          var legend = d3.legendColor()
               .shapeWidth(30)
               .cells(statusArray.length)
               .orient("horizontal")
               .scale(colorScale)

          var area = d3.area()
               .x(function (d, i) {return x(d.data.year) })
               .y0(function (d) { return y(d[0]); })
               .y1(function (d) { return y(d[1]); })
               .curve(d3.curveBasis);

          var layerGroups = content.selectAll(".layer")
               .data(layers)
               .enter().append("g")
               .attr("class", "layer")
               .attr("id", function(d, i) { return statusArray[i]; })
               .attr("fill", function (d, i) {
                    return colors[i];
               });

          svg.append("g")
               .attr("class", "legend")
               .attr("transform", "translate(" + legendOffset.toString() + ",0)");


          var img = "";

          layerGroups.append("path")
               .attr("d", area)
               .on("mousemove", function(d){
                 var xPosition = d3.mouse(this)[0] - 15;
                 var yPosition = d3.mouse(this)[1] - 25;

                 var parent = d3.select(this)._groups[0][0].parentNode.id;
                 var landtype = parent;

                 switch (parent) {
                   case "Cropland":
                     img = "../img/icons/crop-land.png"
                     break;
                   case "Carbon":
                     img = "../img/icons/carbon.png"
                     break;
                   case "Fishing Ground":
                     img = "../img/icons/fishing-ground.png"
                     break;
                   case "Forest Land":
                     img = "../img/icons/forest-land.png"
                     break;
                   case "Grazing Land":
                     img = "../img/icons/grazing-land.png"
                     break;
                   case "Built Up Land":
                     img = "../img/icons/built-up-land.png"
                     break;

                   default:
                     img = "../img/icons/footprint.png"
                 }

                 var x0 = x.invert(d3.mouse(this)[0]),
                         i = bisectDate(parsedData, x0, 1),
                         d0 = parsedData[i - 1],
                         d1 = parsedData[i],
                         d = x0 - d0.year > d1.year - x0 ? d1 : d0;

                  function valueWeWant(data, d)
                  {
                    for (var i = 0; i < data.length; i++)
                    {
                      if (data[i].year == d.year)
                      {
                        return data[i][parent];
                      }
                    }
                  }
                 if(measureToSee=="earths"){
                   tooltip.html(new Date(d.year).getFullYear() + "<br/>"  + " <img src="+img+" alt='Avatar' class='avatar'> " + "<br/>"  + (valueWeWant(parsedData, d)).toFixed(2)+ " Earths" )
                           .style("left", (d3.event.pageX) + "px")
                           .style("top", (d3.event.pageY - 28) + "px");
                 }else{
                   tooltip.html(new Date(d.year).getFullYear() + "<br/>"  + " <img src="+img+" alt='Avatar' class='avatar'> " + "<br/>"  + (valueWeWant(parsedData, d)/1000000).toFixed(2)+ " M" )
                           .style("left", (d3.event.pageX) + "px")
                           .style("top", (d3.event.pageY - 28) + "px");
                 }


                 tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");

               })
               .on("mouseover", function(d) {

                 tooltip.transition()
                       .duration(200)
                     .style("opacity", .9);

                 var xPosition = d3.mouse(this)[0] - 15;
                 var yPosition = d3.mouse(this)[1] - 25;

                 var parent = d3.select(this)._groups[0][0].parentNode.id;
                 console.log(d3.select(this)._groups[0][0].parentNode)
                 var landtype = parent;
                 var img = "";

                 switch (parent) {
                   case "Cropland":
                     img = "../img/icons/crop-land.png"
                     break;
                   case "Carbon":
                     img = "../img/icons/carbon.png"
                     break;
                   case "Fishing Ground":
                     img = "../img/icons/fishing-ground.png"
                     break;
                   case "Forest Land":
                     img = "../img/icons/forest-land.png"
                     break;
                   case "Grazing Land":
                     img = "../img/icons/grazing-land.png"
                     break;
                   case "Built Up Land":
                     img = "../img/icons/built-up-land.png"
                     break;

                   default:
                     img = "../img/icons/footprint.png"
                 }

                 var x0 = x.invert(d3.mouse(this)[0]),
                         i = bisectDate(parsedData, x0, 1),
                         d0 = parsedData[i - 1],
                         d1 = parsedData[i],
                         d = x0 - d0.year > d1.year - x0 ? d1 : d0;

                  function valueWeWant(data, d)
                  {
                    for (var i = 0; i < data.length; i++)
                    {
                      if (data[i].year == d.year)
                      {
                        return data[i][parent];
                      }
                    }
                  }
                 if(measureToSee=="earths"){
                   tooltip.html(new Date(d.year).getFullYear() + "<br/>"  + " <img src="+img+" alt='Avatar' class='avatar'> " + "<br/>"  + (valueWeWant(parsedData, d)).toFixed(2)+ " Earths" )
                           .style("left", (d3.event.pageX) + "px")
                           .style("top", (d3.event.pageY - 28) + "px");
                 }else{
                   tooltip.html(new Date(d.year).getFullYear() + "<br/>"  + " <img src="+img+" alt='Avatar' class='avatar'> " + "<br/>"  + (valueWeWant(parsedData, d)/1000000).toFixed(2)+ " M" )
                           .style("left", (d3.event.pageX) + "px")
                           .style("top", (d3.event.pageY - 28) + "px");
                 }


                 tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");

               })
               .on("mouseout", function(d){
                 tooltip.transition()
                       .duration(100)
                     .style("opacity", 0);
               });

          function stackMax(layer) {
               return d3.max(layer, function (d) { return d[1]; });
             }

          $(".buttonfilterstackedAreaCC").on("click", function(){
               filterArrayStackedAreaCC.push(this.value);

               var child = document.getElementById("stackAreaChartCont").childNodes[0];
               var childChilds = child.childNodes;

               childChilds.forEach(function(element){
                 filterArrayStackedAreaCC.forEach(function(ele){
                   if(element.id==ele){
                     switch (ele) {
                       case "Built Up Land":
                            statusArray.splice(statusArray.indexOf("Built Up Land"),1);
                            for (var i = 0; i < 54; i++) {
                                var year = Object.keys(originalData.efgha)[i];
                                delete originalData.efgha[year].built_up_land_efgha;
                            }

                         break;
                       case "Grazing Land":
                            statusArray.splice(statusArray.indexOf("Grazing Land"),1);
                            for (var i = 0; i < 54; i++) {
                                var year = Object.keys(originalData.efgha)[i];
                                delete originalData.efgha[year].grazing_land_efgha;
                            }

                         break;
                       case "Forest Land":
                            statusArray.splice(statusArray.indexOf("Forest Land"),1);
                            for (var i = 0; i < 54; i++) {
                                var year = Object.keys(originalData.efgha)[i];
                                delete originalData.efgha[year].forest_products_efgha;
                            }

                         break;
                       case "Fishing Ground":
                          statusArray.splice(statusArray.indexOf("Fishing Ground"),1);
                          for (var i = 0; i < 54; i++) {
                              var year = Object.keys(originalData.efgha)[i];
                              delete originalData.efgha[year].fishing_grounds_efgha;
                          }

                         break;
                       case "Carbon":
                          statusArray.splice(statusArray.indexOf("Carbon"),1);
                          for (var i = 0; i < 54; i++) {
                              var year = Object.keys(originalData.efgha)[i];
                              delete originalData.efgha[year].carbon_efgha;
                          }

                         break;
                       case "Cropland":
                          statusArray.splice(statusArray.indexOf("Cropland"),1);
                          for (var i = 0; i < 54; i++) {
                              var year = Object.keys(originalData.efgha)[i];
                              delete originalData.efgha[year].cropland_efgha;
                          }

                         break;
                       default:

                     }
                  }
                 })
               })

               stackedAreaChartContinent(originalData);

             });


      }

      function stackedBarChartContinent(data, year){

            var dataToShow = data.slice(0,6);
            // Setup svg using Bostock's margin convention

            var margin = {top: 35, right: 100, bottom: 35, left: 80};

            var width = 400;
            var height = 260;

            var svg = d3.select("#graphs")
              .append("svg")
              .attr("id", "stackBarChartCont")
              .attr("width", width+ margin.left + margin.right) // + margin.left + margin.right
              .attr("height", height+ margin.top + margin.bottom) // + margin.top + margin.bottom
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");   //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          var tooltip = d3.select("body").append("g")
                      .attr("class", "tooltipstackedbar")
                      .style("opacity", 0);


          var landtypes = ["Built Up Land", "Carbon", "Cropland", "Fishing Ground", "Forest Land", "Grazing Land"];
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
            .domain(dataset[0].map(function(d) {
                return d.x;
            }))
            .rangeRoundBands([10, width-10], 0.2);

          var y = d3.scale.linear()
            .domain([0, d3.max(dataset, function(d) {
                return d3.max(d, function(d) {
                    return d.y0 + d.y; });
            })])
            .range([height, 0]);

          var colors = ["#9C8443", "#686736", "#CDBE90", "#8C9A86", "#C1A95E", "#845E36"];

        // Define and draw axes
        if(measureToSee=="earths"){
          var yAxis = d3.axisLeft()
                        .scale(y)
                        .ticks(6)
                        .tickSize(-width, 0, 0)
                        .tickFormat( function(d) { return d.toFixed(0)+ " Earths" } );

        }else{
          var yAxis = d3.axisLeft()
                        .scale(y)
                        .ticks(6)
                        .tickSize(-width, 0, 0)
                        .tickFormat( function(d) { return (d/1000000).toFixed(0)+ " M" } );
        }


        var xAxis = d3.axisBottom()
                      .scale(x);
        var bandSize = x.rangeBand();

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate("+ bandSize/2 + "," + height + " )")
          .call(xAxis)
          .selectAll("text")
            .attr("y", 10)
            .attr("x", 20)
            .style("text-anchor", "Start")
            .attr("transform", "translate(-" + bandSize/4 + ", 0)")
            .text(function(d){

                  return d;
            })
            .call(wrap, x.rangeBand());


      function wrap(text, width) {
        text.each(function() {
          var text = d3.select(this),
              words = text.text().split(/\s+/).reverse(),
              word,
              line = [],
              lineNumber = 0,
              lineHeight = 1.1, // ems
              y = text.attr("y"),
              dy = parseFloat(text.attr("dy")),
              tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
          while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
          }
        });
      }
      // Create groups for each series, rects for each segment
      var groups = svg.selectAll("g.cost")
        .data(dataset)
        .enter().append("g")
        .attr("class", "cost")
        .attr("id", function(d, i) { return landtypes[i]; })
        .style("fill", function(d, i) { return colors[i]; });

      var rect = groups.selectAll("rect")
        .data(function(d) { return d; })
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
        .attr("width", x.rangeBand())
        .attr("id", function(d) { return d.x; })
        .on("mouseover", function(d) {

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

            d3.select(this)
            .style("stroke", "#FFFFFF")
            .style("stroke-width", "1px")
            .style("filter", "url(#glow)");

            highlightContinent("stackedBar",d.x);

            tooltip.transition()
                  .duration(200)
                .style("opacity", .9);

            var xPosition = d3.mouse(this)[0] - 15;
            var yPosition = d3.mouse(this)[1] - 25;

            var parent = d3.select(this)._groups[0][0].parentNode.id;

            var img = "";

            switch (parent) {
              case "Cropland":
                img = "../img/icons/crop-land.png"
                break;
              case "Carbon":
                img = "../img/icons/carbon.png"
                break;
              case "Fishing Ground":
                img = "../img/icons/fishing-ground.png"
                break;
              case "Forest Land":
                img = "../img/icons/forest-land.png"
                break;
              case "Grazing Land":
                img = "../img/icons/grazing-land.png"
                break;
              case "Built Up Land":
                img = "../img/icons/built-up-land.png"
                break;

              default:
                img = "../img/icons/footprint.png"
            }

            if(measureToSee=="earths"){
              tooltip.html(d.x + "<br/>"  + " <img src="+img+" alt='Avatar' class='avatar'> " + "<br/>"  + d.y.toFixed(2)+ " Earths" )
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
            }else{
              tooltip.html(d.x + "<br/>"  + " <img src="+img+" alt='Avatar' class='avatar'> " + "<br/>"  + round(d.y/1000000, 6).toFixed(2)+ " M" )
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
            }


            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");


        })
        .on("mouseout", function(d) {

          tooltip.transition()
              .duration(500)
              .style("opacity", 0);

            d3.selectAll("rect[id=\'"+d.x+"\']")
            .style("stroke", "#333333")
            .style("stroke-width", "0px")
            .style("filter", "");

            unhighlightContinent("stackedBar",d.x);


        })
        .on("mousemove", function(d) {
          var xPosition = d3.mouse(this)[0] - 15;
          var yPosition = d3.mouse(this)[1] - 25;

          if(measureToSee=="earths"){
            tooltip.style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
          }else{
            tooltip.style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
          }

          tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");


        });

        //GRAPH_TITLE
        svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "strong")
        .style("fill", "#888844")
        .text("Landtype Values per Continent");


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


      }

      function floatingBarChartContinent(data, year){

          $("#floatingBarChartCont g").remove();

            dataToFloatingBars["continents"].push(data.CONTINENT);

            var landtypes = ["Built Up Land", "Carbon", "Cropland", "Fishing Ground", "Forest Land", "Grazing Land", "Total"];
            dataToFloatingBars["categories"]=landtypes;

            var yeartoshow = "_"+year+"";

            var dataset, data;

            if(measureToSee == "gha"){

              if(variableToShow=="Biocapacity"){

                console.log("biocapacity")
                dataset = data.biogha[yeartoshow];


                data = [{"landtype":"Built Up Land","value":dataset.built_up_land_biogha},
                {"landtype":"Carbon","value":dataset.carbon_biogha},
                {"landtype":"Cropland","value":dataset.cropland_biogha},
                {"landtype":"Fishing Ground","value":dataset.fishing_grounds_biogha},
                {"landtype":"Forest Land","value":dataset.forest_products_biogha},
                {"landtype":"Grazing Land","value":dataset.grazing_land_biogha},
                {"landtype":"Total","value":dataset.total_biogha}];

              }else{

                console.log("efgha")
                dataset = data.efgha[yeartoshow];


                data = [{"landtype":"Built Up Land","value":dataset.built_up_land_efgha},
                {"landtype":"Carbon","value":dataset.carbon_efgha},
                {"landtype":"Cropland","value":dataset.cropland_efgha},
                {"landtype":"Fishing Ground","value":dataset.fishing_grounds_efgha},
                {"landtype":"Forest Land","value":dataset.forest_products_efgha},
                {"landtype":"Grazing Land","value":dataset.grazing_land_efgha},
                {"landtype":"Total","value":dataset.total_efgha}];

              }
            }else{

                console.log("efearths")
                dataset = data.efearths[yeartoshow];

                data = [{"landtype":"Built Up Land","value":dataset.built_up_land_efearths},
                {"landtype":"Carbon","value":dataset.carbon_efearths},
                {"landtype":"Cropland","value":dataset.cropland_efearths},
                {"landtype":"Fishing Ground","value":dataset.fishing_grounds_efearths},
                {"landtype":"Forest Land","value":dataset.forest_products_efearths},
                {"landtype":"Grazing Land","value":dataset.grazing_land_efearths},
                {"landtype":"Total","value":dataset.total_efearths}];
            }

            dataToFloatingBars["layers"].push(data);
            console.log(dataToFloatingBars);


            var tooltip = d3.select("body").append("g")
                      .attr("class", "tooltipfloatingcontinent")
                      .style("opacity", 0);



             // set the dimensions and margins of the graph

             var colorsa = ["#9C8443", "#686736", "#CDBE90", "#8C9A86", "#C1A95E", "#845E36", "#006080" ];
             dataToFloatingBars["colors"]=colorsa;

             var margin = {top: 0, right: 0, bottom: 0, left: 80};
             width = 400,
             height = 170;

             var colors = landtypes.map(function (d, i) {
                  return dataToFloatingBars["colors"][i];
             });

             var colorScale = d3.scaleOrdinal()
                  .domain(landtypes)
                  .range(colorsa);

            n = dataToFloatingBars["continents"].length, // Number of Layers
            m = dataToFloatingBars["layers"].length, // Number of Samples in 1 layer
            yGroupMax = d3.max(dataToFloatingBars["layers"], function(layer) { return d3.max(layer, function(d) { return d.value; }); });
            yGroupMin = d3.min(dataToFloatingBars["layers"], function(layer) { return d3.min(layer, function(d) { return d.value; }); });


             // set the ranges
             var x = d3.scaleBand()
                 .domain(dataToFloatingBars["categories"])
                 .rangeRound([0, width], .08);

             var y = d3.scaleLinear()
                 .domain([0, yGroupMax])
                 .range([height, 0]);

            var xAxis = d3.axisBottom()
                .scale(x)
                .tickSize(7)
                .tickPadding(6);

            var yAxis = d3.axisLeft()
                .scale(y);

             // append the svg object to the body of the page
             // append a 'group' element to 'svg'
             // moves the 'group' element to the top left margin
             var svg = d3.select("#floatingBarChartCont")
               .attr("width", width + margin.left + margin.right)
               .attr("height", height + margin.top + margin.bottom)
               .append("g")
               .attr("transform",
                 "translate(" + margin.left + "," + margin.top + ")");

             // format the data
             data.forEach(function(d) {
               d.value = +d.value;
             });

             // Scale the range of the data in the domains
             // x.domain([0, d3.max(data, function(d){ return d.value; })])
             // y.domain(data.map(function(d) { return d.landtype; }));
             //y.domain([0, d3.max(data, function(d) { return d.sales; })]);

             var img="";

             var layer = svg.selectAll(".layer")
                     .data(dataToFloatingBars["layers"])
                     .enter().append("g")
                     .attr("class", "layer");
            var count=0;
            var rect = layer.selectAll("rect")
                     .data(function(d,i){d.map(function(b){b.colorIndex=i;return b;});return d;})
                     .enter().append("rect")
                     .transition()
                     .duration(500)
                     .delay(function(d, i) { return i * 10; })
                     .attr("x", function(d, i, j) {
                       if(count<7){
                         console.log("entreiiiii")
                         count+=1;
                         return x(d.landtype)/ n + 12 ;
                       }else{
                         return x(d.landtype)/ n + 5;
                       }
                     }) //+ x.bandwidth() % j.length*m
                     .attr("width", 10)
                     .transition()
                     .attr("y", function(d) { return y(d.value); })
                     .attr("height", function(d) { return height - y(d.value)})
                     .attr("class","bar")
                     .style("fill",function(d){return dataToFloatingBars["colors"][d.colorIndex];})

            svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);

            svg.select("g")
                  .attr("class", "y axis")
                  .call(yAxis);

             // append the rectangles for the bar chart
             // svg.selectAll(".bar")
             //   .data(data)
             //   .enter().append("rect")
             //   .attr("class", "bar")
             //   .attr("id", function(d) { return d.landtype; })
             //   .attr("width", function(d) {return x(d.value); } )
             //   .attr("y", function(d) { return y(d.landtype); })
             //   .attr("height", y.bandwidth())
             //   .style("fill", function(d,i){
             //     return colors[i];
             //   })
             //   .on("mouseover", function(d){
             //     var xPosition = d3.mouse(this)[0] - 15;
             //     var yPosition = d3.mouse(this)[1] - 25;
             //
             //     var landtype = d.landtype;
             //
             //     switch (landtype) {
             //       case "Cropland":
             //         img = "../img/icons/crop-land.png"
             //         break;
             //       case "Carbon":
             //         img = "../img/icons/carbon.png"
             //         break;
             //       case "Fishing Ground":
             //         img = "../img/icons/fishing-ground.png"
             //         break;
             //       case "Forest Land":
             //         img = "../img/icons/forest-land.png"
             //         break;
             //       case "Grazing Land":
             //         img = "../img/icons/grazing-land.png"
             //         break;
             //       case "Built Up Land":
             //         img = "../img/icons/built-up-land.png"
             //         break;
             //
             //       default:
             //          if(measureToSee=="gha"){
             //            if(variableToShow=="Biocapacity"){
             //              img = "../img/icons/biocapacity.png"
             //
             //            }else{
             //              img = "../img/icons/footprint.png"
             //
             //            }
             //          }else{
             //              img = "../img/icons/earth.png"
             //
             //          }
             //     }
             //
             //
             //     if(measureToSee=="earths"){
             //       tooltip.html(d.landtype + "<br/>"  + " <img src="+img+" alt='Avatar' class='avatar'> " + "<br/>"  + (d.value).toFixed(2)+ " Earths" )
             //               .style("left", (d3.event.pageX) + "px")
             //               .style("top", (d3.event.pageY - 28) + "px");
             //     }else{
             //       tooltip.html(d.landtype + "<br/>"  + " <img src="+img+" alt='Avatar' class='avatar'> " + "<br/>"  + (d.value/1000000).toFixed(2)+ " M" )
             //               .style("left", (d3.event.pageX) + "px")
             //               .style("top", (d3.event.pageY - 28) + "px");
             //     }
             //
             //
             //     tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
             //
             //   })
             //   .on("mousemove", function(d) {
             //
             //     tooltip.transition()
             //           .duration(200)
             //         .style("opacity", .9);
             //
             //     var xPosition = d3.mouse(this)[0] - 15;
             //     var yPosition = d3.mouse(this)[1] - 25;
             //
             //
             //     tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
             //
             //   })
             //   .on("mouseout", function(d){
             //     tooltip.transition()
             //           .duration(100)
             //         .style("opacity", 0);
             //   });

              //
              // if(measureToSee=="earths"){
              //   var xAxis = d3.axisBottom(x)
              //                 .tickFormat( function(d) { return (d).toFixed()+ " Earths" } );
              // }else{
              //   console.log(" e gha")
              //   var xAxis = d3.axisBottom(x)
              //                 .tickFormat( function(d) { return (d/1000000).toFixed()+ " M" } );
              // }




      }


      //////////CONTINENTES SMALL FUNCTIONS///////////

      function continentsDataForYear(datageo, year){

            var dataToShow = new Array();

            var conts = datageo.features;

            if(variableToShow=="Biocapacity"){

              for(cont in conts){

                  if(conts[cont].properties.CONTINENT == "Antarctica"){

                  }else{
                    var rightOne = conts[cont].properties.biogha["_"+year];

                    var valores = {};

                    theYear = rightOne;

                    for(valor in theYear){

                      if(valor=="built_up_land_biogha"){
                        valores["Built Up Land"] = theYear[valor];
                      }else if(valor == "carbon_biogha"){
                        valores["Carbon"] = theYear[valor];
                      }else if(valor == "continent_name"){
                        valores["Continent"] = theYear[valor];
                      }else if(valor == "cropland_biogha"){
                        valores["Cropland"] = theYear[valor];
                      }else if(valor == "fishing_grounds_biogha"){
                        valores["Fishing Ground"] = theYear[valor];
                      }else if(valor == "forest_products_biogha"){
                        valores["Forest Land"] = theYear[valor];
                      }else if(valor == "grazing_land_biogha"){
                        valores["Grazing Land"] = theYear[valor];
                      }

                    }

                    dataToShow.push(valores);

                  }


              }

            }else{


              for(cont in conts){

                  if(conts[cont].properties.CONTINENT == "Antarctica"){

                  }else{

                    if(measureToSee == "gha"){
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

                    }else if(measureToSee == "earths"){


                      var rightOne = conts[cont].properties.efearths["_"+year];

                      var valores = {};

                      theYear = rightOne;

                      for(valor in theYear){

                        if(valor=="built_up_land_efearths"){
                          valores["Built Up Land"] = theYear[valor];
                        }else if(valor == "carbon_efearths"){
                          valores["Carbon"] = theYear[valor];
                        }else if(valor == "continent_name"){
                          valores["Continent"] = theYear[valor];
                        }else if(valor == "cropland_efearths"){
                          valores["Cropland"] = theYear[valor];
                        }else if(valor == "fishing_grounds_efearths"){
                          valores["Fishing Ground"] = theYear[valor];
                        }else if(valor == "forest_products_efearths"){
                          valores["Forest Land"] = theYear[valor];
                        }else if(valor == "grazing_land_efearths"){
                          valores["Grazing Land"] = theYear[valor];
                        }

                      }

                      dataToShow.push(valores);
                    }


                  }


              }

            }


            return dataToShow;

      }

      function highlightContinent(where, continent){

          if(where == "map"){
                //highlight do resto

                ///////////// HIGHLIGH STACKED BAR /////////////

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

                d3.selectAll("rect[id=\'"+continent+"\']")
                .style("stroke", "#FFFFFF")
                .style("stroke-width", "1px")
                .style("filter", "url(#glow)");

          }else if(where=="stackedBar"){

            ///////////// HIGHLIGH MAP /////////////

            if(variableToShow=="Biocapacity"){
              d3.selectAll("path[title=\'"+continent+"\']")
                .style("fill", function(d){
                      var yeartoshow = "_"+yearTimeline+"";
                      var value = d.properties.biogha[yeartoshow].total_biogha;

                      if(value){
                          return ramp(minValColorContB,lowColorB, highColorB, "mouseB")
                      } else {
                          return "#bfbfbf"
                      }
                });
            }else{
              d3.selectAll("path[title=\'"+continent+"\']")
                .style("fill", function(d){
                      var yeartoshow = "_"+yearTimeline+"";
                      var value = d.properties.efgha[yeartoshow].total_efgha;

                      if(value){
                          return ramp(minValColorContFT,lowColorEF, highColorEF, "mouseEF")
                      } else {
                          return "#bfbfbf"
                      }
                });
            }



          }else if(where=="search"){
              ///////////// HIGHLIGH STACKED BAR /////////////

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

              d3.selectAll("rect[id=\'"+continent+"\']")
              .style("stroke", "#FFFFFF")
              .style("stroke-width", "1px")
              .style("filter", "url(#glow)");
          }

      }

      function unhighlightContinent(where, continent){
            if(where == "map"){
                  //unhighlight do resto

                  d3.selectAll("rect[id=\'"+continent+"\']")
                  .style("stroke", "#333333")
                  .style("stroke-width", "0px")
                  .style("filter", "");

            }else if(where=="stackedBar"){

              if(variableToShow=="Biocapacity"){
                d3.selectAll("path[title=\'"+continent+"\']")
                  .style("fill", function(d){
                            var yeartoshow = "_"+yearTimeline+"";
                            var value = d.properties.biogha[yeartoshow].total_biogha;

                              if(value){
                                return ramp(minValColorContB,lowColorB, highColorB, value)
                              } else {
                                return "#bfbfbf"
                              }
                  });

              }else{
                d3.selectAll("path[title=\'"+continent+"\']")
                  .style("fill", function(d){
                            var yeartoshow = "_"+yearTimeline+"";
                            var value = d.properties.efgha[yeartoshow].total_efgha;

                              if(value){
                                return ramp(minValColorContFT,lowColorEF, highColorEF, value)
                              } else {
                                return "#bfbfbf"
                              }
                  });

              }


            }else if(where=="search"){


                  d3.selectAll("rect[id=\'"+continent+"\']")
                  .style("stroke", "#333333")
                  .style("stroke-width", "0px")
                  .style("filter", "");



                                if(variableToShow=="Biocapacity"){
                                  d3.selectAll("path[title=\'"+continent+"\']")
                                    .style("fill", function(d){
                                              var yeartoshow = "_"+yearTimeline+"";
                                              var value = d.properties.biogha[yeartoshow].total_biogha;

                                                if(value){
                                                  return ramp(minValColorContB,lowColorB, highColorB, value)
                                                } else {
                                                  return "#bfbfbf"
                                                }
                                    });

                                }else{
                                  d3.selectAll("path[title=\'"+continent+"\']")
                                    .style("fill", function(d){
                                              var yeartoshow = "_"+yearTimeline+"";
                                              var value = d.properties.efgha[yeartoshow].total_efgha;

                                                if(value){
                                                  return ramp(minValColorContFT,lowColorEF, highColorEF, value)
                                                } else {
                                                  return "#bfbfbf"
                                                }
                                    });

                                }


            }


      }

      function popUpContinent(path, year, continent){

            // Get the modal
            var modal = document.getElementById('myModal');

            // Get the main container and the body
            var container = document.getElementById('world_graph');

            // Get the close button
            var btnClose = document.getElementById("closeModal");

            // Open the modal
            modal.className = "Modal is-visuallyHidden";
            setTimeout(function() {
                container.className = "MainContainer is-blurred";
                modal.className = "Modal";
            }, 100);

            // Close the modal
            btnClose.onclick = function() {
              document.getElementById('world_graph').classList.remove("MainContainer");

              document.getElementById('world_graph').classList.remove("is-blurred");
              modal.className = "Modal is-hidden is-visuallyHidden";
              container.parentElement.class = "main_tab";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
              if (event.target == modal) {
                  modal.className = "Modal is-hidden";
                  document.getElementById('world_graph').classList.remove("MainContainer");

                  document.getElementById('world_graph').classList.remove("is-blurred");
                  container.parentElement.class = "";
              }
            }

            var svg = d3.select("#continentpath")
              .append("svg")
              .attr("width", 200)
              .attr("height", 200)
              .attr("id", "svgwithonepathofcontinent")
              .attr("tranform", "translate(" + 0 + "," + 0 + ")");

            document.getElementById("svgwithonepathofcontinent").appendChild(path.cloneNode());


            var pathy = document.getElementById("svgwithonepathofcontinent").childNodes[0];

            console.log(pathy);

            pathy.setAttribute("x", 50);
            pathy.setAttribute("y", 50);
            pathy.setAttribute("tranform", "translate(" + 30 + "," + 30 + ") !important");



            document.getElementById("popUpContinentTitle").innerHTML = continent;

      }

      ////////////////////COUNTRIES FUNCTIONS//////////////////

      //////////COUNTRIES MAP///////////

      function countries_EcoFoot(){
        var svg = d3.select("#countries_graph")
          .append("svg")
          .attr("id", "chart")
          .attr("width", 600)
          .attr("height", 480)
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

                    // ADD COLOR SCALE LEGEND
                    var w = 400, h = 50;

                    var key = d3.select("#legend1")
                      .append("svg")
                      .attr("width", w)
                      .attr("height", h);

                    var legend = key.append("defs")
                      .append("svg:linearGradient")
                      .attr("id", "gradient")
                      .attr("x1", "0%")
                      .attr("y1", "100%")
                      .attr("x2", "100%")
                      .attr("y2", "100%")
                      .attr("spreadMethod", "pad");

                    legend.append("stop")
                      .attr("offset", "0%")
                      .attr("stop-color", "#DFF4C6")
                      .attr("stop-opacity", 1);

                    legend.append("stop")
                      .attr("offset", "100%")
                      .attr("stop-color", "#607744")
                      .attr("stop-opacity", 1);

                    key.append("rect")
                      .attr("width", w)
                      .attr("height", h - 30)
                      .style("fill", "url(#gradient)")
                      .attr("transform", "translate(20,10)");

                    var y = d3.scaleLinear()
                      .range([400, 0])
                      .domain([maxValColorCouFT, minValColorCouFT]);

                    var yAxis = d3.axisBottom()
                      .scale(y)
                      .ticks(5)
                      .tickFormat( function(d) {
                        return (d/1000000).toFixed()+ " M"
                      });


                    key.append("g")
                      .attr("class", "y axis")
                      .attr("transform", "translate(20,30)")
                      .call(yAxis)
                      .append("text")
                      .attr("transform", "rotate(-90)")
                      .attr("y", 0)
                      .attr("dy", ".71em")
                      .style("text-anchor", "end")
                      .text("axis title");

          });

        });

        autocomplete(document.getElementById("myInput"), countries_list);

      }

      function countries_Biocapacity(){
              var svg = d3.select("#countries_graph")
                .append("svg")
                .attr("id", "chart")
                .attr("width", 600)
                .attr("height", 480);

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

        if(continent_to_light=="Antarctica"){
          return "#bfbfbf"


        }else{

              if(lastContinentSearched == valueinput_continent){
                highlightContinent("search", valueinput_continent );

                continent_to_light.style("fill", function(valueinput_continent){

                    if(variableToShow=="EcoFoot"){
                          var yeartoshow = "_"+yearTimeline+"";
                          var value = valueinput_continent.properties.efgha[yeartoshow].total_efgha;

                          stackedAreaChartContinent(valueinput_continent.properties);

                          if(value){
                              return ramp(minValColorContFT,lowColorEF, highColorEF, "mouseEF")
                            } else {
                              return "#bfbfbf"
                            }
                    }else if(variableToShow=="Biocapacity"){
                        var yeartoshow = "_"+yearTimeline+"";
                        var value = valueinput_continent.properties.biogha[yeartoshow].total_biogha;
                        stackedAreaChartContinent(valueinput_continent.properties);

                        if(value){
                          return ramp(minValColorContB,lowColorB, highColorB, "mouseB")
                        } else {
                          return "#bfbfbf"
                        }
                    }

                })

              }else{

                highlightContinent("search", valueinput_continent);
                unhighlightContinent("search", lastContinentSearched);

                continent_to_light.style("fill", function(valueinput_continent){

                    if(variableToShow=="EcoFoot"){
                          var yeartoshow = "_"+yearTimeline+"";
                          var value = valueinput_continent.properties.efgha[yeartoshow].total_efgha;
                          stackedAreaChartContinent(valueinput_continent.properties);

                          if(value){
                              return ramp(minValColorContFT,lowColorEF, highColorEF, "mouseEF")
                            } else {
                              return "#bfbfbf"
                            }
                    }else if(variableToShow=="Biocapacity"){
                        var yeartoshow = "_"+yearTimeline+"";
                        var value = valueinput_continent.properties.biogha[yeartoshow].total_biogha;
                        stackedAreaChartContinent(valueinput_continent.properties);

                        if(value){
                          return ramp(minValColorContB,lowColorB, highColorB, "mouseB")
                        } else {
                          return "#bfbfbf"
                        }
                    }

                })

              }

              lastContinentSearched = valueinput_continent;
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

function round(value, precision){

    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value*multiplier)/multiplier;
}
