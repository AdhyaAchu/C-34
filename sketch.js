var ball;
var ballPositionRef;
var database;
var listenedPosition;

function setup(){
    createCanvas(500,500);

    //create a database inside the variable 'database' --> firebase.database();
    database = firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //make the vble 'ballPositionRef' refer to the position entry in the database --> database.ref()
    ballPositionRef = database.ref('ball/position');

    //create a listener for the vble 'ballPositionRef' using .on("value",function1,function2)
    ballPositionRef.on("value",readPosition,showError)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        updatePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        updatePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        updatePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        updatePosition(0,+1);
    }
    drawSprites();
}

function updatePosition(x,y){
    //to update values in the database --> .update({JSON})
    database.ref('ball/position').update({
        'x': listenedPosition.x + x,
        'y': listenedPosition.y + y
    })
    
}

function readPosition(data){
//store the listened values inside the variable listenedPosition
listenedPosition = data.val();       //data.val() - the listened values from the database
ball.x = listenedPosition.x;
ball.y = listenedPosition.y;

}

function showError(){
console.log("There is an error while reading or updating the values")
}
