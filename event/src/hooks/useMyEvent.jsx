import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxios";
import { useAuth } from "../contexts/AuthContext";

const useMyEvent = () => {
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure();
    const { data: myEventData = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['myEventData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`event/user/${user?._id}`);
            return res.data;
        },
    });
    return [myEventData, loading, refetch];
};

export default useMyEvent;