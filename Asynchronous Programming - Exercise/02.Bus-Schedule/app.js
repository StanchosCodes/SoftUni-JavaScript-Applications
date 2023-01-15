function solve() {
    let stopId = 'depot';
    let stopName = '';

    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');
    const infoSpan = document.querySelector('.info');
    
    async function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stopId}`;

        let response = await fetch(url);
        let data = await response.json();

        stopName = data.name;
        stopId = data.next;

        infoSpan.textContent = `Next stop ${stopName}`;

        departButton.disabled = true;
        arriveButton.disabled = false;
    }

    function arrive() {
        infoSpan.textContent = `Arriving at ${stopName}`;

        departButton.disabled = false;
        arriveButton.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();