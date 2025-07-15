import { defaultAxiosInstance, axiosWithoutLoading } from "./axios.config";
import { toast } from "react-toastify";

export const createSemester = async (data: any) => {
    const response = await defaultAxiosInstance.post("/api/semester", data);
    toast.success("Semester created successfully");
    return response.data;
};

export const getSemesters = async () => {
    const response = await axiosWithoutLoading.get("/api/semester");
    return response.data;
};

export const getSemesterById = async (id: string) => {
    const response = await axiosWithoutLoading.get(`/api/semester/${id}`);
    return response.data;
};

export const updateSemester = async (id: string, data: any) => {
    const response = await defaultAxiosInstance.put(`/api/semester/${id}`, data);
    toast.success("Semester updated successfully");
    return response.data;
};

export const deleteSemester = async (id: string) => {
    const response = await defaultAxiosInstance.delete(`/api/semester/${id}`);
    toast.success("Semester deleted successfully");
    return response.data;
};