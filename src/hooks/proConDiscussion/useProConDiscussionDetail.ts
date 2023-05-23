import useQuery from '../useQuery';
import {
  APIError,
  GetProConDiscussionDetailType,
  ProConDiscussion,
} from '../../types';
import { getProConDiscussionDetail } from '../../apis/proConDiscussion';

interface UseProConDiscussionDetailProps extends GetProConDiscussionDetailType {
  isSuspense?: boolean;
  isErrorBoundary?: boolean;
  delay?: number;
  onSuccess?: (data: ProConDiscussion | null) => void;
  onError?: (error: Error | APIError) => void;
}

function useProConDiscussionDetail({
  id,
  token,
  onSuccess,
  onError,
  delay = 0,
  isSuspense = false,
  isErrorBoundary = false,
}: UseProConDiscussionDetailProps) {
  const { data, isLoading, error, setData, refetch } = useQuery<
    GetProConDiscussionDetailType,
    ProConDiscussion
  >({
    fetchFn: getProConDiscussionDetail,
    arg: { id, token },
    isErrorBoundary,
    isSuspense,
    onSuccess,
    onError,
    delay,
  });

  const handleUpdateIsPro = (isPro: boolean) => {
    setData((prev) => {
      if (prev === undefined) {
        return prev;
      }

      return {
        ...prev,
        isPro,
        isVote: true,
      };
    });
  };

  return { data, isLoading, error, handleUpdateIsPro, refetch };
}

export default useProConDiscussionDetail;
