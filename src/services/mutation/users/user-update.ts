import { useMutation } from "react-query";
import { request } from "../../api/api";


const useUpdateUser = () =>
    useMutation((data: any) =>
        request.private
            .post(`user/update/`,data)
            .then((res) => res.data)
    );

export default useUpdateUser;
