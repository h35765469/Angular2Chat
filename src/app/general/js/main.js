	$(function() {

	  $(".container").niceScroll("div.nice-wrapper", {
	  	cursorcolor: "#424242",
	    cursorwidth: "12px",
	    bouncescroll: false,
	  });

    var linesData = {
      labels: ["推", "爽", "喔", "鬧", "幹"],
      datasets: [
        {
          label: "評價",
          // fillColor: "rgba(220,0,0,0.5)",
          // strokeColor: "rgba(220,220,220,0.8)",
          // highlightFill: "rgba(220,220,220,0.75)",
          // highlightStroke: "rgba(220,220,220,1)",
          data: [90, 93, 80, 40, 90],
          backgroundColor: 'rgba(220,0,0,0.2)',
          pointBackgroundColor: '#ff0000',
          // pointStyle: 'star',
        }
      ],
    };
    var options = {
      legend: {
        display: false
      },
      scale: {
        ticks:{
          // beginAtZero: true,
          min: 0,
          max: 100,
          stepSize: 100,
          display: false,
        },
      },
    };
    window.onload = function(){
      var ctx = document.getElementById("chart-area").getContext("2d");
      var myRadar = new Chart(ctx, {
        type: 'radar',
        data: linesData,
        options: options,
      });
    };

	});
