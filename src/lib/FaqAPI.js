
const url = process.env.REACT_APP_API_ROOT;

// FAQ Create
export const create_faq = async (path, token, faq) => {
  const param = { method: "POST",
                  headers: { "Content-Type": "application/json;"
                            , "Authorization": "Bearer " + token },
                  body: JSON.stringify({ title: faq.title, content: faq.content, flg: faq.flg })
                  };
  const response = await fetch(`${url}${path}`, param);
  return response;
}

// FAQ List
export const get_faqs = async (path) => {
  const param = { method: "GET",
                  headers: { "Content-Type": "application/json;" }};
  const response = await fetch(`${url}${path}`, param);
  return response;
}

// FAQ Update
export const update_faq = async (path, token, faq) => {
  const param = { method: "PUT",
                  headers: { "Content-Type": "application/json;"
                            , "Authorization": "Bearer " + token },
                  body: JSON.stringify(faq)
                  };
  const response = await fetch(`${url}${path}/${faq.id}`, param);
  return response;
}

// FAQ Delete
export const delete_faq = async (path, token, id) => {
  const param = { method: "DELETE",
                  headers: { "Content-Type": "application/json;"
                            , "Authorization": "Bearer " + token },
                  };
  const response = await fetch(`${url}${path}/${id}`, param);
  return response;
}
