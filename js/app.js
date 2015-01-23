window.onload = function(){
  //canvas init
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  //canvas dimensions
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  //snowflake particles
  var mp = 32; //max particles
  var particles = [];
  for(var i = 0; i < mp; i++)
  {
    particles.push({
      x: Math.random()*W, //x-coordinate
      y: Math.random()*H, //y-coordinate
      r: Math.random()*4+1, //radius
      scale: Math.random()*(1+0.4) + 0.2, //radius
      color: getColor(),
      d: Math.random()*mp //density
    })
  }

  function getColor() {
      red = Math.floor(Math.random() * (255-150)+150);
      green = Math.floor(Math.random() * (50-0));
      blue = Math.floor(Math.random() * (150-50)+50);
      opacity = Math.random() + 0.4;
      return 'rgba('+red+','+green+','+blue+', '+opacity+')';
  }

  //Lets draw the flakes
  function draw()
  {
    ctx.clearRect(0, 0, W, H);
    var red, blue, green, opacity;
    ctx.beginPath();
    for(var i = 0; i < mp; i++)
    {
      var p = particles[i];
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.scale(p.scale, p.scale);
      ctx.beginPath();
      ctx.moveTo(75,40);
      ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
      ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
      ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
      ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
      ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
      ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.restore();
    }
    update();
  }
  
  //Function to move the snowflakes
  //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
  var angle = 0;
  function update()
  {
    angle += 0.01;
    for(var i = 0; i < mp; i++)
    {
      var p = particles[i];
      //Updating X and Y coordinates
      //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
      //Every particle has its own density which can be used to make the downward movement different for each flake
      //Lets make it more random by adding in the radius
      p.y += Math.cos(angle+p.d) + 1 + p.r/2;
      p.x += Math.sin(angle) * 2;
      
      //Sending flakes back from the top when it exits
      //Lets make it a bit more organic and let flakes enter from the left and right also.
      if(p.x > W+80 || p.x < -80 || p.y > H +10)
      {
        if(i%3 > 0) //66.67% of the flakes
        {
          particles[i] = {
            x: Math.random()*W,
            y: -100, r: p.r, d: p.d,
            scale: Math.random()*(1+0.4), //radius
            color: getColor(),
          };
        }
        else
        {
          //If the flake is exitting from the right
          if(Math.sin(angle) > 0)
          {
            //Enter from the left
            particles[i] = {x: -80, y: Math.random()*H, r: p.r, d: p.d,
              scale: Math.random()*(1+0.6)+0.6, //radius
              color: getColor(),
            };
          }
          else
          {
            //Enter from the right
            particles[i] = {x: W+80, y: Math.random()*H, r: p.r, d: p.d,
              scale: Math.random()*(1+0.6)+0.6, //radius
              color: getColor(),
            };
          }
        }
      }
    }
  }
  
  //animation loop
  setInterval(draw, 33);
}
