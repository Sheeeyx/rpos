import { useMutation } from "react-query";
import queryClient from "../../configs/react-query.config";
import { request } from "../api/api";


const useUpdateTravelling = () =>
    useMutation((data: any) =>
        request.private
            .put(`advert/travelling/${data.id}/`, data.data)
            .then((res) => res.data),
    );

export default useUpdateTravelling;
