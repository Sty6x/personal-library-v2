function removeGlobalState() {
  const convertLocalStorage = Object.entries(localStorage);
  const filteredItems = convertLocalStorage.filter((item, i) => {
    if (item[0] === "globalState") return;
    return item;
  });
  return filteredItems;
}

function parseLocalStorage(arr, keyValue) {
  const parseItems = arr.map((item) => {
    let parsedItem = { ...JSON.parse(item[keyValue]) };
    return { ...parsedItem, lastUpdated: new Date(parsedItem.lastUpdated) };
  });
  return parseItems;
}

export function getLocalStorage() {
  const library = parseLocalStorage(removeGlobalState(), 1);
  return { localLibrary: library };
}

export async function addItem(item) {
  localStorage.setItem(item.id, JSON.stringify(item));
}

export async function removeItem(item) {
  localStorage.removeItem(item.id);
}

export async function updateItem(item) {
  localStorage.setItem(item.id, JSON.stringify(item));
}

export function getGlobalState() {
  const global = localStorage.getItem("globalState");
  const parseState = JSON.parse(global);
  return { ...parseState };
}

export function localStorageItemExist(itemId) {
  const convertLocalStorage = Object.entries(localStorage);
  const getKeys = convertLocalStorage.map((item) => item[0]);
  const checkKey = getKeys.find((item) => item === itemId);
  return checkKey !== undefined ? true : false;
}
