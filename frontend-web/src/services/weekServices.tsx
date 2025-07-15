import { defaultAxiosInstance, axiosWithoutLoading } from "./axios.config";
import { toast } from "react-toastify";

export const createWeek = async (data: any) => {
    const response = await defaultAxiosInstance.post("/api/week", data);
    toast.success("Week created successfully");
    return response.data;
};

export const getWeeksBySemester = async (semesterId: string) => {
    const response = await axiosWithoutLoading.get(`/api/week/semester/${semesterId}`);
    return response.data;
};

export const getWeekById = async (id: string) => {
    const response = await axiosWithoutLoading.get(`/api/week/${id}`);
    return response.data;
};

export const updateWeek = async (id: string, data: any) => {
    const response = await defaultAxiosInstance.put(`/api/week/${id}`, data);
    toast.success("Week updated successfully");
    return response.data;
};

export const deleteWeek = async (id: string) => {
    const response = await defaultAxiosInstance.delete(`/api/week/${id}`);
    toast.success("Week deleted successfully");
    return response.data;
};