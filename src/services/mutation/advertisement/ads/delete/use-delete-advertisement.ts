import { useMutation } from "react-query";
import queryClient from "../../../../../configs/react-query.config";
import { request } from "../../../../api/api";


const useDeleteAdvertisement = () =>

    useMutation(
        (id: number) =>
            request.private
                .delete(`advert/advertisement/${id}/`)
                .then((res) => res.data),
        {
            onMutate: () => {
                const data = queryClient.getQueryData("advertisement");

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                queryClient.setQueryData("advertisement", (prev: any) => {
                    if (!prev) return data;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useDeleteAdvertisement;
