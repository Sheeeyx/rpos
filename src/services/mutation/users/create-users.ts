import { useMutation } from 'react-query';
import { request } from '../../api/api';

const useCreateUser = () =>
  useMutation((data) =>
    request.private.post('user/register/', data).then((res) => res.data)
  );

export default useCreateUser;
