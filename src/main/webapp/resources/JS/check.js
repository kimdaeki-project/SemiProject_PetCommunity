var IMP = window.IMP; // 생략 가능
IMP.init("imp12326472"); // 예: imp00000000

var sellItemDTO = '${sellItemDTO}';

let totalPrice = document.getElementById("totalPrice");
const priceCount = document.getElementById("priceCount");
const itemPrice = document.getElementById("itemPrice");
let ipv = "";
const itemName = document.getElementById("itemName");
let inv = "";
const itemNum2 = document.getElementById("itemNum");
let itn = "";
const itemCatg = document.getElementById("itemCatg");
let itg = "";
const buyer_email = document.getElementById("buyer_email");
let bev = "";
const buyer_name = document.getElementById("buyer_name");
let bnv = "";
const buyer_tel = document.getElementById("buyer_tel");
let btv = "";
const userId = document.getElementById("userId");
let uiv = "";
const revStartDate = document.getElementById("revStartDate");
let rsv ="";
const revEndDate = document.getElementById("revEndDate");
let rev = "";
const adultsCount = document.getElementById("adultsCount");
let ac = "";
const dogCount = document.getElementById("dogCount");
let dc = "";
const rvFrm = document.getElementById("rvFrm");
let date = new Date();
let merchant_uid = date.getTime();
const rvBtnFrm = document.getElementById("rvBtnFrm");
let msg = "";

const coupon = document.getElementById("coupon");
let arr = [];
let rp = "";
let couponNum = "";
let method = "";
let cpn = "";


revStartDate.addEventListener("change", function(){
  totalPrice.value="0";
});

revEndDate.addEventListener("change", function(){
  totalPrice.value="0";
});


adultsCount.addEventListener("change", function(){
  totalPrice.value="0";
});

dogCount.addEventListener("change", function(){
  totalPrice.value="0";
});

coupon.addEventListener("change",function(){
  totalPrice.value = "0";
})

//===================================================날짜 계산
priceCount.addEventListener("click", function (){
  let dateResult = false;
  ipv = itemPrice.value;
  rsv = revStartDate.value;
  rev = revEndDate.value;
  ac = adultsCount.value;
  dc = dogCount.value;
  itg = itemCatg.value;
  itn = itemNum2.value;
  tpv = totalPrice.value;
  bev = buyer_email.value;
  bnv = buyer_name.value;
  btv = buyer_tel.value;
  uiv = userId.value;
  inv = itemName.value;
  console.log(itg);


  if(rsv.length<=0||rev.length<=0){
    alert("날짜를 입력하세요")
    return;
    } else{
      if(itg==2 && rev!=rsv){
      alert("원데이 클래스는 하루 단위로 예약이 가능합니다");
      return;
    } else{
        dateResult = true;
      }
    }
    

if(ac.length<=0||dc.length<=0){
  alert("인원수 또는 반려견 수를 입력하세요")
  return;
} else{
  dateResult = true;
}

if(dateResult){
    const redate = new Date(revEndDate.value);
    const rsdate = new Date(revStartDate.value);
    let redateC = redate.getTime();
    let rsdateC = rsdate.getTime();
    if(redateC<rsdateC){
      alert("날짜를 다시 입력하세요")
      return;
    } else{
      let tdate = "";
      if(redateC == rsdateC){
        tdate = 1;
      } else{
        tdate = (redateC - rsdateC) / (1000*60*60*24);
      }
      let priceC = tdate*ipv+ac*10000+dc*10000;
      totalPrice.value = priceC;
    }
    
}
   
    // ------ 쿠폰 계산
    if(coupon.value != ""){
      arr = coupon.value.split("|");

      rp = arr[0];
      couponNum = arr[1];
      method = arr[2];
      

      rp = Number(rp);

      if(method == '0'){
        totalPrice.value = totalPrice.value*(100-rp)/ 100;
        tpv = totalPrice.value; 
      }else{
        totalPrice.value = totalPrice.value - rp;
        tpv = totalPrice.value;
      }
      
      coupon.value = couponNum;
      cpn = couponNum;
    }
    //----------------------
    

});


//==================================================================결제창 실행
rvBtnFrm.addEventListener("click", function(){
    let dateResult = false;
    itn = itemNum2.value;
    itg = itemCatg.value;
    rsv = revStartDate.value;
    rev = revEndDate.value;
    ac = adultsCount.value;
    dc = dogCount.value;
    tpv = totalPrice.value;
    bev = buyer_email.value;
    bnv = buyer_name.value;
    btv = buyer_tel.value;
    uiv = userId.value;
    inv = itemName.value;
    cpn = couponNum;

  
  
    if(tpv<=0){
    alert("예상 결제 금액을 다시 확인해주세요")
    return;
    } else{
      dateResult = true;
    }
  
  if(dateResult){
    requestPay();
  } 
});

//=====================================================================결제 api
  function requestPay() {
    // IMP.request_pay(param, callback) 결제창 호출
    IMP.request_pay({ // param
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: merchant_uid,
        name: inv,
        amount: tpv,//tpv
        buyer_email: bev,
        buyer_name: bnv,
        buyer_tel: btv,
        revStartDate: rsv,
        notice_url : 'http://localhost/member/purchaseList'
    }, function (rsp) { // callback
        // 결제검증
        if (rsp.success) { // 결제 성공 시: 결제 승인 또는 가상계좌 발급에 성공한 경우
          // jQuery로 HTTP 요청
          $.ajax({
              url: "./payments", // 예: https://www.myservice.com/payments/complete
              type: "POST",
              data: {
                  'imp_uid': rsp.imp_uid,
                  'merchant_uid': rsp.merchant_uid,
                  'amount': tpv,
                  'revStartDate': rsv,
                  'itemNum': itn,
                  'revEndDate': rev,
                  'adultsCount': ac,
                  'dogCount': dc,
                  'userId': uiv,
                  'couponNum' : cpn
              },
              error : function(xhr,status,error){
                console.log(xhr.responseText);
                console.log(status);
                console.log(error);
                let data = xhr.responseText;
                console.log(data);
              },
              success : function(paymentResult){
                console.log(paymentResult);
                if(paymentResult=="paid") {
                  alert("결제에 성공하였습니다!")
                  window.location.href = 'http://localhost/member/purchaseList';
              } else{
                alert("결제에 실패하였습니다. 결제 실패 사유: " + paymentResult);
                location.reload();
              }
              }})
          // .done(function (paymentResult) {
          //   console.log(paymentResult);
          //   if(paymentResult=="paid") {
          //     alert("결제에 성공하였습니다!")
          //     window.location.href = 'http://localhost/member/purchaseList';
          //   }
        } else {
          alert("결제에 실패하였습니다. 에러 내용: " +  rsp.error_msg);
          // location.reload(); 
        }
      })
  };