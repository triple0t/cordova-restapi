
$(document).ready(function(){

  App.controller('home', function (page) {

    $(page).find('#mybtn').on('click', function(){
      var title =   $(page).find('#f1').val();
      var content = $(page).find('#f2').val();

      var data = {
        "title": title,
        "content": content,
        "status": "publish"
      }

      var dataToSend = JSON.stringify(data);
     
      $.ajax({
        type: 'POST',
        url: 'http://localhost/mobileclass/wp-json/wp/v2/posts',
        data: dataToSend,
        headers: {
          "Authorization": "Basic YWRtaW46YmlQZGVBWVdrRGRvUE1qTmlrcWswY2sx"
        },
        contentType: 'application/json',
        success: function(res){
          console.log(res);

          alert('Post Created');

          loadPosts();
        },
        error: function(err){
          console.log(err);

          alert(JSON.stringify(err));
        }
      })

        
    });

    $(page).find('#loadPosts').on('click', loadPosts);

    function loadPosts(){
      $.ajax({
        type: 'GET',
        url: "http://localhost/mobileclass/wp-json/wp/v2/posts",
        dataType: 'json',
        success: function(newdata){
          $(page).find('#body').html('');

          for (var i = 0; i < newdata.length; i++) {
            var h2 = '<h2>'+ newdata[i].title.rendered + '</h2>';
            var p = '<p>'+newdata[i].content.rendered  + '</p>';
          
            $(page).find('#body').append('<div class="app-section">'+ h2 + p   +'</div>');
          }
        },
        error: function(err){
          console.log(err);
        }
      });
    }

  });


  try {
    App.restore();
  } catch (err) {
    App.load('home');
  } 

});