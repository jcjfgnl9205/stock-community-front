const url = "http://localhost:8000";

// username重複チェック
export const duplicate_id_check = async (path, username) => {
  const param = { method: "POST",
                  headers: { "Content-Type": "application/json;" },
                  body: JSON.stringify({ username: username })
                  };
  const response = await fetch(`${url}/auth${path}/duplicate_id_check`, param);
  return response;
}

// emailを重複チェック
export const duplicate_email_check = async (path, email) => {
  const param = { method: "POST",
                  headers: { "Content-Type": "application/json;" },
                  body: JSON.stringify({ email: email })
                  };
  const response = await fetch(`${url}/auth${path}/duplicate_email_check`, param);
  return response;
}

// 会員登録
export const signup = async (path, user) => {
  const param = { method: "POST",
                  headers: { "Content-Type": "application/json;" },
                  body: JSON.stringify(user)
                  };
  const response = await fetch(`${url}/auth${path}`, param);
  return response;
}

//郵便番ごで住所検索する
export const addressApi = async zipcode => {
  const param = { method: "GET",
                  headers: { "Content-Type": "application/json;" },
                };
  const response = await fetch(`https://geoapi.heartrails.com/api/json?method=searchByPostal&postal=${zipcode}`, param);
  const data = await response.json();
  if (response.status === 200) {
    return data;
  }
}