/***************
*     GRID     *
****************/

var gridButton = document.getElementById("grid-button");
gridButton.addEventListener("click", toggleGrid);
gridButton.addEventListener("touchend", toggleGrid);

function toggleGrid() {
    squares = document.getElementsByClassName("square-no-border");
    Array.prototype.forEach.call(squares, function (square) {
        square.classList.toggle("square-border");
    });
}


/***************
*     SOUND    *
****************/

function playSound(sound) {
    let path = `sound/${sound}.mp3`;
    var audio = new Audio(path);
    audio.play();
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

play.addEventListener('click', function (event) {
    const { clientX, clientY } = event;
    createParticles(clientX, clientY);
});

play.addEventListener('touchstart', function (event) {
    Array.prototype.forEach.call(event.touches, function (event) {
        const { clientX, clientY } = event;
        createParticles(clientX, clientY);
    });
});