
const buttons = document.getElementsByClassName("button")

let arrayButtons = Array.from(buttons)


let screen = document.getElementById("screen")

let power = document.getElementById("power")

let screenFilter = document.getElementById("glassFilter")

// set up volume bar ,
let volumeLength

let filterLength = 0

let isOn = false

let snakeOn = false

power.addEventListener("click", () => {

    isOn = !isOn

    screenFilter.classList.remove(screenFilter.classList[screenFilter.classList.length - 1])
    screenFilter.classList.add(`glass-filter-0`)

    if (isOn) {
        //volume lenght needs to be declared after the POWER button states its size

        volumeLength = 0
        screen.classList.add("whiteNoise")

    }
    else {
        screen.classList.remove(screen.classList[screen.classList.length - 1])
        document.getElementById("snakeLever").style.marginTop = ""
        document.getElementById("snake").style.visibility = "hidden"
        document.getElementById("snake").style.zIndex = "0"

        //reset volume
        for (let i = volumeLength; i > 0; i--) {

            document.getElementById(`volDis${i}`)
                .style.backgroundImage = ""


        }
        //reset filters
        for (let i = 1; i < 4; i++) {
            document.getElementById(`f${i}`).style.marginTop = ""
        }

    }
    console.log("Power", isOn ? "ON" : "OFF")

})

/////////////////////////////////not entirely my///////////////////////////////////////////77
let gameLoopId;

function init() {
    let canvas = document.getElementById("snake");
    let context = canvas.getContext("2d");
    let box = 15;
    let snake = [];
    snake[0] = {
        x: 8 * box,
        y: 8 * box
    }
    let direction = "right";
    let food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }

    function criarBG() {
        context.fillStyle = "lightgreen";
        context.fillRect(0, 0, 16 * box, 16 * box);
    }

    function criarCobrinha() {
        for (i = 0; i < snake.length; i++) {
            context.fillStyle = "green";
            context.fillRect(snake[i].x, snake[i].y, box, box);
        }
    }

    function drawFood() {
        context.fillStyle = "red";
        context.fillRect(food.x, food.y, box, box);
    }

    //quando um evento acontece, detecta e chama uma função
    document.addEventListener('keydown', update);

    function update(event) {
        if (event.keyCode == 37 && direction != 'right') direction = 'left';
        if (event.keyCode == 38 && direction != 'down') direction = 'up';
        if (event.keyCode == 39 && direction != 'left') direction = 'right';
        if (event.keyCode == 40 && direction != 'up') direction = 'down';
    }

    function iniciargame() {

        if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
        if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
        if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
        if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

        for (i = 1; i < snake.length; i++) {
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                clearInterval(game);
                alert('Game Over :(');
            }
        }

        criarBG();
        criarCobrinha();
        drawFood();

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction == "right") snakeX += box;
        if (direction == "left") snakeX -= box;
        if (direction == "up") snakeY -= box;
        if (direction == "down") snakeY += box;

        if (snakeX != food.x || snakeY != food.y) {
            snake.pop(); //pop tira o último elemento da lista
        } else {
            food.x = Math.floor(Math.random() * 15 + 1) * box;
            food.y = Math.floor(Math.random() * 15 + 1) * box;
        }

        let newHead = {
            x: snakeX,
            y: snakeY
        }

        snake.unshift(newHead);


    }

    const game = setInterval(iniciargame, 100);

}

document.getElementById("snake").style.visibility = "hidden"
document.getElementById("snake").style.zIndex = "0"
init()
/////////////////////////////////////////////////////////////////////////////////////

arrayButtons.map(
    items => {


        items.addEventListener("click", (evento) => {
            if (isOn) {


                switch (evento.target.id.split("")[0]) {

                    case "c":
                        console.log(evento.target.id, "has been clicked inside switch")

                        screen.classList.remove(screen.classList[screen.classList.length - 1])
                        screen.classList.add("channel" + evento.target.id.slice(-1))

                        break;

                    case "v":
                        console.log("volume Button has been pressed")

                        //for volume up
                        if (evento.target.id == "volUp" && volumeLength < 15) {

                            volumeLength += 1
                            console.log(volumeLength)

                            document.getElementById(`volDis${volumeLength}`)
                                .style.backgroundImage = `url(../img/Display_Volume_on.png)`

                        }

                        // for volume down 
                        else if ((volumeLength > 0) && evento.target.id == "volDown") {

                            document.getElementById(`volDis${volumeLength}`)
                                .style.backgroundImage = `url(../img/Display_Volume.png)`

                            volumeLength -= 1
                        }
                        break;

                    case "f":

                        // if im not pressing the same button
                        if (filterLength != evento.target.id.slice(-1)) {

                            console.log("filter changed")
                            filterLength = evento.target.id.slice(-1)

                            screenFilter.classList.remove(screenFilter
                                .classList[screenFilter.classList.length - 1])

                            screenFilter.classList.add(`glass-filter-${filterLength}`)

                            for (let i = 1; i < 4; i++) {
                                document.getElementById(`f${i}`).style.marginTop = ""
                            }

                            document.getElementById(evento.target.id).style.marginTop = "2px"

                        }

                        else if (filterLength == evento.target.id.slice(-1)) {
                            console.log("filter off")
                            filterLength = 0
                            screenFilter.classList.remove(screenFilter
                                .classList[screenFilter.classList.length - 1])

                            screenFilter.classList.add(`glass-filter-0`)

                            for (let i = 1; i < 4; i++) {
                                document.getElementById(`f${i}`).style.marginTop = ""
                            }


                        }

                        break;

                    case "s":
                        snakeOn = !snakeOn

                        if (snakeOn) {
                            // remove whats on screen 

                            document.getElementById("snakeLever").style.marginTop = "10px"
                            screen.classList.remove(screen.classList[screen.classList.length - 1])
                            document.getElementById("snake").style.visibility = "visible"
                            document.getElementById("snake").style.zIndex = "1"

                        }
                        else {
                            document.getElementById("snakeLever").style.marginTop = ""
                            document.getElementById("snake").style.visibility = "hidden"
                            document.getElementById("snake").style.zIndex = "0"

                            screen.classList.add("Whitenoise")

                        }
                        break;



                }
            }
        })
    }

)

