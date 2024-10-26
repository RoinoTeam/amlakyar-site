const mainNav = document.getElementById('mainNav');
document.addEventListener('scroll', function () {
    if (document.documentElement.scrollTop > 0) {
        mainNav.classList.add('bg-white')
    } else {
        mainNav.classList.remove('bg-white')
    }
})