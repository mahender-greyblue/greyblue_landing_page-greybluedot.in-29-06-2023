const d = document;
const $q = d.querySelectorAll.bind(d);
const $g = d.querySelector.bind(d);
const $prev = $g(".prev");
const $next = $g(".next");
const $list = $g(".carousel__list");
let auto;
let pauser;

const getActiveIndex = () => {
    const $active = $g("[data-active]");
    return getSlideIndex($active);
}

const getSlideIndex = ($slide) => {
    return [...$q(".carousel__item")].indexOf( $slide );
}

const prevSlide = () => {
    const index = getActiveIndex();
    const $slides = $q(".carousel__item");
    const $last = $slides[$slides.length-1];
    $last.remove();
    $list.prepend($last);
    activateSlide( $q(".carousel__item")[index] );
}
const nextSlide = () => {
    const index = getActiveIndex();
    const $slides = $q(".carousel__item");
    const $first = $slides[0];
    $first.remove();
    $list.append($first);
    activateSlide( $q(".carousel__item")[index] );
}

const chooseSlide = (e) => {
    const max = (window.matchMedia("screen and ( max-width: 600px)").matches) ? 5 : 8;
    const $slide = e.target.closest( ".carousel__item" );
    const index = getSlideIndex( $slide );
    if ( index < 3 || index > max ) return;
    if ( index === max ) nextSlide();
    if ( index === 3 ) prevSlide();
    activateSlide($slide);
}

const activateSlide = ($slide) => {
    if (!$slide) return;
    const $slides = $q(".carousel__item");
    $slides.forEach(el => el.removeAttribute('data-active'));
    $slide.setAttribute( 'data-active', true );
    // $slide.focus();
}

const autoSlide = () => {
    nextSlide();
}

const pauseAuto = () => {
    clearInterval( auto );
    clearTimeout( pauser );
}

const handleNextClick = (e) => {
    pauseAuto();
    nextSlide(e);
}

const handlePrevClick = (e) => {
    pauseAuto();
    prevSlide(e);
}

const handleSlideClick = (e) => {
    pauseAuto();
    chooseSlide(e);
}

const handleSlideKey = (e) => {
    switch(e.keyCode) {
        case 37:
        case 65:
            handlePrevClick();
            break;
        case 39:
        case 68:
            handleNextClick();
            break;
    }
}

const startAuto = () => {
    auto = setInterval( autoSlide, 3000 );
}

startAuto();

// $next.addEventListener( "click", handleNextClick );
// $prev.addEventListener( "click", handlePrevClick );
$list.addEventListener( "click", handleSlideClick );
// $list.addEventListener( "focusin", handleSlideClick );
$list.addEventListener( "keyup", handleSlideKey );






// const toggleButton = document.getElementsByClassName('toggle-button')[0]
// const navbarLinks = document.getElementsByClassName('navbar-links')[0]

// toggleButton.addEventListener('click', () => {
//   navbarLinks.classList.toggle('active')
// })





// function myFunction() {
//     var x = document.getElementById("myTopnav");
//     if (x.className === "topnav") {
//       x.className += " responsive";
//     } else {
//       x.className = "topnav";
//     }
//   } 




// ---------Responsive-navbar-active-animation-----------
function test(){
	var tabsNewAnim = $('#navbarSupportedContent');
	var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
	var activeItemNewAnim = tabsNewAnim.find('.active');
	var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
	var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
	var itemPosNewAnimTop = activeItemNewAnim.position();
	var itemPosNewAnimLeft = activeItemNewAnim.position();
	// $(".hori-selector").css({
	// 	"top":itemPosNewAnimTop.top + "px", 
	// 	"left":itemPosNewAnimLeft.left + "px",
	// 	"height": activeWidthNewAnimHeight + "px",
	// 	"width": activeWidthNewAnimWidth + "px"
	// });
	$("#navbarSupportedContent").on("click","li",function(e){
		$('#navbarSupportedContent ul li').removeClass("active");
		$(this).addClass('active');
		var activeWidthNewAnimHeight = $(this).innerHeight();
		var activeWidthNewAnimWidth = $(this).innerWidth();
		var itemPosNewAnimTop = $(this).position();
		var itemPosNewAnimLeft = $(this).position();
		$(".hori-selector").css({
			"top":itemPosNewAnimTop.top + "px", 
			"left":itemPosNewAnimLeft.left + "px",
			"height": activeWidthNewAnimHeight + "px",
			"width": activeWidthNewAnimWidth + "px"
		});
	});
}
$(document).ready(function(){
	setTimeout(function(){ test(); });
});
$(window).on('resize', function(){
	setTimeout(function(){ test(); }, 500);
});
$(".navbar-toggler").click(function(){
	$(".navbar-collapse").slideToggle(300);
	setTimeout(function(){ test(); });
});



// --------------add active class-on another-page move----------
jQuery(document).ready(function($){
	// Get current path and find target link
	var path = window.location.pathname.split("/").pop();

	// Account for home page with empty path
	if ( path == '' ) {
		path = 'index.html';
	}

	var target = $('#navbarSupportedContent ul li a[href="'+path+'"]');
	// Add active class to target link
	target.parent().addClass('active');
});




// Add active class on another page linked
// ==========================================
// $(window).on('load',function () {
//     var current = location.pathname;
//     console.log(current);
//     $('#navbarSupportedContent ul li a').each(function(){
//         var $this = $(this);
//         // if the current path is like this link, make it active
//         if($this.attr('href').indexOf(current) !== -1){
//             $this.parent().addClass('active');
//             $this.parents('.menu-submenu').addClass('show-dropdown');
//             $this.parents('.menu-submenu').parent().addClass('active');
//         }else{
//             $this.parent().removeClass('active');
//         }
//     })
// });