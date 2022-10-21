$(function () {
    $("#myCarousel").carousel({
      interval: 3000,
      pause: "false",
    });
    $("#pauseButton").show();
    $("#playButton").hide();
    $("#myCarousel").carousel("cycle");
  
    $("#playButton").click(function () {
      $("#myCarousel").carousel("cycle");
      $("#playButton").hide();
      $("#pauseButton").show();
    });
    $("#pauseButton").click(function () {
      $("#myCarousel").carousel("pause");
      $("#playButton").show();
      $("#pauseButton").hide();
    });
  });
  