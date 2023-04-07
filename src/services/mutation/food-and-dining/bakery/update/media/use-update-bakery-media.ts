import { useMutation } from "react-query";
import { request } from "../../../../../api/api";
import queryClient from "../../../../../../configs/react-query.config";


interface DetailTypes {
    id: string;
    title: string;
    description: string;
}

const useUpdateBakeryMedia = () =>
    useMutation((data: any) =>
        request.private
            .post<DetailTypes>(`food_dining/bakery/update_photo/${data.id}/`, data)
            .then((res) => res.data),
            {
                onMutate: ({id}) => {
                    const data = queryClient.getQueryData(`details-bakery${id}`);
                    console.log(id)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    queryClient.setQueryData(`details-bakery${id}`, (prev: any) => {
                        if (!prev) return data;
                        return {
                            ...prev,
                        };
                    });
                },
            }
    );

export default useUpdateBakeryMedia;
