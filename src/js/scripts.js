function getPropertyFromSessionStorage(key, defaultValue) {
  return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : defaultValue;
}

function savePropertyInSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}
