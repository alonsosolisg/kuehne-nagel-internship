export const onItemRemovedFromSelection = (
  currentSelectionsUI: Record<string, boolean>,
  rowIndex: number
): Record<string, boolean> => {
  const newSelectionsUI: Record<string, boolean> = {};
  for (const key in currentSelectionsUI) {
    let keyAsInt = parseInt(key);
    if (keyAsInt === rowIndex) {
      continue;
    }
    keyAsInt--;
    newSelectionsUI[`${keyAsInt}`] = currentSelectionsUI[key];
  }
  return newSelectionsUI;
};
