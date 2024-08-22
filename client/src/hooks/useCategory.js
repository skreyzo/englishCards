import { useEffect, useState } from "react";
import axiosInstance, { setAccessToken } from "../components/api/axiosInstance"
export default function useCategory() {

const [categories, setCategories] = useState([])
  useEffect(() => {
    axiosInstance.get('/cat').then(res => setCategories(res.data));
  }, []);

return {
    categories
  };
}