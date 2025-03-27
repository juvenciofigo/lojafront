import axios from "axios";
import { getCookie } from "@/util/cookieUtils";

function getHeaders() {
    const authToken = getCookie("authToken");
    return authToken ? { Authorization: `Ecommerce ${authToken}` } : {};
}

const apiURL = process.env.VUE_APP_API_URL || "http://localhost:3000"; // Define um fallback seguro

export default async function sendAxio({ method, url, data, customHeaders, params, query }) {
    try {
        const config = {
            method,
            baseURL: apiURL,
            url,
            headers: { ...getHeaders(), ...(customHeaders || {}) },
        };

        if (data) config.data = data;
        if (params) config.params = params;
        if (query) config.params = query;

        const res = await axios.request(config);
        return res;
    } catch (error) {
        console.error(`Erro na requisição ${method.toUpperCase()} para ${url}:`, error?.response?.data || error);
        throw error;
    }
}
