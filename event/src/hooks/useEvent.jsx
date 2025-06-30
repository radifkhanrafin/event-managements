import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxios";

const useEvent = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: eventData = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['eventData'],
        queryFn: async () => {
            const res = await axiosSecure.get('event');
            return res.data;
        },
    });
    return [eventData, loading, refetch];
};

export default useEvent;