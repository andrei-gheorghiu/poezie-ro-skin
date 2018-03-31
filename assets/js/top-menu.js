$(window).on('load', createMenu);

function createMenu() {
    // you could get a json here to get it dynamically or...
    let menu = [
        'Poezie',
        'Personale',
        'Proză',
        'Scenariu',
        'Eseu',
        'Presă',
        'Articol',
        'Comunități',
        'Concurs',
        'Special',
        'Tehnică literară',
        'Multimedia'
    ];
    let $ul = $('<ul>', {
        class:'navbar-nav'
    });
    _.each(menu, (o,k)=> {
        console.log(o,k);
        $ul.append($('<li>',{
            class:getItemClass(o, k),
            html:getItemA(o)
        }).append($('<nav-anim>')))
    });
    $('#top-menu').append($ul);
}

function getItemClass(i, notFirst) {
    let classes = 'nav-item' + (notFirst ? '' : ' active');
    classes += _.isString(i) ? '' : _.get(i, ['items','length']) ? ' dropdown' :'';
    return classes;
}

function getItemA(i) {
    let tag = _.get(i,'tag') === 'span' ? $('<span>') : $('<a>');
    tag.text(getItemTitle(i));
    if (tag.is('a')) {
        tag.attr('href', getItemLink(i))
    }
    return tag;
}

function getItemLink(i) {
    if (_.get(i,'href'))
        return i.href;
    return '';
}

function getItemTitle(i) {
    return _.isString(i) ? i : i.title || i.name;
}