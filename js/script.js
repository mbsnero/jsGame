$(document).ready( function(){

  // --------------------   Переменные   --------------------
  
  let timerStatus = 5;
  let count = 0;
  let isGameStarted = false;
  let boxSize, boxColor, posX, posY;

  // --------------------   События   --------------------

  $('#btnMinus').on('click', () => {
    if (timerStatus > 5 && !isGameStarted) {
      timerStatus--;
      $('#time-status').text(timerStatus);
      $('.timer').text(timerStatus);
    }
  });

  $('#btnPlus').on('click', () => {
    if (timerStatus < 5) {
      timerStatus = 5;
    }
    if (timerStatus < 60 && !isGameStarted) {
      timerStatus++;
      $('#time-status').text(timerStatus);
      $('.timer').text(timerStatus);
    }
  });

  $('.start-btn').on('click', () => {
    startGame();
  });

  $('.game').delegate('.box', 'click', () => {
    count++;
    console.log(count);
    $('.box').remove();
    renderBox();
  })

  // --------------------   Функции   --------------------

  function startGame() {
    isGameStarted = true;
    $('#header-time').css("display", "block");
    $('#header-result').css("display", "none");
    $('.start-btn').css("display", "none");
    $('.game').css("background-color", "white");
    renderBox();
    let timerId = setInterval(() => {
      timerStatus -= 0.1;
      timerStatus = timerStatus.toFixed(1);
      $('.timer').text(timerStatus);
    }, 100);
    setTimeout(() => {
      clearInterval(timerId);
      stopGame();
    } , $('#time-status').text() * 1000);
  }

  function stopGame() {
    isGameStarted = false;
    $('#header-time').css("display", "none");
    $('.result').text(count);
    count = 0;
    $('#header-result').css("display", "block");
    $('.box').remove();
    $('.start-btn').css("display", "block");
    $('.game').css("background-color", "lightblue");
    timerStatus = $('#time-status').text();
  }

  function renderBox() {
    boxSize = random(20, 60);
    boxColor = randomColor();
    posX = random(0, 390 - boxSize);
    posY = random(0, 240 - boxSize);

    $('.game').prepend('<div class="box"></div>');
    $('.box').css({
      width: boxSize,
      height: boxSize,
      "margin-left": posX,
      "margin-top": posY,
      "background-color": boxColor,
    })
  }

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomColor() {
    return colors[random(0, colors.length - 1)];
  }
  
  // --------------------   Массивы   --------------------
  
  var colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
});