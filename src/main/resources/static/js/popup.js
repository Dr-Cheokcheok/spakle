
// 팝업 열기
function openPop() {
  document.getElementById("pop-box").style.display = "block";
}

// 팝업 닫기
function closePop() {
  document.getElementById("pop-box").style.display = "none";
}

function openPop2() {
  document.getElementById("pop-box2").style.display = "block";
}

// 팝업 닫기
function closePop2() {
  document.getElementById("pop-box2").style.display = "none";
}

const fSite = document.querySelector(".f-site");
fSite.onmousedown = () => {
  const familySite = document.querySelector(".family-site-ul");
  familySite.classList.toggle("up");
  familySite.classList.toggle("down");
}