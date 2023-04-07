import { useMutation } from "react-query";
import { request } from "../../../../api/api";

interface FaqTypes {
    id: string;
    title: string;
    description: string;
}

const useUpdateFaq = () =>
    useMutation((data: any) =>
        request.private
            .put<FaqTypes>(`terms/faq/${data.id}/`, data.data)
            .then((res) => res.data)
    );

export default useUpdateFaq;
