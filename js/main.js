const topHeader = document.querySelector('.top-header');
const sidebar = document.querySelector('.right-sidebar');
const sidebarItems = [];

if (sidebar) {
    for (const item of sidebar.children) {
        sidebarItems.push(item);
    }
}

let lastScrollY = window.scrollY;

function isDesktopSidebar() {
    return window.innerWidth > 1000;
}
function updateHeaderVisibility() {
    if (!topHeader) return;

    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;

    if (scrollingDown && currentScrollY > 400) {
        topHeader.classList.add('top-header-hidden');
    } else {
        topHeader.classList.remove('top-header-hidden');
        if (currentScrollY > 0 && currentScrollY > 400) {
            topHeader.classList.add('is-shrunk');
        } else {
            topHeader.classList.remove('is-shrunk');
        }
    }

    lastScrollY = currentScrollY;
}

function updateSidebarStickyItem() {
    if (!sidebar) return;

    
    if (!isDesktopSidebar()) {
        sidebarItems.forEach((item) => {
            item.classList.remove('aside-item-active');
            item.style.transform = 'translateY(0)';
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
        item.style.transform = 'translateY(0)';

        if (index === activeIndex) {
            item.classList.add('aside-item-active');
        } else {
            item.classList.remove('aside-item-active');
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
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', updateSidebarStickyItem);
