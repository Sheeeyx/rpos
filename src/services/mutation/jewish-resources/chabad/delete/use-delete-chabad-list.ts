import { useMutation } from "react-query";
import queryClient from "../../../../../configs/react-query.config";
import { request } from "../../../../api/api";

interface ChabadTypes {
    id: any;
}

const useDeleteChabadList = (id: string) =>
    useMutation(
        (id: any) =>
            request.private
                .delete<ChabadTypes>(`chabad/${id}/`, id)
                .then((res) => res.data),
        {
            onMutate: () => {
                const chabad = queryClient.getQueryData("chabad");

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                queryClient.setQueryData("chabad", (prev: any) => {
                    if (!prev) return chabad;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useDeleteChabadList;
