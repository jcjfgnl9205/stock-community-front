//usernamecheck
export const isUsername = username => {
    const regExp = /^[a-z]+[a-z0-9]{7,19}$/g;
    return regExp.test(username);
}

//passwordcheck
export const isPassword = password => {
  const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
  return regExp.test(password);
}

//Emailcheck
export const isEmail = email => {
  // const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(email);
}

//zipcodecheck
export const isZipcode = zipcode => {
  const regExp = /^[0-9]{7}$/;
  return regExp.test(zipcode);
}

//NullCheck
export const isNull = data => {
  return data === '' ? true : false;
}
