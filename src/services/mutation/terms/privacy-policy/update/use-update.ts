import { useMutation } from "react-query";
import { request } from "../../../../api/api";

interface PrivacyTypes {
    id: string;
    title: string;
    description: string;
}

const useUpdatePrivacyPolicy = () =>
    useMutation((data: any) =>
        request.private
            .put<PrivacyTypes>(`terms/privacy_policy/${data.id}/`, data.data)
            .then((res) => res.data)
    );

export default useUpdatePrivacyPolicy;
