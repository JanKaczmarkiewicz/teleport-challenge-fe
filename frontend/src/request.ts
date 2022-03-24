const BACKEND_URL = 'http://localhost:8000';

type Init = Omit<RequestInit, 'method'> & {
    method: 'GET' | 'POST' | 'DELETE';
};

const request = (path: `/${string}`, init?: Init) =>
    fetch(`${BACKEND_URL}${path}`, init);

export default request;
