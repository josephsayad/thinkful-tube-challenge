$(document).ready(function() {
  $('#search-term').submit(function(event) {
    event.preventDefault();
  	var content = $('#query').val();
    getRequest(content);
  });
});

function getRequest(content) {
  var params = {
    part: 'snippet', 
    key: 'AIzaSyDU5TxCqgMA56IhiguoBwpByEOows0YS0c',
    q: content || 'the science of coffee',
    maxResults: 25
  }; 
  url = 'https://www.googleapis.com/youtube/v3/search';
  $.getJSON(url, params, function(data) {
    console.log(data);
    showResults(data.items);
    showSpecs();
  });
}

function showResults(item) {
  var html = '', counter = 0;
  for (var i = 0; i < item.length; i++) {
    if (item[i].id.kind == 'youtube#video') {
      html += '<li class="list-item"><div id="specs"><h2 class="title">Title:   '+ item[i].snippet.title +'</h2><h2 class="channel-name">Channel-name:   '+ item[i].snippet.channelTitle +'</h2><h2 class="upload-date">Uploaded On:   '+ item[i].snippet.publishedAt +'</h2></div><a target="_blank" href= "https://www.youtube.com/watch?v='+ item[i].id.videoId +'"><img src="' + item[i].snippet.thumbnails.medium.url + '" alt = "thumbnail"/></a><div class="title-wrapper"><h1 class="name">Show Video Specifications</h1><h1 class="hide">Hide Specifications</h1></li>';
      counter++;
      if (counter == 12) {
        break;
      }
    }
  }
  $('li').remove();
  $('#list').append(html).hide().delay(500).fadeIn('slow');
}

function showSpecs() {
  $('.title-wrapper').on('click', '.name', function() {
    $(this).parent().parent().find('a').hide();
    $(this).parent().parent().find('#specs').slideDown();
    $(this).hide();
    $(this).parent().find('.hide').show();
  });
  $('.title-wrapper').on('click', '.hide', function() {
    $(this).parent().parent().find('a').show();
    $(this).parent().parent().find('#specs').hide();
    $(this).hide();
    $(this).parent().find('.name').show();
  });
}