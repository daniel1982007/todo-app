export default function (page) {
  if (!Object.keys(page).length) {
    return [];
  }

  console.log(page);
  let page_n;
  //get the page section
  const section_start_page = page.pageSection * 5 - 4;
  const num =
    page.total - section_start_page >= 4
      ? 5
      : page.total - section_start_page + 1;
  console.log(section_start_page);
  console.log(num);

  page_n = Array(num)
    .fill()
    .map((_, i) => section_start_page + i);

  if (page.current < 6 && page.total >= 6) {
    page_n = page_n.concat("...");
  } else if (page.current < 6) {
    page_n = page_n;
  } else if (
    page.current >= 6 &&
    page.current < page.total &&
    page.pageSection < page.pageTotalSection
  ) {
    page_n.unshift("...");
    page_n = page_n.concat("...");
  } else if (page.current >= 6) {
    page_n.unshift("...");
  }

  return page_n;
}
