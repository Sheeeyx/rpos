import { useMutation } from "react-query";
import queryClient from "../../configs/react-query.config";
import { request } from "../api/api";

interface FaqTypes {
    id: any;
}

const useDeleteTravaling = () =>
    useMutation(
        (id: number) =>
            request.private
                .delete<FaqTypes>(`advert/travelling/${id}/`)
                .then((res) => res.data),
        {
            onMutate: () => {
                const tags = queryClient.getQueryData("travelling-deals");

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                queryClient.setQueryData("travelling-deals", (prev: any) => {
                    if (!prev) return tags;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useDeleteTravaling;
