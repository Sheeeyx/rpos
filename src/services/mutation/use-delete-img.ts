import { useMutation } from "react-query";
import { request } from "../api/api";



const useDeleteImg = () =>
    useMutation(
        (id: number) =>
            request.private
                .delete(`file/${id}/`)
                .then((res) => res.data),
    );

export default useDeleteImg;
