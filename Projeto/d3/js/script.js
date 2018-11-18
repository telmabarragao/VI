$( document ).ready(function() {
      var lastCountryOn = null;

      var variableToShow = "EcoFoot";
      var appendTo = "#world_graph";
      var countries_list = [];
      var continents_list = [];
      var minValColorCouFT, maxValColorCouFT;
      var minValColorCouB, maxValColorCouB;
      var minValColorContFT, maxValColorContFT;
      var minValColorContB, maxValColorContB;


      function ramp(minVal, lowColor, highColor, value){

        var colorup = d3.scaleLinear().domain([minVal,10]).range([lowColor, highColor]);

        if(value == "mouseEF"){
          return "#004d12";

        }else if(value == "mouseB"){

          return "#663300";

        }else{
          return colorup(value);

        }
      }

      continents_EcoFootGha();

      $(".switch-input").on("click", function(){

          if(this.value == "week"){
                if(variableToShow == "EcoFoot"){
                  appendTo = "#world_graph";
                  continents_EcoFootGha();

                  document.getElementById('continents_view').style.visibility = "visible" ;
                  document.getElementById('countries_view').style.visibility = "hidden" ;

                }else{
                  appendTo = "#world_graph";
                  continents_Biocapacity();

                  document.getElementById('continents_view').style.visibility = "visible" ;
                  document.getElementById('countries_view').style.visibility = "hidden" ;

                }
          }else{
              if(variableToShow == "EcoFoot"){
                  appendTo = "#countries_graph"
                  countries_EcoFoot();

                  document.getElementById('continents_view').style.visibility = "hidden" ;
                  document.getElementById('countries_view').style.visibility = "visible" ;


              }else{
                  appendTo = "#countries_graph"
                  countries_Biocapacity();

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
              continents_Biocapacity();
            }else{
              continents_Biocapacity();

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

      var myButtonSearch = document.getElementById('submitSearch');

      myButtonSearch.addEventListener('click', function(event) {
        light_up_search();
      });



////////////////////D3//////////////////

      //Width and height
      var w = 960;
      var h = 600;

      var highColorEF = '#00751b'
      var lowColorEF = '#e4e4e4'
      var highColorB = '#994d00'
      var lowColorB = '#fff2e6'

      // define map projection      d3.geoNaturalEarth()
      var projection = d3.geoEquirectangular()
                          .translate([w/2, h/2])
                          .scale(w / 2 / Math.PI);

      //Define default path generator
      var path = d3.geoPath().projection(projection);



      ////////////////////CONTINENTS FUNCTIONS//////////////////


      function continents_EcoFootEarths(){
            var svg = d3.select("#world_graph")
              .append("svg")
              .attr("id", "chart")
              .attr("width", w)
              .attr("height", h)
              .attr("tranform", "translate(" + 0 + "," + 0 + ")");


            d3.json("../data/ContinentsOutput.json").then(function(json){

              data = json.data;
              console.log(data)
              var dataArray = new Array();
              var dataYear = [];

              d3.json("../data/continents.json").then(function(geojson){

                  datageo = geojson;
                  console.log(datageo)

                  for(var i = 0; i < data.length; i++){

                      var dataContinent = data[i].country_name;

                      if(dataContinent == "Central America"){
                        data[i].country_name = "North America";

                        dataContinent = data[i].country_name;
                      }

                      if(continents_list.indexOf(dataContinent) == -1){
                        continents_list.push(dataContinent);
                      }

                      for(var n = 0; n < datageo.features.length; n++){

                          var jsonState = datageo.features[n].properties.CONTINENT;


                          if(dataContinent == jsonState){

                            var year = parseFloat(data[i].year);
                            var record = parseFloat(data[i].Record);

                            if(record == "Earths"){
                              //footprint consumo em earths
                              var built_up_land_efearths = parseFloat(data[i].built_up_land);
                              var carbon_efearths = parseFloat(data[i].Carbon);
                              var cropland_efearths = parseFloat(data[i].Cropland);
                              var fishing_grounds_efearths = parseFloat(data[i].fishing_grounds);
                              var forest_products_efearths = parseFloat(data[i].forest_products);
                              var grazing_land_efearths = parseFloat(data[i].grazing_land);
                              var total_efearths = parseFloat(data[i].Total);


                            }

                            dataArray.push(total_efearths);




                              dataYear.push({key:"year",value:year});
                              dataYear.push({key:"total_efearths",value:total_efearths});
                              dataYear.push({key:"grazing_land_efearths",value:grazing_land_efearths});
                              dataYear.push({key:"forest_products_efearths",value:forest_products_efearths});
                              dataYear.push({key:"fishing_grounds_efearths",value:fishing_grounds_efearths});
                              dataYear.push({key:"cropland_efearths",value:cropland_efearths});
                              dataYear.push({key:"carbon_efearths",value:carbon_efearths});
                              dataYear.push({key:"built_up_land_efearths",value:built_up_land_efearths});
                              datageo.feautures[n].properties.efearths = ({key : dataYear.year, value: dataYear});
                              console.log(datageo)
                              break;



                            // datageo.features[n].properties.total_efearths = total_efearths;
                            // datageo.features[n].properties.grazing_land_efearths = grazing_land_efearths;
                            // datageo.features[n].properties.forest_products_efearths = forest_products_efearths;
                            // datageo.features[n].properties.fishing_grounds_efearths = fishing_grounds_efearths;
                            // datageo.features[n].properties.cropland_efearths = cropland_efearths;
                            // datageo.features[n].properties.carbon_efearths = carbon_efearths;
                            // datageo.features[n].properties.built_up_land_efearths = built_up_land_efearths;
                            //
                            // datageo.features[n].properties.year = year;



                          }else{
                          }
                      }
                  }


                  minValColorContFT = d3.min(dataArray)
                  maxValColorContFT = d3.max(dataArray)


                  svg.selectAll("path")
                    .data(datageo.features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .attr("id", function(d) {return d.properties.NAME.replace(/\s/g, "_").replace(".", "_").replace("(", "").replace(")", "");})
                    .style("fill", function(d){
                      var value = d.properties.totalEcoFootCons;

                          if(value){
                            return ramp(minValColorContFT,lowColorEF, highColorEF, value)
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


      function continents_EcoFootGha(){
            var svg = d3.select("#world_graph")
              .append("svg")
              .attr("id", "chart")
              .attr("width", w)
              .attr("height", h)
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

                                  console.log("last continent " + lastContinentViewed)
                                  console.log("data continent " + dataContinent)
                                  console.log("last state " + lastjsonState)

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
                                  }

                                    //faz push e update do continent
                                    lastContinentViewed = dataContinent;

                                    //dataContYears = allEmpty;
                                    //dataContYears = {};

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

                  }




                  console.log(datageo)
                  minValColorContFT = d3.min(dataArray_efgha)
                  maxValColorContFT = d3.max(dataArray_efgha)


                  svg.selectAll("path")
                    .data(datageo.features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .attr("id", function(d) {return d.properties.CONTINENT.replace(/\s/g, "_");})
                    .style("fill", function(d){
                          var value = d.properties.efgha._2014.total_efgha;

                          if(value){
                            return ramp(minValColorCouFT,lowColorEF, highColorEF, value);
                          } else {
                            return "#bfbfbf"
                          }
                    })
                    .style("stroke", "#333333")
                    .style("stroke-width", "0.2px" )
                    .attr("title", function(d) {return d.properties.CONTINENT;})
                    .on("mouseover", function(d){

                        var mouse = d3.mouse(this);
                        console.log(d.properties.CONTINENT)
                        var countryMouseOver = d.properties.CONTINENT.replace(/\s/g, "_");

                        d3.select("path[title=\'"+d.properties.CONTINENT+"\']")
                          .style("fill", function(d){

                                      var value = d.properties.efgha._2014.total_efgha;

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
                          d3.select("path[title=\'"+d.properties.CONTINENT+"\']")
                            .style("fill", function(d){
                              var value = d.properties.efgha._2014.total_efgha;

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


      function continents_BiocapacityGha(){
        var svg = d3.select("#world_graph")
          .append("svg")
          .attr("id", "chart")
          .attr("width", w)
          .attr("height", h)
          .attr("tranform", "translate(" + 0 + "," + 0 + ")");


        d3.json("../data/ContinentsOutput.json").then(function(json){

          data = json.data;
          console.log(data)
          var dataArray = new Array();
          var dataYear = [];

          d3.json("../data/continents.json").then(function(geojson){

              datageo = geojson;
              console.log(datageo)

              for(var i = 0; i < data.length; i++){

                  var dataContinent = data[i].country_name;

                  if(dataContinent == "Central America"){
                    data[i].country_name = "North America";

                    dataContinent = data[i].country_name;
                  }

                  if(continents_list.indexOf(dataContinent) == -1){
                    continents_list.push(dataContinent);
                  }

                  for(var n = 0; n < datageo.features.length; n++){

                      var jsonState = datageo.features[n].properties.CONTINENT;


                      if(dataContinent == jsonState){

                        var year = parseFloat(data[i].year);
                        var record = parseFloat(data[i].Record);

                        if(record == "BiocapTotGHA"){
                          //biocapacity em earths
                          var built_up_land_biogha = parseFloat(data[i].built_up_land);
                          var carbon_biogha = parseFloat(data[i].Carbon);
                          var cropland_biogha = parseFloat(data[i].Cropland);
                          var fishing_grounds_biogha = parseFloat(data[i].fishing_grounds);
                          var forest_products_biogha = parseFloat(data[i].forest_products);
                          var grazing_land_biogha = parseFloat(data[i].grazing_land);
                          var total_biogha = parseFloat(data[i].Total);

                        }

                        // datageo.features[n].properties.total_biogha = total_biogha;
                        // datageo.features[n].properties.grazing_land_biogha = grazing_land_biogha;
                        // datageo.features[n].properties.forest_products_biogha = forest_products_biogha;
                        // datageo.features[n].properties.fishing_grounds_biogha = fishing_grounds_biogha;
                        // datageo.features[n].properties.cropland_biogha = cropland_biogha;
                        // datageo.features[n].properties.carbon_biogha = carbon_biogha;
                        // datageo.features[n].properties.built_up_land_biogha = built_up_land_biogha;
                        //
                        // datageo.features[n].properties.year = year;
                        // datageo.features[n].properties.record = record;


                        dataArray.push(total_biogha);




                          dataYear.push({key:"year",value:year});
                          dataYear.push({key:"total_biogha",value:total_biogha});
                          dataYear.push({key:"grazing_land_biogha",value:grazing_land_biogha});
                          dataYear.push({key:"forest_products_biogha",value:forest_products_biogha});
                          dataYear.push({key:"fishing_grounds_biogha",value:fishing_grounds_biogha});
                          dataYear.push({key:"cropland_biogha",value:cropland_biogha});
                          dataYear.push({key:"carbon_biogha",value:carbon_biogha});
                          dataYear.push({key:"built_up_land_biogha",value:built_up_land_biogha});
                          datageo.feautures[n].properties.biogha = ({key : dataYear.year, value: dataYear});

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




      ////////////////////COUNTRIES FUNCTIONS//////////////////


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



      }



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
