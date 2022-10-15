const block = document.querySelector(".block");

const maxWidth = window.innerWidth-block.offsetWidth;
const maxHeight = window.innerHeight-block.offsetHeight;

const STOP = (newBg=`yodaBoom`) => {
	const bg = block.style.backgroundImage;
	block.style.backgroundImage = `url(yoda/${newBg}.gif)`;
	setTimeout(() => block.style.backgroundImage = bg, 1000);
}

const STEP = 10;

const KEYS = {
	37: () => {
		// ArrowLeft
		let deadline = block.offsetLeft - STEP;

		if(deadline<0){
			STOP();
			block.style.left = `${parseInt(block.style.left)+STEP}px`;
		} else{
			block.style.left = !block.style.left ? `-${STEP}px` : `${parseInt(block.style.left)-STEP}px`;
		}
	},
	38: () => {
		// ArrowTop
		let deadline = block.offsetTop - STEP;

		if(deadline<0){
			STOP();
			block.style.top = `${parseInt(block.style.top)+STEP}px`;
		} else{
			block.style.top = !block.style.top ? `-${STEP}px` : `${parseInt(block.style.top)-STEP}px`;
		}
	},
	39: () => {
		// ArrowRight
		let deadline = block.offsetLeft + STEP;

		if(deadline>maxWidth){
			STOP();
			block.style.left = `${parseInt(block.style.left)-STEP}px`;
		} else{
			block.style.left = !block.style.left ? `${STEP}px` : `${parseInt(block.style.left)+STEP}px`;
		}
	},
	40: () => {
		// ArrowBottom
		let deadline = block.offsetTop + STEP;

		if(deadline>maxHeight){
			STOP();
			block.style.top = `${parseInt(block.style.top)-STEP}px`;
		} else{
			block.style.top = !block.style.top ? `${STEP}px` : `${parseInt(block.style.top)+STEP}px`;
		}
	},
	32: () => {
		// Space
		STOP(`yodaSpace`);
		block.style.transform+="translateY(-50px)"
		setTimeout( ()=>block.style.transform+="translateY(+50px)", 400);
	},
	17: () => {
		// Control
		STOP(`yodaControl`);
		block.style.transform = `scaleY(0.5)`;
		setTimeout( ()=>block.style.transform = ``, 400);
 	} 	
}

document.addEventListener(`keydown`, event => {
	if(event.keyCode === 32 && event.repeat) // remove repeating move for Space button
		return;

	KEYS[event.keyCode] && KEYS[event.keyCode]();
});
