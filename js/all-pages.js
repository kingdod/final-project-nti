const up = document.querySelector('#up');
up.addEventListener('click', () => {
    window.scrollTo(0,0);
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
          up.classList.remove('d-none');
    } else {
          up.classList.add('d-none');
    }
});





function initZoomEffect(container, image) {
    let isZooming = false;

    container.addEventListener('mouseenter', function () {
        isZooming = true;
    });

    container.addEventListener('mouseleave', function () {
        isZooming = false;
        image.style.transform = 'scale(1)';
        image.style.transformOrigin = 'center center';
    });

    container.addEventListener('mousemove', function (e) {
        if (!isZooming) return;

        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        image.style.transformOrigin = `${x}% ${y}%`;
        image.style.transform = 'scale(1.4)';
    });
}

// Initialize zoom effect for all tab containers after DOM loads
document.addEventListener('DOMContentLoaded', function () {
    // Find all zoom containers and initialize zoom effect
    document.querySelectorAll('.advanced-zoom-container').forEach(container => {
        const image = container.querySelector('.advanced-zoom-image');
        if (image) {
            initZoomEffect(container, image);
        }
    });
});












document.addEventListener('DOMContentLoaded', function() {
    const mainCategories = document.querySelectorAll('.list-group-item.has-submenu');
    const allSubmenus = document.querySelectorAll('.category-submenu');
    const offcanvasBody = document.querySelector('.offcanvas-body');

    let submenuTimeout;
    let activeSubmenu = null; // Keep track of the currently active submenu

    mainCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            clearTimeout(submenuTimeout);

            // Hide any currently active submenu
            if (activeSubmenu) {
                activeSubmenu.classList.remove('show');
            }

            const targetSubmenuId = this.dataset.submenuTarget;
            const targetSubmenu = document.getElementById(targetSubmenuId);

            if (targetSubmenu) {
                targetSubmenu.classList.add('show');
                activeSubmenu = targetSubmenu; // Set the new active submenu
                offcanvasBody.classList.add('show-submenu-active'); // Adjust main list width
            }
        });
    });

    // Handle mouse leaving the entire offcanvas body
    offcanvasBody.addEventListener('mouseleave', function() {
        submenuTimeout = setTimeout(function() {
            if (activeSubmenu) {
                activeSubmenu.classList.remove('show');
                activeSubmenu = null; // Clear active submenu
            }
            offcanvasBody.classList.remove('show-submenu-active');
        }, 100); // Small delay
    });

    // Prevent submenu from closing if mouse enters an active submenu from a category
    allSubmenus.forEach(submenu => {
        submenu.addEventListener('mouseenter', function() {
            clearTimeout(submenuTimeout);
        });
    });

    // Optional: Close submenu when offcanvas itself closes (Bootstrap event)
    const offcanvasElement = document.getElementById('offcanvasCategories');
    if (offcanvasElement) {
        offcanvasElement.addEventListener('hide.bs.offcanvas', function () {
            if (activeSubmenu) {
                activeSubmenu.classList.remove('show');
                activeSubmenu = null;
            }
            offcanvasBody.classList.remove('show-submenu-active');
        });
    }
});





















let test = document.querySelector("#test")


const myBtn= document.querySelector("#myBtn")
myBtn.addEventListener("click", function(e){
   
    test.classList.toggle("d-none")
    
   
})






















document.addEventListener('DOMContentLoaded', function() {
    const fashionCategory = document.getElementById('fashion-category');
    const fashionSubmenu = document.getElementById('fashion-submenu');
    const offcanvasBody = document.querySelector('.offcanvas-body'); // Or specific offcanvas ID

    if (fashionCategory && fashionSubmenu && offcanvasBody) {
        let timeout;

        fashionCategory.addEventListener('mouseenter', function() {
            clearTimeout(timeout);
            fashionSubmenu.classList.add('show');
            offcanvasBody.classList.add('show-fashion-submenu'); // Add class to body to adjust main list width
        });

        // Use mouseleave on the parent .offcanvas-body for a more reliable exit
        // This ensures the submenu stays open as you move from category to submenu
        offcanvasBody.addEventListener('mouseleave', function() {
            timeout = setTimeout(function() {
                fashionSubmenu.classList.remove('show');
                offcanvasBody.classList.remove('show-fashion-submenu');
            }, 100); // Small delay to allow moving between elements
        });

        // Prevent submenu from closing if mouse enters submenu directly from category
        fashionSubmenu.addEventListener('mouseenter', function() {
            clearTimeout(timeout);
        });
    }
});














document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.merto-header-sticky');
    const nav = document.querySelector('nav');
    const contactSection = document.querySelector('.contact-us-section');
    
    // Check if elements exist
    if (!header || !contactSection) {
        console.error('Header or contact section not found');
        return;
    }
    
    // Calculate header + nav height for proper spacing
    const headerHeight = header.offsetHeight;
    const navHeight = nav ? nav.offsetHeight : 0;
    const totalHeaderHeight = headerHeight + navHeight;
    
    function handleScroll() {
        const contactSectionTop = contactSection.offsetTop;
        const contactSectionHeight = contactSection.offsetHeight;
        const currentScrollY = window.scrollY;
        
        // Calculate the middle point of the contact section
        const contactSectionMiddle = contactSectionTop + (contactSectionHeight / 2);
        
        // Trigger point is at the middle of the contact section
        const triggerPoint = contactSectionMiddle - (window.innerHeight / 2);
        
        // Check if we should activate fixed header
        if (currentScrollY >= triggerPoint) {
            // Make header fixed when reaching middle of contact section
            if (!header.classList.contains('fixed-mode')) {
                header.classList.add('fixed-mode');
                if (nav) nav.classList.add('fixed-mode');
                document.body.classList.add('header-fixed-active');
                
                // Add compensating space to prevent content jump
                const spacer = document.createElement('div');
                spacer.className = 'header-spacer';
                spacer.style.height = totalHeaderHeight + 'px';
                header.parentNode.insertBefore(spacer, header);
            }
        } else {
            // Keep header as normal section when above trigger point
            if (header.classList.contains('fixed-mode')) {
                header.classList.remove('fixed-mode');
                if (nav) nav.classList.remove('fixed-mode');
                document.body.classList.remove('header-fixed-active');
                
                // Remove compensating space
                const spacer = document.querySelector('.header-spacer');
                if (spacer) {
                    spacer.remove();
                }
            }
        }
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
            setTimeout(() => { ticking = false; }, 16); // ~60fps
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Initial call to set correct state
    handleScroll();
});
