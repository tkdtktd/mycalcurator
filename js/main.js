(function () {
  "use strict";

  const price = document.getElementById('price');
  const num = document.getElementById('num');
  const unit = document.getElementById('unit');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const reset = document.getElementById('reset');

  function checkInput() {
    //  /^[1-9][0-9]*$/
    if(price.value.match(/^[1-9][0-9]*$/) !== null &&
      num.value.match(/^[1-9][0-9]*$/) !== null){
      btn.classList.remove("disabled");
    } else {
      btn.classList.add("disabled");
    }
  };

  btn.addEventListener("click",function(){
    let payless;
    let short;
    let paymore;
    let over;
    let str;
    if(this.classList.contains("disabled") === true){
      return;
    }
    // A.300(payless)...100(short)不足
    // B.400(paymore)...200(over)余り
    // payless = 1000 / 3; //333.333...
    // payless = 1000 / 3 / 100; //3.333...
    payless = Math.floor(price.value / num.value / unit.value) * unit.value; //300
    short = price.value - (payless * num.value); //100
    paymore = Math.ceil(price.value / num.value / unit.value) * unit.value; //400
    over = Math.abs(price.value - (paymore * num.value)); //200
    if(over === 0 && short === 0){
      str = `一人${price.value / num.value}円でちょうどです！`;
    } else {
      str = `一人 ${payless}円だと ${short}円足りません。
            一人 ${paymore}円だと ${over}円余ります。`;
    }

    result.textContent = str;
    reset.classList.remove("hidden");
  });

  price.addEventListener("keyup",checkInput);
  num.addEventListener("keyup",checkInput);

  reset.addEventListener("click",function () {
    result.textContent = "ここに結果を表示します。";
    price.value = "";
    num.value = "";
    unit.value = "100";
    btn.classList.add("disabled");
    this.classList.add("hidden");
    price.focus();
  });

  price.focus();
})();
