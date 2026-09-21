const navList = document.querySelector('.liquid-nav__list');
const indicator = document.querySelector('.liquid-nav__indicator');
const themeButton = document.querySelector('.theme-toggle');
const activeItem = document.querySelector('.liquid-nav__item.pre-active');
const progress = document.querySelector('.scroll-progress');

function moveIndicator(item) {
    if (!indicator || !item) return;
    indicator.style.left = `${item.offsetLeft}px`;
    indicator.style.width = `${item.offsetWidth}px`;
}

activeItem?.querySelector('a')?.setAttribute('aria-current', 'page');
navList?.querySelectorAll('.liquid-nav__item').forEach(item => {
    item.addEventListener('pointerenter', () => moveIndicator(item));
    item.addEventListener('focusin', () => moveIndicator(item));
});
navList?.addEventListener('pointerleave', () => moveIndicator(activeItem));
navList?.addEventListener('focusout', event => {
    if (!navList.contains(event.relatedTarget)) moveIndicator(activeItem);
});

function applyTheme(dark) {
    document.body.classList.toggle('dark-theme', dark);
    themeButton?.setAttribute('aria-pressed', String(dark));
    themeButton?.setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
    const icon = themeButton?.querySelector('i');
    if (icon) icon.className = dark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
}

try {
    applyTheme(localStorage.getItem('theme') === 'dark');
} catch {
    applyTheme(false);
}
themeButton?.addEventListener('click', () => {
    const dark = !document.body.classList.contains('dark-theme');
    applyTheme(dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch {}
});

function updatePage() {
    moveIndicator(activeItem);
    const range = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = 'scaleX(' + (range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0) + ')';
}
let scheduled = false;
function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
        scheduled = false;
        updatePage();
    });
}
window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', scheduleUpdate);
window.addEventListener('pageshow', scheduleUpdate);
if ('ResizeObserver' in window) new ResizeObserver(scheduleUpdate).observe(document.body);
updatePage();
