const topHeader = document.querySelector('[data-js="top-header"]');
const sidebar = document.querySelector('[data-js="right-sidebar"]');
const sidebarItems = [];

if (sidebar) {
  for (const item of sidebar.children) {
    sidebarItems.push(item);
  }
}

let lastScrollY = window.scrollY;

function isDesktopSidebar() {
  return window.innerWidth > 992;
}
function updateHeaderVisibility() {
  if (!topHeader) return;

  const currentScrollY = window.scrollY;
  const scrollingDown = currentScrollY > lastScrollY;

  if (scrollingDown && currentScrollY > 400) {
    topHeader.classList.add("top-header--hidden");
  } else {
    topHeader.classList.remove("top-header--hidden");
    if (currentScrollY > 400) {
      topHeader.classList.add("top-header--shrunk");
    } else {
      topHeader.classList.remove("top-header--shrunk");
    }
  }

  lastScrollY = currentScrollY;
}

function updateSidebarStickyItem() {
  if (!sidebar) return;

  if (!isDesktopSidebar()) {
    sidebarItems.forEach((item) => {
      item.classList.remove("aside-item--active");
      item.style.transform = "translateY(0)";
    });
    return;
  }
  const stickyOffset = 12;
  let activeIndex = 0;

  for (let index = 0; index < sidebarItems.length; index++) {
    const currentItem = sidebarItems[index];
    const currentTop = currentItem.getBoundingClientRect().top;

    if (currentTop <= stickyOffset) {
      activeIndex = index;
    }
  }

  sidebarItems.forEach((item, index) => {
    item.style.transform = "translateY(0)";

    if (index === activeIndex) {
      item.classList.add("aside-item--active");
    } else {
      item.classList.remove("aside-item--active");
    }
  });

  const activeItem = sidebarItems[activeIndex];
  const nextItem = sidebarItems[activeIndex + 1];

  if (!activeItem || !nextItem) return;

  const nextTop = nextItem.getBoundingClientRect().top;
  const activeBottom = stickyOffset + activeItem.offsetHeight;
  const overlap = activeBottom - nextTop;

  if (overlap > 0) {
    activeItem.style.transform = `translateY(${-overlap}px)`;
  }
}

function onScroll() {
  updateHeaderVisibility();
  updateSidebarStickyItem();
}

updateSidebarStickyItem();
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", updateSidebarStickyItem);

// Show dropdown sections
const btnSections = document.querySelector('[data-js="btn-sections"]');
const sectionsDropdown = document.querySelector(
  '[data-js="sections-dropdown"]',
);

if (btnSections && sectionsDropdown) {
  btnSections.addEventListener("click", function (event) {
    event.stopPropagation();
    sectionsDropdown.classList.toggle("sections-dropdown--show");
    btnSections.classList.toggle("btn-sections--active");
    document.body.classList.toggle("body--menu-open");
  });

  // Disappears if user clicks outside of it
  document.addEventListener("click", function (event) {
    if (
      !sectionsDropdown.contains(event.target) &&
      sectionsDropdown.classList.contains("sections-dropdown--show")
    ) {
      sectionsDropdown.classList.remove("sections-dropdown--show");
      btnSections.classList.remove("btn-sections--active");
      document.body.classList.remove("body--menu-open");
    }
  });
}
