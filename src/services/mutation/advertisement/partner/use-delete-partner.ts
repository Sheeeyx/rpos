import { useMutation } from "react-query";
import queryClient from "../../../../configs/react-query.config";
import { request } from "../../../api/api";


const useDeletePartner = () =>
    useMutation(
        (id: number) =>
            request.private
                .delete(`advert/partner/${id}/`)
                .then((res) => res.data),
        {
            onMutate: () => {
         
                const partner = queryClient.getQueryData(`parnter`);
              
                queryClient.setQueryData(`parnter`, (prev: any) => {
                    if (!prev) return partner;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useDeletePartner;
