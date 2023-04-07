import { useMutation } from "react-query";
import { request } from "../../../../api/api";

interface ExploreTypes {
    id: string;
    title: string;
    description: string;
}

const useUpdateExplore = () =>
    useMutation((data: any) =>
        request.private
            .put<ExploreTypes>(`explore/exp/${data.id}/`, data.data)
            .then((res) => res.data)
    );

export default useUpdateExplore;
