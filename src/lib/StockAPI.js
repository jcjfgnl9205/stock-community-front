const url = process.env.REACT_APP_API_ROOT;

export const get_stock_menu_list = async () => {
    const param = { method: "GET",
                    headers: { "Content-Type": "application/json;" }};
    const response = await fetch(`${url}/stock`, param);
    return response;
}