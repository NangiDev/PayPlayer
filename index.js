/***************
*     GRID     *
****************/

var gridButton = document.getElementById("grid-button");
gridButton.addEventListener("mousedown", toggleGrid);
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
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const buffers = []; // An array of pre-loaded audio buffers
const filepaths = ["sounds/sound0.mp3", "sounds/sound1.mp3", "sounds/sound2.mp3", "sounds/sound3.mp3", "sounds/sound4.mp3", "sounds/sound5.mp3", "sounds/sound6.mp3", "sounds/sound7.mp3", "sounds/sound8.mp3"];

// Create an array of promises that will load and decode each audio file
const promises = filepaths.map((filepath, index) => {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.open('GET', filepath, true);
        request.responseType = 'arraybuffer';

        request.onload = function () {
            audioContext.decodeAudioData(request.response, function (buffer) {
                buffers[index] = buffer;
                resolve();
            });
        };

        request.onerror = function () {
            reject(new Error('Error loading audio file: ' + filepath));
        };

        request.send();
    });
});

Promise.all(promises).then(function () {
    console.log("All sounds have been loaded")
}).catch(function (error) {
    console.error(error);
});

function playSoundByIndex(index) {
    const source = audioContext.createBufferSource();
    source.buffer = buffers[index];
    source.connect(audioContext.destination);
    source.start(0);
}

squares = document.getElementsByClassName("square");
Array.prototype.forEach.call(squares, function (square, index) {
    square.soundIndex = index;
    square.addEventListener("mousedown", playSound);
    square.addEventListener("touchstart", playSound/*, { once: true } */);
});

let startTime = 0;
let endTime = 0;
let timeElapsed = 0;
function playSound(event) {
    event.preventDefault();

    startTime = performance.now();
    playSoundByIndex(event.currentTarget.soundIndex);
    endTime = performance.now();
    timeElapsed = endTime - startTime;

    // update the output element with the time elapsed
    var outputElement = document.getElementById('output');
    outputElement.textContent = `Delay on sound: ${timeElapsed.toFixed(3)} ms`;
}

/***************
* PLAY-A-LONG  *
****************/

var playButton = document.getElementById("play-song");
playButton.addEventListener("mousedown", playALong);
playButton.addEventListener("touchstart", playALong/* , { once: true } */);

let functions = [];
let shouldPlay = false;
const playArea = document.getElementById("play").getBoundingClientRect();

function createNote(song, index) {
    return function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (shouldPlay) {
                    if (song >= 0) {
                        playSoundByIndex(song);
                        createParticles(
                            playArea.x + (playArea.width / 6) + (playArea.width / 3) * (song % 3), //Particle X
                            playArea.y + (playArea.height / 6 + (playArea.height / 3) * Math.floor((song / 3))) //Particle Y
                        );
                    }
                    if (index === functions.length - 1) { shouldPlay = false; }
                    resolve();
                } else {
                    reject("Sequence cancelled");
                }
            }, 400);
        });
    }
}

function playALong(event) {
    event.preventDefault();
    shouldPlay = !shouldPlay;
    if (shouldPlay) {
        let twinkleLittleStar =
            [
                0, 0, 1, 1, 2, 2, 1, -1,
                7, 7, 4, 4, 6, 6, 0, -1,
                1, 1, 7, 7, 4, 4, 6, -1,
                1, 1, 7, 7, 4, 4, 6, -1,
                0, 0, 1, 1, 2, 2, 1, -1,
                7, 7, 4, 4, 6, 6, 0, -1
            ]

        twinkleLittleStar.map((song, index) => {
            functions[index] = createNote(song, index)
        });

        functions.reduce(function (promiseChain, currentFunction, index) {
            return promiseChain.then(currentFunction);
        }, Promise.resolve())
            .catch(function (error) {
                console.log("Error:", error);
            });
    }
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

/***************
*   SONG LIST  *
****************/

var githash = document.getElementById("githash");
function getGitHash() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var file = xhr.responseText.split('\n');
            githash.textContent = "Git hash: " + file[0].slice(0, 8);
        }
    };
    xhr.open('GET', 'dist/git-hash.txt');
    xhr.send();
}

if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    githash.textContent = "Local development";
} else {
    getGitHash();
}

var dropdown = document.getElementById("songs-dropdown");
dropdown.addEventListener('change', function () {
    var selectedOption = dropdown.selectedOptions[0];
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.open('GET', "songs/" + selectedOption.text + ".txt");
    xhr.send();
});

function populateDropDown() {
    // Make an AJAX request to retrieve the list of files
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Parse the list of file names from the response
            var songIndex = xhr.responseText.split('\n');

            // Populate the dropdown list with the file names
            songIndex.forEach(function (songName) {
                var option = document.createElement('option');
                option.text = songName;
                option.value = songName.txt;
                dropdown.add(option);
            });
        }
    };
    xhr.open('GET', 'songs/Index.txt');
    xhr.send();
}
populateDropDown();