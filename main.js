let result = document.getElementById('result');
let point = document.getElementById('point');
let operator = ['+', '-', '*', '/'];
//イコールを押した後演算子が入力されたら計算を続行し、数値が入力されたら表示をクリアするためのフラグ
let isCalculated = false;

function inputAc() {
  if (point.disabled) {
    point.disabled = false;
  }
  result.innerHTML = '0';
  isCalculated = false;
}

function inputNumber(inputValue) {
  if (isCalculated == true) {
    inputAc();
  }
  if (result.innerHTML == '0' && inputValue == '00') {
    result.innerHTML = '0';
  //0で始まる小数以外の数値が入力されることを防ぐ(e.g. 06 -> 6)
  } else if (result.innerHTML == '0' && inputValue != '.') {
    result.innerHTML = inputValue;
  } else if (isOperatorLast() && inputValue == '00') {
    result.innerHTML += '0';
  } else if (isOperatorExist(-2, -1) && result.innerHTML.slice(-1) == '0' && inputValue != '.') {
    if (inputValue == '00') {
      result.innerHTML;
    } else {
      result.innerHTML = result.innerHTML.slice(0, -1) + inputValue;
    }
  //演算子の後に小数点が入力されたら自動的に0を補う(e.g. 12+.5 -> 12+0.5)
  } else if (isOperatorLast() && inputValue == '.') {
    result.innerHTML += '0.';
  } else {
    //一度小数点を入力したら演算子やACが押下されるまで小数点入力を受け付けなくする
    if (inputValue == '.') {
      point.disabled = true;
    }
    result.innerHTML += inputValue;
  }
}

function inputOperator(inputValue) {
  if (point.disabled) {
    point.disabled = false;
  }
  //イコールを押して演算した結果に演算子を入力して計算を続行する場合にはフラグをfalseに戻す
  if (isCalculated) {
    isCalculated = false;
  }
  //最初に負数を入力した場合は初期表示の０が消えるようにする
  if (result.innerHTML == '0' && inputValue == '-') {
    result.innerHTML = inputValue;
  //複数の演算子が連続で入力された場合最後に入力された演算子で上書きする
  } else if (isOperatorLast()) {
    result.innerHTML = result.innerHTML.slice(0, -1) + inputValue;
  } else {
    result.innerHTML += inputValue;
  }
}

function inputEqual() {
  if (point.disabled) {
    point.disabled = false;
  }
  //計算式の最後が演算子で終わっている場合、末尾の演算子は取り除いて演算する
  if (isOperatorLast()) {
    result.innerHTML = result.innerHTML.slice(0, -1);
  }
  var resultTemp = new Function('return ('+result.innerHTML+')')();
  //無限大(e.g. 1/0)や非数(e.g. 0/0)が演算結果になった際はエラー表示が出るようにする
  if (resultTemp == Infinity || Number.isNaN(resultTemp)) {
    result.innerHTML = 'Error';
  } else {
    result.innerHTML = resultTemp;
  }
  isCalculated = true;
}

function isOperatorLast() {
  return operator.includes(result.innerHTML.slice(-1));
}

function isOperatorExist(startposition, endposition) {
  return operator.includes(result.innerHTML.slice(startposition, endposition));
}