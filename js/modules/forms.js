import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {

    // Forms

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/Spinner.svg',
        success: 'Спасбио! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так.....'
    };

    forms.forEach(item => {
        bindPostData(item);
    });


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);


            // XMLHttpRequest старый способо отправки данных на сервер(всё что закоменчено относится к XMLHttpRequest!!!!!!!!!!!!!!!!!!!!!!!
            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');



            // request.setRequestHeader('Content-type', 'multipart/form-data'); при использовании FormData не используется
            // request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            // сначала превращаем данные в массив массивов, потом превращаем в классический объект, а потом в JSON
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // отправка данных с помощью JSON
            // const object = {};
            // formData.forEach(function (value, key) {
            //     object[key] = value;
            // });

            // fetch('server.php', {
            //     method: 'POST',
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     body: JSON.stringify(object)
            // })
            postData('http://localhost:3000/requests', json)
                // .then(data => data.text())
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
            // request.send(json);
            // request.send(formData);

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

}

export default forms;