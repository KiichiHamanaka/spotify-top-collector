import axios from "axios";

export const fetchGet = (url: string) => axios.get(url).then((res) => res.data);

export const fetchPost = (url: string, data: any) =>
    axios.post(url, data).then((res) => res.data);

export const fetchDelete = (url: string) =>
    axios.delete(url).then((res) => res.data);
