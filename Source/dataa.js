var maxVideos = 3;
var content;

$(document).ready(function(){

  //get the videos dimension
  $.get(
    "https://www.googleapis.com/youtube/v3/videos",{
      part: 'snippet',
      chart: 'mostPopular',
      kind: 'youtube#videoListResponse',
      maxResults: maxVideos,
      regionCode: 'PT',
      key: 'AIzaSyDt1xT1UQe92i_0py55F5l7AQPY8hKsyhY'},
      function(data){
        var output;
        content = data;
        $.each(data.items, function(i, item){
          console.log(item);
                videTitle = item.snippet.title;
                vidId = item.snippet.id;
                description = item.snippet.description;
                thumb = item.snippet.thumbnails.high.url;
                channelTitle = item.snippet.channelTitle;
                videoDate = item.snippet.publishedAt;
                Catagoryid = item.snippet.categoryId;
                cID = item.snippet.channelId;
          output = '<div class="maindiv"><div>' +
                        '<a data-fancybox-type="iframe" class="fancyboxIframe" href="watch.php?v=' + vidId + '" target="_blank" ><img src="' + thumb + '" class="img-responsive thumbnail" ></a>' +
                        '</div>' +
                        '<div class="input-group col-md-6">' +
                            '<h3 class="Vtitle"><a data-fancybox-type="iframe" class="fancyboxIframe" href="watch.php?v=' + vidId + '" target="_blank">' + videTitle + '</a></h3>'+
                        '</div><div  id="cTitle"><a href="https://www.youtube.com/channel/'+cID+'" target="_blank">'+channelTitle+'</a></div></div>' +
                    '<div class="clearfix"></div>';
          $('#trending').append(output);



          // var hiddenElement = document.createElement('a');
          //
          // hiddenElement.href = 'data:attachment/text,' + JSON.stringify(content);
          // hiddenElement.target = '_blank';
          // hiddenElement.download = 'myFile.txt';
          // hiddenElement.click();
          // console.log(encodeURI(JSON.stringify(content)));
        })
      }

    );


  //  part: 'id,snippet,contentDetails,fileDetails,localizations,player,processingDetails,statistics,status,suggestions,topicDetails',


    // $.get(
    //   "https://www.googleapis.com/youtube/v3/videos",{
    //     part: 'id,snippet,player,statistics,status,localizations',
    //     chart: 'mostPopular',
    //     kind: 'youtube#videoListResponse',
    //     maxResults: maxVideos,
    //     regionCode: 'PT',
    //     orderBy: 'viewCount',
    //     publishedBefore: '2007-01-07T00:00:01.000Z',
    //     publishedAfter: '2007-01-01T00:00:01.000Z',
    //     key: 'AIzaSyDt1xT1UQe92i_0py55F5l7AQPY8hKsyhY'},
    //     function(data){
    //       var output;
    //       $.each(data.items, function(i, item){
    //         console.log(item);
    //               videTitle = item.snippet.title;
    //               vidId = item.snippet.id;
    //               description = item.snippet.description;
    //               thumb = item.snippet.thumbnails.high.url;
    //               channelTitle = item.snippet.channelTitle;
    //               videoDate = item.snippet.publishedAt;
    //               Catagoryid = item.snippet.categoryId;
    //               cID = item.snippet.channelId;
    //         output = '<div class="maindiv"><div>' +
    //                       '<a data-fancybox-type="iframe" class="fancyboxIframe" href="watch.php?v=' + vidId + '" target="_blank" ><img src="' + thumb + '" class="img-responsive thumbnail" ></a>' +
    //                       '</div>' +
    //                       '<div class="input-group col-md-6">' +
    //                           '<h3 class="Vtitle"><a data-fancybox-type="iframe" class="fancyboxIframe" href="watch.php?v=' + vidId + '" target="_blank">' + videTitle + '</a></h3>'+
    //                       '</div><div  id="cTitle"><a href="https://www.youtube.com/channel/'+cID+'" target="_blank">'+channelTitle+'</a></div></div>' +
    //                   '<div class="clearfix"></div>';
    //         $('#trending1').append(output);
    //       })
    //
    //     }
    //   );






    // $.get(
    //   "https://www.googleapis.com/youtube/v3/search",{
    //     part: 'snippet',
    //     type: 'video',
    //     videoCategoryId: '30',
    //     order: 'viewCount',
    //     channelType: 'any',
    //     kind: 'youtube#searchListResponse',
    //     maxResults: maxVideos,
    //     key: 'AIzaSyDt1xT1UQe92i_0py55F5l7AQPY8hKsyhY'},
    //     function(data){
    //       var output1;
    //       $.each(data.items, function(i, item){
    //         console.log(item);
    //         //       videTitle = item.snippet.title;
    //         //       vidId = item.snippet.id;
    //         //       description = item.snippet.description;
    //         //       thumb = item.snippet.thumbnails.high.url;
    //         //       channelTitle = item.snippet.channelTitle;
    //         //       videoDate = item.snippet.publishedAt;
    //         //       Catagoryid = item.snippet.categoryId;
    //         //       cID = item.snippet.channelId;
    //         // output1 = '<div class="maindiv"><div>' +
    //         //               '<a data-fancybox-type="iframe" class="fancyboxIframe" href="watch.php?v=' + vidId + '" target="_blank" ><img src="' + thumb + '" class="img-responsive thumbnail" ></a>' +
    //         //               '</div>' +
    //         //               '<div class="input-group col-md-6">' +
    //         //                   '<h3 class="Vtitle"><a data-fancybox-type="iframe" class="fancyboxIframe" href="watch.php?v=' + vidId + '" target="_blank">' + videTitle + '</a></h3>'+
    //         //               '</div><div  id="cTitle"><a href="https://www.youtube.com/channel/'+cID+'" target="_blank">'+channelTitle+'</a></div></div>' +
    //         //           '<div class="clearfix"></div>';
    //         // $('#trending1').append(output1);
    //       })
    //
    //     }
    //   );



      $.get(
        "https://www.googleapis.com/youtube/v3/search",{
          part: 'snippet',
          order: 'viewCount',
          publishedBefore: '2012-01-07T00:00:01.000Z',
          publishedAfter: '2012-01-01T00:00:01.000Z',
          kind: 'youtube#searchListResponse',
          regionCode: 'PT',
          maxResults: maxVideos,
          key: 'AIzaSyDt1xT1UQe92i_0py55F5l7AQPY8hKsyhY'},
          function(data){
            var output1;
            $.each(data.items, function(i, item){
              console.log(item);
                    videTitle = item.snippet.title;
                    vidId = item.snippet.id;
                    description = item.snippet.description;
                    thumb = item.snippet.thumbnails.high.url;
                    channelTitle = item.snippet.channelTitle;
                    videoDate = item.snippet.publishedAt;
                    Catagoryid = item.snippet.categoryId;
                    cID = item.snippet.channelId;
              output1 = '<div class="maindiv"><div>' +
                            '<a data-fancybox-type="iframe" class="fancyboxIframe" href="watch.php?v=' + vidId + '" target="_blank" ><img src="' + thumb + '" class="img-responsive thumbnail" ></a>' +
                            '</div>' +
                            '<div class="input-group col-md-6">' +
                                '<h3 class="Vtitle"><a data-fancybox-type="iframe" class="fancyboxIframe" href="watch.php?v=' + vidId + '" target="_blank">' + videTitle + '</a></h3>'+
                            '</div><div  id="cTitle"><a href="https://www.youtube.com/channel/'+cID+'" target="_blank">'+channelTitle+'</a></div></div>' +
                        '<div class="clearfix"></div>';
              $('#trending1').append(output1);
            })

          }
        );



      //get the videos dimension by age
      $.get(
        "https://www.googleapis.com/youtube/v3/videos",{
          part: 'snippet',
          chart: 'mostPopular',
          kind: 'youtube#videoListResponse',
          maxResults: maxVideos,
          regionCode: 'US',
          ageGroup: 'age65-',
          key: 'AIzaSyDt1xT1UQe92i_0py55F5l7AQPY8hKsyhY'},
          function(data){
            var output;
            $.each(data.items, function(i, item){
              console.log(item);
                    videTitle = item.snippet.title;
                    vidId = item.snippet.id;
                    description = item.snippet.description;
                    thumb = item.snippet.thumbnails.high.url;
                    channelTitle = item.snippet.channelTitle;
                    videoDate = item.snippet.publishedAt;
                    Catagoryid = item.snippet.categoryId;
                    cID = item.snippet.channelId;
              output = '<div class="maindiv"><div>' +
                            '<a data-fancybox-type="iframe" class="fancyboxIframe" href="watch.php?v=' + vidId + '" target="_blank" ><img src="' + thumb + '" class="img-responsive thumbnail" ></a>' +
                            '</div>' +
                            '<div class="input-group col-md-6">' +
                                '<h3 class="Vtitle"><a data-fancybox-type="iframe" class="fancyboxIframe" href="watch.php?v=' + vidId + '" target="_blank">' + videTitle + '</a></h3>'+
                            '</div><div  id="cTitle"><a href="https://www.youtube.com/channel/'+cID+'" target="_blank">'+channelTitle+'</a></div></div>' +
                        '<div class="clearfix"></div>';
              $('#trending2').append(output);
            })

          }
        );

});
