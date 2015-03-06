// Global variables.
var ballX = 150, // Ball x position.
		ballY = 150, // Ball y position.
		ballChangeX = 2, // Change in ball x position.
		ballChangeY = 4, // Change in ball y position.
		gameSectionX = 300, // Board width.
		gameSectopnY = 300, // Board height.
		paddleBoardX = 150, // Initial paddle location.
		paddleBoardH = 10, // Paddle height.
		paddleBoardD = gameSectopnY - paddleBoardH, // Paddle depth.
		paddleBoardW = 150, // Paddle width.

    canvas = document.getElementById("CanvasGameBoard"), // Canvas element.
    ctx, // Canvas context.
    gameLoop, // Game loop time interval.

  	buttonSection = document.getElementById("button-section"),
  	canvasSection = document.getElementById("canvas-section"),
  	svgSection = document.getElementById("svg-section");

function drawGame(dowhat) {

	var dothis = dowhat;

		if(dothis == 'cvs'){
    if (canvas.getContext) {
      // Specify 2d canvas type.
      ctx = canvas.getContext("2d");
    }

			canvasSection.style.display = 'block';
    dothis = 'cvs';
  }else{
			svgSection.style.display = 'block';
  	dothis = 'svg';
  }

		buttonSection.style.display = 'none';

  // Play the game until the ball stops.
  gameLoop = setInterval(function(){
  	drawBall(dothis);
  }, 16);

  // Add keyboard listener.
  window.addEventListener('keydown', function() {
	    paddleBoardEvent(dothis);
	}, false);
}

function drawBall(dowhat) {
	var dothis = dowhat;
	if(dothis == 'cvs'){
    // Clear the board.
    ctx.clearRect(0, 0, gameSectionX, gameSectopnY);

    // Fill the board.
    ctx.fillStyle = "thistle";
    ctx.beginPath();
    ctx.rect(0, 0, gameSectionX, gameSectopnY);
    ctx.closePath();
    ctx.fill();

    // Draw a ball.
    ctx.fillStyle = "tomato";
    ctx.beginPath();
    ctx.arc(ballX, ballY, 15, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    // Draw the paddle.
    ctx.fillStyle = "navy";
    ctx.beginPath();
    ctx.rect(paddleBoardX, paddleBoardD, paddleBoardW, paddleBoardH);
    ctx.closePath();
    ctx.fill();
  }else{
    ball.setAttribute("cx", ballX);
    ball.setAttribute("cy", ballY);
  }

  ballEvent();
}

function ballEvent(){
	// Change the ball location.
  ballX += ballChangeX;
  ballY += ballChangeY;

  // Bounce on a left or right edge.
  if (ballX + ballChangeX > gameSectionX - 15 || ballX + ballChangeX < 15)
  	ballChangeX = -ballChangeX;

  // If ball hits the top, bounce it.
  if (ballY + ballChangeY < 15)
  	ballChangeY = -ballChangeY;
  // If the ball hits the bottom, check see if it hits a paddle.
  else if (ballY + ballChangeY > gameSectopnY - 15) {
    // If the ball hits the paddle, bounce it.
    if (ballX > paddleBoardX && ballX < paddleBoardX + paddleBoardW)
    	ballChangeY = -ballChangeY;
    else {
      clearInterval(gameLoop);
      alert("Game over!");
    }
  }
}

function paddleBoardEvent(dowhat) {
  var evtkey = this.event.keyCode,
  		dothis = dowhat;

  switch (evtkey) {
    // Left
    case 37:
      paddleBoardX = paddleBoardX - 20;
      if (paddleBoardX < 0)
      	paddleBoardX = 0;

      if (dothis == 'svg')
      	paddle.setAttribute("x", paddleBoardX);
      break;

    // Right
    case 39:
      paddleBoardX = paddleBoardX + 20;
      if (paddleBoardX > gameSectionX - paddleBoardW)
      	paddleBoardX = gameSectionX - paddleBoardW;

      if (dothis == 'svg')
      	paddle.setAttribute("x", paddleBoardX);
      break;
  }
}