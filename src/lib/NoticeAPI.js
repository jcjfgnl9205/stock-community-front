
const url = "http://localhost:8000";

// Notice Create
export const create_notice = async (path, token, notice) => {
  const param = { method: "POST",
                  headers: { "Content-Type": "application/json;"
                            , "Authorization": "Bearer " + token },
                  body: JSON.stringify({ title: notice.title, content: notice.content })
                  };
  const response = await fetch(`${url}${path}`, param);
  return response;
}

// Notice List
export const get_notices = async (path) => {
  const param = { method: "GET",
                  headers: { "Content-Type": "application/json;" }};
  const response = await fetch(`${url}${path}`, param);
  return response;
}

// Notice Detail
export const get_notice = async (path) => {
  const param = { method: "GET",
                  headers: { "Content-Type": "application/json;" }};
  const response = await fetch(`${url}${path}`, param);
  return response;
}

// Notice Update
export const update_notice = async (path, token, notice) => {
  const param = { method: "PUT",
                  headers: { "Content-Type": "application/json;"
                            , "Authorization": "Bearer " + token },
                  body: JSON.stringify({ title: notice.title, content: notice.content })
                  };
  const response = await fetch(`${url}${path}`, param);
  return response;
}

// Notice Delete
export const delete_notice = async (path, token) => {
  const param = { method: "DELETE",
                  headers: { "Content-Type": "application/json;"
                            , "Authorization": "Bearer " + token },
                  };
  const response = await fetch(`${url}${path}`, param);
  return response;
}

// Get Notice Like, Hate count
export const get_votes = async (path) => {
  const param = { method: "GET",
                  headers: { "Content-Type": "application/json;" }};
  const response = await fetch(`${url}${path}/vote`, param);
  return response;
}

// Notice Like, Hate Button Click Event
export const update_vote = async (path, token, vote) => {
  const param = { method: "POST",
                  headers: { "Content-Type": "application/json;"
                            , "Authorization": "Bearer " + token },
                  body: JSON.stringify(vote)
                  };
  const response = await fetch(`${url}${path}/vote`, param);
  return response;
}

// Get Notice Comment
// 掲示板のコメントリストを取得する
export const get_notice_comments = async (path) => {
  const param = { method: "GET",
                  headers: { "Content-Type": "application/json;" }};
  const response = await fetch(`${url}${path}/comments`, param);
  return response;
}

// Create Notice Comment
// 掲示板のコメントを作成する
export const create_notice_comment = async (path, token, comment) => {
  const param = { method: "POST",
                  headers: { "Content-Type": "application/json;"
                            , "Authorization": "Bearer " + token },
                  body: JSON.stringify(comment)
                  };
  const response = await fetch(`${url}${path}/comment`, param);
  return response;
}

// 掲示板のコメントを削除する
export const delete_notice_comment = async (path, token, comment_id) => {
  const param = { method: "DELETE",
                  headers: { "Content-Type": "application/json;"
                            , "Authorization": "Bearer " + token },
                  };
  const response = await fetch(`${url}${path}/comment/${comment_id}`, param);
  return response;
}

// 掲示板のコメントを修正する
export const update_notice_comment = async (path, token, comment_id, comment) => {
  const param = { method: "PUT",
                  headers: { "Content-Type": "application/json;"
                            , "Authorization": "Bearer " + token },
                  body: JSON.stringify(comment)
                  };
  const response = await fetch(`${url}${path}/comment/${comment_id}`, param);
  return response;
}
