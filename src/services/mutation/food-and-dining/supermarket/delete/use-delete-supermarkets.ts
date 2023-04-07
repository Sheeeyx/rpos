import { useMutation } from "react-query";
import queryClient from "../../../../../configs/react-query.config";
import { request } from "../../../../api/api";


const useDeleteSupermarkets = () =>

    useMutation(
        (id: number) =>
            request.private
                .delete(`food_dining/supermarket/delete/${id}/`)
                .then((res) => res.data),
        {
            onMutate: () => {
                const data = queryClient.getQueryData("supermarkets");

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                queryClient.setQueryData("supermarkets", (prev: any) => {
                    if (!prev) return data;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useDeleteSupermarkets;
