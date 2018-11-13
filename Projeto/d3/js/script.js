$( document ).ready(function() {
      $(".switch-input").on("click", function(){
          if(this.value == "week"){
            document.getElementById('continents_view').style.visibility = "visible" ;
            document.getElementById('countries_view').style.visibility = "hidden" ;
          }else{
            document.getElementById('continents_view').style.visibility = "hidden" ;
            document.getElementById('countries_view').style.visibility = "visible" ;
          }

      });


      $(".switchebinput").on("click", function(){
          if(this.value == "weekeb"){
            console.log("Ecofootprint")
          }else{
            console.log("Biocapacity")

          }

      });







////////////////////D3//////////////////


      var dispatch = d3.dispatch("countryEnter");
      var selectedCountry;
      //Width and height
      var w = 1000;
      var h = 800;

      var margin = {
          top: 0,
          bottom: 0,
          left: 0,
          right:0
        };

      var width = w - margin.left - margin.right;
      var height = h - margin.top - margin.bottom;


      // define map projection
      var projection = d3.geoEquirectangular()
                          .translate([w/2, h/2])
                          .scale([200]);

      //Define default path generator
      var path = d3.geoPath().projection(projection);

      var svg = d3.select("#world_graph")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("tranform", "translate(0" + margin.left + "," + margin.top + ")");

      var color = d3.scaleQuantile()
                    .range(["rgb(237, 248, 233)", "rgb(186, 228, 179)", "rgb(116,196,118)", "rgb(49,163,84)", "rgb(0,109,44)"]);




      d3.json("../data/CountryOutput.json").then(function(json){

        data = json.data;
        var count =0;

        d3.json("../data/GeoJson.json").then(function(geojson){

            datageo = geojson;
            console.log(datageo.features.length)
            console.log(data.length)
            var wrongCountries = [""];
            console.log(geojson);
            for(var i = 0; i < data.length; i++){
                // grab state name
                var dataCountry = data[i].country_region;
                var wrong=0;

                //grab data value, and convert from string to float
                //var dataValue = parseFloat(data[i].value);

                //find the corresponding state inside the GeoJSON
                for(var n = 0; n < datageo.features.length; n++){

                    // properties name gets the states name
                    var jsonState = datageo.features[n].properties.NAME;
                    var jsonState1 = datageo.features[n].properties.FORMAL_EN;
                    var jsonState2 = datageo.features[n].properties.NAME_LONG;

                    // if statment to merge by name of state
                    if(dataCountry == jsonState || dataCountry == jsonState1 || dataCountry == jsonState2){
                      //Copy the data value into the JSON
                      // basically creating a new value column in JSON data
                      //data.features[n].properties.value = dataValue;
                      count+=1;
                      wrong = 0;
                      //stop looking through the JSON
                      break;

                    }else if ( dataCountry != jsonState && dataCountry != jsonState1 && dataCountry != jsonState2 && wrong == 254){
                      wrongCountries.push(dataCountry);

                    }else{
                        wrong+=1;
                    }
                }
            }

            for (var wc = 0; wc < wrongCountries.length; wc++) {
              if(wrongCountries[wc]== ""){
                console.log(wrongCountries)
              }else{
                // for (var c = 0; c < datageo.features.length; c++) {
                //
                //       var jsonState = datageo.features[c].properties.FORMAL_EN;
                //
                //       if (/\s/.test(jsonState)) {
                //
                //             var split1 = wrongCountries[wc].split(" ");
                //             var split2 = jsonState.split(" ");
                //
                //             for(var word = 0; n < split1.length; n++){
                //               for(var word1 = 0; n < split2.length; n++){
                //                 if(word == word1){
                //                   count += 1;
                //                   break;
                //                 }
                //               }
                //             }
                //         }
                //
                //
                // }
              }

            }
            console.log(count);


        svg.selectAll("path")
          .data(datageo.features)
          .enter()
          .append("path")
          .attr("d", path)
            .style("fill", function(d){
                //get the data value
                var value = d.properties.value;

                if(value){
                  //If value exists
                  return color(value+200);
                } else {
                  // If value is undefined
                  //we do this because alaska and hawaii are not in dataset we are using but still in projections
                  return "#7a7a52"
                }


            })
            .attr("title", function(d) {return d.properties.NAME;})
            .on("mouseover", function(d){
            //dispatch.call("countryEnter",d,d);
              selectedCountry = d3.select("path[title=\'"+d.properties.NAME+"\']");
              d3.select("path[title=\'"+d.properties.NAME+"\']").attr("fill", "black")
                              .text(d.properties.NAME);
            })
            .on("mouseout", function(d){
              if(selectedCountry!= null){
                selectedCountry.attr("fill", "#7a7a52");
                selectedCountry = null;
              }
            })
            .on("mouseenter", function(d){
              //dispatch.call("countryEnter",d,d);
                selectedCountry = d3.select("path[title=\'"+d.properties.NAME+"\']");
                d3.select("path[title=\'"+d.properties.NAME+"\']").attr("fill", "black")
                                .text(d.properties.NAME);
            })
            .on("mouseleave", function(d){
              if(selectedCountry!= null){
                selectedCountry.attr("fill", "#7a7a52");
                selectedCountry = null;
              }
            });

        });
      });











});
