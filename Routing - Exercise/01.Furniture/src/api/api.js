const hostUrl = 'http://localhost:3030/';

async function request(url, options) {
    try {
        const response = await fetch(hostUrl + url, options);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            if (response.status === 204) {
                return response;
            }

            const data = await response.json();
            return data;
        }
        catch (error) {
            alert(error.message);
            return error;
        }
    }
    catch (error) {
        alert(error.message);
        return error;
    }
}

function getOptions(method, body) {
    const options = {
        method,
        headers: {}
    }

    const user = JSON.parse(sessionStorage.getItem('userData'));
    
    if (user) {
        const token = user.accessToken;
        options.headers['X-Authorization'] = token;
    }

    if (body) {
        options.headers['Content-Type'] = 'Applcation/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

export async function get(url){
    return await request(url, getOptions('get'));
}

export async function post(url, data) {
    return await request(url, getOptions('post', data));
}

export async function put(url, data) {
    return await request(url, getOptions('put', data));
}

export async function del (url) {
    return await request(url, getOptions('delete'));
}