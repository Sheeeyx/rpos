import { useMutation } from 'react-query';
import queryClient from '../../../../../../configs/react-query.config';
import {request} from '../../../../../api/api';



const useIthas = () =>
  useMutation((data) =>
    request.private.post('food_dining/it_has/', data).then((res) => res.data),
    {
      onMutate: () => {
          const tags = queryClient.getQueryData("is-has");

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          queryClient.setQueryData("is-has", (prev: any) => {
              if (!prev) return tags;
              return {
                  ...prev,
              };
          });
      },
  }
  );

export default useIthas;
