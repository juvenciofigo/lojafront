import store from "@/store/index";

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

const removeCookie = (name) => {
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
    if (error.message == "Network Error") {
        store.commit("updateSnackbar", { show: true, text: "Servidor fora do ar!", color: "red" });
        console.error(error);
        return;
    } else if (error.response) {
        store.commit("updateSnackbar", { show: true, text: error.response.data.error, color: "red" });
        return;
    } else {
        console.error(error);
    }
}

export { setCookie, getCookie, removeCookie, cookieExists, errorMessage };
