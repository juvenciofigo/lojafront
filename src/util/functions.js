import { format } from "date-fns";


const formatCurrency = (value) => {
    if (typeof value !== "number" || isNaN(value)) {
        return "MZN 0.00";
    }
    return value.toLocaleString("pt-MZ", {
        style: "currency",
        currency: "MZN",
    });
};

const formatDate = (date) => {
    return format(new Date(date), "dd/MM/yyyy HH:mm");
};

export { formatCurrency, formatDate };
