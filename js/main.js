$(document).ready(function(){
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
            $("#alert_text").text("Success Created Message");
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
        $("#alert_text").text("Invalid Username Or Password");
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
      $("#alert_text").text("Credentials Deleted");
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
    var html = '<div class="list-group">';
    $.each(result, function (i, item) {
        html += ('<a href="'+item.url+'" class="list-group-item" target="_blank">'+item.message+'</a>');
    });
    html += '</div>'
    $('#list').append(html);
  }

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
