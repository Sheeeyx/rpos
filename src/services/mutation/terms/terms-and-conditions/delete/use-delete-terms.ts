import { useMutation } from "react-query";
import queryClient from "../../../../../configs/react-query.config";
import { request } from "../../../../api/api";

interface FaqTypes {
    id: any;
}

const useDeleteTermsCondition = () =>
    useMutation(
        (id: number) =>
            request.private
                .delete<FaqTypes>(`/terms/terms_conditions/${id}/`)
                .then((res) => res.data),
        {
            onMutate: () => {
                const tags = queryClient.getQueryData("terms-conditions");

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                queryClient.setQueryData("terms-conditions", (prev: any) => {
                    if (!prev) return tags;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useDeleteTermsCondition;
