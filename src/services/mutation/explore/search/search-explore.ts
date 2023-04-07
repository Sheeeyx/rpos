import { useMutation } from 'react-query';
import { request } from '../../../api/api';


const useSearchExplore = () =>
  useMutation((text) =>
    request.private.get(`explore/exp/?search=${text}`,).then((res) => res.data)
  );

export default useSearchExplore;
