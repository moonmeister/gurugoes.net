import { useMemo } from "react";
import { Transition } from "@headlessui/react";
import { useQuery, gql } from "urql";

import Comment from "./comment";

const CommentsByPostId = gql`
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
`;

export function CommentList({ postId }) {
	const [results] = useQuery({
		query: CommentsByPostId,
		variables: { postId },
		requestPolicy: "cache-and-network",
	});

	const { data, error, fetching } = results;

	const comments = data?.post?.comments?.nodes || [];

	const depthCalcs = useMemo(() => {
		if (comments.length <= 0) return null;

		const sortedComments = comments.sort(
			({ parentDatabaseId, databaseId }) => databaseId - parentDatabaseId,
		);

		const depthStore = new Map();

		for (const comment of sortedComments) {
			const { databaseId, parentDatabaseId } = comment;

			if (parentDatabaseId === 0) {
				depthStore.set(databaseId, 0);
			} else if (depthStore.has(parentDatabaseId)) {
				depthStore.set(databaseId, depthStore.get(parentDatabaseId) + 1);
			} else {
				console.error("Parent DatabaseId not found :/", comment);
			}
		}
		return depthStore;
	}, [comments]);

	return (
		<>
			{error ? <p>ERROR: {error.message}</p> : null}

			<Transition
				show={!fetching}
				enter="transition-opacity duration-75"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-150"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				{comments.length === 0 ? (
					<p>There are no comments.</p>
				) : (
					<ul className="flex flex-col gap-2">
						{comments.map((comment) => {
							const { databaseId } = comment;
							return (
								<Comment
									key={databaseId}
									comment={comment}
									depth={depthCalcs.get(databaseId)}
								/>
							);
						})}
					</ul>
				)}
			</Transition>
		</>
	);
}
