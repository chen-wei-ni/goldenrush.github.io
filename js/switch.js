/*語言切換選單*/
$('.switch-list').hide()
$('.language-pack').click(function(e){
    e.stopPropagation();
    $('.switch-list').toggle(300, 'linear')
})
$("body").click(function(){
    $('.switch-list').hide()
})
$('.switch-list').click(function(e){
    e.stopPropagation();
})

/*語言圖示hover變色*/
$('.language-pack').hover(function(){
	$('.switch-icon').attr("src","images/language/icon_language_hover.svg");
},
function(){
	$('.switch-icon').attr("src","images/language/icon_language.svg");

});

/*滑動至最上方*/
$('.top_btn').hide();
		$(window).scroll(function() {
			var sh = $(window).scrollTop();
			if(sh > 150) {
				$('.top_btn').show(500, 'swing');
				heart.classList.add('opacityHeart');
			}else {
				$('.top_btn').hide(500, 'swing');
				heart.classList.remove('opacityHeart');
			}
		});
		
		$('.top_btn').click(function() {
			$('html,body').animate({
				scrollTop : 0 //到最上面  
			}, 500);
		return false;
		});
var scaleItem = document.querySelector('.bnTitle');

/*獎金跳動動畫每2.5秒一次*/
const animate = document.querySelector('.award');
animate.classList.add('fuyofuyo');
animate.addEventListener('animationend', () => {
animate.classList.remove('fuyofuyo');  
setTimeout(function(){
animate.classList.add('fuyofuyo');
},2500)
})


scaleItem.classList.add('effect');

scaleItem.addEventListener('animationend', ()=>{
	scaleItem.classList.remove('effect');
	setTimeout(function(){
		scaleItem.classList.add('effect');
	},3000)
})



let heart = document.querySelector('.glow');
	// setTimeout(function(){
	// 	heart.classList.add('opacityHeart')
	// },3600)
// document.addEventListener('scroll',function(e){
// 	var sh = $(window).scrollTop();
// 	if(sh>300){
// 		heart.classList.add('opacityHeart')
// 	}
// })
