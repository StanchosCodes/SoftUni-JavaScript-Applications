export function getUserData() {
    const data = JSON.parse(sessionStorage.getItem('userData'));
    // if theres is no userData the data will be null and we have to return the data
    return data;
}

export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data)); // we set the given data with key userData
    // so we can find it later
}

export function clearUserData() {
    sessionStorage.removeItem('userData'); // we have to remove the lately set item
}

export function createSubmitHandler(callback) {
    return function(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        callback(data);
    };
}