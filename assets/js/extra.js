jQuery(document).ready(function(){
  //$("#mapimageresult").stickit({ top: 0, bottom: 30,zIndex: 1000 });
  //$("#mapresult").stickit({ top: 18, zIndex: 100});

  $( window ).resize(function() {
    if($(window).width() < 1030){
      $('#mapresult').stickit('destroy');
    }else{
      $("#mapimageresult").stickit('refresh');
      $("#mapresult").stickit('refresh');
    }
  });
});