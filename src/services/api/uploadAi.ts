import { envs } from "@/config/envs";
import { createApi } from "./api";

export const uploadAIApiUrl = envs.VITE_UPLOAD_AI_API

export const uploadAIApi = createApi(uploadAIApiUrl)