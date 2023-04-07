import { useMutation } from "react-query";
import queryClient from "../../../../../configs/react-query.config";
import { request } from "../../../../api/api";


const useDeleteSafetyResource = () =>

    useMutation(
        (id: any) =>
            request.private
                .delete(`terms/safety_resource_centre/${id}/`, id)
                .then((res) => res.data),
        {
            onMutate: () => {
                const data = queryClient.getQueryData("safety-resource");

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                queryClient.setQueryData("safety-resource", (prev: any) => {
                    if (!prev) return data;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useDeleteSafetyResource;
