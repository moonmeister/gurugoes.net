import { formatDate } from "../../lib/strings";

const MAX_DEPTH = 0;

export default function Comment({ comment, depth = 0 }) {
	const {
		content,
		author: {
			node: { name },
		},
		dateGmt,
	} = comment;

	return (
		<li
			className={`p-4 list-none bg-gray-100 even:bg-gray-300 rounded-sm ml-${
				depth * 4
			}`}
		>
			<div class="flex space-x-3">
				<div class="flex-1 space-y-1">
					<div class="flex items-center justify-between">
						<h3 class="text-sm font-medium">{name}</h3>
						<p class="text-xs text-gray-600">{formatDate(dateGmt)}</p>
					</div>
					<div
						class="text-sm prose-green"
						dangerouslySetInnerHTML={{ __html: content }}
					/>
					{MAX_DEPTH > depth ? (
						<div class="text-sm text-gray-700">
							<button type="button" class="hover:underline">
								reply
							</button>
						</div>
					) : null}
				</div>
			</div>
		</li>
	);
}
