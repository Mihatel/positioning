/*
    Изменить элементу цвет и ширину можно вот так:

    const element = document.querySelector('.myElement');
    element.style.color = 'red';
    element.style.width = '300px';
*/

const openBtn = document.getElementById('openModalBtn');
const modalOverlay = document.getElementById('modalOverlay');
const closeBtn = document.getElementById('closeModalBtn');

const progressFill = document.getElementById('progressFill');
const whiteLabel = document.getElementById('labelWhite');

let progressInterval = null;      // идентификатор интервала
let currentPercent = 0;


function updateProgressBar(percent) {
    const safePercent = Math.min(100, Math.max(0, percent));
    currentPercent = safePercent;

    progressFill.style.width = safePercent + '%';

    const clipValue = `inset(0 ${100 - safePercent}% 0 0)`;
    whiteLabel.style.clipPath = clipValue;
}

function resetProgressAndStop() {
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
    updateProgressBar(0);
}

function startProgressAnimation() {
    resetProgressAndStop();

    let percent = 0;
    updateProgressBar(0);

    progressInterval = setInterval(() => {
        if (percent >= 100) {
            clearInterval(progressInterval);
            progressInterval = null;
            return;
        }
        percent++;
        updateProgressBar(percent);
    }, 30);
}

function openModal() {
    modalOverlay.classList.add('active');
    startProgressAnimation();
}

function closeModal() {
    modalOverlay.classList.remove('active');
    resetProgressAndStop();
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});