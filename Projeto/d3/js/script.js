$( document ).ready(function() {

      var variableToShow = "EcoFoot";
      var appendTo = "#world_graph";

      continents_EcoFoot();

      $(".switch-input").on("click", function(){
          if(this.value == "week"){
                if(variableToShow == "EcoFoot"){
                  document.getElementById('continents_view').style.visibility = "visible" ;
                  document.getElementById('countries_view').style.visibility = "hidden" ;
                  var appendTo = "#world_graph";
                  continents_EcoFoot();
                }else{
                  document.getElementById('continents_view').style.visibility = "visible" ;
                  document.getElementById('countries_view').style.visibility = "hidden" ;
                  var appendTo = "#world_graph";
                  continents_Biocapacity();
                }
          }else{
              if(variableToShow == "EcoFoot"){
                  document.getElementById('continents_view').style.visibility = "hidden" ;
                  document.getElementById('countries_view').style.visibility = "visible" ;
                  var appendTo = "#countries_graph"
                  countries_EcoFoot();

              }else{
                  document.getElementById('continents_view').style.visibility = "hidden" ;
                  document.getElementById('countries_view').style.visibility = "visible" ;
                  var appendTo = "#countries_graph"
                  countries_Biocapacity();
              }
          }
      });

      $(".switchebinput").on("click", function(){
          if(this.value == "weekeb" && appendTo == "#countries_graph"){
            variableToShow = "EcoFoot";
            countries_EcoFoot();

          }else if(this.value == "montheb"  && appendTo == "#countries_graph"){
            variableToShow = "Biocapacity";
            countries_Biocapacity();

          }else if(this.value == "montheb"  && appendTo == "#world_graph"){
            variableToShow = "Biocapacity";
            continents_Biocapacity();

          }else if(this.value == "weekeb"  && appendTo == "#world_graph"){
            variableToShow = "EcoFoot";
            continents_EcoFoot();

          }

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


      function continents_EcoFoot(){


      }


      function continents_Biocapacity(){


      }


      function countries_EcoFoot(){
        var svg = d3.select("#countries_graph")
          .append("svg")
          .attr("id", "chart")
          .attr("width", w)
          .attr("height", h)
          .attr("tranform", "translate(" + 0 + "," + 500 + ")");

          // .append("g")
          // .attr("tranform", "translate(0" + margin.left + "," + margin.top + ")")
          // .attr("tranform", "slice(0,0)");

        d3.json("../data/CountryOutput.json").then(function(json){

          data = json.data;
          console.log(data)
          var count =0;
          var dataArray = new Array();

          d3.json("../data/GeoJson.json").then(function(geojson){

              datageo = geojson;
              var wrongCountries = [""];

              for(var i = 0; i < data.length; i++){


                  // grab country name
                  var dataCountry = data[i].country_region;
                  var wrong=0;

                  //find the corresponding state inside the GeoJSON
                  for(var n = 0; n < datageo.features.length; n++){

                      // properties name gets the states name
                      var jsonState = datageo.features[n].properties.NAME;
                      var jsonState1 = datageo.features[n].properties.FORMAL_EN;
                      var jsonState2 = datageo.features[n].properties.NAME_LONG;

                      // if statment to merge by name of state
                      if(dataCountry == jsonState || dataCountry == jsonState1 || dataCountry == jsonState2){

                        //grab data value, and convert from string to float
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

                        dataArray.push(totalEcoFootCons);




                        //Copy the data value into the JSON
                        // basically creating a new value column in JSON data
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


                        count+=1;
                        wrong = 0;

                        //var datawhat = topojson.feature(data[i], datageo.feautures[n].bbox, datageo.feautures[n].geometry, datageo.feautures[n].properties);

                        console.log(datageo)


                        //stop looking through the JSON
                        break;


                      }else if ( dataCountry != jsonState && dataCountry != jsonState1 && dataCountry != jsonState2 && wrong == 254){
                        wrongCountries.push(dataCountry);

                      }else{
                          wrong+=1;
                      }
                  }


              }



              var minVal = d3.min(dataArray)
              var maxVal = d3.max(dataArray)

              var ramp = d3.scaleLinear().domain([minVal,10]).range([lowColorEF, highColorEF])


              console.log(dataArray)
              console.log(minVal)
              console.log(maxVal)

              //var color_scalee = d3.scaleLinear.quantize().domain([minVal, maxVal]).range(['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']);
            //  var color = d3.scaleQuantile().domain([0, maxVal]).range(["rgb(237, 248, 233)", "rgb(186, 228, 179)", "rgb(116,196,118)", "rgb(49,163,84)", "rgb(0,109,44)"]);




                      // svg.append("path")
                      //     .datum(topojson.mesh(data))
                      //     .attr("class", "mesh")
                      //     .attr("d", path);
                      //
                      // svg.selectAll("d")
                      //   .data(topojson.feature(data, data.objects.subunits).features)
                      // .enter().append("path")
                      //   .attr("class", function(d) { return "subunit " + d.id; })
                      //   .attr("d", path);



              svg.selectAll("path")
                .data(datageo.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("fill", function(d){
                  var value = d.properties.totalEcoFootCons;

                      if(value){
                        return ramp(value);
                      } else {
                        return "#bfbfbf"
                      }
                })
                .style("stroke", "#333333")
                .style("stroke-width", "0.2px" )
                .attr("title", function(d) {return d.properties.NAME;})
                .on("mouseover", function(d){
                    d3.select("path[title=\'"+d.properties.NAME+"\']")
                      .style("fill", function(d){
                              var value = d.properties.totalEcoFootCons;

                                  if(value){
                                    return ramp(value+2);
                                  } else {
                                    return "#bfbfbf"
                                  }
                      })

                  })
                  .on("mouseout", function(d){
                      d3.select("path[title=\'"+d.properties.NAME+"\']")
                        .style("fill", function(d){
                                var value = d.properties.totalEcoFootCons;

                                    if(value){
                                      return ramp(value);
                                    } else {
                                      return "#bfbfbf"
                                    }
                        })
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



      function countries_Biocapacity(){
              var svg = d3.select("#countries_graph")
                .append("svg")
                .attr("id", "chart")
                .attr("width", w)
                .attr("height", h);
                // .append("g")
                // .attr("tranform", "translate(0" + margin.left + "," + margin.top + ")")
                // .attr("tranform", "slice(0,0)");

              d3.json("../data/CountryOutput.json").then(function(json){

                data = json.data;
                console.log(data)
                var count =0;
                var dataArray = new Array();

                d3.json("../data/GeoJson.json").then(function(geojson){

                    datageo = geojson;
                    var wrongCountries = [""];

                    for(var i = 0; i < data.length; i++){


                        // grab country name
                        var dataCountry = data[i].country_region;
                        var wrong=0;

                        //find the corresponding state inside the GeoJSON
                        for(var n = 0; n < datageo.features.length; n++){

                            // properties name gets the states name
                            var jsonState = datageo.features[n].properties.NAME;
                            var jsonState1 = datageo.features[n].properties.FORMAL_EN;
                            var jsonState2 = datageo.features[n].properties.NAME_LONG;

                            // if statment to merge by name of state
                            if(dataCountry == jsonState || dataCountry == jsonState1 || dataCountry == jsonState2){

                              //grab data value, and convert from string to float
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

                              dataArray.push(totalBiocapacity);




                              //Copy the data value into the JSON
                              // basically creating a new value column in JSON data
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


                              count+=1;
                              wrong = 0;

                              //var datawhat = topojson.feature(data[i], datageo.feautures[n].bbox, datageo.feautures[n].geometry, datageo.feautures[n].properties);


                              console.log(datageo)


                              //stop looking through the JSON
                              break;


                            }else if ( dataCountry != jsonState && dataCountry != jsonState1 && dataCountry != jsonState2 && wrong == 254){
                              wrongCountries.push(dataCountry);

                            }else{
                                wrong+=1;
                            }
                        }


                    }



                    var minVal = d3.min(dataArray)
                    var maxVal = d3.max(dataArray)

                    var ramp = d3.scaleLinear().domain([minVal,10]).range([lowColorB, highColorB])


                    console.log(dataArray)
                    console.log(minVal)
                    console.log(maxVal)

                    //var color_scalee = d3.scaleLinear.quantize().domain([minVal, maxVal]).range(['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']);
                  //  var color = d3.scaleQuantile().domain([0, maxVal]).range(["rgb(237, 248, 233)", "rgb(186, 228, 179)", "rgb(116,196,118)", "rgb(49,163,84)", "rgb(0,109,44)"]);




                            // svg.append("path")
                            //     .datum(topojson.mesh(data))
                            //     .attr("class", "mesh")
                            //     .attr("d", path);
                            //
                            // svg.selectAll("d")
                            //   .data(topojson.feature(data, data.objects.subunits).features)
                            // .enter().append("path")
                            //   .attr("class", function(d) { return "subunit " + d.id; })
                            //   .attr("d", path);



                    svg.selectAll("path")
                      .data(datageo.features)
                      .enter()
                      .append("path")
                      .attr("d", path)
                      .style("fill", function(d){
                        var value = d.properties.totalBiocapacity;

                            if(value){
                              return ramp(value);
                            } else {
                              return "#bfbfbf"
                            }
                      })
                      .style("stroke", "#333333")
                      .style("stroke-width", "0.2px" )
                      .attr("title", function(d) {return d.properties.NAME;})
                      .on("mouseover", function(d){
                          d3.select("path[title=\'"+d.properties.NAME+"\']")
                            .style("fill", function(d){
                                    var value = d.properties.totalBiocapacity;

                                        if(value){
                                          return ramp(value+2);
                                        } else {
                                          return "#bfbfbf"
                                        }
                            })

                        })
                        .on("mouseout", function(d){
                            d3.select("path[title=\'"+d.properties.NAME+"\']")
                              .style("fill", function(d){
                                      var value = d.properties.totalBiocapacity;

                                          if(value){
                                            return ramp(value);
                                          } else {
                                            return "#bfbfbf"
                                          }
                              })
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











});
