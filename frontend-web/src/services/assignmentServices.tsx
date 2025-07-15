import { defaultAxiosInstance, axiosWithoutLoading } from "./axios.config";
import { toast } from "react-toastify";

export const createSchedules = async (data: any) => {
    const response = await defaultAxiosInstance.post("/api/assignment/schedules", data);
    toast.success("Schedules created successfully");
    return response.data;
};

export const updateSchedule = async (id: string, data: any) => {
    const response = await defaultAxiosInstance.put(`/api/assignment/schedules/${id}`, data);
    toast.success("Schedule updated successfully");
    return response.data;
};

export const deleteSchedule = async (id: string) => {
    const response = await defaultAxiosInstance.delete(`/api/assignment/schedules/${id}`);
    toast.success("Schedule deleted successfully");
    return response.data;
};

export const getSchedulesByClass = async (classId: string) => {
    const response = await axiosWithoutLoading.get(`/api/assignment/classes/${classId}/schedules`);
    return response.data;
};

export const getSchedulesByLecturer = async (lecturerId: string) => {
    const response = await axiosWithoutLoading.get(`/api/assignment/lecturers/${lecturerId}/schedules`);
    return response.data;
};

export const createReports = async (data: any) => {
    const response = await defaultAxiosInstance.post("/api/assignment/reports", data);
    toast.success("Reports created successfully");
    return response.data;
};

export const getReportById = async (id: string) => {
    const response = await axiosWithoutLoading.get(`/api/assignment/reports/${id}`);
    return response.data;
};

export const getReportsByStudent = async (studentId: string) => {
    const response = await axiosWithoutLoading.get(`/api/assignment/students/${studentId}/reports`);
    return response.data;
};

export const getReportsBySchedule = async (scheduleId: string) => {
    const response = await axiosWithoutLoading.get(`/api/assignment/schedules/${scheduleId}/reports`);
    return response.data;
};

export const getReportsByLab = async (labId: string) => {
    const response = await axiosWithoutLoading.get(`/api/assignment/labs/${labId}/reports`);
    return response.data;
};

export const createGrades = async (data: any) => {
    const response = await defaultAxiosInstance.post("/api/assignment/grades", data);
    toast.success("Grades created successfully");
    return response.data;
};

export const updateGrade = async (id: string, data: any) => {
    const response = await defaultAxiosInstance.put(`/api/assignment/grades/${id}`, data);
    toast.success("Grade updated successfully");
    return response.data;
};

export const getGradeById = async (id: string) => {
    const response = await axiosWithoutLoading.get(`/api/assignment/grades/${id}`);
    return response.data;
};

export const getGradesByLab = async (labId: string) => {
    const response = await axiosWithoutLoading.get(`/api/assignment/labs/${labId}/grades`);
    return response.data;
};

export const getGradesByStudent = async (studentId: string) => {
    const response = await axiosWithoutLoading.get(`/api/assignment/students/${studentId}/grades`);
    return response.data;
};

export const getUngradedReports = async () => {
    const response = await axiosWithoutLoading.get("/api/assignment/reports/ungraded");
    return response.data;
};

export const updateReportStatus = async (reportId: string, data: any) => {
    const response = await defaultAxiosInstance.put(`/api/assignment/reports/${reportId}/status`, data);
    toast.success("Report status updated successfully");
    return response.data;
};

export const updateGradeFeedback = async (gradeId: string, data: any) => {
    const response = await defaultAxiosInstance.put(`/api/assignment/grades/${gradeId}/feedback`, data);
    toast.success("Grade feedback updated successfully");
    return response.data;
};

export const getGradesFeedbackByLab = async (labId: string) => {
    const response = await axiosWithoutLoading.get(`/api/assignment/labs/${labId}/grades/feedback`);
    return response.data;
};

export const getLabStatistics = async (labId: string) => {
    const response = await axiosWithoutLoading.get(`/api/assignment/labs/${labId}/statistics`);
    return response.data;
};

export const getStudentGradeSummary = async (studentId: string) => {
    const response = await axiosWithoutLoading.get(`/api/assignment/students/${studentId}/grade-summary`);
    return response.data;
};

export const getClassPracticeSummary = async (classId: string) => {
    const response = await axiosWithoutLoading.get(`/api/assignment/classes/${classId}/practice-summary`);
    return response.data;
};