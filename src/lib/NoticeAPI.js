
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
