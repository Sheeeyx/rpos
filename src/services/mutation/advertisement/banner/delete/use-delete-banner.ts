
import { useMutation } from "react-query";
import { request } from "../../../../api/api";


const useDeleteBanner = () =>
    useMutation((id: any) =>
        request.private
            .delete(`advert/banner/${id}/`)
            .then((res) => res.data)
    );

export default useDeleteBanner;
