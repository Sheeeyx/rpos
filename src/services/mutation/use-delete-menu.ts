import { useMutation } from "react-query";
import queryClient from "../../configs/react-query.config";
import { request } from "../api/api";


const useDeleteMenu = (id:number) =>
    useMutation(
        (id: number) =>
            request.private
                .delete(`/food_dining/restaurant/menu/${id}/`)
                .then((res) => res.data),
        {
            onMutate: () => {
         
                const menu = queryClient.getQueryData(`menu-restaurant-${id}`);
              
                queryClient.setQueryData(`menu-restaurant-${id}`, (prev: any) => {
                    if (!prev) return menu;
                    return {
                        ...prev,
                    };
                });
            },
        }
    );

export default useDeleteMenu;
