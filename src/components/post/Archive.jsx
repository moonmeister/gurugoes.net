import { gql } from "@urql/core";
import { Link } from "../links";
import { Time, ReadingTime } from "../time";

export function ArchiveView({ posts }) {
	return (
		<div className="relative pt-4 m:pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
			<div className="relative max-w-7xl mx-auto">
				<div className="mt-12 mx-auto grid gap-5 max-w-lg md:max-w-xl md:grid-cols-2 lg:grid-cols-3 lg:max-w-none">
					{Array.isArray(posts) &&
						posts?.map((post) => {
							const {
								title,
								excerpt,
								uri,
								dateGmt,
								categories,
								content,
								featuredImage: { node: featuredImage },
							} = post;

							return (
								<div
									key={uri}
									className="flex flex-col rounded-lg shadow-lg overflow-hidden"
								>
									<div className="shrink-0">
										{featuredImage?.sourceUrl ? (
											<img
												className="h-48 w-full object-cover"
												src={featuredImage.sourceUrl}
												srcSet={featuredImage.srcSet}
												loading="lazy"
												alt={featuredImage.altText}
											/>
										) : (
											<div className="h-48 bg-green-600" />
										)}
									</div>
									<div className="flex-1 bg-white p-6 flex flex-col justify-between">
										<div className="flex-1">
											<p className="text-sm font-medium text-indigo-600">
												{categories.nodes?.map(({ name, uri }) => (
													<Link
														key={uri}
														href={uri}
														className="hover:underline"
														override
													>
														{name}
													</Link>
												))}
											</p>
											<Link href={uri} className="block mt-4" override>
												<p className="text-xl font-semibold text-gray-900">
													{title}
												</p>
												<p className="mt-3 text-base text-gray-500">
													<div dangerouslySetInnerHTML={{ __html: excerpt }} />
												</p>
											</Link>
										</div>
										<div className="mt-6 flex items-center">
											<div className="">
												<div className="flex space-x-1 text-sm text-gray-500">
													<Time dateTime={dateGmt} />
													<span aria-hidden="true">&middot;</span>
													<span>
														<ReadingTime content={content} />
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}

export const FRAGMENT = gql`
	fragment PostExcerpt on Post {
		title
		title
		excerpt
		content
		dateGmt
		uri
		featuredImage {
			node {
				altText
				srcSet
				sourceUrl
			}
		}
		categories {
			nodes {
				name
				uri
			}
		}
	}
`;
