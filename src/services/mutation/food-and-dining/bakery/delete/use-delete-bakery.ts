import { useMutation } from "react-query";
import queryClient from "../../../../../configs/react-query.config";
import { request } from "../../../../api/api";


const useDeleteBekery = () =>

    useMutation(
        (id: number) =>
            request.private
                .delete(`food_dining/bakery/delete/${id}/`)
                .then((res) => res.data),
        {
            onMutate: () => {
                const data = queryClient.getQueryData("bakery");

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                queryClient.setQueryData("bakery", (prev: any) => {
                    if (!prev) return data;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useDeleteBekery;
