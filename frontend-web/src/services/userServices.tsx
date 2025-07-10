import { defaultAxiosInstance, axiosWithoutLoading } from "./axios.config";
import { toast } from "react-toastify";

export const loginGoogle = async (data: { googleId: string; }) => {
    const response = await defaultAxiosInstance.post("/api/user/loginmail", data);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    toast.success("Login successful");
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await axiosWithoutLoading.get("/api/user/current-user");
    return response.data;
};

export const searchUsers = async (searchInfo: { keyWord: string; role: string; status: string }, pageNum: number, pageSize: number) => {
    const response = await defaultAxiosInstance.post("/api/user/search", {
        searchInfo,
        pageInfo: { pageNum, pageSize }
    });
    return response.data;
};

export const getUserById = async (id: string) => {
    const response = await axiosWithoutLoading.get(`/api/user/${id}`);
    return response.data;
};

export const updateUser = async (id: string, data: { userFullName: string; userRollNumber: string; userEmail: string; userNumberCode: string; status: string; }) => {
    const response = await defaultAxiosInstance.put(`/api/user/${id}`, data);
    return response.data;
};

export const blockUser = async (id: string) => {
    const response = await defaultAxiosInstance.put(`/api/user/block/${id}`);
    return response.data;
};

export const deleteUser = async (id: string) => {
    const response = await defaultAxiosInstance.post(`/api/user/delete/${id}`);
    return response.data;
};