$(window).on('load', function(){
	
	function getCurrentPage() {
		let page = getUrlParam('page') || 'home';
		return '/layout/' + page + '.html'
	}
	
	function getUrlParam(param){
		let searchParams = new URLSearchParams(window.location.search);
		return searchParams.has(param) ? searchParams.get(param) : null;
	}
	
	$('[data-include-html]').each(function(){
		let data = $(this).is('main') ? getCurrentPage() : $(this).data('include-html');
		$(this).load(data, afterLoad);
	});
	
	function afterLoad(){
		parseCardImgTops();
		renderBorders();
	}
	
	function parseCardImgTops() {
		$('.card .card-img-top').each(function(i,e) {
			let src = $(e).data('src');
			if (src) {
				$(e).css({
					"background-image":'url(' + src + ')'
				})
			}
		});
	}
	
	$(window).on('resize', _.throttle(renderBorders, 123));
	
	function renderBorders() {
		function gpr(e,i,side){
			let parent = i ?
				$(e).parents('[b-parent]').is('*') ?
					$(e).parents('[b-parent]').eq(0) :
					$(e).parents().eq(1) :
				$(e).parents().eq(0);
			return parent[0].getBoundingClientRect()[side];
		}
		function checkBorder(side, inverse = false) {
			$('b-' + side).each(function(){
				$(this).css({
					display: gpr(this,1,side) > gpr(this,0,side) + 100 || (inverse && gpr(this,1,side) < gpr(this,0,side) - 100) ?
						'block' :
						'none'
				})
			})
		}
		$.each(['right', 'bottom'], function(i,v){
			checkBorder(v)
		});
		$.each(['left', 'top'], function(i,v){
			checkBorder(v, true);
		})
	}
	
	$.getScript('/assets/js/top-menu.js',() => createMenu());

});