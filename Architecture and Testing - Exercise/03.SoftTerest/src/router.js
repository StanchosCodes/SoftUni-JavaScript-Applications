export function initialize(links) {
    const main = document.getElementById('mainView');
    document.querySelector('nav').addEventListener('click', onNavigate);

    const context = {
        showSection,
        goTo,
        updateNavigate
    }

    return context;

    function showSection(section) {
        main.replaceChildren(section);
    }

    function onNavigate(event) {
        event.preventDefault();

        let target = event.target;

        if (target.tagName === 'IMG') {
            target = target.parentElement;
        }

        if (target.tagName === 'A') {
            const url = new URL(target.href); // makes url out of the href and gives info about it
            goTo(url.pathname); // returns the same as the href from the target
        }
    }

    function goTo(name, ...params) {
        const handler = links[name];

        if (typeof handler === 'function') {
            handler(context, ...params)
        }

        updateNavigate();
    }

    function updateNavigate() {
        const user = JSON.parse(sessionStorage.getItem('user'));

        if (user) {
            document.querySelectorAll('.user').forEach(u => u.style.display = 'block');
            document.querySelectorAll('.guest').forEach(u => u.style.display = 'none');
        }
        else {
            document.querySelectorAll('.user').forEach(u => u.style.display = 'none');
            document.querySelectorAll('.guest').forEach(u => u.style.display = 'block');
        }
    }
}