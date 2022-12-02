// 수정페이지 우편번호 찾기
const findPost = document.querySelector(".find_post");

findPost.onclick = () => {
    daumPostcode();
}
function daumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById("postcode-input").value = data.zonecode;
            document.getElementById("address").value = roadAddr;
            document.getElementById("detailAddress").value = "";

        }
    }).open();
}

const confirmBtn = document.querySelector(".confirm-btn");
confirmBtn.onclick = () => {
    modification();
}


function modification(){
    let event =document.querySelector(".sns_inp:checked").name
    const update = {
        name: document.querySelector("#name").value,
        password : document.querySelector("#password").value,
        passwordPermit : document.querySelector("#password-permit").value,
        phone : document.querySelector("#phone").value,
        event : event,//sns면 수신 no-sns면 안수신
        postcode : document.querySelector("#postcode-input").value,
        address: document.querySelector("#address").value,
        detailAddress : document.querySelector("#detail-address").value
    };
    if(update.password != null || update.passwordPermit != null){
        const regExp = /[a-zA-Z0-9]/g;
        if(!(regExp.test(data.password) && data.password.length >= 10)){
            alert("비밀번호는 숫자와 문자를 포함하여 10자 이상이어야합니다.")
            return;
        }
        if(update.passwordPermit !== update.password || update.password !== update.passwordPermit){
            alert("비밀번호 확인 항목이 일치하지 않습니다.");
        }
    }else{
        update.password = "off";
        update.passwordPermit = "off";
    }




    $.ajax({
        async: false,
        url: "/api/account/modification",
        type: "put",
        data: JSON.stringify(update),
        contentType: "application/json",
        dataType: "json",
        success: (response)=>{
            console.log(response.data)
        },
        error: (error) => {
            console.log(error)
        }

    });
}




