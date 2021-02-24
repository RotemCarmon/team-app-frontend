function store(key, val) {
  localStorage[key] = JSON.stringify(val);
}

function load(key) {
  var str = localStorage[key] || 'null';
  return JSON.parse(str);
}
function remove(key) {
  localStorage.removeItem(key)
}

export const storageService = {
  store,
  load,
  remove
}