import { useMutation } from "react-query";
import { request } from "../../../../../api/api";
import queryClient from "../../../../../../configs/react-query.config";

interface ResTypes {
    id: string;
}

const useUpdateBakeryFoodOption = (id:any) =>
    useMutation((data: any) =>
        request.private
            .post<ResTypes>(`/food_dining/bakery/update_food_type/${id}/`, data)
            .then((res) => res.data),
            {
                onMutate: ({id}) => {
                    const data = queryClient.getQueryData(`details-bakery${id}`);
                    console.log(id)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    queryClient.setQueryData(`details-bakery${id}`, (prev: any) => {
                        if (!prev) return data;
                        return {
                            ...prev,
                        };
                    });
                },
            }
    );

export default useUpdateBakeryFoodOption;
