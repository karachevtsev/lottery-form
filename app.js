(function() {

    var model = [
        //{ id: '1', name: 'Amsterdam' , date: '11.04.1986' , email: '2@any.domain<', phone: '(063) 999-9999<'},
    ];
    var clickCount = 1;
    var data = {};
    var name, date, email, phone,template, node = null;
    var isAllFieldsFilled = false;
    var submitBtn = document.querySelector('.btn-save');
    var inputName = document.querySelector('.register-form__name');
    var inputBirth = document.querySelector('.register-form__birth');
    var inputEmail = document.querySelector('.register-form__email');
    var inputPhone = document.querySelector('.register-form__phone');
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

        console.log(numberOfFilled, 'number');
        console.log(fieldCounter, 'counter');
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

})();
