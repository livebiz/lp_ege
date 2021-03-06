// Меню

$('.topnav li a').click(function(){
    var str=$(this).attr('href');
    $.scrollTo(str, 500, {offset:-140 });
    return false;
});



$(function($){
    var topnav = $('.top');
    var label = $('.label');
    $h = label.offset().top;

    $(window).scroll(function(){
        // Если прокрутили скролл ниже макушки блока, включаем фиксацию

        if ( $(window).scrollTop() > $h) {
            topnav.addClass('fix-top');
        }else{
            //Иначе возвращаем всё назад. Тут вы вносите свои данные
            topnav.removeClass('fix-top');
        }
    });
});


$('.teachers-slider').slick({
    arrows: true,
    autoplay: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<span class="teacher-nav prev">',
    nextArrow: '<span class="teacher-nav next">'
});


$('.review').slick({
    arrows: true,
    autoplay: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<span class="review-nav prev">',
    nextArrow: '<span class="review-nav next">'
});


//  Modal

$(".btn-modal").fancybox({
    'padding'    : 0,
    'tpl'        : {
        closeBtn : '<a title="Close" class="btn_close" href="javascript:;"></a>'
    }
});


ymaps.ready(init);

var myMap,
    myPlacemark;

function init(){
    myMap = new ymaps.Map("map", {
        center: [55.7547,37.5852],
        zoom: 17,
        controls: ['smallMapDefaultSet']
    });

    myPlacemark = new ymaps.Placemark([55.7547,37.5852], {
        hintContent: ''
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/placemark.png',
        iconImageSize: [47, 69],
        iconImageOffset: [-23, -70]
    });

    myMap.behaviors.disable('scrollZoom');
    myMap.behaviors.disable('multiTouch');
    myMap.geoObjects.add(myPlacemark);
}

$(document).ready(function() {

    $('.btn-send').click(function() {

        $('body').find('form:not(this)').children('div').removeClass('red'); //удаление всех сообщение об ошибке(валидатора)
        var answer = checkForm($(this).closest('form').get(0)); //ответ от валидатора
        if(answer != false)
        {
            var $form = $(this).closest('form'),
                type    =     $('input[name="type"]', $form).val(),
                name    =     $('input[name="name"]', $form).val(),
                phone   =     $('input[name="phone"]', $form).val(),
                email   =     $('input[name="email"]', $form).val(),
                message =     $('textarea[name="message"]', $form).val();
            console.log(name, phone, email, type, message);
            $.ajax({
                type: "POST",
                url: "form-handler.php",
                data: {name: name, phone: phone, email:email, type:type, message:message}
            }).done(function(msg) {
                $('form').find('input[type=text], textarea').val('');
                console.log('удачно');
                document.location.href = "http://campuseducation.ru/done.html";
            });
        }
    });


    $('.btn-order').click(function() {

        var $form = $(this).closest('form'),
            color   =     $('input:radio[name=color]:checked', $form).val(),
            memory  =     $('input:radio[name=memory]:checked', $form).val();


        $('#order input[name="colors"]').val(color);
        $('#order input[name="mem"]').val(memory);


        var color2   =     $('#order input[name="colors"]').val(),
            memory2  =     $('#order input[name="mem"]').val();

        console.log(color2, memory2);
        $.fancybox.open('#order');
    });

});