const url = "http://localhost:8000";

export const get_stock_menu_list = async () => {
    const param = { method: "GET",
                    headers: { "Content-Type": "application/json;" }};
    const response = await fetch(`${url}/stock`, param);
    return response;
}