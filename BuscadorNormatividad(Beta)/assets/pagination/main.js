export default function paginationItems(pagContent, itemPagination) {
  const paginationContent = document.querySelector(pagContent);
  const listItems = [...document.querySelectorAll(itemPagination)];

  function getPageList(totalpages, page, maxLength) {
    function range(start, end) {
      return Array.from(Array(end - start + 1), (_, i) => i + start);
    }

    let sideWidth = maxLength < 9 ? 1 : 2;
    let leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    let rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

    if (totalpages <= maxLength) {
      return range(1, totalpages);
    }

    if (page <= maxLength - sideWidth - 1 - rightWidth) {
      return range(1, maxLength - sideWidth - 1).concat(
        0,
        range(totalpages - sideWidth + 1, totalpages)
      );
    }

    if (page >= totalpages - sideWidth - 1 - rightWidth) {
      return range(1, sideWidth).concat(
        0,
        range(totalpages - sideWidth - 1 - rightWidth - leftWidth, totalpages)
      );
    }

    return range(1, sideWidth).concat(
      0,
      range(page - leftWidth, page + rightWidth),
      0,
      range(totalpages - sideWidth + 1, totalpages)
    );
  }

  $(function () {
    let numberOfItems = listItems.length;

    let limitPerPage = 5; // How many card items visible per page

    let totalpages = Math.ceil(numberOfItems / limitPerPage);

    let paginationSize = 7; // How many page elements visible in the pagination

    let currentPage;

    function showPage(whichPage) {
      if (whichPage < 1 || whichPage > totalpages) return false;

      currentPage = whichPage;

      $(itemPagination)
        .hide()
        .slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage)
        .show();

      $(".pagination li").slice(1, -1).remove();

      getPageList(totalpages, currentPage, paginationSize).forEach((item) => {
        $("<li>")
          .addClass("page-item")
          .addClass(item ? "current-page" : "dots")
          .toggleClass("active", item === currentPage)
          .append(
            $("<a>")
              .addClass("page-link")
              .attr({ href: "javascript:void(0)" })
              .text(item || "...")
          )
          .insertBefore(".next-page");
      });

      $(".previous-page").toggleClass("disable", currentPage === 1);
      $(".next-page").toggleClass("disable", currentPage === totalpages);
      return true;
    }

    $(".pagination").append(
      $("<li>")
        .addClass("page-item")
        .addClass("previous-page")
        .append(
          $("<a>")
            .addClass("page-link")
            .attr({ href: "javascript:void(0)" })
            .text("Prev")
        ),
      $("<li>")
        .addClass("next-item")
        .addClass("next-page")
        .append(
          $("<a>")
            .addClass("page-link")
            .attr({ href: "javascript:void(0)" })
            .text("Next")
        )
    );

    $(".searchResults").show();

    showPage(1);

    $(document).on(
      "click",
      ".pagination li.current-page:not(.active)",
      function () {
        return showPage(+$(this).text());
      }
    );

    $(".next-page").on("click", function () {
      return showPage(currentPage + 1);
    });

    $(".previous-page").on("click", function () {
      return showPage(currentPage - 1);
    });
  });
}
