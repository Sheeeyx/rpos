import { useMutation } from "react-query";
import queryClient from "../../../../../configs/react-query.config";
import { request } from "../../../../api/api";

interface FaqTypes {
    id: any;
}

const useDeleteFoodTypeTags = () =>
    useMutation(
        (id: number) =>
            request.private
                .delete<FaqTypes>(`/food_dining/food_type/${id}/`)
                .then((res) => res.data),
        {
            onMutate: () => {
                const tags = queryClient.getQueryData("food-type");

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                queryClient.setQueryData("food-type", (prev: any) => {
                    if (!prev) return tags;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useDeleteFoodTypeTags;
