async function getInfo() { // async tells that the function is asynchronous
    let inputField = document.getElementById('stopId');
    let inputValue = inputField.value;
    let stopDiv = document.getElementById('stopName');
    let busUl = document.getElementById('buses');

    let urlRequest = `http://localhost:3030/jsonstore/bus/businfo/${inputValue}`;

    inputField.value = '';
    busUl.innerHTML = '';

    try {
        let response = await fetch(urlRequest); //await tells the fetch to wait until it reseaves a response
        // the response will be available when the fetch reseave a response from the server
        // this means the the code below may be executed even if the fetch is not ready yet
        // so its a good idea if we want to use the response variable, first to chech if the request
        // the fetch sent is finished or if it was succesfull (200 ok)

        // the response is acualy a promise, so if we turn it into json it will return an object with data

        // if (response.ok === true) {
        //     console.log('It is true'); // checking if the server returned ok
        // }

        // if (response.status === 200) { // checking if the server response status is 200
        //     console.log('It is 200');
        // }

        // if (response.statusText === 'OK') { // checking if the server response status text is OK
        //     console.log('It is OK');
        // }

        let data = await response.json(); // we have to await here too because the response body is a
        // readableStream and we have to wait until it is read

        stopDiv.textContent = data.name;

        for (let [busId, busTime] of Object.entries(data.buses)) {
            let liItem = document.createElement('li');
            liItem.textContent = `Bus ${busId} arrives in ${busTime} minutes`;
            busUl.appendChild(liItem);
        }
    }
    catch (error) {
        stopDiv.textContent = 'Error';
    }
}