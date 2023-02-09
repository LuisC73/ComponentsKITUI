document.addEventListener("DOMContentLoaded", () => {

  let activeChristmas = false;

  const countdown = () => {
    const endDate = new Date("January 08, 2024 00:00:00").getTime(),
      nowDate = new Date("December 14, 2023 00:00:00").getTime();

    let differenceTime = endDate - nowDate;

  };

  setInterval(countdown, 1000);

  // Seleccionar contenedor de luces
  const lightsContainer = document.querySelector(".lights"),
    fragmentContent = document.createDocumentFragment();

  for (let i = 0; i < 42; i++) {
    let lightItem = document.createElement("li");
    lightItem.classList.add("lights__li");
    fragmentContent.appendChild(lightItem);
  }

  lightsContainer.appendChild(fragmentContent);

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

  //fog.start();
});
