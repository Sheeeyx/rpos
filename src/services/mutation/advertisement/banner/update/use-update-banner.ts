import { useMutation } from "react-query";
import { request } from "../../../../api/api";


const useUpdateBanner = () =>
    useMutation((data: any) =>
        request.private
            .put(`advert/banner/${data.id}/`, data.data)
            .then((res) => res.data)
    );

export default useUpdateBanner;
