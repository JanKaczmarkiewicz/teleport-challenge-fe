const BACKEND_URL = 'http://localhost:8000';

type Init = Omit<RequestInit, 'method'> & {
    method: 'GET' | 'POST' | 'DELETE';
};

const request = (path: `/${string}`, init?: Init) =>
    fetch(`${BACKEND_URL}${path}`, init).then((res) => {
        if (!res.ok) throw res;
        return res;
    });

export default request;
