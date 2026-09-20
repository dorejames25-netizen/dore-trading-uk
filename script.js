const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Symbol sets: Druid (Ogham), Sumerian (Cuneiform), and Matrix Code characters
const druidSymbols = '᚛ ᚁᚂᚃᚄᚅᚆᚇᚈᚉᚊᚋᚌᚍᚎᚏᚐᚑᚒᚓᚔᚕᚖᚗᚘᚙᚚ᚛᚜';
const sumerianSymbols = '𒀀𒀁𒀂𒀃𒀄𒀅𒀆𒀇𒀈𒀉𒀊𒀋𒀌𒀍𒀎𒀏𒀐𒀑𒀒𒀓𒀔𒀕𒀖𒀱';
const codeSymbols = '01010101アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const combinedChars = druidSymbols + sumerianSymbols + codeSymbols;

const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
const drops = [];

// Initialize drop positions
for (let x = 0; x < columns; x++) {
    drops[x] = Math.floor(Math.random() * canvas.height);
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff66';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = combinedChars.charAt(Math.floor(Math.random() * combinedChars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

function animate() {
    draw();
    requestAnimationFrame(animate);
}

animate();

// --- Navigation Handling ---
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// --- Sub-Tab Switching (Page 3) ---
function switchSubTab(tabName) {
    document.querySelectorAll('.sub-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.sub-nav-bar .sub-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.getElementById('sub-' + tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// --- Image Upload & Mockup Print Logic (Page 4) ---
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const viewport = document.getElementById('previewViewport');
            viewport.innerHTML = `<img src="${e.target.result}" class="preview-image-tag" alt="Uploaded Print Preview">`;
            document.querySelector('.terminal-footer').innerText = `> STATUS: FILE '${file.name}' UPLOADED TO DATABASE & LOADED.`;
        }
        reader.readAsDataURL(file);
    }
}

function triggerPrintMockup() {
    const viewport = document.getElementById('previewViewport');
    alert("Mockup layout compiled successfully! Sending vector grid specs to print matrix queue.");
    document.querySelector('.terminal-footer').innerText = "> STATUS: MOCKUP RENDER COMPLETED AND QUEUED.";
}

// Handle responsive window resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops.length = 0;
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.floor(Math.random() * canvas.height);
    }
});
