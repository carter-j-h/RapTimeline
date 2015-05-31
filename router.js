// Browser support for hashchange: http://caniuse.com/#feat=hashchange

window.addEventListener('hashchange', updatePage, false);

//updatePage()

function updatePage() {
    //var ix = location.hash;
    var ix = 6

    var fragment = $('.fragments ' + location.hash)
    $('.image-gallery').html(fragment.clone())

}
