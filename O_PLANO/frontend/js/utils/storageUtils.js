export function saveUser(userObj) {
    sessionStorage.setItem('user', JSON.stringify(userObj));
}

export function getUser() {
    return JSON.parse(sessionStorage.getItem('user'));
}

export function removeUser() {
    sessionStorage.removeItem('user');
}
