import { useMutation } from "react-query";
import queryClient from "../../../../../configs/react-query.config";
import { request } from "../../../../api/api";

interface RestaurantTypes {
    id: any;
}

const useDeleteRestaurantList = (id: string) =>
    useMutation(
        (id: any) =>
            request.private
                .delete<RestaurantTypes>(`food_dining/restaurant/delete/${id}/`, id)
                .then((res) => res.data),
        {
            onMutate: () => {
                const restaurant = queryClient.getQueryData("restaurant");

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                queryClient.setQueryData("restaurant", (prev: any) => {
                    if (!prev) return restaurant;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useDeleteRestaurantList;
