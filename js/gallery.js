jQuery(function($){
  
    var nextphoto = 0;
    var photolist$ = $('#photolist li img');
    var photocount = photolist$.length;
    var timer;
    
    var div_icons_wrapper$ = $('<div id="icons_wrapper"></div>');
    var div_icons$ = $('<div id="icons"></div>');
    div_icons_wrapper$.append(div_icons$);
    div_icons_wrapper$.append('<p id="start"><i class="fa fa-play-circle"></i></p>');
    $('#mainphoto').after(div_icons_wrapper$ );
    for(var i = 0; i < photocount; i++){
       var icon_alt = photolist$.eq(i).attr('alt');
       div_icons$.append('<div class="icon" title="' + icon_alt + '">');
    }
    var icon$ = $('div.icon');
    var icon_count = icon$.length;
    div_icons$.width(25 * icon_count);
    icon$.eq(nextphoto).attr('class', 'icon icon_selected');
    
    function showphoto() {
      cross_fade(nextphoto);
      nextphoto = ( ++ nextphoto) % photocount;
      timer = window.setTimeout(showphoto,3000);
    }
    showphoto();
    
    var is_animated;
    function cross_fade(index) {
      is_animated = true;
      icon$.attr('class', 'icon').css({cursor: 'pointer'});
      icon$.eq(index).attr('class', 'icon icon_selected').css({cursor: 'default', opacity: 0.4}).animate({opacity: 1.0}, 1300);	
      var src = photolist$.eq(index).attr('src');
      var nextimg = '<img src="' + src + '" width="480" height="360" >';
      $('#mainphoto img').before(nextimg);
    //   $('#title').text(alt).hide().fadeIn(1000);
      $('#mainphoto img:last').fadeOut(1000, function(){
        $(this).remove();
        is_animated = false;
      });
    }
    
    $(document).on('click', '#start', function() {
      showphoto();
      $(this).css("display", "none");
      return false;
    });
    
    $(document).on('click', 'div.icon', function() {
      if($(this).hasClass('icon_selected') || is_animated) {
        return false;
      }
      var icon_index = icon$.index($(this));
      window.clearTimeout(timer);
      cross_fade(icon_index);
      nextphoto = icon_index;	
      $('#start').css("display", "block");
    });
    
    $(document).on('mouseover', 'div.icon', function() {
      if(!$(this).hasClass('icon_selected')) {
        $(this).addClass('icon_hover');
      }		
    });
    
    $(document).on('mouseout', 'div.icon', function() {
      if(!$(this).hasClass('icon_selected')) {
        icon$.removeClass('icon_hover');
      }		
    });
    
    $(window).on("unload", function(e){
      window.clearTimeout(timer);
    }); 
   
  });