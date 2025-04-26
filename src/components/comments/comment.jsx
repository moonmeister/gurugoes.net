import { formatDate } from "@/lib/strings";

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
			className={`p-4 list-none bg-gray-100 even:bg-gray-300 rounded-xs ml-${
				depth * 4
			}`}
		>
			<div className="flex space-x-3">
				<div className="flex-1 space-y-1">
					<div className="flex items-center justify-between">
						<h3 className="text-sm font-medium">{name}</h3>
						<p className="text-xs text-gray-600">{formatDate(dateGmt)}</p>
					</div>
					<div
						className="text-sm prose-green"
						dangerouslySetInnerHTML={{ __html: content }}
					/>
					{MAX_DEPTH > depth ? (
						<div className="text-sm text-gray-700">
							<button type="button" className="hover:underline">
								reply
							</button>
						</div>
					) : null}
				</div>
			</div>
		</li>
	);
}
