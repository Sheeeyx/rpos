import { useMutation } from "react-query";
import queryClient from "../../../../../configs/react-query.config";
import { request } from "../../../../api/api";

interface ExploreTypes {
    id: any;
}

const useDeleteExploreList = (id: string) =>
    useMutation(
        (id: any) =>
            request.private
                .delete<ExploreTypes>(`explore/exp/${id}/`, id)
                .then((res) => res.data),
        {
            onMutate: () => {
                const explore = queryClient.getQueryData("explore");

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                queryClient.setQueryData("exploreList", (prev: any) => {
                    if (!prev) return explore;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useDeleteExploreList;
