import { useMutation } from "react-query";
import { request } from "../../../../api/api";


const useUpdateAdvertisement = () =>
    useMutation((data: any) =>
        request.private
            .put(`advert/advertisement/${data.id}/`, data.data)
            .then((res) => res.data)
    );

export default useUpdateAdvertisement;
