import { useMutation } from "react-query";
import queryClient from "../../../../../configs/react-query.config";
import { request } from "../../../../api/api";

interface FaqTypes {
    id: any;
}

const useDeleteFaqList = (id: string) =>
    useMutation(
        (id: any) =>
            request.private
                .delete<FaqTypes>(`terms/faq/${id}/`, id)
                .then((res) => res.data),
        {
            onMutate: () => {
                const faq = queryClient.getQueryData("faq");

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                queryClient.setQueryData("faq", (prev: any) => {
                    if (!prev) return faq;
                    return {
                        ...prev,
                    };
                });
            },
        } 
    );

export default useDeleteFaqList;
