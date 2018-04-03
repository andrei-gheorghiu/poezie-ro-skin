function createMenu() {
	
	$('#top-menu').on('click', '.dropdown .dropdown .dropdown-toggle', function (e) {
		console.log('clicked!');
		e.preventDefault();
		e.stopImmediatePropagation();
		let dd = $(e.target).closest('.dropdown');
		dd.dropdown('toggle');
		dd.parents('.dropdown').attr({
			'aria-expanded': true
		})
	});
	let menu = getDefaultMenu();
	let $ul = $('<ul>', {
		class: 'navbar-nav'
	});
	_.each(menu, (o, k) => {
		let li = $('<li>', {
			class: getItemClass(o, k),
			html: getItemA(o)
		}).append($('<nav-anim>'));
		$ul.append(li);
		if (_.get(o, ['items', 'length'])) {
			addSubmenu(o.items, li);
		}
	});
	$('#top-menu').append($ul);
	
	
	
	function addSubmenu(items, parent) {
		parent.addClass('dropdown');
		parent.children().first().addClass('dropdown-toggle').attr({
			"data-toggle": "dropdown",
			"aria-haspopup": true,
			"aria-expanded": false
		});
		let submenu = $('<ul>', {class: 'dropdown-menu'});
		_.each(items, (e, i) => {
			let li = $('<li>', {
				class: getItemClass(e, 1) + ' dropdown-item',
				html: getItemA(e)
			});
			submenu.append(li);
			/*if (_.get(e, ['items','length'])) {
				addSubmenu(e.items, li);
			}*/
		});
		parent.append(submenu);
	}
	
	function getItemClass(item, notFirst) {
		return 'nav-item' + (notFirst ? '' : ' active') +
			(_.get(item, 'class') ? ' ' + item.class : '');
	}
	
	function getItemA(item) {
		let tag = _.get(item, 'tag') === 'span' ? $('<span>') : $('<a>');
		tag.text(getItemTitle(item));
		if (tag.is('a')) {
			tag.attr('href', getItemLink(item))
		}
		return tag;
	}
	
	function getItemLink(item) {
		
		return _.get(item, 'href') ? item.href : '';
	}
	
	function getItemTitle(i) {
		return i ? _.isString(i) ? i : i.title || i.name || '' : '';
	}
	
	function getDefaultMenu() {
		return [
			'Poezie',
			'Personale',
			'Proză',
			{
				title: 'Scenariu',
				items: [
					'Acțiune',
					'Comedie',
					'Dramă',
					'Scurt metraj',
					'Teatru'
				]
			},
			'Eseu',
			'Presă',
			'Articol',
			'Comunități',
			'Concurs',
			'Special',
			'Tehnică literară',
			'Multimedia'
		];
	}
}