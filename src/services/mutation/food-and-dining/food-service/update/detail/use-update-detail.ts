import { useMutation } from "react-query";
import { request } from "../../../../../api/api";
import queryClient from "../../../../../../configs/react-query.config";


const useUpdateFoodServiceDetail = () =>
    useMutation((data: any) =>
        request.private
            .post(`food_dining/food_service/update/${data.id}/`, data.data)
            .then((res) => res.data),
            {
                onMutate: ({id}) => {
                    const data = queryClient.getQueryData(`detail-food-service${id}`);
                    console.log(id)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    queryClient.setQueryData(`detail-food-service${id}`, (prev: any) => {
                        if (!prev) return data;
                        return {
                            ...prev,
                        };
                    });
                },
            }
    );

export default useUpdateFoodServiceDetail;