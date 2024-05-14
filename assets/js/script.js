document.addEventListener("DOMContentLoaded", function () {


    // Header Sticky  ============ start =====>

    const header = document.querySelector("header");
    const handleScroll = () => {
        window.scrollY > 0 ? header.classList.add("sticky-header") : header.classList.remove("sticky-header");
    }
    window.addEventListener("scroll", handleScroll);




    // mobile search form code ============ start =====>
    let searchIcon = document.querySelector(".search-toggle-btn");
    let searchForm = document.querySelector(".menu-search-form");

    let svg1 =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9" stroke-width="2" stroke="#000" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
    let svg2 =
        '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';
    let isSvg1 = true;

    if (searchIcon) {
        searchIcon.addEventListener("click", function () {
            searchIcon.innerHTML = isSvg1 ? svg2 : svg1;
            isSvg1 = !isSvg1;

            searchForm.classList.toggle("search-bar-show");
        });
    }


    // Show mobile left canvas ============ start =====>
    const toggleslideBtn = document.querySelector(".menu-toggle-btn");
    const cancelBtn = document.querySelector(".cancel-btn");
    const headerUl = document.querySelector("header .menu ul");

    toggleslideBtn.addEventListener("click", function () {
        const backDrop = createBackdrop();
        headerUl.classList.toggle("show-ul");
        toggleScrollLock();
    });

    cancelBtn.addEventListener("click", function () {
        const backDrop = document.querySelector('.back-drop');
        if (backDrop) backDrop.remove();
        headerUl.classList.remove("show-ul");
        toggleScrollLock();
    });

    function createBackdrop() {
        const backDrop = document.querySelector('.back-drop');
        if (!backDrop) {
            const newBackdrop = document.createElement('div');
            newBackdrop.classList.add('back-drop');
            header.appendChild(newBackdrop);
            newBackdrop.addEventListener("click", function () {
                headerUl.classList.remove("show-ul");
                newBackdrop.remove();
                toggleScrollLock();
            });
            return newBackdrop;
        }
        return backDrop;
    }

    function toggleScrollLock() {
        document.body.style.overflow = (document.body.style.overflow === 'hidden') ? 'auto' : 'hidden';
    }






    // mobile Dropdown  ============ start =====>
    const navDropdowns = document.querySelectorAll(".dropdown");
    navDropdowns.forEach((parentDropdown) => {
        parentDropdown.addEventListener("click", function (e) {
            this.classList.toggle("showMenu");
        });

        const subDropdowns = parentDropdown.querySelectorAll(".dropdown ul");
        subDropdowns.forEach((subDropdown) => {
            subDropdown.addEventListener("click", function (event) {
                event.stopPropagation(); // Prevents the click event from reaching the parent dropdown
            });
        });
    });

    // Add a click event listener to the document to close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
        navDropdowns.forEach((dropdown) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("showMenu");
            }
        });
    });





    // Tabs code  ============ start =====>
    function initializeTabs() {
        const tabButtons = document.querySelectorAll(".tablinks");

        for (let i = 0; i < tabButtons.length; i++) {
            tabButtons[i].addEventListener('click', function () {
                const tabName = this.dataset.process;
                const tabContent = document.getElementById(tabName);

                const allTabContent = document.querySelectorAll(".tabcontent");
                const allTabButtons = document.querySelectorAll(".tablinks");

                for (var j = 0; j < allTabContent.length; j++) {
                    allTabContent[j].style.display = "none";
                    allTabButtons[j].classList.remove("active");
                }

                tabContent.style.display = "block";
                this.classList.add("active");
            });
        }
        // Simulate click on the first tablink
        document.querySelector(".tablinks").click();
    }
    initializeTabs();







    function mgAutoSlider(sliderWrapName, autoSlideInterval = 3000) {
        const breakpoints = {
            desktop: { slidesPerView: 3, spaceBetween: 30 },
            tablet: { slidesPerView: 2, spaceBetween: 20 },
            mobile: { slidesPerView: 1, spaceBetween: 10 }
        };

        const sliderParent = document.querySelector('.' + sliderWrapName);
        const sliderWrap = sliderParent.querySelector('.slider-wrap');
        const slideCards = sliderWrap.querySelectorAll(".slide-card");
        const slideCount = slideCards.length;
        let currentIndex = 0;
        let autoSlideTimer;

        // Create indicators for each slide
        const sliderIndicators = document.createElement("div");
        sliderIndicators.classList.add("indicators");
        for (let i = 0; i < slideCount; i++) {
            const indicator = document.createElement("div");
            indicator.classList.add("indicator");
            sliderIndicators.appendChild(indicator);
        }
        sliderWrap.parentNode.insertBefore(sliderIndicators, sliderWrap.nextSibling);

        // Function to update the indicators
        function updateIndicators() {
            const indicators = sliderIndicators.querySelectorAll(".indicator");
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle("active", index === currentIndex);
            });
        }

        // Function to determine the device type based on the viewport width
        function getDeviceType() {
            const viewportWidth = window.innerWidth;
            if (viewportWidth >= 1024) {
                return 'desktop';
            } else if (viewportWidth >= 768) {
                return 'tablet';
            } else {
                return 'mobile';
            }
        }

        // Function to update slidesPerView and spaceBetween based on window width
        function updateSlideConfig() {
            const deviceType = getDeviceType();
            return breakpoints[deviceType];
        }

        // Function to go to the next slide
        function goToNextSlide() {
            const { slidesPerView } = updateSlideConfig();
            currentIndex = (currentIndex + 1) % (slideCount - (slidesPerView - 1));
            updateSliderPosition();
            updateIndicators();
        }

        // Function to update the slider position with slide effect
        function updateSliderPosition() {
            const { slidesPerView, spaceBetween } = updateSlideConfig();
            const slideWidth = (sliderWrap.offsetWidth - (slidesPerView - 1) * spaceBetween) / slidesPerView;
            const translateValue = -currentIndex * (slideWidth + spaceBetween);
            sliderWrap.style.transform = `translateX(${translateValue}px)`;
        }

        // Start the auto slider
        function startAutoSlider() {
            autoSlideTimer = setInterval(goToNextSlide, autoSlideInterval);
        }

        // Stop the auto slider
        function stopAutoSlider() {
            clearInterval(autoSlideTimer);
        }

        // Initial setup
        updateIndicators();
        startAutoSlider();

        // Add mouseover and mouseout events to pause and resume the auto slider
        sliderWrap.parentNode.addEventListener("mouseover", stopAutoSlider);
        sliderWrap.parentNode.addEventListener("mouseout", startAutoSlider);

        // Add a click event to indicators
        sliderIndicators.addEventListener("click", (event) => {
            if (event.target.classList.contains("indicator")) {
                currentIndex = Array.from(sliderIndicators.children).indexOf(event.target);
                updateSliderPosition();
                updateIndicators();
            }
        });

        // Recalculate slider position when the window is resized
        window.addEventListener('resize', updateSliderPosition);
    }

    mgAutoSlider("testimonials", autoSlideInterval = 3000);







    // function mgAutoSlider(sliderWrapName, autoSlideInterval = 3000) {
    //     const sliderParent = document.querySelector('.' + sliderWrapName);
    //     const sliderWrap = sliderParent.querySelector('.slider-wrap');
    //     const slideCount = sliderWrap.querySelectorAll(".slide-card").length;
    //     let currentIndex = 0;
    //     let autoSlideTimer;

    //     // Create indicators for each slide
    //     const sliderIndicators = document.createElement("div");
    //     sliderIndicators.classList.add("indicators");
    //     for (let i = 0; i < slideCount; i++) {
    //         const indicator = document.createElement("div");
    //         indicator.classList.add("indicator");
    //         sliderIndicators.appendChild(indicator);
    //     }
    //     sliderWrap.parentNode.insertBefore(sliderIndicators, sliderWrap.nextSibling);

    //     // Function to update the indicators
    //     function updateIndicators() {
    //         const indicators = sliderIndicators.querySelectorAll(".indicator");
    //         indicators.forEach((indicator, index) => {
    //             indicator.classList.toggle("active", index === currentIndex);
    //         });
    //     }



    //     // Function to go to the next slide
    //     function goToNextSlide() {
    //         currentIndex = (currentIndex + 1) % slideCount;
    //         updateSliderPosition();
    //         updateIndicators();
    //     }

    //     // Function to update the slider position with slide effect
    //     function updateSliderPosition() {
    //         const translateValue = -currentIndex * sliderWrap.offsetWidth;
    //         sliderWrap.style.transform = `translateX(${translateValue}px)`;
    //     }

    //     // Start the auto slider
    //     function startAutoSlider() {
    //         autoSlideTimer = setInterval(goToNextSlide, autoSlideInterval);
    //     }

    //     // Stop the auto slider
    //     function stopAutoSlider() {
    //         clearInterval(autoSlideTimer);
    //     }

    //     // Initial setup
    //     updateIndicators();
    //     startAutoSlider();

    //     // Add a click event to indicators
    //     sliderIndicators.addEventListener("click", (event) => {
    //         if (event.target.classList.contains("indicator")) {
    //             currentIndex = Array.from(sliderIndicators.children).indexOf(event.target);
    //             updateSliderPosition();
    //             updateIndicators();
    //         }
    //     });

    //     // Add mouseover and mouseout events to pause and resume the auto slider
    //     sliderWrap.parentNode.addEventListener("mouseover", stopAutoSlider);
    //     sliderWrap.parentNode.addEventListener("mouseout", startAutoSlider);
    // }

    // mgAutoSlider("testimonials", autoSlideInterval = 1000);









    // Table Of Content   ============ start =====>
    const tableHeader = document.querySelector(".toc-header");
    const tableCrossBtn = document.querySelector(".toc-toggle-btn");
    const tableOfcontentBody = document.querySelector(".mg-toc-wrap .toc-body");
    const tableDropdowns = document.querySelectorAll(".toc-body ul ul");

    // Function to check if it's a mobile device
    function isMobileDevice() {
        return window.innerWidth <= 768; // Adjust the width as needed
    }

    // Function to hide table of content on mobile devices
    function hideTableOfContentOnMobile() {
        if (isMobileDevice()) {
            tableOfcontentBody.classList.add("hidden");
            tableHeader.classList.remove('head-border');
        }
    }

    // Initial check to hide on page load if it's a mobile device
    if (tableHeader) {
        tableHeader.classList.add('head-border');
        hideTableOfContentOnMobile();
        const minus = '<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="11" height="2" rx="1" fill="#000"/></svg>';
        const plus =
            '<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.68 6.2H6.8v4.12H4.79V6.2H.93V4.37h3.86V.27H6.8v4.1h3.88z" fill="#000"></path></svg>';

        tableHeader.addEventListener("click", function () {
            if (tableOfcontentBody.classList.contains("hidden")) {
                tableOfcontentBody.classList.remove("hidden");
                tableHeader.classList.add('head-border');
                tableCrossBtn.innerHTML = plus;
            } else {
                tableOfcontentBody.classList.add("hidden");
                tableHeader.classList.remove('head-border');
                tableCrossBtn.innerHTML = minus;
            }
        });
    }

    // table nested li (converted into dropdown)
    if (tableDropdowns) {
        tableDropdowns.forEach((tableDropdown) => {
            const parentli = tableDropdown.parentElement;
            parentli.classList.add("drop-down")

            parentli.addEventListener("click", function (e) {
                this.classList.toggle("showtocdrop");
            });

        });
    }

    // Check on window resize to adjust visibility
    window.addEventListener("resize", hideTableOfContentOnMobile);

    const tableOfContentItems = document.querySelectorAll(".toc-body ul li a");

    tableOfContentItems.forEach((link) => {
        link.addEventListener("click", scrollToSection);
    });

    function scrollToSection(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offset = targetElement.offsetTop - 100;
            const top = offset > 0 ? offset : 0;
            window.scrollTo({
                top: top,
                behavior: "smooth",
            });
        }
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const targetId = entry.target.getAttribute("id");
                const link = document.querySelector(`.toc-body ul li a[href="#${targetId}"]`);
                if (entry.isIntersecting) {
                    link?.parentElement.classList.add("active");
                } else {
                    link?.parentElement.classList.remove("active");
                }
            });
        },
        {
            threshold: 0.5,
        }
    );
    document.querySelectorAll("h2, h3, h4, h5, h6").forEach((element) => {
        observer.observe(element);
    });



    // accordion code  ============ start =====>
    const detailsElements = document.querySelectorAll("details");
    const summaryElements = document.querySelectorAll("summary");
    summaryElements.forEach((summary, index) => {
        summary.addEventListener("click", () => {
            detailsElements.forEach((details, i) => {
                if (i !== index) {
                    details.open = false;
                }
            });
        });
    });



    // Scroll to top   ============ start =====>
    const scrollTopBtn = document.getElementById("scroll_to_top");

    window.addEventListener('scroll', function () {
        scrollTopBtn.style.display = (window.scrollY > 20) ? "block" : "none";
    });

    scrollTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });






}); //======= End =====>





