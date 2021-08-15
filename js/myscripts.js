$(document).ready(function () {
  defaultView();

  var username, email, userId;
  console.log(JSON.parse(localStorage.getItem("user")));
  if (localStorage.getItem("user") === null) {
  } else {
    login();
  }

  function defaultView() {
    $("#navUserName").hide();
    $("#navFavoriteBtn").hide();
    $("#navLogOutBtn").hide();
    $(".cover-spinner").hide();
    $(".error-message").hide();
    $("#navList").hide();
    $("#navLoginBtn").show();
    $("#list").hide();
    $(".list-spinner").show();
  }

  // logout
  $("#navLogOutBtn").on("click", () => {
    localStorage.removeItem("user");
    defaultView();
  });

  // login
  function login() {
    username = JSON.parse(localStorage.getItem("user")).username;
    email = JSON.parse(localStorage.getItem("user")).email;
    userId = JSON.parse(localStorage.getItem("user")).userID;
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $("#login-box").hide();
    $("#singup-box").hide();
    $("#navLoginBtn").hide();
    $("#navUserName").html(
      "<span>Hello, " +
        username +
        '</span>&nbsp;<i class="bi bi-suit-heart-fill"></i>'
    );    
    $("#navFavoriteBtn").show();
    $("#navLogOutBtn").show();
    $("#navUserName").show();
    $("#navList").show();
  }

  $("#navUserName").hover(function () {
    $(".dropdown-menu").addClass("show");
    $(".dropdown-menu").removeClass("show");
  });

  // login button handler
  $("#navbarResponsive").on("click", "#btnLogin", function () {
    // $("#navbarResponsive").css("display", "none");
    $("#login-box").show();
  });

  // login page change to sigup page
  $("#loginForm").on("click", "#changeToSignUp", function () {
    $("#login-box").hide();
    $("#singup-box").show();
    $(".error-message").hide();
  });

  // signup page change to login page
  $("#changeToLogin").on("click", function () {
    $("#login-box").show();
    $("#singup-box").hide();
    $(".error-message").hide();
  });

  // close signup page
  $("#btnCloseSignup").on("click", function () {
    $("#login-box").hide();
    $("#singup-box").hide();
    $(".error-message").hide();
  });

  // close login page
  $("#btnCloseLogin").on("click", function () {
    $("#login-box").hide();
    $("#singup-box").hide();
    $(".error-message").hide();
  });

  // $("#btnsignup").click(function() {
  //     var username = $("#signupUsername").val();
  //     var email = $("#signupEmail").val();
  //     var pwd = $("#signupPwd").val();
  //     var repwd = $("#signupRepwd").val();

  //     alert("username: " + username + "\nEmail: " + email + "\nPassword: " + pwd + "\nRePassword: " + repwd);

  // }); // end btnsignup

  // $("#btnlogin").click(function() {
  //     var username = $("#username").val();
  //     var pwd = $("#pwd").val();

  //     alert("username: " + username + "\nPassword: " + pwd );

  // }); // end btnlogin

  // form validate
  $("#loginForm").validate({
    onkeyup: true,
    errorPlacement: function (error, element) {
      // error.appendTo(element.parent("div").find(".error-inner"));
      error.insertBefore(element);
    },
    rules: {
      username: {
        required: true,
        minlength: 2,
      },
      password: {
        required: true,
        minlength: 8,
      },
    },
    messages: {
      username: {
        required: "This field is required.",
      },
      pwd: {
        required: "This field is required.",
      },
    },
    submitHandler: function (form) {
      $(".error-message").hide();
      $(".cover-spinner").show();
      var username = $("#username").val();
      var pwd = $("#pwd").val();

      // alert("username: " + username + "\nPassword: " + pwd);

      // use ajax call server
      // var username = $("#username").val();
      // var passwd = $("#pass").val();
      // var mydata = "login=" + username + "&password=" + pwd;
      var mydata = JSON.stringify({
        login: username,
        password: pwd,
      });
      // alert(mydata);
      $.ajax({
        type: "POST",
        url: "http://localhost:9998/check_login",
        // dataType: "text",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: mydata,
        success: function (data) {
          // console.log(data);
          if (data.length > 0) {
            // console.log(data);
            // localStorage.setItem("loginid", username);
            // localStorage.setItem("loginstatus", "OK");
            // location.href = "/ccc";

            // var obj = $.parseJSON(data);
            // var username = obj['username'];
            // var pwd = obj['pwd'];
            // var username = obj;
            // var pwd = obj['password'];
            var username = "";
            var email = "";
            var pwd = "";
            var userID = "";
            $.each(data, function (key, field) {
              username = field.name;
              email = field.email;
              pwd = field.password;
              userID = field._id;
            });
            if (username != "") {
              // alert(username + '\n' + pwd + "\n" + email + "\n" + userID)
              localStorage.setItem(
                "user",
                JSON.stringify({
                  username: username,
                  email: email,
                  userID: userID,
                })
              );
              login(username);
            } else {
              $(".error-message-text").text(
                "Your account information was entered incorrectly."
              );
              $(".error-message").show();
            }
          } else {
            $(".error-message-text").text(
              "Your account information was entered incorrectly."
            );
            $(".error-message").show();
            // alert("else");
          }
        },
        error: function (xhr, status, error) {
          console.log("Error: " + error.message);
        },
      });
      $(".cover-spinner").hide();
      return false;
    },
  });

  // sign up form
  $("#signupForm").validate({
    onkeyup: true,
    errorPlacement: function (error, element) {
      // error.appendTo(element.parent("div").find(".error-inner"));
      error.insertBefore(element);
    },
    rules: {
      username: {
        required: true,
        minlength: 2,
      },
      password: {
        required: true,
        minlength: 8,
      },
    },
    messages: {
      username: {
        required: "This field is required.",
      },
      pwd: {
        required: "This field is required.",
      },
    },
    submitHandler: function (form) {
      $(".error-message").hide();
      $(".cover-spinner").show();
      var username = $("#signupUsername").val();
      var email = $("#signupEmail").val();
      var pwd = $("#signupPwd").val();

      // alert("username: " + username + "\nPassword: " + pwd);

      // use ajax call server
      // var username = $("#username").val();
      // var passwd = $("#pass").val();
      // var mydata = "login=" + username + "&password=" + pwd;
      var mydata = JSON.stringify({
        login: username,
        email: email,
        password: pwd,
      });
      // alert(mydata);
      $.ajax({
        type: "POST",
        url: "http://localhost:9998/check_signin",
        // dataType: "text",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: mydata,
        success: function (data) {
          // alert(data);
          if (data != null) {
            console.log(data);
            // localStorage.setItem("loginid", username);
            // localStorage.setItem("loginstatus", "OK");
            // location.href = "/ccc";

            // var obj = $.parseJSON(data);
            // var username = obj['username'];
            // var pwd = obj['pwd'];
            var username = data.username;
            var result = data.result;
            // var pwd = data.pwd;

            // alert(username)
            if (result == "success") {
              localStorage.setItem(
                "user",
                JSON.stringify({
                  username: username,
                  email: data.email,
                  userID: data.data,
                })
              );
              login(username);
            }
          } else {
            $(".error-message-text").text(
              "Your account information was entered incorrectly."
            );
            $(".error-message").show();
            // alert("else");
          }
        },
        error: function (xhr, status, error) {
          console.log("Error: " + error.message);
        },
      });
      $(".cover-spinner").hide();
      return false;
    },
  });

  $("#signupForm").validate({
    onkeyup: true,
    errorPlacement: function (error, element) {
      // error.appendTo(element.parent("div").find(".error-inner"));
      error.insertBefore(element);
    },
    rules: {
      username: {
        required: true,
        minlength: 2,
      },
      email: {
        email: true,
        required: true,
      },
      password: {
        minlength: 8,
      },
      password2: {
        equalTo: "#signupPwd",
      },
    },
    messages: {
      username: {
        required: "This field is required.",
      },
      pwd: {
        required: "This field is required.",
      },
    },
    submitHandler: function (form) {
      var username = $("#signupUsername").val();
      var email = $("#signupEmail").val();
      var pwd = $("#signupPwd").val();
      var repwd = $("#signupRepwd").val();

      alert(
        "username: " +
          username +
          "\nEmail: " +
          email +
          "\nPassword: " +
          pwd +
          "\nRePassword: " +
          repwd
      );

      return false;
    },
  });

  const loadToDoList = () => {
    $.ajax({
      type: "POST",
      url: "http://localhost:9998/todolist",
      // dataType: "text",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: { userId: userId },
      success: function (data) {
        console.log(data);
        if (data.length > 0) {
          // console.log(data);
          // localStorage.setItem("loginid", username);
          // localStorage.setItem("loginstatus", "OK");
          // location.href = "/ccc";

          // var obj = $.parseJSON(data);
          // var username = obj['username'];
          // var pwd = obj['pwd'];
          // var username = obj;
          // var pwd = obj['password'];
          var username = "";
          var email = "";
          var pwd = "";
          var userID = "";
          //   var newData = data.filter((task) => task._id !== "item_id");
          $("#toDoListBody").html("");
          $.each(data[0].tasks, function (key, field) {
            var newKey = key + 1;
            console.log(field);
            var check = "";
            if (field.isChecked == "true") {
              check = "checked";
            }
            // $("#toDoLsitBody").html("");
            $("#toDoListBody").append(
              '<tr class="todolistItem"><th scope="row" class="todolistItemNo">' +
                newKey +
                '</th><td><input type="text" class="form-control todolistItemValue" value="' +
                field.task +
                '" /></td><td><div class="form-check"><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" ' +
                check +
                ' /><label class="form-check-label" for="flexCheckDefault">Check</label></div></td><td><i class="far fa-save btn-save" style="font-size: 2em; color: lightseagreen;"></i></td><td><i class="fas fa-trash-alt btn-delete" style="font-size: 2em; color: Tomato;"></i></td></tr>'
            );
          });
          $(".list-spinner").hide();
        } else {
          $("#toDoListBody").html("");
          $(".list-spinner").hide();
        }
      },
      error: function (xhr, status, error) {
        console.log("Error: " + error.message);
      },
    });
  };

  //  edit todolist
  $("#toDoListBody").on("click", ".btn-save", function () {
    $(".list-spinner").show();
    var isChecked = false;
    console.log($(this));
    var itemId = $(this).parent().parent().find(".todolistItemNo").text();
    var itemTask = $(this).parent().parent().find(".todolistItemValue").val();
    if ($(this).parent().parent().find(".form-check-input").is(":checked")) {
      isChecked = true;
    }
    console.log(itemId, itemTask, isChecked);

    $.ajax({
      type: "PUT",
      url: "http://localhost:9998/editlistItems",
      // dataType: "text",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: {
        userId: userId,
        itemId: itemId,
        task: itemTask,
        isChecked: isChecked,
      },
      success: function (data) {
        // alert(data);
        if (data != null) {
          console.log(data);

          // var obj = $.parseJSON(data);
          // var username = obj['username'];
          // var pwd = obj['pwd'];
          var msg = data.msg;
          var result = data.success;
          // var pwd = data.pwd;

          // alert(username)
          if (result) {
            loadToDoList();
            // $(".list-spinner").hide();
          }
        } else {
          alert("else");
        }
      },
      error: function (xhr, status, error) {
        console.log("Error: " + error.message);
      },
    });
  });

  //  delete todolist
  $("#toDoListBody").on("click", ".btn-delete", function () {
    $(".list-spinner").show();
    console.log($(this));
    var itemId = $(this).parent().parent().find(".todolistItemNo").text();

    $.ajax({
      type: "DELETE",
      url: "http://localhost:9998/deletelistItems",
      // dataType: "text",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: {
        userId: userId,
        itemId: itemId,
      },
      success: function (data) {
        // alert(data);
        if (data != null) {
          console.log(data);

          // var obj = $.parseJSON(data);
          // var username = obj['username'];
          // var pwd = obj['pwd'];
          var msg = data.msg;
          var result = data.success;
          // var pwd = data.pwd;

          // alert(username)
          if (result) {
            loadToDoList();
            // $(".list-spinner").hide();
          }
        } else {
          alert("else");
        }
      },
      error: function (xhr, status, error) {
        console.log("Error: " + error.message);
      },
    });
  });

  // show todolist
  $("#navList").on("click", function () {
    $("#toDoListBody").html("");
    $("#list").show();
    $(".list-spinner").show();
    loadToDoList();
  });

  // inset todolist
  $("#addToDoList").on("click", function (e) {
    e.preventDefault();
    const task = $("#form1").val().toString();
    // alert(task);
    $("#form1").val("");
    $(".list-spinner").show();

    var taskData = JSON.stringify({
      task: task,
    });

    $.ajax({
      type: "POST",
      url: "http://localhost:9998/addlistItems",
      // dataType: "text",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: { userId: userId, task: task, isChecked: false },
      success: function (data) {
        // alert(data);
        if (data != null) {
          console.log(data);
          // localStorage.setItem("loginid", username);
          // localStorage.setItem("loginstatus", "OK");
          // location.href = "/ccc";

          // var obj = $.parseJSON(data);
          // var username = obj['username'];
          // var pwd = obj['pwd'];
          var msg = data.msg;
          var result = data.success;
          // var pwd = data.pwd;

          // alert(username)
          if (result) {
            loadToDoList();
            // $(".list-spinner").hide();
          }
        } else {
          alert("else");
        }
      },
      error: function (xhr, status, error) {
        console.log("Error: " + error.message);
      },
    });
  });


  function getCountryData (e) {
    e.preventDefault()
    var countryName = $("#inputEmail").val()
    console.log(countryName);
    $.ajax({
      type: "GET",
      url: "https://restcountries.eu/rest/v2/name/" + countryName,
      // dataType: "text",
      // dataType: "json",
      // contentType: "application/json; charset=UTF-8",
      // data: { userId: userId, task: task, isChecked: false },
      success: function (data) {
        // alert(data);
        if (data != null) {
          console.log(data);
          // localStorage.setItem("loginid", username);
          // localStorage.setItem("loginstatus", "OK");
          // location.href = "/ccc";

          // var obj = $.parseJSON(data);
          // var username = obj['username'];
          // var pwd = obj['pwd'];
          var name = data[0].name;
          var area = data[0].area;
          var capital = data[0].capital;
          var currencies = data[0].currencies[0].code + " " + data[0].currencies[0].symbol;
          var flag = data[0].flag;
          var population = data[0].population;
          var region = data[0].region;
          var timezones = data[0].timezones[0];
          // var result = data.success;
          // var pwd = data.pwd;
          $("#ansCountryName").text(name)
          $("#ansCountryArea").text(area)
          $("#ansCountryCapital").text(capital)
          $("#ansCountryCurrencies").text(currencies)
          $("#ansCountryFlag").attr('src',flag);
          $("#ansCountryPopulation").text(population)
          $("#ansCountryRegion").text(region)
          $("#ansCountryTimezones").text(timezones)
          
          
        } else {
          alert("else");
        }
      },
      error: function (xhr, status, error) {
        console.log("Error: " + error.message);
      },
    });
  }

  $("#btn-search-country").on('click', function(e){ 
    getCountryData(e)
  })

}); // end ready
