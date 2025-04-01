import { gql } from "@urql/core";
import { client } from "./client.js";

export async function listCommentsByPostId(postId) {
	return client.query(
		gql`
			query postComments($postId: ID!) {
				post(id: $postId, idType: DATABASE_ID) {
					comments {
						nodes {
							content
							databaseId
							parentDatabaseId
							author {
								node {
									name
								}
							}
							dateGmt
						}
					}
				}
			}
		`,
		{ postId },
	);
}

export async function createComment(data) {
	return client.mutation(
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
