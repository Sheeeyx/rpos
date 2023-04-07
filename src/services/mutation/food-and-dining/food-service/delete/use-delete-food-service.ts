import { useMutation } from "react-query";
import queryClient from "../../../../../configs/react-query.config";
import { request } from "../../../../api/api";


const useDeleteFoodService = () =>

    useMutation(
        (id: number) =>
            request.private
                .delete(`food_dining/food_service/delete/${id}/`)
                .then((res) => res.data),
        {
            onMutate: () => {
                const data = queryClient.getQueryData("food-service");

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                queryClient.setQueryData("food-service", (prev: any) => {
                    if (!prev) return data;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useDeleteFoodService;
