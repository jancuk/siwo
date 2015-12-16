var posts;
var port = chrome.extension.connect({name: "share connector"})

document.addEventListener('DOMContentLoaded', function () {
   Authenticate.loadCredentials();
   Authenticate.listApi();
   $("#login").click(function(){
     Authenticate.postData();
   });
   $("#submit").click(function(){
     Authenticate.saveCredentials();
   });
   $("#button_clear").click(function(){
     Authenticate.deleteCredentials();
   });
   $("#messagePost").click(function(){
     Authenticate.postMessage();
   });
});

var Authenticate = {
  postData: function(){
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");
    // soon implement
  },
  postMessage: function() {
    var url = $("#url").val();
    var message = $("#message").val();
    var user    = 1;
    var postData =  "url="+url+"&message="+message;
    if (url != "" && message != ""){
      $.ajax({
        type: "POST",
        url: "http://detikcom.herokuapp.com/posts",
        data: postData,
        dataType: "json",
        success: function(data){
          var html = '<div class="alert alert-success"><strong>Message Created</strong></div>';
          $('#alert_text').append(html);
          $("#list").remove();
          Authenticate.listApi();
        },
        error: function(data){
          console.log("failed");
          console.log(data);
        }
      });
    }
  },
  saveCredentials: function(){
    $("#alert_text").text("");
    var username = $("#username").val();
    var password = $("#password").val();
    if(username != "" && password != ""){
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      $("#login_container").hide();
      $("#button_clear").show();
      $("#login_container_confirmed").show();
      $("#logged_in_as").text("Logged in as " + username);
    } else {
      var html = '<div class="alert alert-danger"><strong>Invalid Username or Password</strong></div>';
      $("#alert_text").append(html);
    }
  },
  loadCredentials: function(){
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");

    if(username != undefined && password != undefined) {
      $("#login_container").hide();
      $("#button_clear").show();
      $("#login_container_confirmed").show();
      $("#logged_in_as").text("You are logged in as " + username); 
    }else{
       $("#login_container").show();
       $("#login_container_confirmed").hide();
       $("#button_clear").hide();
    }
  },
  deleteCredentials: function(){
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    var html = '<div class="alert alert-success"><strong>Sign-out Success</strong></div>';
    $('#alert_text').append(html);
    $("#login_container_confirmed").hide();
    $("#button_clear").hide();
    $("#login_container").show();
  },
  listApi: function(){
    $.ajax({
      type: "GET",
      url: "http://detikcom.herokuapp.com/posts",
      dataType: "json",
      success: function(data){
        addElement(data.result);
      },
      error: function(data){
        var result_api = [];
      }
    });
  }
}

function addElement(result){
  var html = '';
  $.each(result, function (i, item) {
      html += ('<a href="'+item.url+'" class="list-group-item" target="_blank"><p>'+item.message+'</p><p>By '+localStorage.getItem('username')+'</p></a>');
  });
  $('#list').append(html);
}
