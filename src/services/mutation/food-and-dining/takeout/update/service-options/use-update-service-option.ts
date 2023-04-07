import { useMutation } from "react-query";
import { request } from "../../../../../api/api";
import queryClient from "../../../../../../configs/react-query.config";

interface ResTypes {
    id: string;
}

const useUpdateTakeOutServiceOption = (id:any) =>
    useMutation((data: any) =>
        request.private
            .post<ResTypes>(`food_dining/take_out/update_service_option/${id}/`, data)
            .then((res) => res.data),
            {
                onMutate: ({id}) => {
                    const data = queryClient.getQueryData(`detail-takeout${id}`);
                    console.log(id)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    queryClient.setQueryData(`detail-takeout${id}`, (prev: any) => {
                        if (!prev) return data;
                        return {
                            ...prev,
                        };
                    });
                },
            }
    );

export default useUpdateTakeOutServiceOption;
