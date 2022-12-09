export const generatePaginationSequence = (totalPages) => {
  let pagesNum = [];
  for (let i = 0; i < totalPages; i++) {
    pagesNum.push(i + 1);
  }
  return pagesNum
}