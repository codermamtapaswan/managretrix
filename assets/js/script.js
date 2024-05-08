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

    function toggleButtons(cancelBtn, headerUl) {
        $mobileNav = headerUl.classList.toggle("show-ul");

        if (!$mobileNav) {
            const backDrop = document.querySelector('.back-drop');
            backDrop.remove();
            enableScroll();
        }
        else {
            const backDrop = document.createElement('div');
            header.appendChild(backDrop);
            backDrop.classList.add('back-drop');
            disableScroll();

            backDrop.addEventListener("click", function () {
                headerUl.classList.remove("show-ul");
                backDrop.remove();
                enableScroll();
            });
        }

        function disableScroll() {
            document.body.style.overflow = 'hidden';
        }

        function enableScroll() {
            document.body.style.overflow = 'auto';
        }

    }

    toggleslideBtn.addEventListener("click", function () {
        toggleButtons(cancelBtn, headerUl);
    });

    cancelBtn.addEventListener("click", function () {
        toggleButtons(cancelBtn, headerUl);
    });





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
    document.querySelector(".tablinks").click();



    function mgSlider(sliders) {
        sliders.forEach(config => {
            const { className, slidesPerView, spaceBetween, autoSlideInterval } = config;
            const defaultSlidesPerView = slidesPerView || 2;
            const defaultSpaceBetween = spaceBetween || 20;

            const sliderParent = document.querySelector('.' + className);
            const sliderWrap = sliderParent.querySelector('.slider-wrap');
            const slideCount = sliderWrap.querySelectorAll('.slide-card').length;
            let currentIndex = 0;
            let intervalId;
            let indicatorsContainer; // Indicator container element
            let indicators = []; // Array to store indicator elements

            // Update slidesPerView based on window width
            if (window.innerWidth >= 768 && window.innerWidth < 1024) {
                slidesPerView = defaultSlidesPerView; // Display two slides on tablets
            } else if (window.innerWidth <= 600) {
                slidesPerView = 1; // Display one slide on mobile
            }

            // Calculate the width of the container
            const containerWidth = sliderWrap.offsetWidth;

            // Calculate the width of each slide based on the formula
            let slideWidth = (containerWidth / defaultSlidesPerView) - ((defaultSlidesPerView - 1) * defaultSpaceBetween / defaultSlidesPerView);

            function goToSlide(index) {
                currentIndex = index;
                updateSliderPosition();
                updateIndicatorState();
            }

            function goToNextSlide() {
                currentIndex = (currentIndex + 1) % slideCount;
                updateSliderPosition();
                updateButtonState();
            }

            function goToPrevSlide() {
                currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                updateSliderPosition();
                updateButtonState();
            }

            function updateSliderPosition() {
                const translateValue = -currentIndex * (slideWidth + defaultSpaceBetween);
                sliderWrap.style.transform = `translateX(${translateValue}px)`;
            }

            function createIndicators() {
                indicatorsContainer = document.createElement('div');
                indicatorsContainer.classList.add('indicators');

                for (let i = 0; i < slideCount; i++) {
                    const indicator = document.createElement('div');
                    indicator.classList.add('indicator');
                    indicator.setAttribute('data-index', i);
                    indicator.addEventListener('click', () => goToSlide(i)); // Click event to navigate to slide
                    indicators.push(indicator);
                    indicatorsContainer.appendChild(indicator);
                }

                sliderParent.appendChild(indicatorsContainer);
            }

            function updateIndicatorState() {
                indicators.forEach((indicator, index) => {
                    if (index === currentIndex) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }

            function startAutoSlide() {
                intervalId = setInterval(goToNextSlide, autoSlideInterval || 2000);
            }

            function updateButtonState() {
                const prevButton = sliderParent.querySelector('#previous-arrow');
                const nextButton = sliderParent.querySelector('#next-arrow');

                if (indicatorsContainer) {
                    prevButton.disabled = true;
                    nextButton.disabled = true;
                    prevButton.style.visibility = 'hidden';
                    nextButton.style.visibility = 'hidden';
                } else {
                    if (currentIndex > 0) {
                        prevButton.disabled = false;
                        prevButton.style.visibility = 'visible';
                    } else {
                        prevButton.disabled = true;
                        prevButton.style.visibility = 'hidden';
                    }

                    if (window.innerWidth <= 600) {
                        if (currentIndex < slideCount - 1) {
                            nextButton.disabled = false;
                            nextButton.style.visibility = 'visible';
                        } else {
                            nextButton.disabled = true;
                            nextButton.style.visibility = 'hidden';
                        }
                    } else {
                        if ((slideCount - currentIndex - 1) < defaultSlidesPerView) {
                            nextButton.disabled = true;
                            nextButton.style.visibility = 'hidden';
                        } else {
                            nextButton.disabled = false;
                            nextButton.style.visibility = 'visible';
                        }
                    }

                    if (slideCount <= defaultSlidesPerView) {
                        nextButton.disabled = true;
                        nextButton.style.visibility = 'hidden';
                    }
                }
            }

            function calculateSlideSize() {
                const slideCards = sliderWrap.querySelectorAll('.slide-card');
                for (let i = 0; i < slideCards.length; i++) {
                    slideCards[i].style.width = slideWidth + 'px';
                    slideCards[i].style.marginRight = defaultSpaceBetween + 'px';
                }

                updateButtonState();
            }

            calculateSlideSize();
            createIndicators();
            startAutoSlide();

            window.addEventListener('resize', calculateSlideSize);

            sliderParent.querySelector('#next-arrow').addEventListener('click', function () {
                if (currentIndex < slideCount - 1) {
                    goToNextSlide();
                }
            });

            sliderParent.querySelector('#previous-arrow').addEventListener('click', function () {
                if (currentIndex > 0) {
                    goToPrevSlide();
                }
            });

            sliderParent.addEventListener('mouseover', () => clearInterval(intervalId));
            sliderParent.addEventListener('mouseleave', startAutoSlide);
        });
    }

    mgSlider([
        {
            className: 'testimonials',
            slidesPerView: 3,
            spaceBetween: 20,
            autoSlideInterval: 1000
        }
    ]);








    // Scroll to top   ============ start =====>

    let mybutton = document.getElementById("scroll_to_top");
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    mybutton.addEventListener("click", topFunction);



});
