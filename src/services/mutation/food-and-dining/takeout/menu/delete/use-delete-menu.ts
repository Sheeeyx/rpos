import { useMutation } from "react-query";
import queryClient from "../../../../../../configs/react-query.config";
import { request } from "../../../../../api/api";

const useTakeOutDeleteMenu = (id:number) =>
    useMutation(
        (id: number) =>
            request.private
                .delete(`/food_dining/take_out/menu/${id}/`)
                .then((res) => res.data),
        {
            onMutate: () => {
         
                const menu = queryClient.getQueryData(`menu-take_out-${id}`);
              
                queryClient.setQueryData(`menu-take_out-${id}`, (prev: any) => {
                    if (!prev) return menu;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useTakeOutDeleteMenu;
