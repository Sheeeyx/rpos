import { useMutation } from "react-query";
import queryClient from "../../../../../configs/react-query.config";
import { request } from "../../../../api/api";


const useDeleteLegalNotices = () =>
    useMutation(
        (id: number) =>
            request.private
                .delete(`/terms/legal_notices/${id}/`)
                .then((res) => res.data),
        {
            onMutate: () => {
                const tags = queryClient.getQueryData("legal-notices");

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                queryClient.setQueryData("legal-notices", (prev: any) => {
                    if (!prev) return tags;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useDeleteLegalNotices;
