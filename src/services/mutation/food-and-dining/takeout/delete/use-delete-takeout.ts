
import { useMutation } from "react-query";
import queryClient from "../../../../../configs/react-query.config";
import { request } from "../../../../api/api";


const useDeleteTakeout= () =>

    useMutation(
        (id: number) =>
            request.private
                .delete(`food_dining/take_out/delete/${id}/`)
                .then((res) => res.data),
        {
            onMutate: () => {
                const data = queryClient.getQueryData("takeout");

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                queryClient.setQueryData("takeout", (prev: any) => {
                    if (!prev) return data;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useDeleteTakeout;
