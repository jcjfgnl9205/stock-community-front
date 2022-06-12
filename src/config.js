import { green, red } from '@mui/material/colors';

// Stock +-
export const POSITIVE_INT = green[700];
export const NEGATIVE_INT = red.A400;


// error message
export const MSG501 = "TITLEを入力してください。";
export const MSG502 = "CONTENTを入力してください。";
export const MSG503 = "COMMENTを入力してください。";

export const MSG901 = "usernameは8~20桁の英文字、数字で入力してください。";
export const MSG902 = "passwordは8~16桁の英文字、数字で入力してください。";
export const MSG903 = "email形式で入力してください。";
export const MSG904 = "usernameを確認してください。";
export const MSG905 = "passwordを確認してください。";
export const MSG906 = "oldpasswordを確認してください。";
export const MSG941 = "username, passwordを確認してください。";
export const MSG951 = "存在しない郵便番号です。";
export const MSG971 = "checkboxを同意してください。";

export const MSG801 = name => {
  return `${name}を入力してください。`;
}

export const formatDate = date => {
  const d = new Date(date);
  const year = d.getFullYear();
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  
  return [year, month, day].join('-');
}

// 配列をN個ずつ分離する
export const division = (arr, n) => {
  const length = arr.length;
  const divide = Math.floor(length / n) + (Math.floor( length % n ) > 0 ? 1 : 0);
  const newArray = [];

  for (let i = 0; i < divide; i++) {
    // 配列 0から n個ずつ 切って新しい配列に格納
    newArray.push(arr.splice(0, n)); 
  }

  return newArray;
}

// テキストを改行する
export const multiLine = text => {
  return text.split("\n").map((t, index) => {
    return (
      <p key={ index }>{ t }</p>
    )
  })
}