
$(document).ready(function() {

var model = [
        //{ id: '1', name: 'Amsterdam' , date: '11.04.1986' , email: '2@any.domain<', phone: '(063) 999-9999<'},
    ]

var clickCount = 1;

$('.register-form').submit(function(event) {
    processRegistration(this);
    event.preventDefault();
});

function processRegistration(form) {
    var data = getRegistrationFormData();
    var errors = validateRegistrationData(data);
    

    $('.error', $(form)).text('');

    if (errors) {
        showErrorMessage(form, errors);
    } else {
        console.log('DATA IS VALID', data);
        
        var participantsList = $('.tbody-participants');
        model.push(data);
        console.log('Model content', model);

        model.forEach(function(item) {
            template = '<td>' + item.id + '</td><td>' + item.name + '</td><td>' + item.birth + '</td><td>' + item.email + '</td><td>' + item.phone + '</td>';
        })

        node = document.createElement('tr');
        node.innerHTML = template;
        participantsList.append(node);

    }
}

function getRegistrationFormData() {
    var formData = {
        id: clickCount++,
        name:  $('.register-form__name').val(),
        birth: $('.register-form__birth').val(), 
        email: $('.register-form__email').val(),       
        phone: $('.register-form__phone').val(),
    };

    return formData;
}

function validateRegistrationData(formData) {
    var validationRules = {
        name: function(value) {
            if (!value) {
                $('.form-group__name').addClass('has-error');
                return 'The value is required';
            } else if ( !value.match(/^[a-zа-яiъї]+$/i) ) {
                $('.form-group__name').addClass('has-error');
                return 'Should contain only letters latin/cyrillic';
            } else {
                $('.form-group__name').removeClass('has-error');
                // $('.form-group__name').addClass('has-success');
            }
        },

        birth: function(value) {
            var dateValue = value.split("/");
            var birthday = new Date(+dateValue[2], +dateValue[0]-1, +dateValue[1]);
            value = value || ''
            if (!value) {
                $('.form-group__birth').addClass('has-error');
                return 'The value is required';
            } else if (  birthday > new Date() ){
                $('.form-group__birth').addClass('has-error');
                return 'Date should not be in future';
            } else {
                $('.form-group__birth').removeClass('has-error');
                // $('.form-group__birth').addClass('has-success');
            }

        },

        email: function(value) {
            var emailRe = /^([\w\-_+]+(?:\.[\w\-_+]+)*)@((?:[a-z0-9\-]+\.)*[a-z0-9][a-z0-9\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;         
            value = value || '';
            if (!value) {
                $('.form-group__email').addClass('has-error');
                return 'The value is required';
            } else if ( !emailRe.test(value) ) {
                $('.form-group__email').addClass('has-error');
                return 'Wrong email format';
            } else {
                $('.form-group__email').removeClass('has-error');
                // $('.form-group__email').addClass('has-success');
            }
        },

        phone: function(value) {
            if (!value) {
                $('.form-group__phone').addClass('has-error');
                return 'The value is required';
            } else if ( !value.match(/^[0-9+()\- ]*$/) ) {
                $('.form-group__phone').addClass('has-error');
                return 'Wrong number';
            } else {
                $('.form-group__phone').removeClass('has-error');
                // $('.form-group__phone').addClass('has-success');
            }
        }
    };

    var errors = validateData(validationRules, formData);
    
    return errors;
}

function showErrorMessage(form, errors) {
    var $form = $('.register-form');

    for (var field in errors) {
        var fieldError = errors[field];
        $('.error[data-error-for=' + field + ']', $form).text(fieldError);        
    }
}

function validateData(validationRules, data) {
    var errors = {};

    for (var field in data) {
        var value      = data[field];
        var validator  = validationRules[field] || function() {};
        var fieldError = validator(value);

        if (fieldError) {
            errors[field] = fieldError;
        }
    }

    if ( Object.keys(errors).length ) {
        return errors;
    } else {
        $('.register-form').trigger('reset');
        return;
    }
}

});