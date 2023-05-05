/***************
*     GRID     *
****************/

var gridButton = document.getElementById("grid-button");
// gridButton.addEventListener("mousedown", toggleGrid);
gridButton.addEventListener("touchstart", toggleGrid/* , { once: true } */);

function toggleGrid(event) {
    event.preventDefault();
    squares = document.getElementsByClassName("square-no-border");
    Array.prototype.forEach.call(squares, function (square) {
        square.classList.toggle("square-border");
    });
}

/***************
*     SOUND    *
****************/

soundInstances = []; // Pooling up to 3 sound instances for each sound
for (let _id = 0; _id < 9; _id++) {
    let sound = new Audio(`sound/sound${_id}.mp3`);
    sound.preload = 'auto';
    soundInstances.push({
        id: _id,
        pool_i: 0,
        pool: [sound, sound.cloneNode(), sound.cloneNode()]
    });
}

squares = document.getElementsByClassName("square");
Array.prototype.forEach.call(squares, function (square, index) {
    square.soundInstance = soundInstances[index];
    square.addEventListener("mousedown", playSound);
    square.addEventListener("touchstart", playSound/*, { once: true } */);
});

let startTime = 0;
let endTime = 0;
let timeElapsed = 0;
function playSound(event) {
    startTime = performance.now();
    event.preventDefault();
    let soundInstance = event.currentTarget.soundInstance;
    let audio = soundInstance.pool[soundInstance.pool_i];
    audio.currentTime = 0;
    audio.play();
    soundInstance.pool_i++;
    if (soundInstance.pool_i >= 3) {
        soundInstance.pool_i = 0
    }
    endTime = performance.now();
    timeElapsed = endTime - startTime;

    // update the output element with the time elapsed
    var outputElement = document.getElementById('output');
    outputElement.textContent = `Delay on sound: ${timeElapsed.toFixed(3)} ms`;
}


/***************
*     TIMER    *
****************/

// Define an array of month names
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Function to update the current date and time every second
function updateCurrentDate() {
    // Get the current date and time
    const now = new Date();

    // Build the date string in the format "24 Apr 2023 at 18:01:30"
    const dateString = `${now.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()} at ${formatTime(now)}:${now.getSeconds().toString().padStart(2, '0')}`;

    // Update the content of the div with the date string
    document.getElementById('current-date').textContent = dateString;
}

// Function to format the time as "18:01" instead of "18:1"
function formatTime(date) {
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minute}`;
}

updateCurrentDate()
// Update the current date and time every second
setInterval(updateCurrentDate, 1000);

/***************
*   CONFETTI   *
****************/

const play = document.getElementById('play');
const container = document.documentElement;

function createParticles(clientX, clientY) {
    for (let i = 0; i < 20 + Math.random() * 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        container.appendChild(particle);

        const angle = Math.random() * 360;
        const distance = Math.random() * 40;
        const scale = Math.random() * 2;
        const duration = 500 + Math.random() * 500;
        const rotation = Math.random() * 360; // random rotation angle
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        particle.style.left = clientX + x + 'px';
        particle.style.top = clientY + y + 'px';
        particle.style.zIndex = '9999';

        const animation = particle.animate(
            [
                { transform: 'translate(0, 0) scale(0) rotate(0deg)', opacity: 1 },
                { transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`, opacity: 0 }
            ],
            {
                duration: duration,
                easing: 'ease-out'
            }
        );

        animation.onfinish = () => particle.remove();
    }
}

play.addEventListener('mousedown', function (event) {
    const { clientX, clientY } = event;
    createParticles(clientX, clientY);
});

play.addEventListener('touchstart', function (event) {
    Array.prototype.forEach.call(event.touches, function (event) {
        const { clientX, clientY } = event;
        createParticles(clientX, clientY);
    } /*, { once: true } */);
});