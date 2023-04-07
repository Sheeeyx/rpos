import { useMutation } from "react-query";
import { request } from "../../../../api/api";

interface ChabadTypes {
    id: string;
}

const useUpdateChabad = () =>
    useMutation((data: any) =>
        request.private
            .put<ChabadTypes>(`chabad/${data.id}/`, data.data)
            .then((res) => res.data)
    );

export default useUpdateChabad;
