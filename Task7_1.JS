window.addEventListener('load', function () {
  var canvas = document.getElementById('graph');
  var context = canvas.getContext('2d');
  var circles = [];
  let Kub_figure = document.getElementById('button_Kub');
    let Triangle_figure = document.getElementById('button_Triangle');
      let Circle_figure = document.getElementById('button_Сircle');
   demoButtonJsCreateButtonIn(Kub_figure,context,canvas,canvas.width,canvas.height,circles);
   demoButtonJsCreateButtonIn(Triangle_figure,context,canvas,canvas.width,canvas.height,circles);
   demoButtonJsCreateButtonIn(Circle_figure,context,canvas,canvas.width,canvas.height,circles);
   canvas.addEventListener('click',repaintClick.bind(null,circles,canvas,context));
   canvas.addEventListener('dblclick',deleteDoubleClick.bind(null,circles,canvas,context));

});


function deleteDoubleClick(circles,canvas,context,e){
  var click_figure = false;
  var printAreaCircle = false;
  var printAreaTriangle = false;
  var printAreaSquare = false;
  var new_figure=[];
  let arr_figure=[];
  const arrayWithoutDeleteFigure = [];
  var previousSelectedCircle;
  // Получаем координаты точки холста, в которой щелкнули
  var clickX = e.pageX - canvas.offsetLeft;
  var clickY = e.pageY - canvas.offsetTop;
  // Проверяем, щелкнули ли no кругу
  var x = true;
  for(var i=circles.length-1; i>=0; i--) {
    var circle = circles[i];
    // С помощью теоремы Пифагора вычисляем расстояние от
	// точки, в которой щелкнули, до центра текущего круга
    var distanceFromCenter = Math.sqrt(Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2))
	// Определяем, находится ли точка, в которой щелкнули, в данном круге
  if (circle.radius){

    if((distanceFromCenter <= circle.radius)&&(!click_figure)) {
      var j=circles.length-1;
      var s=0;
      while(j!=i)
      {
        arrayWithoutDeleteFigure[s]=circles[j];
        circles.pop();
        j--;
        s++;
      }
      s--;
      circles.pop();
      while(s>=0){
      circles.push(arrayWithoutDeleteFigure[s]);
      s--;
    }
    i=-1;
    click_figure=true;
  // Прекращаем проверку
  //DrawCircle(context,new_figure);
    }
  }
    else if(circle.distance){

          if(((clickX-circle.x)*(clickX-(circle.x+circle.distance)) <= 0 &&((clickY-circle.y)*(clickY-(circle.y+circle.distance)) <= 0))&&!click_figure)
          {

          click_figure=true;
          var j=circles.length-1;
          var s=0;
          while(j!=i)
          {
            arrayWithoutDeleteFigure[s]=circles[j];
            circles.pop();
            j--;
            s++;
          }
          s--;
          circles.pop();
          while(s>=0){
          circles.push(arrayWithoutDeleteFigure[s]);
          s--;
        }
        i=-1;
          //DrawSquare(context,new_figure);
          }

     }
     else if(circle.length_side){
           printAreaTriangle=true;
           var posY=Math.sqrt(3);
           let p=circle.length_side*posY/2;
           var a = (circle.x - clickX) * (circle.y - circle.y) - (circle.x + circle.length_side - circle.x) * (circle.y - clickY);
           var b = (circle.x + circle.length_side - clickX) * (circle.y-p - circle.y) - (circle.x + circle.length_side/2 - circle.x - circle.length_side) * (circle.y - clickY);
           var c = (circle.x + circle.length_side/2 - clickX) * (circle.y - circle.y+p) - (circle.x - circle.x - circle.length_side/2) * (circle.y-p - clickY);
           if( ((a >= 0 && b >= 0 && c >= 0) || (a <= 0 && b <= 0 && c <= 0))&&(!click_figure))
           {
             click_figure=true;
             // Прекращаем проверку
             //DrawTriangle(context,new_figure);
             var j=circles.length-1;
             var s=0;
             while(j!=i)
             {
               arrayWithoutDeleteFigure[s]=circles[j];
               circles.pop();
               j--;
               s++;
             }
             s--;
             circles.pop();
             while(s>=0){
             circles.push(arrayWithoutDeleteFigure[s]);
             s--;
           }
           i=-1;
           }
   }

}
context.clearRect(0, 0, canvas.width, canvas.height);
for(var i=circles.length-1; i>=0; i--) {
  var circle = circles[i];
  if (circle.radius){
    if(printAreaSquare)
    {
      printAreaSquare=false;
      //DrawSquare(context,new_figure);
      arr_figure.push(new_figure);
      new_figure=[];
    }
    else if(printAreaTriangle)
    {
      printAreaTriangle=false;
      //DrawTriangle(context,new_figure);
      arr_figure.push(new_figure);
      new_figure=[];
    }
      printAreaCircle=true;


   new_figure.push(circle);
}

else if(circle.distance){
      if(printAreaCircle)
      {
      printAreaCircle=false;
      //DrawCircle(context,new_figure);
      arr_figure.push(new_figure);
      new_figure=[];
      }
      else if(printAreaTriangle)
      {
      printAreaTriangle=false;
      //DrawTriangle(context,new_figure);
      arr_figure.push(new_figure);
      new_figure=[];
      }
      printAreaSquare=true;
      new_figure.push(circle);
 }
else if(circle.length_side){
      if(printAreaCircle)
      {
      printAreaCircle=false;
      arr_figure.push(new_figure);
      //DrawCircle(context,new_figure);
      new_figure=[];
      }
      else if(printAreaSquare)
      {
      printAreaSquare=false;
      arr_figure.push(new_figure);
      //DrawSquare(context,new_figure);
      new_figure=[];
      }
      printAreaTriangle=true;
      new_figure.push(circle);
}
}
if(printAreaCircle)
{
printAreaCircle=false;
//DrawCircle(context,new_figure);
arr_figure.push(new_figure);
}
else if(printAreaTriangle)
{
printAreaTriangle=false;
//DrawTriangle(context,new_figure);
arr_figure.push(new_figure);
}
else if(printAreaSquare)
{
printAreaSquare=false;
//DrawSquare(context,new_figure);
arr_figure.push(new_figure);
}
for(var i=arr_figure.length-1; i>=0;i--)
{
  var figure = arr_figure[i];
  if(figure[0].length_side){
    DrawTriangle(context,figure);
  }
  else if(figure[0].radius){
    DrawCircle(context,figure);
  }
  else if(figure[0].distance){
    DrawSquare(context,figure);
  }

 }

}

function repaintClick(circles,canvas,context,e){
  var click_figure = false;
  var printAreaCircle = false;
  var printAreaTriangle = false;
  var printAreaSquare = false;
  var new_figure=[];
  let arr_figure=[];
  var previousSelectedCircle;
  context.clearRect(0, 0, canvas.width, canvas.height);
  // Получаем координаты точки холста, в которой щелкнули
  var clickX = e.pageX - canvas.offsetLeft;
  var clickY = e.pageY - canvas.offsetTop;
  // Проверяем, щелкнули ли no кругу
  for(var i=circles.length-1; i>=0; i--) {
    var circle = circles[i];
    // С помощью теоремы Пифагора вычисляем расстояние от
	// точки, в которой щелкнули, до центра текущего круга
    var distanceFromCenter = Math.sqrt(Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2))
	// Определяем, находится ли точка, в которой щелкнули, в данном круге

    if (circle.radius){
      if(printAreaSquare)
      {
        printAreaSquare=false;
        //DrawSquare(context,new_figure);
        arr_figure.push(new_figure);
        new_figure=[];
      }
      else if(printAreaTriangle)
      {
        printAreaTriangle=false;
        //DrawTriangle(context,new_figure);
        arr_figure.push(new_figure);
        new_figure=[];
      }
        printAreaCircle=true;
      if((distanceFromCenter <= circle.radius)&&(!click_figure)) {
    var color = '#30d5c8';
    var new_circle = new Circle(circle.x, circle.y, circle.radius, color);
    new_figure.push(new_circle);
    circles[i]=new_circle;
    click_figure=true;
	  // Прекращаем проверку
    //DrawCircle(context,new_figure);
    arr_figure.push(new_figure);
    printAreaCircle=false;
    new_figure=[];
    }
    else
    {
     new_figure.push(circle);
    }
  }

  else if(circle.distance){
        if(printAreaCircle)
        {
        printAreaCircle=false;
        //DrawCircle(context,new_figure);
        arr_figure.push(new_figure);
        new_figure=[];
        }
        else if(printAreaTriangle)
        {
        printAreaTriangle=false;
        //DrawTriangle(context,new_figure);
        arr_figure.push(new_figure);
        new_figure=[];
        }
        printAreaSquare=true;
        if(((clickX-circle.x)*(clickX-(circle.x+circle.distance)) <= 0 &&((clickY-circle.y)*(clickY-(circle.y+circle.distance)) <= 0))&&!click_figure)
        {
        var color = '#30d5c8';
        var square = new Square(circle.x, circle.y, circle.distance, color);
        new_figure.push(square);
        circles[i]=square;
        click_figure=true;
        arr_figure.push(new_figure);
        //DrawSquare(context,new_figure);
        printAreaSquare=false;
        new_figure=[];
        }
        else
        {
         new_figure.push(circle);
        }
   }
  else if(circle.length_side){
        if(printAreaCircle)
        {
        printAreaCircle=false;
        arr_figure.push(new_figure);
        //DrawCircle(context,new_figure);
        new_figure=[];
        }
        else if(printAreaSquare)
        {
        printAreaSquare=false;
        arr_figure.push(new_figure);
        //DrawSquare(context,new_figure);
        new_figure=[];
        }
        printAreaTriangle=true;
        var posY=Math.sqrt(3);
        let p=circle.length_side*posY/2;
        var a = (circle.x - clickX) * (circle.y - circle.y) - (circle.x + circle.length_side - circle.x) * (circle.y - clickY);
        var b = (circle.x + circle.length_side - clickX) * (circle.y-p - circle.y) - (circle.x + circle.length_side/2 - circle.x - circle.length_side) * (circle.y - clickY);
        var c = (circle.x + circle.length_side/2 - clickX) * (circle.y - circle.y+p) - (circle.x - circle.x - circle.length_side/2) * (circle.y-p - clickY);
        if( ((a >= 0 && b >= 0 && c >= 0) || (a <= 0 && b <= 0 && c <= 0))&&(!click_figure))
        {
          var color = '#30d5c8';
          var new_triangle = new Triangle(circle.x, circle.y, circle.length_side, color);
          new_figure.push(new_triangle);
          circles[i]=new_triangle;
          click_figure=true;
          //DrawTriangle(context,new_figure);
          arr_figure.push(new_figure);
          printAreaTriangle=false;
          new_figure=[];

        }
        else
        {
        new_figure.push(circle);
        }


}
}
if(printAreaCircle)
{
printAreaCircle=false;
//DrawCircle(context,new_figure);
arr_figure.push(new_figure);
}
else if(printAreaTriangle)
{
printAreaTriangle=false;
//DrawTriangle(context,new_figure);
arr_figure.push(new_figure);
}
else if(printAreaSquare)
{
printAreaSquare=false;
//DrawSquare(context,new_figure);
arr_figure.push(new_figure);
}

  for(var i=arr_figure.length-1; i>=0;i--)
  {
    var figure = arr_figure[i];
    if(figure[0].length_side){
      DrawTriangle(context,figure);
    }
    else if(figure[0].radius){
      DrawCircle(context,figure);
    }
    else if(figure[0].distance){
      DrawSquare(context,figure);
    }
   }
}

function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.isSelected = false;
}

function Triangle(x, y, dist, color) {
    this.x = x;
    this.y = y;
    this.length_side = dist;
    this.color = color;
    this.isSelected = false;
}
function Square(x, y, dist, color) {
    this.x = x;
    this.y = y;
    this.distance = dist;
    this.color = color;
    this.isSelected = false;
}
function DrawTriangle(context,triangles){
  for(var i=0; i<triangles.length; i++) {
      var triangle = triangles[i];
      var posY=Math.sqrt(3);
      let p=triangle.length_side*posY/2;
      // Рисуем текущий круг
      context.globalAlpha = 0.85;
      context.beginPath();
      context.moveTo(triangle.x,triangle.y);
      context.lineTo(triangle.x+triangle.length_side,triangle.y); // линия вправо
      context.lineTo(triangle.x+triangle.length_side/2,triangle.y- p); // линия вниз
      context.fillStyle = triangle.color;
      context.strokeStyle = "black";
      // Выделяем выбранный круг рамкой (потребуется позже)
      if (triangles.isSelected) {
          context.fillStyle = '#99ff99';
      }
      context.fill();
      context.stroke();
  }

}
function DrawSquare(context,squares){
  for(var i=0; i<squares.length; i++) {
      var square = squares[i];
      // Рисуем текущий круг
      context.globalAlpha = 0.85;
      context.beginPath();
      context.moveTo(square.x,square.y);
      context.lineTo(square.x+square.distance,square.y); // линия вправо
      context.lineTo(square.x+square.distance,square.y+ square.distance); // линия вниз
      context.lineTo(square.x,square.y+ square.distance); // линия влево

      context.fillStyle =  square.color;
      context.strokeStyle = "black";
      // Выделяем выбранный круг рамкой (потребуется позже)
      if (squares.isSelected) {
          context.fillStyle = '#99ff99';
      }
      context.fill();
      context.stroke();
  }

}


function DrawCircle(context,circles){
  for(var i=0; i<circles.length; i++) {
      var circle = circles[i];

      // Рисуем текущий круг
      context.globalAlpha = 0.85;
      context.beginPath();
      context.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2);
      context.fillStyle = circle.color;
      context.strokeStyle = "black";
      // Выделяем выбранный круг рамкой (потребуется позже)
      if (circle.isSelected) {
          context.fillStyle = '#99ff99';
      }
      context.fill();
      context.stroke();
  }

}

// обработчик изменения текста
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}


function demoButtonJsCreateButtonIn(enterWrapper,context,canvas,canvasWeight,canvasHeight,circles) {
    const btn = document.createElement('button');
    if(enterWrapper.id=="button_Kub"){
    btn.innerHTML = 'Квадрат';
  } else if(enterWrapper.id=="button_Triangle") {
    btn.innerHTML = 'Треугольник';
  } else if(enterWrapper.id=="button_Сircle") {
    btn.innerHTML = 'Круг';
  }
    btn.onclick = function () {

if(btn.innerHTML == 'Квадрат') {
  var url = document.getElementById('text');
  let valKub = url.value;
  if(valKub>200) valKub=200;
  for(let i=0;i<valKub;i++){
  let pointKub= getRandomNumber(20, 300);
  var positionx = getRandomNumber(pointKub, canvasWeight-pointKub);
  var positiony = getRandomNumber(pointKub, canvasHeight-pointKub);
  var color = '#ff0000';
  var square = new Square(positionx, positiony, pointKub, color);
  circles.push(square);
}
DrawSquare(context,circles);




} else if(btn.innerHTML == 'Треугольник'){

  var url = document.getElementById('text');
  let valTriangle = url.value;
  if(valTriangle>200) valTriangle=200;
  for(let i=0;i<valTriangle;i++){
  let pointKub= getRandomNumber(20, 300);
  var positionx = getRandomNumber(pointKub, canvasWeight-pointKub);
  var positiony = getRandomNumber(pointKub, canvasHeight-pointKub);
  var color = '#1a2edb';
  var triangle = new Triangle(positionx, positiony, pointKub, color);
  circles.push(triangle);
}
DrawTriangle(context,circles);

} else if(btn.innerHTML == 'Круг'){
  var url = document.getElementById('text');
  let valCircle = url.value;
  if(valCircle>200) valCircle=200;
  for(let i=0;i<valCircle;i++){
  var radius = getRandomNumber(20, 200);
  var positionx = getRandomNumber(radius, canvasWeight-radius);
  var positiony = getRandomNumber(radius, canvasHeight-radius);
  var color = '#008000';
  var circle = new Circle(positionx, positiony, radius, color);
  circles.push(circle);
}
DrawCircle(context,circles);

}
    };
    enterWrapper.appendChild(btn);
}
