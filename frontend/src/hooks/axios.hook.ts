import axios from "axios"
import { useEffect, useState } from "react"

interface APIProps {
    url: string
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    data?: any
    params?: any
}

export type IAxiosResponse = {
    data: any,
    success: boolean,
    message: string,
    showPopUp: boolean,
    code: number,
    responseType: 'Error' | 'Information' | 'Question' | 'Warning' | 'Success',
} | null | any

export const useAxios = () => {

    const [response, setResponse] = useState<IAxiosResponse>(null);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const baseURL = 'http://localhost:3000';

    const axiosInstance = axios.create({ baseURL })

    axiosInstance.interceptors.response.use(response => response, err => Promise.reject(err))

    let controller = new AbortController();

    useEffect(() => {
        return () => controller?.abort();
    }, [])

    const fetchData = async ({
        url,
        method,
        data = {},
        params = {}
    }: APIProps) => {
        setLoading(true);
        
        controller.abort();
        controller = new AbortController();

        try {
            const result = await axiosInstance({
                url: baseURL + `/${url}`,
                method,
                data,
                params,
                signal: controller.signal
            });
            setResponse(result.data)
        } catch (err: any) {
            if(axios.isCancel(err)) {
                console.error("Request has been cancelled", err.message)
            } else {
                setError(err.response? err.response.data : err.message )
            }
        } finally {
            setLoading(false);
        }
    }

    return { response, error, loading, fetchData }
}