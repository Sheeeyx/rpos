import { useMutation } from 'react-query';
import { request } from '../../api/api';

const useChangeUserPassword = () =>
  useMutation((data) =>
    request.private.post('user/password/', data).then((res) => res.data)
  );

export default useChangeUserPassword;
