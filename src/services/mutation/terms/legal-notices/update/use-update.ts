import { useMutation } from "react-query";
import { request } from "../../../../api/api";

interface LegalNoticeTypes {
    id: string;
    title: string;
    description: string;
}

const useUpdateLegalNotice = () =>
    useMutation((data: any) =>
        request.private
            .put<LegalNoticeTypes>(`terms/legal_notices/${data.id}/`, data.data)
            .then((res) => res.data)
    );

export default useUpdateLegalNotice;
