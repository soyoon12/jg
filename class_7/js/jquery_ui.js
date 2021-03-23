$(function () {
    //엔터 눌렀을때 발생하는 이벤트로 동적으로 만들자
    $(".input_area > input[type='text']").keypress(function (event) {
        // event는 keypress 함수의 인자값으로 keypress가 가지고 있는 정보들을 담기 위해 준것??
        // console.log(event); 를 쳐보면 여러 속성 옵션값이 나타난다.

        // console.log($(this).val().length);
        // 엔터키 코드 십삼일 경우와 인풋에 값이 들어갈 경우
        if (event.keyCode == 13 && $(this).val().length != 0) {
            //여기서 this는 인풋
            var _val = $(this).val();//입력중인 값을 담는 변수
            var _time; // 입력되는 순간의 시간을 담는 변수
            var _class = $(this).attr("class");

            //현재 시간 구하기 객체 호출
            var _date = new Date();//date 객체는 pc의 전체 시간정보를 담고 있다
            var _hh = _date.getHours();//date 객체에서 시간을 구함
            var _mm = _date.getMinutes();//date 객체에서 분을 구함
            // console.log(_date.getHours(),_date.getMinutes());

            // 오전 오후 구분하기 위한 변수
            var _apm = "오전";
            // 시간이 12이상인 경우
            if (_hh > 12) {
                _apm = "오후";
                _hh -= 12; //_hh = _hh - 12; 24시간에서 12시간 표현으로 바꾸어 쥼
            }

            _time = _apm + " " + _hh + ":" + _mm;
            console.log(_time);

            //말풍선 태그를 append로 동적추가
            $(".chat_area").append('<div class="item ' + _class + '"> <div class="box"><p class="msg">' + _val + '</p><span class="time">' + _time + '</span></div></div>')
            //0.01초뒤에 해당 코드 시간차 발생하여 실행 
            setTimeout(function () {
                $(".chat_area .item").addClass("on");//css 애니메이션 발생시키는 트리거
            }, 10)
            //입력후 입력된 인풋의 값을 지워줌(초기화)
            $(this).val("");

            //채팅창 맨밑으로 갈수있게 하는 스크롤 이벤트
            // //먼저 말풍선 개수 알기
            // var _itemL =  $(".chat_area .item").length;
            //말풍선의 높이를 알아야 한다.-> 더해줄 변수
            var _itemH = 0;
            //item의 개수만큼 반복시켜준다는 each문
            $(".chat_area .item").each(function (idx) {
                // console.log(idx);
                //this(말풍선) 길이를 _item에 누적 추가+ margin-top값
                _itemH +=  $(this).height() +15 ;//_itemH = _itemH + $(this).height() +15 ; 15는 margin 값
            });
            console.log(_itemH);
            //채팅창 영역에 스크롤 에니메이션 이벤트 발생시킴 모든 동작을 스탑시키고 에니메이션 최종만 실행
            $(".chat_area").stop().animate({
                scrollTop:_itemH 
            })
        }

    });
});