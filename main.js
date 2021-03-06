const slider = document.querySelector('.slider-container'),
// takes a dom object & turns it into an array.
slides = Array.from(document.querySelectorAll('.slide'))

//global vars/variables
let isDragging = false,
startPos = 0,
currentTranslate = 0, //refers to translateX in css
prevTranslate = 0,
animationID = 0, //animations use request animation frame, animation frames all have an ID
currentIndex = 0 //current slides

// for loop to loop through slides, event listener to prevent the defult browser action when a product/img is grabbeb & dragged the wrong way */
slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img')
  slideImage.addEventListener('dragstart', (e) =>
e.preventDefault())

//Touch event, for mobile devices
// starts when user touches a product, runs function touchStart(camelcase), & passing through the index
slide.addEventListener('touchstart', touchStart(index))
slide.addEventListener('touchend', touchEnd)
slide.addEventListener('touchmove', touchMove)

//Mouse events, if mouse is let go(up), or if we click off the screen/page (leave).
slide.addEventListener('mousedown', touchStart(index))
slide.addEventListener('mouseup', touchEnd)
slide.addEventListener('mouseleave', touchEnd)
slide.addEventListener('mousemove', touchMove)

})
