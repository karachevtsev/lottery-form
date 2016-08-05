(function() {

    var model = [
        //{ id: '1', name: 'Amsterdam' , date: '11.04.1986' , email: '2@any.domain<', phone: '(063) 999-9999<'},
    ];
    var clickCount = 1;
    var data = {};
    var name, date, email, phone,template, node, winner, winnerElemnt = null;
    var isAllFieldsFilled = false;
    var submitBtn = document.querySelector('.js-form-submit-btn');
    var winnerSubmitBtn = document.querySelector('.js-winner-submit-btn');
    var inputName = document.querySelector('.register-form__name');
    var inputBirth = document.querySelector('.register-form__birth');
    var inputEmail = document.querySelector('.register-form__email');
    var inputPhone = document.querySelector('.register-form__phone');
    var inputDefaultWinner = document.querySelector('.js-default-winner-input');
    var defaultWinnerContainer = document.querySelector('.js-default-winner-container');
    //var inputWinner = document.querySelector('.js-winner-input');
    var winnerContainer = document.querySelector('.js-winner-container');
    var participantsList = document.querySelector('.tbody-participants');


    submitBtn.addEventListener('click', function (event) {
        var fieldCounter = 0;
        var numberOfFilled = 0;
        event.preventDefault();

        name = inputName.value;
        date = inputBirth.value;
        email = inputEmail.value;
        phone = inputPhone.value;

        data.id = clickCount;
        data.name = name;
        data.date = date;
        data.email = email;
        data.phone = phone;

        Object.keys(data).forEach(function(item) {
            fieldCounter ++
            if (data[item] !== '') {
                numberOfFilled ++;
            }
        })


        if (numberOfFilled === fieldCounter) {
            isAllFieldsFilled = true;
        } else {
            isAllFieldsFilled = false;
        }

        if (isAllFieldsFilled) {
            clickCount++;
            model.push(data);
            model.forEach(function(item) {
                template = '<td>' + item.id + '</td><td>' + item.name + '</td><td>' + item.date + '</td><td>' + item.email + '</td><td>' + item.phone + '</td>';
            })
            node = document.createElement('tr');
            node.innerHTML = template;
            participantsList.appendChild(node);
        } else {
            alert('Пожалуйста, заполните все поля!')
        }



    });

    winnerSubmitBtn.addEventListener('click', function (event) {
        if (model.length > 0) {
            winner = model[Math.floor((Math.random() * (0.9 - 0.5) + 0.5) * model.length)]
            inputDefaultWinner.classList.add('hide');
            winnerNode = document.createElement('span');
            winnerNode.setAttribute('class', "tag label label-info")
            defaultWinnerContainer.appendChild(winnerNode);
            winnerNode.innerHTML = winner.name;
        }

    });

})();
