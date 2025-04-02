import { useQuery, gql, useMutation } from "urql";

export async function createComment(data) {
	return useMutation(
		gql`
			mutation postComment(
				$name: String!
				$email: String!
				$comment: String!
				$commentOn: Int!
			) {
				createComment(
					input: {
						author: $name
						authorEmail: $email
						content: $comment
						commentOn: $commentOn
					}
				) {
					success
					comment {
						approved
					}
				}
			}
		`,
		data,
	);
}
