import { defaultAxiosInstance, axiosWithoutLoading } from "./axios.config";

// Types for Equipment API
export interface EquipmentItem {
    equipmentId: string;
    equipmentName: string;
    equipmentCode: string;
    equipmentNumberSerial: string;
    equipmentDescription: string;
    equipmentTypeUrlImg: string;
    equipmentQr: string;
    equipmentStatus: string;
}

export interface PageInfo {
    page: number;
    size: number;
    sort: string;
    order: string;
    totalPage: number;
    totalItem: number;
}

export interface SearchInfo {
    keyWord: string;
    role: string | null;
    status: string;
}

export interface EquipmentSearchResponse {
    code: number;
    success: boolean;
    message: string | null;
    data: {
        pageInfo: PageInfo;
        searchInfo: SearchInfo;
        pageData: EquipmentItem[];
    };
}

export interface EquipmentSearchRequest {
    pageNum: number;
    pageSize: number;
    keyWord: string;
    status: string;
}

export interface CreateEquipmentRequest {
    equipmentName: string;
    equipmentCode: string;
    equipmentNumberSerial: string;
    equipmentDescription: string;
    equipmentTypeUrlImg: string;
    equipmentQr: string;
}

export interface UpdateEquipmentRequest {
    equipmentName: string;
    equipmentCode: string;
    equipmentNumberSerial: string;
    equipmentDescription: string;
    equipmentTypeUrlImg: string;
    equipmentQr: string;
    equipmentStatus: string;
}

// Equipment API Services
export const searchEquipment = async (searchParams: EquipmentSearchRequest) => {
    const response = await defaultAxiosInstance.post("/api/equipment/search", searchParams);
    return response;
};

export const createEquipment = async (data: CreateEquipmentRequest) => {
    const response = await defaultAxiosInstance.post("/api/equipment/equipment", data);
    return response;
};

export interface EquipmentDetailResponse {
    code: number;
    success: boolean;
    message: string | null;
    data: EquipmentItem;
}

export const getEquipmentById = async (id: string) => {
    const response = await axiosWithoutLoading.get(`/api/equipment/${id}`);
    return response;
};

export const updateEquipment = async (id: string, data: UpdateEquipmentRequest) => {
    const response = await defaultAxiosInstance.put(`/api/equipment/${id}`, data);
    return response;
};

export const deleteEquipment = async (id: string) => {
    const response = await defaultAxiosInstance.post(`/api/equipment/delete/${id}`);
    return response;
};

