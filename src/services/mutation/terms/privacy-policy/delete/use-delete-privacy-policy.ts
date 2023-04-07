import { useMutation } from "react-query";
import queryClient from "../../../../../configs/react-query.config";
import { request } from "../../../../api/api";


const useDeletePrivacyPolicy = () =>
    useMutation(
        (id: number) =>
            request.private
                .delete(`/terms/privacy_policy/${id}/`)
                .then((res) => res.data),
        {
            onMutate: () => {
                const tags = queryClient.getQueryData("privacy-policy");

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                queryClient.setQueryData("privacy-policy", (prev: any) => {
                    if (!prev) return tags;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useDeletePrivacyPolicy;
