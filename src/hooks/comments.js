import { useMutation } from "urql";
import { createComment } from "../lib/wpGraphqlClient";

export function useAddComment() {
	const queryClient = useQueryClient();

	return useMutation(async (data) => createComment(data), {
		onSuccess: ({ createComment }, { commentOn }) => {
			if (createComment.comment) {
				queryClient.invalidateQueries(`comments-${commentOn}`);
			}
		},
	});
}
