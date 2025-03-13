import { ElNotification } from "element-plus";

const notification = (message) => {
    ElNotification({
        title: "Erro!",
        type: "error",
        message: message,
    });
};

const getCookie = (name) => {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return decodeURIComponent(cookie.substring(cookieName.length, cookie.length));
        }
    }
    return null;
};

const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const cookieOptions = `expires=${expires.toUTCString()};path=/;Secure;SameSite=Strict`;
    document.cookie = `${name}=${encodeURIComponent(value)};${cookieOptions}`;
};

const removeCookie = async (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;Secure;SameSite=Strict`;
};

const cookieExists = (name) => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.indexOf(`${name}=`) === 0) {
            return true;
        }
    }
    return false;
};

function errorMessage(error) {
    if (error.message === "Network Error") {
        notification("Servidor fora do ar!");
        console.error(error);
        return;
    } else if (error.response) {
        console.log(error);
        
        notification(error.response.data.message);

        return;
    } else {
        console.error(error);
    }
}

export { setCookie, getCookie, removeCookie, cookieExists, errorMessage };
