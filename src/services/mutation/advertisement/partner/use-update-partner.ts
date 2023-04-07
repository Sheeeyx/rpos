import { useMutation } from "react-query";
import { request } from "../../../api/api";


const useUpdatePartner = () =>
    useMutation((data: any) =>
        request.private
            .put(`advert/partner/${data.id}/`, data.data)
            .then((res) => res.data)
    );

export default useUpdatePartner;
