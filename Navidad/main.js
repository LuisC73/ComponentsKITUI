document.addEventListener("DOMContentLoaded", () => {
  let now_year = new Date().getFullYear();

  let date_now = new Date().getTime(),
    date_christmas = new Date(`12/14/${now_year} 14:31:00`).getTime();

  let difference_time = date_christmas - date_now;

  const seconds = 1000,
    minutes = seconds * 60,
    hours = minutes * 60,
    days = hours * 24;

  let time_days = Math.floor(difference_time / days),
    time_hours = Math.floor((difference_time % days) / hours),
    time_minutes = Math.floor((difference_time % hours) / minutes),
    time_seconds = Math.floor((difference_time % minutes) / seconds);

  if (time_days <= 0 && time_hours <= 0 && time_minutes <= 0 && time_seconds <= 0) {
    const fragment_christmas = document.createDocumentFragment(),
      container_christmas = document.querySelector(".lightrope");

    for (let i = 0; i < 42; i++) {
      let item_christmas = document.createElement("li");
      item_christmas.classList.add("lightrope__li");

      fragment_christmas.appendChild(item_christmas);
    }

    container_christmas.appendChild(fragment_christmas);

    let fog = {};

    fog.draw = function (ctx, x, y) {
      ctx.fillStyle = "rgba( 255, 255, 255, " + Math.random() + " )";
      ctx.arc(x, y, 10, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    };

    fog.start = function () {
      let ctx = document.getElementById("canvas").getContext("2d");
      let x = 0;
      let y = 0;
      let t = setInterval(function () {
        x = 300 + 300 * Math.sin(x);
        y = 300 + 300 * -Math.cos(x);

        x += 2;
        fog.draw(ctx, x, y);
      }, 100);
    };

    let t = setInterval(function () {
      let documentHeight = $(document).height();
      let startPositionLeft = Math.random() * $(document).width() - 100;
      let startOpacity = 0.5 + Math.random();
      let sizeFlake = 10 + Math.random() * 46;
      let endPositionTop = documentHeight - 40;
      let endPositionLeft = startPositionLeft - 100 + Math.random() * 200;
      let durationFall = documentHeight * 10 + Math.random() * 5000;

      $("#flake")
        .clone()
        .appendTo("body")
        .css({
          left: startPositionLeft,
          opacity: startOpacity,
          "font-size": sizeFlake,
        })
        .animate(
          {
            top: endPositionTop,
            left: endPositionLeft,
            opacity: 0.2,
          },
          durationFall,
          "linear",
          function () {
            $(this).remove();
          }
        );
    }, 500);

    let snow = {};
    let snowflex = {};

    snowflex.create = function () {
      let flex = document.createElement("div");
      flex.innerHTML = "&#10052;";
      flex.style.fontSize = 10 + Math.random() * 20 + "px";
      flex.style.top = -50 + Math.random() * 20 + "px";
      flex.style.left = Math.random() * 1500 + "px";
      flex.style.position = "absolute";
      flex.style.color = "#F3F3F3";
      flex.style.opacity = Math.random();
      document.getElementsByTagName("body")[0].appendChild(flex);
      return flex;
    };

    snow.snowflex = function () {
      let flex = snowflex.create();
      let x = -1 + Math.random() * 2;
      let t = setInterval(function () {
        flex.style.top = parseInt(flex.style.top) + 5 + "px";
        flex.style.left = parseInt(flex.style.left) + x + "px";
        if (parseInt(flex.style.top) > 1500) {
          clearInterval(t);
          document.getElementsByTagName("body")[0].removeChild(flex);
        }
      }, 45 + Math.random() * 20);
    };

    snow.storm = function () {
      let t = setInterval(function () {
        snow.snowflex();
      }, 500);
    };

    snow.storm();
  }
});
