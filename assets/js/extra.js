

window.onload = function(){
  
  

  /*document.getElementById("").onmouseover = function(){

  }*/
  document.getElementById("agent-email-1").onmouseover = function(){
      document.getElementById("agent-email-1").style.display = "none";
      document.getElementById("agent-email-2").style.display = "block";
  }

  document.getElementById("agent-email-2").onmouseleave = function(){
      document.getElementById("agent-email-2").style.display = "none";
      document.getElementById("agent-email-1").style.display = "block";
  }

  document.getElementById("agent-phone-1").onmouseover = function(){
      document.getElementById("agent-phone-1").style.display = "none";
      document.getElementById("agent-phone-2").style.display = "block";
  }

  document.getElementById("agent-phone-2").onmouseleave = function(){
      document.getElementById("agent-phone-2").style.display = "none";
      document.getElementById("agent-phone-1").style.display = "block";
  }

}


