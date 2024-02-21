export default function getRelatedItems<Type extends { id: string }>(
  itemIDs: string | Array<string>,
  itemStore: Array<Type>,

  cb?: (items: Array<Type>) => Array<Type> | []
): Array<Type> {
  let items: Array<Type> = [];
  if (Array.isArray(itemIDs)) {
    for (let i = 0; i <= itemIDs.length; i++) {
      for (let j = 0; j < itemStore.length; j++) {
        // item store
        if (itemIDs[i] === itemStore[j].id) {
          items.push(itemStore[j]);
        }
      }
    }
  } else {
    for (let i = 0; i < itemStore.length; i++) {
      // item store
      if (itemIDs === itemStore[i].id) {
        items.push(itemStore[i]);
      }
    }
  }

  // cb modifies the returned value of the searched items
  return cb !== undefined ? cb(items) : items;
}
