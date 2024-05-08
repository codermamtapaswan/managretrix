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




    
    function mgAutoSlider(sliderWrapName, autoSlideInterval = 3000) 
    {
        const sliderParent = document.querySelector('.' + sliderWrapName);
        const sliderWrap = sliderParent.querySelector('.slider-wrap');
        const slideCount = sliderWrap.querySelectorAll(".slide-card").length;
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


      
        // Function to go to the next slide
        function goToNextSlide() {
          currentIndex = (currentIndex + 1) % slideCount;
          updateSliderPosition();
          updateIndicators();
        }
      
        // Function to update the slider position with slide effect
        function updateSliderPosition() {
          const translateValue = -currentIndex * sliderWrap.offsetWidth;
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
      
        // Add a click event to indicators
        sliderIndicators.addEventListener("click", (event) => {
          if (event.target.classList.contains("indicator")) {
            currentIndex = Array.from(sliderIndicators.children).indexOf(event.target);
            updateSliderPosition();
            updateIndicators();
          }
        });
      
        // Add mouseover and mouseout events to pause and resume the auto slider
        sliderWrap.parentNode.addEventListener("mouseover", stopAutoSlider);
        sliderWrap.parentNode.addEventListener("mouseout", startAutoSlider);
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
    //       const indicator = document.createElement("div");
    //       indicator.classList.add("indicator");
    //       sliderIndicators.appendChild(indicator);
    //     }
    //     sliderWrap.parentNode.insertBefore(sliderIndicators, sliderWrap.nextSibling);
      
    //     // Function to update the indicators
    //     function updateIndicators() {
    //       const indicators = sliderIndicators.querySelectorAll(".indicator");
    //       indicators.forEach((indicator, index) => {
    //         indicator.classList.toggle("active", index === currentIndex);
    //       });
    //     }


      
    //     // Function to go to the next slide
    //     function goToNextSlide() {
    //       currentIndex = (currentIndex + 1) % slideCount;
    //       updateSliderPosition();
    //       updateIndicators();
    //     }
      
    //     // Function to update the slider position with slide effect
    //     function updateSliderPosition() {
    //       const translateValue = -currentIndex * sliderWrap.offsetWidth;
    //       sliderWrap.style.transform = `translateX(${translateValue}px)`;
    //     }
      
    //     // Start the auto slider
    //     function startAutoSlider() {
    //       autoSlideTimer = setInterval(goToNextSlide, autoSlideInterval);
    //     }
      
    //     // Stop the auto slider
    //     function stopAutoSlider() {
    //       clearInterval(autoSlideTimer);
    //     }
      
    //     // Initial setup
    //     updateIndicators();
    //     startAutoSlider();
      
    //     // Add a click event to indicators
    //     sliderIndicators.addEventListener("click", (event) => {
    //       if (event.target.classList.contains("indicator")) {
    //         currentIndex = Array.from(sliderIndicators.children).indexOf(event.target);
    //         updateSliderPosition();
    //         updateIndicators();
    //       }
    //     });
      
    //     // Add mouseover and mouseout events to pause and resume the auto slider
    //     sliderWrap.parentNode.addEventListener("mouseover", stopAutoSlider);
    //     sliderWrap.parentNode.addEventListener("mouseout", startAutoSlider);
    //   }
      
    //   mgAutoSlider("testimonials", autoSlideInterval = 1000);








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



      
     
