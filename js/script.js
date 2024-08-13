//  чтобы скрипты нормальноы работали 
window.addEventListener('DOMContentLoaded', () => {

    //Табы 
    //получаем переменные
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');


    //скрываем табы
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    //показываем контент табов, i = 0 значение по умолчанию
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');        
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent(); //скрываем всё
    showTabContent(); // показываем первый слайд

    // при клике на элемент идет перебор и когда находит нужный то переключает на него
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

});

