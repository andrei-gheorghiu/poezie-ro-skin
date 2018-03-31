# poezie-ro-skin

## install

    git clone  https://github.com/andrei-gheorghiu/poezie-ro-skin.git poezie-ro
    cd poezie-ro && npm i
    

## grunt

 - `grunt [default]` => `grunt build`
 - `grunt build` => `grunt js && grunt css`
 - `grunt js` => 
 - `grunt css` => sass (requires ruby & sass) + postcss (autoprefixer, flexboxfixer, pixrem, cssnano)
 - `grunt w` => `grunt watch` => runs `grunt css` after any `/assets/scss/*.scss` change)
