import { ElNotification } from "element-plus";

export default function notification({ title, message, type }) {
    ElNotification({
        title,
        message,
        type,
        position: "top-left",
        duration:3000
    });
}
