/**
 * Portfolio ISSA D.app.js
 * All interactive features: terminal, overlays, filters, theme
 */
/* THEME TOGGLE */
let isDark = true;

function toggleTheme() {
    isDark = !isDark;
    document.body.classList.toggle('light', !isDark);}

    /* LANGUAGE TOGGLE */
let isEnglish = true;

function toggleLang() {
    isEnglish = !isEnglish;
    document.getElementById('lang-btn').textContent = isEnglish ? 'FR' : 'EN';
}

/* TERMINAL */
/** Available commands and their outputs */
const cmds = {
    help: `<span class="t-green">Commandes disponibles:</span>
    <span class="t-accent">whoami</span>     A propos de moi
    <span class="t-accent">about</span>      Qui je suis
    <span class="t-accent">projects</span>   Mes projets
    <span class="t-accent">skills</span>     Mes compétences
    <span class="t-accent">contact</span>    Contactez-moi
    <span class="t-accent">story</span>      Mon histoire
    <span class="t-accent">clear</span>      Effacer le terminal`,
    whoami:   '__ABOUT__',
    about:    '__ABOUT__',
    contact:  '__CONTACT__',
    story: '__HISTOIRE__',
    clear:    '__CLEAR__',

    projects: `<span class="t-yellow">6 projets trouvés.</span> défilement vers les projets...`,

    skills: `<span class="t-green">Langages:</span>  Python · PHP · JavaScript · C · HTML · CSS · React JS
    <span class="t-green">Frameworks:</span> Flask · Laravel
    <span class="t-green">Outils:</span>      VS Code · MySQL · GitHub
    <span class="t-green">Compétences douces:</span>       Communication · Adaptability · Detail-oriented`,};

   /** Terminal state */
let termLines = [
    '<div class="terminal-line"><span class="t-accent" style="font-size:20px;font-weight:700;letter-spacing:3px">ISSA D.#</span></div>',
    '<div class="terminal-line t-comment">Bienvenue dans le terminal de ISSA D. Tapez "help" pour les commandes.</div>',
    '<div class="terminal-line">&nbsp;</div>',];
let cmdHistory = [];
let histIdx    = -1;
const termOut  = document.getElementById('terminal-output');

   /** Render terminal DOM */
function renderTerm(lines) {
    termOut.innerHTML = lines.join('') + `
    <div class="terminal-input-line">
    <span class="t-prompt">issad</span><span style="color:var(--muted)">@</span><span class="t-path">portfolio</span><span style="color:var(--muted)">:~$</span>
    <input class="terminal-input" id="term-input" autocomplete="off" spellcheck="false" placeholder="tapez 'help'">
    </div>`;
    document.getElementById('term-input').addEventListener('keydown', onTermKey);
}

/** Handle terminal keydown */
function onTermKey(e) {
    const inp = document.getElementById('term-input');

    if (e.key === 'Enter') {
        const cmd = inp.value.trim().toLowerCase();
        if (!cmd) return;

        cmdHistory.unshift(cmd);
        histIdx = -1;

        // Echo the command
        termLines.push(`<div class="terminal-line"><span class="t-prompt">issad</span><span style="color:var(--muted)">@</span><span class="t-path">portfolio</span><span style="color:var(--muted)">:~$</span> <span class="t-cmd">${esc(cmd)}</span></div>`);

        const response = cmds[cmd];

        if (response === '__CLEAR__') {
            termLines = [];

        } else if (response === '__ABOUT__') {
            termLines.push('<div class="terminal-output"><span class="t-green">Ouverture de la page "A propos de moi"...</span></div>');
            setTimeout(openAbout, 400);

        } else if (response === '__CONTACT__') {
            termLines.push('<div class="terminal-output"><span class="t-green">Ouverture de la page "Contact"...</span></div>');
            setTimeout(openContact, 400);

        } else if (response === '__HISTOIRE__') {
            termLines.push('<div class="terminal-output"><span class="t-green">Ouverture de la page "Mon histoire"...</span></div>');
            setTimeout(openHistoire, 400);

        } else if (response) {
            termLines.push(`<div class="terminal-output">${response}</div>`);
            if (cmd === 'projects') {
                setTimeout(() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }), 400);
            }

        } else {
            termLines.push(`<div class="terminal-output"><span class="t-red">commande non trouvés: ${esc(cmd)}</span> essayez <span class="t-accent">help</span></div>`);
        }

        termLines.push('<div class="terminal-line">&nbsp;</div>');
        renderTerm(termLines);
        document.getElementById('term-input').focus();

        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (histIdx < cmdHistory.length - 1) {
                histIdx++;
                inp.value = cmdHistory[histIdx];
            }
            
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (histIdx > 0) {
                histIdx--;
                inp.value = cmdHistory[histIdx];
            } else {
                histIdx   = -1;
                inp.value = '';
            }
        }
    }
   /** Focus terminal and scroll to top */
function focusTerminal() {
    const input = document.getElementById('term-input');
    if (input) input.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

   /** Keyboard shortcut: press "/" to focus terminal */
document.addEventListener('keydown', (e) => {
    if (
        e.key === '/' &&
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA'
    ) {
        e.preventDefault();
        focusTerminal();
    }
});

   // Init terminal
    renderTerm(termLines);
/*OVERLAYS */

function openAbout() {
    document.getElementById('about-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAbout() {
    document.getElementById('about-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

function openHistoire() {
    closeAbout(); // close about if open
    document.getElementById('histoire-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';}

function closeHistoire() {
    document.getElementById('histoire-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

function openContact() {
       // Close any open overlay first
    document.querySelectorAll('.overlay').forEach(o => o.classList.remove('active'));
    document.getElementById('contact-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeContact() {
    document.getElementById('contact-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

   /** Close overlay on Escape key */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.overlay').forEach(o => o.classList.remove('active'));
        document.body.style.overflow = '';
    }
});

/* CV DOWNLOAD (Handled via Laravel route /cv/download) */
function downloadCV() {
    window.location.href = '/cv/download';
}

/*PROJECT FILTERS */
function filterProjects(type, btn) {
       // Toggle active button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
       // Show/hide cards
    let count = 0;
    document.querySelectorAll('.project-card').forEach(card => {
        const show = type === 'all' || card.dataset.type === type;
        card.style.display = show ? '' : 'none';
        if (show) count++;
    });

    document.getElementById('proj-count').textContent =
        count + ' project' + (count > 1 ? 's' : '');
}


/*
    CONTACT FORM (JS feedback)
    The form submits to Laravel via POST.
    This handles the visual submit state.*/
function submitForm(e) {
    const btn = e.target.querySelector('.submit-btn');
    btn.textContent      = '✓ Message sent!';
    btn.style.background = 'var(--green)';

    setTimeout(() => {
        btn.textContent      = 'Send message';
        btn.style.background = '';
    }, 3000);
}

/* SCROLL ANIMATIONS*/
const scrollObserver = new IntersectionObserver(
    (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    }),
    { threshold: 0.1 }
);
document.querySelectorAll('.fade-in').forEach(el => scrollObserver.observe(el));