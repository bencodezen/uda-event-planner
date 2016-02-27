$(function() {
  var validLength = false;
  var validNumber = false;
  var validUpcase = false;

  // FUNCTIONALITY: #Password validation
  $("#password").focus(function() {
    $("#validation").show();
    $("#password").keyup(function() {
      if ($("#password").val().length >= 8) {
        $("#req-length").css("color", "green");
        validLength = true;
      } else {
        $("#req-length").css("color", "red");
        validLength = false;
      }

      if ($("#password").val().match(/\d+/g) !== null) {
        $("#req-number").css("color", "green");
        validNumber = true;
      } else {
        $("#req-number").css("color", "red");
        validNumber = false;
      }

      if ($("#password").val().match(/[A-Z]/g) !== null) {
        $("#req-upcase").css("color", "green");
        validUpcase = true;
      } else {
        $("#req-upcase").css("color", "red");
        validUpcase = false;
      }

      if (validLength && validNumber && validUpcase) {
        $("#submit").prop("disabled", false);
      }
    });
  });

  // FUNCTIONALITY: #Date comparison for events
  function checkDates() {
    var startDate = $("#event-start-date").val();
    var endDate = $("#event-end-date").val();

    if (endDate < startDate) {
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
    });
  });

  $("#location-online").click(function() {
    $(".loc-person").hide();
    $(".loc-online").css("display", "flex");
  });
});