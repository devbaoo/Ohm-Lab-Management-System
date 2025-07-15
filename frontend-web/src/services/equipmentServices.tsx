import { defaultAxiosInstance, axiosWithoutLoading } from "./axios.config";
import { toast } from "react-toastify";

export const getEquipmentById = async (id: string) => {
    const response = await axiosWithoutLoading.get(`/api/equipment/${id}`);
    return response.data;
};

export const createEquipment = async (data: { equipmentName: string; equipmentCode: string; equipmentNumberSerial: string; equipmentDescription: string; equipmentTypeUrlImg: string; equipmentQr: string }) => {
    const response = await defaultAxiosInstance.post("/api/equipment/equipment", data);
    toast.success("Equipment created successfully");
    return response.data;
};

export const createEquipmentQr = async (data: { id: string, qr: string }) => {
    const response = await defaultAxiosInstance.post(`/api/equipment/qr`, data);
    return response.data;
};

export const searchEquipment = async (data: { pageNum: number; pageSize: number; keyWord: string; status: string }) => {
    const response = await defaultAxiosInstance.post("/api/equipment/search", data);
    return response.data;
};