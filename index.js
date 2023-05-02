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

// const confettiCanvas = document.getElementById('confetti-canvas');
// const ctx = confettiCanvas.getContext('2d');

// const confettiColors = ['#ffffff']; // Add more colors here if needed
// const confettiShapes = ['circle']; // Add more shapes here if needed

// const particles = [];

// // Spawn N confetti particles at the given position
// function spawnConfetti(x, y, n) {
//     for (let i = 0; i < n; i++) {
//         const size = Math.floor(Math.random() * 20) + 10; // Random size between 10 and 30
//         const opacity = Math.random(); // Random opacity between 0 and 1
//         const color = confettiColors[Math.floor(Math.random() * confettiColors.length)]; // Random color from the confettiColors array
//         const shape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)]; // Random shape from the confettiShapes array
//         const angle = Math.random() * Math.PI * 2; // Random angle between 0 and 2*pi
//         const velocity = Math.floor(Math.random() * 5) + 5; // Random velocity between 5 and 10 pixels per frame
//         const dx = velocity * Math.cos(angle); // Calculate the x-component of velocity
//         const dy = velocity * Math.sin(angle); // Calculate the y-component of velocity

//         particles.push({
//             x: x,
//             y: y,
//             size: size,
//             opacity: opacity,
//             color: color,
//             shape: shape,
//             dx: dx,
//             dy: dy
//         });
//     }
// }

// // Update the position of each particle and draw it on the canvas
// function updateParticles() {
//     ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

//     for (let i = 0; i < particles.length; i++) {
//         const p = particles[i];
//         p.x += p.dx;
//         p.y += p.dy;

//         // Remove particle if it goes out of bounds
//         if (p.x < -p.size || p.x > confettiCanvas.width + p.size ||
//             p.y < -p.size || p.y > confettiCanvas.height + p.size) {
//             particles.splice(i, 1);
//             i--;
//             continue;
//         }

//         ctx.beginPath();
//         ctx.globalAlpha = p.opacity;
//         ctx.fillStyle = p.color;

//         if (p.shape === 'circle') {
//             ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
//             ctx.fill();
//         }

//         ctx.closePath();
//     }

//     requestAnimationFrame(updateParticles);
// }

// // Listen for touch/click and drag events on the div
// const confettiArea = document.getElementById('confetti-area');

// confettiArea.addEventListener('touchstart', function (event) {
//     spawnConfetti(event.touches[0].pageX, event.touches[0].pageY, 20); // Spawn 20 particles at the touch position
// });

// confettiArea.addEventListener('mousedown', function (event) {
//     spawnConfetti(event.pageX, event.pageY, 20); // Spawn 20 particles at the click position
// });

// confettiArea.addEventListener('mousemove', function (event) {
//     if (event.buttons === 1) { // Only spawn particles if the mouse is being dragged
//         spawnConfetti(event.pageX, event.pageY, 5); // Spawn 5 particles at the drag position
//     }
// });

// // Start the animation loop
// requestAnimationFrame(updateParticles);
