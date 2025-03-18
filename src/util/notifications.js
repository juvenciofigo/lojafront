import { ElNotification } from "element-plus";

export default function notification({ title, message, type }) {
    ElNotification({
        title,
        message,
        type,
    });
}
