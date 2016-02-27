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