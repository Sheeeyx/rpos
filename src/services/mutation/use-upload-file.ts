import { useState } from 'react';
import { useMutation } from 'react-query';
import {request} from '../api/api';

export const useUploadFile = () => {
  const [progress, setProgress] = useState(0);

  const uploadMutationObject = useMutation((data: FormData) =>
    request.private
      .post<{
        id: number;
        file: string;
        format: string;
        name: string;
      }>('/file/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (event) =>
          setProgress(Math.floor((event.loaded * 100) / event.total)),
      })
      .then((res) => res.data)
  );

  return { ...uploadMutationObject, progress };
};
