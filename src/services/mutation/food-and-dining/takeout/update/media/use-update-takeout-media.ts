import { useMutation } from "react-query";
import { request } from "../../../../../api/api";
import queryClient from "../../../../../../configs/react-query.config";


interface DetailTypes {
    id: string;
    title: string;
    description: string;
}

const useUpdateTakeOutMedia = () =>
    useMutation((data: any) =>
        request.private
            .post<DetailTypes>(`food_dining/take_out/update_media/${data.id}/`, data)
            .then((res) => res.data),
            {
                onMutate: ({id}) => {
                    const data = queryClient.getQueryData(`detail-takeout${id}`);
                    console.log(id)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    queryClient.setQueryData(`detail-takeout${id}`, (prev: any) => {
                        if (!prev) return data;
                        return {
                            ...prev,
                        };
                    });
                },
            }
    );

export default useUpdateTakeOutMedia;
