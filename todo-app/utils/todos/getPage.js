export default (todos, limit, page) => {
  const total = Math.ceil(todos.length / limit);
  const pageObj = {};
  pageObj.total = total;
  pageObj.pageTotalSection = Math.ceil(total / 5);
  pageObj.pageSection = Math.ceil(page / 5);

  if (total === 0) {
    return {};
  } else if (total === 1) {
    pageObj.current = page;
  } else if (total > 1) {
    pageObj.current = page;
    if (page === 1) {
      pageObj.next = page + 1;
    } else if (page >= total) {
      pageObj.previous = page - 1;
    } else {
      pageObj.previous = page - 1;
      pageObj.next = page + 1;
    }
  }

  return pageObj;
};
