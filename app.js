$(function() {
	var LotteryList = function() {

        this.model = [
            { id: '1', name: 'Amsterdam' , date: '11.04.1986' , email: '2@any.domain<', phone: '(063) 999-9999<'},

        ];

        this.inputName        = $('.register-form__name');
        this.inputBirth       = $('.register-form__birth');
        this.inputEmail       = $('.register-form__email');
        this.inputPhone       = $('.register-form__phone');
        this.form             = $('.register-form');
        this.participantsList = $('.tbody-participants');

        this.init();
    };

    // Получить размер нашей модели - что бы знать колличество элементов на текущий момент
    LotteryList.prototype.getLength = function() {
        return this.model.length;
    };

    // Сгененрировать html для новой строки с элементом
    LotteryList.prototype.getItemHtml = function (id, name, birth, email, phone) {
        var tmpl = '<tr><th>:id</th><td>:name</td><td>:birth</td><td>:email</td><td>:phone</td><tr>';

        return tmpl;
    };

    // Добавить новый элемент 
    LotteryList.prototype.addItem = function (participantName, participantDate, participantEmail, participantPhone) {
        var newLotteryList =  { name: participantName, date: participantDate, email: participantEmail, phone: participantPhone};
        
        this.model.push(newLotteryList);
        this.appendRenderItem(this.getLength(), newLotteryList);
    };

     // Добавить в DOM новый элемент в низ списка
    LotteryList.prototype.appendRenderItem = function () {
        ;
    };

    // Отрендерить весь список полностью
    LotteryList.prototype.renderList = function () {
        var list = '',
            __self = this;

        $.each(this.model, function() {
            list += __self.getItemHtml();
        });

        this.LotteryList.html(list);
    };

    // Hа cабмит формы добавить данные в таблицу
    LotteryList.prototype.onFormSubmit = function (e) {
        e.preventDefault();

        this.addItem(this.inputName.val(), this.inputBirth.val(), this.inputEmail.val(), this.inputPhone.val());

        
    };

    // Инициализация
    LotteryList.prototype.init = function () {
        var __self = this;

        this.renderList();

        this.form.submit(function (e) {
            __self.onFormSubmit(e);
        });


    };

    window.lottery = new LotteryList();
});