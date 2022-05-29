// Page View Count 重複チェック
export const view_count_check = (page_id, setCookie, cookie) => {
  let old_cookie = cookie.postView?.split("/");
  if (old_cookie === undefined) {
    setCookie("postView", page_id, { path: '/' , maxAge: 500});
    return true;
  } else{
    if (!old_cookie.includes(page_id)) {
      setCookie("postView", old_cookie.join("/") + "/" + page_id, { path: '/' , maxAge: 500});
      return true;
    }
  }
  return false;
}
