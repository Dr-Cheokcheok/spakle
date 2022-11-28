   // 배송요청사항
    // var deli = $('.deli-select');
    // var deliSel = $('.deli-select ul');

    $(document).on('click', '.deli-select', function() {
        var has = $(this).hasClass('on');
        let deliSel = $('.deli-select ul');

        if (!has) {
            $(this).addClass('on');
            $(this).find(deliSel).fadeIn(100);
        } else {
            $(this).removeClass('on');
            $(this).find(deliSel).fadeOut(100);
        }
    });

    $(document).on('click', '.deli-select ul>li', function() {
        var dTxt = $(this).text();
        if (dTxt.indexOf('직접입력') === -1) {
            $(".self-input").fadeOut(0);
        }

        $(this).parents('.deli-select').find('.sel').text(dTxt);
    });

    // 직접입력
    $(document).on('click', '.selfText', function() {
        $(".self-input").fadeIn(0);
    });

// 주소 입력

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
                document.getElementById('postcode').value = data.zonecode;
                document.getElementById("address").value = roadAddr;
            }
        }).open();
        
}

// 페이 결제

const payBtn = document.querySelector("#payBtn");

payBtn.onclick = (e) => {
    e.preventDefault();
    payment();
}

function payment() {
    const data = {
        payMethod : $("input[type='radio']:checked").val(),
        orderNum : createOrderNum(),
        name : $(".food_name").text(),
        buyerName : $("input[name='name']").val(),
        phone : $("input[name='r_phone']").val(),
        request : $("li[name='deli-select']").val(),
        door : $("input[name='door_password']").val(),
        deleveryAddress1 : $("#postcode").val(),
        deleveryAddress2 : $("#address").val(),
        deleveryAddress3 : $("#address_detail").val(),
        totalPrice : Number($("#totalCost").text())
    }

    if(!data.deleveryAddress1 || !data.deleveryAddress2 ) {
        alert('배달 받으실 주소를 입력해 주세요')
        return;
    }

    if(!data.phone) {
        alert('전화번호를 입력해주세요');
        return;
    }

    paymentCard(data);

}

// 주문번호 만들기
function createOrderNum(){
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	
	let orderNum = year + month + day;
	for(let i=0;i<10;i++) {
		orderNum += Math.floor(Math.random() * 8);	
	}
	return orderNum;
}

// 카드 결제
function paymentCard(data) {
		
	IMP.init("imp14753140"); 
		
	IMP.request_pay({ // param
        pg: "html5_inicis",
	  	pay_method: data.payMethod,
	  	merchant_uid: data.orderNum,
	  	name: data.name,
	  	amount: data.totalPrice,
	   	buyer_email: "",
	   	buyer_name: data.buyerName,
	  	buyer_tel: data.phone,
	  	buyer_addr: data.deleveryAddress2 + " " + data.deleveryAddress3,
	  	buyer_postcode: data.deleveryAddress1

  	}, 
	function (rsp) { // callback
		if (rsp.success) {
         // 결제 성공 시 로직,
         console.log('빌링키 발급 성공', rsp);
         InfoData();
         alert("결제가 완료되었습니다!");
			
		} else {
          // 결제 실패 시 로직,
             var msg = '결제에 실패했습니다. \n';
            msg += rsp.error_msg
            alert(msg);            
            return false;
		}
	});
}


// 장바구니 A 보따리
// const totalCost = 

function InfoData(){
    $.ajax({
        async: false,
        type: "get",
        url: "/api/product/" + productId,
        dataType: "json",
        success: (response) => {
            responseData = response.data;
        },
        error: (error) => {
            console.log(error);
        }
    });

}
