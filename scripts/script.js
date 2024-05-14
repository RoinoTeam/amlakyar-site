const $ = document;

const tab1 = $.querySelector('#tab1')
const tab2 = $.querySelector('#tab2')
const tab3 = $.querySelector('#tab3')

const tabOne = $.querySelector('#tabOne')
const tabTwo = $.querySelector('#tabTwo')
const tabThree = $.querySelector('#tabThree')

const mobile1 = $.querySelector('#mobileOne')
const mobile2 = $.querySelector('#mobileTwo')
const mobile3 = $.querySelector('#mobileThree')

const mobile4 = $.querySelector('#mobile4')
const mobile5 = $.querySelector('#mobile5')
const mobile6 = $.querySelector('#mobile6')


tab1.addEventListener('click', () => {
    if (mobile1.classList.contains('opacity-0')) {
        mobile1.classList.remove('opacity-0')
        mobile1.classList.add('opacity-100')
        mobile2.classList.add('opacity-0')
        mobile2.classList.remove('opacity-100')
        mobile3.classList.remove('opacity-100')
        mobile3.classList.add('opacity-0')
        tab1.classList.add('border-r-2')
        tab1.classList.add('border-r-blue-600')
        tab2.classList.remove('border-r-blue-600')
        tab3.classList.remove('border-r-blue-600')
    }
    tab1.classList.add('border-r-blue-600')
    tab2.classList.remove('border-r-blue-600')
    tab3.classList.remove('border-r-blue-600')
})


tab2.addEventListener('click', () => {
   if (mobile2.classList.contains('opacity-0')) {
        mobile2.classList.remove('opacity-0')
        mobile2.classList.add('opacity-100')
        mobile1.classList.add('opacity-0')
        mobile1.classList.remove('opacity-100')
        mobile3.classList.remove('opacity-100')
        mobile3.classList.add('opacity-0')
        tab2.classList.add('border-r-2')
        tab2.classList.add('border-r-blue-600')
        tab1.classList.remove('border-r-blue-600')
        tab3.classList.remove('border-r-blue-600')
    }
})


tab3.addEventListener('click', () => {
    if (mobile3.classList.contains('opacity-0')) {
        mobile3.classList.remove('opacity-0')
        mobile3.classList.add('opacity-100')
        mobile1.classList.add('opacity-0')
        mobile1.classList.remove('opacity-100')
        mobile2.classList.remove('opacity-100')
        mobile2.classList.add('opacity-0')
        tab3.classList.add('border-r-2')
        tab3.classList.add('border-r-blue-600')
        tab1.classList.remove('border-r-blue-600')
        tab2.classList.remove('border-r-blue-600')
    }
})

tabOne.addEventListener('click', () => {
    if (mobile4.classList.contains('opacity-0')) {
        mobile4.classList.remove('opacity-0')
        mobile4.classList.add('opacity-100')
        mobile5.classList.add('opacity-0')
        mobile5.classList.remove('opacity-100')
        mobile6.classList.remove('opacity-100')
        mobile6.classList.add('opacity-0')
        tabOne.classList.add('border-r-2')
        tabOne.classList.add('border-r-blue-600')
        tabTwo.classList.remove('border-r-blue-600')
        tabThree.classList.remove('border-r-blue-600')
    }
    tabOne.classList.add('border-r-blue-600')
    tabTwo.classList.remove('border-r-blue-600')
    tabThree.classList.remove('border-r-blue-600')
})

tabTwo.addEventListener('click', () => {
    if (mobile5.classList.contains('opacity-0')) {
        mobile5.classList.remove('opacity-0')
        mobile5.classList.add('opacity-100')
        mobile4.classList.remove('opacity-100')
        mobile4.classList.add('opacity-0')
        mobile6.classList.remove('opacity-100')
        mobile6.classList.add('opacity-0')
        tabTwo.classList.add('border-r-2')
        tabTwo.classList.add('border-r-blue-600')
        tabThree.classList.remove('border-r-blue-600')
        tabOne.classList.remove('border-r-blue-600')
    }
})

tabThree.addEventListener('click', () => {
    if (mobile6.classList.contains('opacity-0')) {
        mobile6.classList.remove('opacity-0')
        mobile6.classList.add('opacity-100')
        mobile4.classList.remove('opacity-100')
        mobile4.classList.add('opacity-0')
        mobile5.classList.remove('opacity-100')
        mobile5.classList.add('opacity-0')
        tabThree.classList.add('border-r-2')
        tabThree.classList.add('border-r-blue-600')
        tabTwo.classList.remove('border-r-blue-600')
        tabOne.classList.remove('border-r-blue-600')
    }
})