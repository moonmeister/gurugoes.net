import { gql, Provider as ClientProvider } from "urql";
import { client } from "../../lib/client";
import { CommentList } from "./list";
import CommentForm from "./submit";
import { ProvideAuth } from "../../hooks/use-auth";

export function CommentSection({ data }) {
	const { commentStatus, postId } = data;

	return (
		<section className="bg-green-700 p-8">
			<h1 className="text-lg font-bold py-4">Comments</h1>
			<ClientProvider value={client}>
				<ProvideAuth>
					<CommentList postId={postId} />

					{commentStatus === "closed" ? (
						<div>Comments are disabled for this post</div>
					) : (
						<CommentForm client:only data={data} />
					)}
				</ProvideAuth>
			</ClientProvider>
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
	return { commentStatus: post.commentStatus, postId: post.databaseId };
}
