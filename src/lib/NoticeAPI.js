
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
export const update_notice = async (path, token, notice, writer_id) => {
  const param = { method: "PUT",
                  headers: { "Content-Type": "application/json;"
                            , "Authorization": "Bearer " + token },
                  body: JSON.stringify({ title: notice.title, content: notice.content, writer_id: writer_id })
                  };
  const response = await fetch(`${url}${path}`, param);
  return response;
}

// Notice Delete
export const delete_notice = async (path, token, writer_id) => {
  const param = { method: "DELETE",
                  headers: { "Content-Type": "application/json;"
                            , "Authorization": "Bearer " + token },
                  body: JSON.stringify({ writer_id: writer_id })
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
