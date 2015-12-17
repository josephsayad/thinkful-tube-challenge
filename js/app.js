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
  });
}

function showResults(item) {
  var html = '', counter = 0;
  for (var i = 0; i < item.length; i++) {
    if (item[i].id.kind == 'youtube#video') {
      html += '<li class="list-item"><a target="_blank" href= "https://www.youtube.com/watch?v='+ item[i].id.videoId +'"><img src="' + item[i].snippet.thumbnails.medium.url + '" alt = "thumbnail"/></a><div class="title-wrapper"><h1 class="name">Show Specifications</h1></div><div id="specs"></div></li>';
      counter++;
      if (counter == 12) {
        break;
      }
    }
  }
  $('li').remove();
  $('#list').append(html).hide().delay(500).fadeIn('slow');
}