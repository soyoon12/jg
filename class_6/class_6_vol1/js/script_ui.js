//전역 변수를 통해 ajax 실행시 데이터(json)를 담아 어떤 함수에서도 사용가능케 하자
var loadData;

//실행영역
$(function () {
    introfn();

    //인트로 버튼 클릭 이벤트 클릭했을시 이벤트
    $(".btn_setting").click(function () {
        $(".section.box_intro").removeClass("on");
        //ajax불러오고 성공한다음에 이거 뿌리기 $(".section.reservation").addClass("on");
        ajaxfn();
    });

    //자리 선택 섹션의 완료 버튼 클릭 이벤트 정의
    $(".btn_submit").click(function () {
        $(".section.reservation").removeClass("on");
        $(".section.complete").addClass("on");
    //개발자가 서버에 내용 전달하는 과정을 담는 부분
    });

})

//첫 인트로 버튼 영역 함수 정의
function introfn() {
    $(".section.box_intro").addClass("on");
}

//ajax를 통해 json파일 불러온 후 append로 자리 세팅하기 함수 정의
function ajaxfn() {
    $.ajax({
        url: "js/data.json",
        dataType: "json",
        success: function (result) {
            //변수 저장
            loadData = result.seatInfo;
            //자리 세팅index (순번 : i -0~11)
            for (var i = 0; i < loadData.length; i++) {
                var _n = loadData[i].name;
                var _p = loadData[i].price;
                var _r = loadData[i].reserve;
                
                $(".section.reservation > ol").append('<li class="unit"><button data-price="'+_p+'" '+_r+'>'+_n+'</button></li>')

                console.log(_n, _p, _r);
            }
            //자리 선택된 섹션 노출 
            $(".section.reservation").addClass("on");

            //6.배열선언 
            var selected =[];
            //1.동적으로 셋팅된 버튼에 클릭 이벤트 선언
            $(".section.reservation > ol > li > button").click(function(){
                //7.배열이 기존값을 계속 넣음으로 초기화 해주자
                selected=[];
                //2.자신에게 select 유무에 따라 select 클래스를 추가 삭제
                $(this).toggleClass("select");
                //3.인덱스 별로 한번씩 뒤지고 select 있는지 분별하기 위해 for문
                //eq는 선택자를 선택하는메소드
                for(var i=0; i<loadData.length; i++){
                    //4.각각 자리별 버튼에 select가 있는지 확인 후 있으면 true 반환 없으면 false
                   var _has = $(".section.reservation > ol > li").eq(i).find("button").hasClass("select");//이것의 결과는 트루 폴스로 나온다
                   //5.클릭후 true를 갖고 있는 아이들의 인덱스 값을 배열에 넣어주자
                //    console.log(i, _has);
                   if(_has == true){
                       selected.push(i)
                   }
                }


                //2.선택자리명과 선택자리 비용 저장용 변수 선언 및 초기화 
                var selectedSeat="";
                var selectedCost = 0;
                //1.저장된 인덱스를 활용한 하단 결과값 업데이트
                for(var i=0; i<selected.length; i++){
                   
                    var _si = selected[i];//선택된 인덱스 값만 저장

                    //선택자리 누적
                    // selectedSeat = selectedSeat + loadData[_si].name+ " ";
                    selectedSeat += loadData[_si].name+ " "; // 위와 밑은 같은 말이다

                    //선택자리 비용 누적
                    //json의 데이터는 다 문자로 인식되기 때문에 숫자로 바꾸어 주자
                    selectedCost = selectedCost + Number(loadData[_si].price);
                    selectedCost += Number(loadData[_si].price);
                }

                //선택정보를 html상 각 영역에 업데이트(text)
                $(".txt_info_number").text(selectedSeat);
                $(".txt_info_total").text(selectedCost);
                console.log(selectedCost);

                //최종 결과창의 선택 정보를 html상 각각의 영역에 업데이트
                $(".section.complete .txt_number").text(selectedSeat);
                $(".section.complete .txt_price > strong").text(selectedCost);
              

                // console.log(selected);
            });
        }
    })
}

