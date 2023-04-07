import { useMutation } from 'react-query';
import { request } from '../../api/api';

const useDetailUsers = () =>
useMutation((data) =>
request.private.post('user/get',{id:data}).then((res) => res.data)
  );

export default useDetailUsers;
