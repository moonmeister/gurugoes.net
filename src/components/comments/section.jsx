import { gql, Provider } from "urql";
import { client } from "../../lib/client";
import Comments from `./list`;
import CommentForm from `./submit`;

export function CommentSection({ data }) {
	const { commentStatus, postId } = data;

	return (
		<section className="bg-green-700 p-8">
			<h1 className="text-lg font-bold py-4">Comments</h1>
			<Provider client:load value={client}>
				<Comments client:load postId={postId} />

				{/* {commentStatus === "closed" ? (
					<div>Comments are disabled for this post</div>
				) : (
					<CommentForm client:load data={data} />
				)} */}

			</Provider>
		</section>
	);
}

CommentSection.fragment = gql`
	fragment CommentSection on Post {
		databaseId
		commentStatus
	}
`;

export function getCommentData(post) {
	return {
		commentStatus: post?.commentStatus,
		postId: post?.databaseId,
	};
}
