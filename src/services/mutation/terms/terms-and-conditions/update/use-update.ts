import { useMutation } from "react-query";
import { request } from "../../../../api/api";

interface TermsConditionTypes {
    id: string;
    title: string;
    description: string;
}

const useUpdateTermsCondition = () =>
    useMutation((data: any) =>
        request.private
            .put<TermsConditionTypes>(`terms/terms_conditions/${data.id}/`, data.data)
            .then((res) => res.data)
    );

export default useUpdateTermsCondition;
