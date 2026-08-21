// Women of Valour — shared site behaviour

document.addEventListener("DOMContentLoaded", () => {
  /* Mobile nav toggle */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* Payment record search/filter */
  const searchInput = document.getElementById("record-search");
  const tableRows = document.querySelectorAll(".record-table tbody tr");
  const resultCount = document.getElementById("result-count");
  const noResults = document.getElementById("no-results");

  if (searchInput && tableRows.length) {
    const totalCount = tableRows.length;

    const updateCount = (visible) => {
      if (resultCount) {
        resultCount.textContent =
          visible === totalCount
            ? `${totalCount} entries`
            : `${visible} of ${totalCount} entries`;
      }
      if (noResults) {
        noResults.classList.toggle("is-visible", visible === 0);
      }
    };

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      let visible = 0;

      tableRows.forEach((row) => {
        const match = row.textContent.toLowerCase().includes(query);
        row.classList.toggle("is-hidden", !match);
        if (match) visible += 1;
      });

      updateCount(visible);
    });

    updateCount(totalCount);
  }
});
