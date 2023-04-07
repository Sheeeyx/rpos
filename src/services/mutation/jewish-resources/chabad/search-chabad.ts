import { useMutation } from 'react-query';
import { request } from '../../../api/api';


const useSearchChabad = () =>
  useMutation((text) =>
    request.private.get(`chabad/?search=${text}`,).then((res) => res.data)
  );

export default useSearchChabad;
