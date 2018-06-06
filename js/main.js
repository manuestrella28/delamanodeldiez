// Loader
$('body').imagesLoaded( { background: true }, function() {
   $('body').removeClass('loading');
   $('.loader').css({'display': 'none', 'opacity': '0'}, 500);
});

// Masonry Layout
new Masonry(document.querySelector('#gallery'), {
    itemSelector: '.gallery-item',
    columnWidth: 0
});

// Animate items
const items = document.querySelectorAll('.timeline-carousel__item');
const images = document.querySelectorAll('.gallery-image');

observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      entry.target.classList.add('show');
    }
  });
});

items.forEach(item => {
  observer.observe(item);
});

images.forEach(image => {
  observer.observe(image);
});


// Timeline Horizontal
$('.timeline-carousel__item-wrapper').slick({
   infinite: false,
   arrows: false,
   dots: true,
   autoplay: false,
   speed: 1100,
   slidesToShow: 4,
   slidesToScroll: 4,
   responsive: [
      {
         breakpoint: 1024,
         settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: false
         }
      },
      {
         breakpoint: 640,
         settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false
         }
      }
   ]
});

// Zoom Images
$('.gallery-image').zoomify();

// On Scroll Functionality
$(window).scroll( () => {
  let windowTop = $(window).scrollTop();
  windowTop > 10 ? $('.top-bar').addClass('minimized') : $('.top-bar').removeClass('minimized');
});


// Navigation scrolling
let section_items = $('.section'),
   navigation_items = $('.nav-link');

   updateNavigation();

	$(window).on('scroll', function(){
		updateNavigation();
	});

    navigation_items.on('click',function(event){
       event.preventDefault();
        smoothScroll($(this.hash));
    });

    $('.scroll_down').on('click',function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    function updateNavigation() {
		section_items.each(function(){
			$this = $(this);
			var activeSection = $('.navigation a[href="#'+$this.attr('id')+'"]').data('number') - 1;
			if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
				navigation_items.eq(activeSection).addClass('active');
			}else {
				navigation_items.eq(activeSection).removeClass('active');
			}
		});
	}

   function smoothScroll(target){
      $('body,html').animate({'scrollTop':target.offset().top - 100}, 600);
   }



// Social Share
function socialShare() {

	// variables
	let currentURL = document.URL;
	let currentTitle = document.title;
	let fbShare = document.getElementById('fbShare');
	let gplusShare = document.getElementById('gpShare');
	let twitterShare = document.getElementById('twShare');
	let whatsappShare = document.getElementById('wtShare');


	// facebook
	fbShare.onclick = function() {
		window.open('https://www.facebook.com/sharer.php?u=' + currentURL,'','height=368,width=600,left=100,top=100,menubar=0');
		return false;
	}
	// google plus
	gplusShare.onclick = function() {
		window.open('https://plus.google.com/share?url=' + currentURL,'','height=550,width=525,left=100,top=100,menubar=0');
		return false;
	}
	// twitter
	twitterShare.onclick = function() {
		window.open('https://twitter.com/share?url=' + currentURL + '&text=' + currentTitle + '&hashtags=DeLaManoDelDiez' + '&via=teleSURtv','','height=260,width=500,left=100,top=100,menubar=0');
		return false;
	}
	// whatsapp
	whatsappShare.onclick = function() {
		let isMobile = {
			Android: function() {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera: function() {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function() {
				return navigator.userAgent.match(/IEMobile/i);
			},
			any: function() {
				return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
			}
		};

		if (isMobile.any()) {
			window.open('whatsapp://send?text=' + encodeURIComponent(currentTitle) + '' + encodeURIComponent(currentURL));
		} else {
			alert('Por favor comparta este contenido desde un dispositivo móvil');
		}

	}

	// Setting default Attributes
	fbShare.setAttribute('href','http://www.facebook.com/sharer.php?u='+currentURL);
	gplusShare.setAttribute('href','https://plus.google.com/share?url='+currentURL);
	twitterShare.setAttribute('href','https://twitter.com/share?url='+currentURL+'&text='+currentTitle+'&hashtags=');
}

window.onload = function() {
	socialShare();
}

// Refresh Page on Top
$(window).on('beforeunload', function() {

   $(window).scrollTop(0);

});
