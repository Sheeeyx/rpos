import { useMutation } from 'react-query';
import queryClient from '../../../../../../configs/react-query.config';
import {request} from '../../../../../api/api';



const useGoodFor = () =>
  useMutation((data) =>
    request.private.post('food_dining/good_for/', data).then((res) => res.data),
    {
      onMutate: () => {
          const tags = queryClient.getQueryData("good-for");

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          queryClient.setQueryData("good-for", (prev: any) => {
              if (!prev) return tags;
              return {
                  ...prev,
              };
          });
      },
  }
  );

export default useGoodFor;
