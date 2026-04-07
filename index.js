/*
    Изменить элементу цвет и ширину можно вот так:

    const element = document.querySelector('.myElement');
    element.style.color = 'red';
    element.style.width = '300px';
*/

const openBtn = document.getElementById('openModalBtn');
const modalOverlay = document.getElementById('modalOverlay');
const closeBtn = document.getElementById('closeModalBtn');

const progressFill = document.querySelector('.progress-fill');
const whiteLabel = document.querySelector('.label-white');
let animationFrameId = null;
let startTime = null;

function setProgressPercent(percent) {
    const safePercent = Math.min(100, Math.max(0, percent));
    progressFill.style.width = safePercent + '%';
    whiteLabel.style.clipPath = `inset(0 ${100 - safePercent}% 0 0)`;
}

function resetProgress() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    startTime = null;
    setProgressPercent(0);
}

function animateProgress(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const duration = 3000;
    let percent = (elapsed / duration) * 100;

    if (elapsed >= duration) {
        setProgressPercent(100);
        animationFrameId = null;
        startTime = null;
        return;
    }

    setProgressPercent(percent);
    animationFrameId = requestAnimationFrame(animateProgress);
}

function startProgressAnimation() {
    resetProgress();
    animationFrameId = requestAnimationFrame(animateProgress);
}

function openModal() {
    modalOverlay.classList.add('active');
    startProgressAnimation();
}

function closeModal() {
    modalOverlay.classList.remove('active');
    resetProgress();
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