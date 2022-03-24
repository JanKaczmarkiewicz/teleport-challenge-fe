const BACKEND_URL = 'http://localhost:8000';

type Init = Omit<RequestInit, 'method'> & {
    method: 'GET' | 'POST' | 'DELETE';
};

const request = <T>(path: `/${string}`, init?: Init): Promise<T> =>
    fetch(`${BACKEND_URL}${path}`, init).then((res) => res.json());

export default request;
