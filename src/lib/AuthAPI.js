const url = process.env.REACT_APP_API_ROOT;

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

// ユーザー情報取得
export const get_user_api = async (path, token) => {
  const param = { method: "GET",
                  headers: { "Content-Type": "application/json;"
                            , "Authorization": "Bearer " + token },
                  };
  const response = await fetch(`${url}/auth${path}`, param);
  return response;
}


// ユーザー情報更新
export const update_user_api = async (path, token, user) => {
  const param = { method: "PUT",
                  headers: { "Content-Type": "application/json;"
                            , "Authorization": "Bearer " + token },
                  body: JSON.stringify(user)
                  };
  const response = await fetch(`${url}/auth${path}`, param);
  return response;
}

// ユーザーpassword更新
export const update_password_api = async (path, token, password) => {
  const param = { method: "PUT",
                  headers: { "Content-Type": "application/json;"
                            , "Authorization": "Bearer " + token },
                  body: JSON.stringify({oldPassword: password.oldPassword, password: password.password})
                  };
  const response = await fetch(`${url}/auth${path}/pw`, param);
  return response;
}

// Password探すとき、メール確認
export const forgot_password_email_check = async (email) => {
  const param = { method: "POST",
                  headers: { "Content-Type": "application/json;"},
                  body: JSON.stringify({email: email, authNum: ""})
                  };
  const response = await fetch(`${url}/auth/forgot-password`, param);
  return response;
}

// Password探すとき、認証番号確認
export const forgot_password_authnum_check = async (email, authNum) => {
  const param = { method: "POST",
                  headers: { "Content-Type": "application/json;"},
                  body: JSON.stringify({email: email, authNum: authNum})
                  };
  const response = await fetch(`${url}/auth/forgot-password/auth-number`, param);
  return response;
}
