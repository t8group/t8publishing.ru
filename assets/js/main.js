/**
 * Created by ftroitsky on 18/07/14.
 */

/**
 * Created by ftroitsky on 18/07/14.
 */

$('.t8s-lead-form')
    .on('success.form.bv', function(event){
        event.stopPropagation();
        event.preventDefault();
        var form = $(this)
        var btn = form.find('.t8s-lead-form__button');
        btn.button('loading'),
        setTimeout(function () {
            btn.button("reset");
            $('#successModal').modal('toggle');
            console.log(form.serialize());
            form.clearForm();
        }, 3e3)
//            $.ajax({
//                url: '/sendmail.php',
//                crossDomain: false,
//                type : 'POST',
//                data: form.serialize(),
//                success: function(){
//                    $('#successModal').modal('toggle');
//                    ga('send', 'event', 'button', 'click', form.data('label'));
//                    form.clearForm();
//                }
//            })
                .always(function () {
                    btn.button('reset')

                })
    }
);


//setFields();

//function setFields(){
//    if (location.search || document.referrer) {
//        var cookie = t8Cookie();
//        var form = $('.t8s-lead-form');
//        if (form){
//            form.find('input:hidden[name=campaignParams]').val(cookie.campaignParams);
//            form.find('input:hidden[name=campaignReferrer]').val(cookie.campaignReferrer);
//        }
//        return true;
//    }
//    return false;
//}

//function t8Cookie(){
//    $.cookie.json = true;
//    var cookie = $.cookie('t8cookie');
//
//    // Проверяем есть ли кука
//    if (cookie){
//        // Если да берем значение location.search и document.referrer из нее
//        return cookie;
//    }
//
//    // Если нет, читаем location.search и document.referrer и ставим куку
//    var storedObj = {
//        campaignParams: location.search,
//        campaignReferrer: document.referrer
//    };
//
//    $.cookie.json = true;
//    $.cookie('t8cookie', storedObj);
//
//    return storedObj;
//}





$.fn.clearForm = function() {
    return this.each(function() {
        var type = this.type, tag = this.tagName.toLowerCase();
        if (tag == 'form')
            return $(':input',this).clearForm();
        if (type == 'text' || type == 'password' || tag == 'textarea' || type == 'tel' || type == 'email' )
            this.value = '';
        else if (type == 'checkbox' || type == 'radio')
            this.checked = false;
        else if (tag == 'select')
            this.selectedIndex = -1;
    });
};