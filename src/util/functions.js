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

const provinces = ["Maputo Cidade", "Maputo Província", "Gaza", "Inhambane", "Sofala", "Manica", "Tete", "Zambézia", "Nampula", "Cabo Delgado", "Niassa"];

const locations = {
    Niassa: ["Lichinga", "Cuamba", "Mavago"],
    "Cabo Delgado": ["Pemba", "Montepuez", "Palma"],
    Nampula: ["Nampula", "Nacala", "Ilha de Moçambique"],
    Zambézia: ["Quelimane", "Mocuba", "Gurué", "Alto Molócué"],
    Tete: ["Tete", "Moatize", "Chiuta"],
    Manica: ["Chimoio", "Gondola", "Manica", "Catandica"],
    Sofala: ["Beira", "Dondo", "Buzi", "Gorongosa"],
    Inhambane: ["Inhambane", "Maxixe", "Vilankulo"],
    Gaza: ["Xai-Xai", "Chokwé", "Mandlakazi", "Bilene", "Magude"],
    "Maputo Província": ["Matola", "Boane", "Namaacha", "Marracuene"],
    "Maputo Cidade": ["Maputo"],
};

export { formatCurrency, formatDate, provinces, locations };
