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
//stop menu from opening in console
window.oncontextmenu = function(event) {
  event.preventDefault()
  event.stopPropagation()
  return false
}

//functions for events called (above)
//passing index through a fuction, so we must return a function using this method

function touchStart(index) {
  return function(event) {
    //gives exact browser position on the X axis
    currentIndex = index
    startPos = getPositionX(event)
    isDragging = true

    //(request animation frame) csstricks.com-using-request animation frame
    //tells browswer we want to perform a specific animation, & request a call to a specific animation before the next animation is ran
    //we want to move left-right so we are targetting the X-axis
    animationID = requestAnimationFrame(animation)
    slider.classList.add('grabbing')
  }
}

function touchEnd() {
  isDragging = false
  cancelAnimationFrame(animationID)

  //set slide in place when moved or go to next slide when moving -100/to the right
  const movedBy = currentTranslate - prevTranslate

  if(movedBy < -100 && currentIndex < slides.length - 1)
  currentIndex += 1

  //make sure it wont go to next slide if the current slide is the 1st slide, there is no slide before it
  if(movedBy > 100 && currentIndex > 0)
  currentIndex -= 1

  setPositionByIndex()

  slider.classList.remove('grabbing')
}

function touchMove(event) {
  if (isDragging) {
    //set currentTranslate value because setSliderPosition depends on it
  const currentPosition = getPositionX(event)
  currentTranslate = prevTranslate + currentPosition -
  startPos
  }
}

function getPositionX(event) {
  return event.type.includes('mouse')
  ? event.pageX
  : event.touches[0].clientX
}

//animation function we passed from requestAnimationFrame
function animation() {
  setSliderPosition()
  if(isDragging) requestAnimationFrame(animation)
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`
}

//set index postion of slides
//shift entire inner width of the window regardless of screen-size, & move to the next slide if moved to the right
function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth
  prevTranslate = currentTranslate
  setSliderPosition()
}
