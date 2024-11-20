function getItem(storage, key) {
    const jsonStr = storage.getItem(key);
    if (!jsonStr) return null;
    return JSON.parse(jsonStr);
}

function setItem(storage, key, value) {
    const str = (value === undefined) ? null : value;
    storage.setItem(key, JSON.stringify(str));
}

function removeItem(storage, key) {
    storage.removeItem(key);
}

export function getLocalItem(key) {
    return getItem(localStorage, key);
}

export function setLocalItem(key, value) {
    setItem(localStorage, key, value);
}

export function removeLocalItem(key) {
    removeItem(localStorage, key);
}

export function getSessionItem(key) {
    const storage = typeof window !== 'undefined' ? sessionStorage : null;
    if(storage == null) return null;
    return getItem(storage, key);
}

export function setSessionItem(key, value) {
    const storage = typeof window !== 'undefined' ? sessionStorage : null;
    if(storage == null) return null;
    setItem(storage, key, value);
}

export function removeSessionItem(key) {
    const storage = typeof window !== 'undefined' ? sessionStorage : null;
    if(storage == null) return null;
    removeItem(storage, key);
}