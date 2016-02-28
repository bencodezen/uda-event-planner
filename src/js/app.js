$(function() {
  var validLength = false;
  var validNumber = false;
  var validUpcase = false;

  // FUNCTIONALITY: #Password validation
  $("#password").focus(function() {
    var reqPwLength = $("#req-length");
    var reqPwNumber = $("#req-number");
    var reqPwUpcase = $("#req-upcase");

    $("#pw-validation").show();
    $(this).keyup(function() {
      var pwValue = $("#password").val();

      if (pwValue.length >= 8) {
        reqPwLength.css("color", "green");
        validLength = true;
      } else {
        reqPwLength.css("color", "red");
        validLength = false;
      }

      if (pwValue.match(/\d+/g) !== null) {
        reqPwNumber.css("color", "green");
        validNumber = true;
      } else {
        reqPwNumber.css("color", "red");
        validNumber = false;
      }

      if (pwValue.match(/[A-Z]/g) !== null) {
        reqPwUpcase.css("color", "green");
        validUpcase = true;
      } else {
        reqPwUpcase.css("color", "red");
        validUpcase = false;
      }

      if (validLength && validNumber && validUpcase) {
        $("#submit").prop("disabled", false);
      }
    });
  });

  // FUNCTIONALITY: #Email Validation
  $("#email").focus(function() {
    $(this).keyup(function() {
      var userInput = $(this).val();
      var atIndex = userInput.indexOf("@");
      var periodIndex = userInput.indexOf(".");
      var reqEmailUsername = $("#req-username");
      var reqEmailAt = $("#req-at");
      var reqEmailDomain = $("#req-domain");

      if (atIndex == 0 || userInput == "") {
        reqEmailUsername.css("color", "red");
      } else {
        reqEmailUsername.css("color", "green");
      }

      if (atIndex > -1) {
        reqEmailAt.css("color", "green");
      } else {
        reqEmailAt.css("color", "red");
      }

      if ((periodIndex > atIndex + 1) && (userInput.length > periodIndex + 2)) {
        reqEmailDomain.css("color", "green");
      } else {
        reqEmailDomain.css("color", "red");
      }
    });
  });

  // FUNCTIONALITY: #Date comparison for events
  function checkDates() {
    var startDate = $("#event-start-date").val();
    var endDate = $("#event-end-date").val();

    if (endDate <= startDate) {
      $("#date-error").show();
      $("#submit").prop("disabled", true);
    } else {
      $("#date-error").hide();
    }
  }

  $("#event-end-date").focusout(function() {
    checkDates();
  });

  $("#event-start-date").focusout(function() {
    if ($("#event-end-date").val()) {
      checkDates();
    }
  });

  // FUNCTIONALITY: #Location Toggling Input
  $("#location-in-person").click(function() {
    $(".loc-online").hide();
    $.each($(".loc-person"), function() {
      $(this).css("display", "flex");
      $(this).children('input').prop("required", "true");
      $("#event-address-2").removeAttr("required");
      $(".loc-online input").removeAttr("required");
    });
  });

  $("#location-online").click(function() {
    $(".loc-person").hide();
    $(".loc-person input").removeAttr("required");
    $(".loc-person select").removeAttr("required");
    $(".loc-online").css("display", "flex");
    $(".loc-online input").prop("required", "true");
  });
});