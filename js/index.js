function createSlider(slider) {
	var slideContainer = slider.querySelector('.slide-track');
	var slides = slider.querySelectorAll('.slide');
	var dotsContainer = slider.querySelector('.slider-dots');
	var prevBtn = slider.querySelector('.prev-btn');
	var nextBtn = slider.querySelector('.next-btn');

	var slideWidth = slides[0].offsetWidth;
	var slideIndex = 0;
	var autoSlideInterval;

	function slideTo(index) {
		slideContainer.style.transform = 'translateX(' + (-slideWidth * index) + 'px)';
		slideIndex = index;
		updateActiveDot();
	}

	function slideNext() {
		slideIndex++;
		if (slideIndex >= slides.length) {
			slideIndex = 0;
		}
		slideTo(slideIndex);
	}

	function slidePrev() {
		slideIndex--;
		if (slideIndex < 0) {
			slideIndex = slides.length - 1;
		}
		slideTo(slideIndex);
	}

	function createDots() {
		slides.forEach(function(_, index) {
			var dot = document.createElement('div');
			dot.classList.add('slider-dot');
			dot.addEventListener('click', function() {
				slideTo(index);
			});
			dotsContainer.appendChild(dot);
		});
	}

	function updateActiveDot() {
		var dots = dotsContainer.querySelectorAll('.slider-dot');
		dots.forEach(function(dot, index) {
			if (index === slideIndex) {
				dot.classList.add('active');
			} else {
				dot.classList.remove('active');
			}
		});
	}

	function startAutoSlide() {
		autoSlideInterval = setInterval(slideNext, 3000);
	}

	function stopAutoSlide() {
		clearInterval(autoSlideInterval);
	}

	prevBtn.addEventListener('click', function() {
		slidePrev();
		stopAutoSlide();
	});

	nextBtn.addEventListener('click', function() {
		slideNext();
		stopAutoSlide();
	});

	createDots();
	updateActiveDot();

	startAutoSlide();

	window.addEventListener('resize', function() {
		slideWidth = slides[0].offsetWidth;
		slideTo(slideIndex);
	});
}

window.addEventListener('DOMContentLoaded', function() {
	var sliders = document.querySelectorAll('.slider');
	sliders.forEach(function(slider) {
		createSlider(slider);
	});
});