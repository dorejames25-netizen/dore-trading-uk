/**
 * Sunset Retrowave Application Controller for Android
 * Handles page switching, responsive view states, and arcade button triggers.
 */

class AppController {
    constructor() {
        this.initListeners();
    }

    initListeners() {
        document.addEventListener("DOMContentLoaded", () => {
            console.log("Sunset Arcade Engine Initialized on Android.");
        });
    }

    triggerAction(type) {
        if (type === 'boost') {
            this.showToast("⚡ Engine Boost Engaged: Sunset Velocity Maxed!");
        } else if (type === 'scan') {
            this.showToast("📡 Radar Scanning Yellow Horizon...");
        }
    }

    runTerminalCommand(cmd) {
        const textElem = document.getElementById('previewText');
        if (!textElem) return;

        if (cmd === 'DIAGNOSTICS') {
            textElem.innerText = "STATUS: OPTIMAL [YELLOW/ORANGE OK]";
            this.showToast("Diagnostics Complete.");
        } else if (cmd === 'CLEAR_LOGS') {
            textElem.innerText = "READY FOR INPUT...";
            this.showToast("Screen Memory Cleared.");
        }
    }

    showToast(message) {
        let existingToast = document.getElementById('androidToast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.id = 'androidToast';
        toast.innerText = message;
        
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#ff8800',
            color: '#000',
            padding: '10px 16px',
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '0.45rem',
            borderRadius: '4px',
            boxShadow: '0 0 15px rgba(255, 136, 0, 0.9)',
            zIndex: '1000',
            textAlign: 'center',
            boxSizing: 'border-box',
            width: '90%',
            maxWidth: '350px'
        });

        document.body.appendChild(toast);
        setTimeout(() => {
            if (toast) toast.remove();
        }, 2500);
    }
}

const appController = new AppController();

// Global Routing for Multi-Page layout layout (Page 1 <-> Page 2 inside index.html)
function switchPage(pageNumber) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));

    const targetPage = document.getElementById(`page${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Sub-tab switching logic for index2.html
function switchSubTab(tabId) {
    document.querySelectorAll('.sub-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.sub-tab-content').forEach(content => content.classList.remove('active'));

    event.currentTarget.classList.add('active');
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}
