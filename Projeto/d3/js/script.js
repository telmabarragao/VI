$( document ).ready(function() {

      var variableToShow = "EcoFoot";
      var appendTo = "#world_graph";
      var countries_list = [];
      var continents_list = [];


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
          .attr("tranform", "translate(" + 0 + "," + 0 + ")");

          // .append("g")
          // .attr("tranform", "translate(0" + margin.left + "," + margin.top + ")")
          // .attr("tranform", "slice(0,0)");

        d3.json("../data/CountryOutput.json").then(function(json){

          data = json.data;
          console.log(data)
          var dataArray = new Array();

          d3.json("../data/GeoJson.json").then(function(geojson){

              datageo = geojson;

              for(var i = 0; i < data.length; i++){

                  // grab country name
                  var dataCountry = data[i].country_region;
                  countries_list.push(dataCountry);


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

                        //var datawhat = topojson.feature(data[i], datageo.feautures[n].bbox, datageo.feautures[n].geometry, datageo.feautures[n].properties);

                        console.log(datageo)
                        //stop looking through the JSON
                        break;


                      }else{
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

        autocomplete(document.getElementById("myInput"), countries_list);

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
                var dataArray = new Array();

                d3.json("../data/GeoJson.json").then(function(geojson){

                    datageo = geojson;

                    for(var i = 0; i < data.length; i++){

                        // grab country name
                        var dataCountry = data[i].country_region;
                        countries_list.push(dataCountry);

                        console.log(countries_list)

                        autocomplete(document.getElementById("myInput"), countries_list);

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

                              //var datawhat = topojson.feature(data[i], datageo.feautures[n].bbox, datageo.feautures[n].geometry, datageo.feautures[n].properties);

                              console.log(datageo)
                              //stop looking through the JSON
                              break;


                            }else{
                            }
                        }


                    }



                    var minVal = d3.min(dataArray)
                    var maxVal = d3.max(dataArray)

                    var ramp = d3.scaleLinear().domain([minVal,10]).range([lowColorB, highColorB])


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



      ////////////////////SEARCH//////////////////

      function autocomplete(inp, arr) {

        console.log("entrei")
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
