import { gql } from "@urql/core";
import { classNames } from "../../lib/strings";

export function FeaturedImage({ data, className, children }) {
	const featuredImage = data?.node;
	return (
		<>
			{featuredImage.sourceUrl ? (
				<img
					className={classNames("w-full object-cover", className)}
					src={featuredImage.sourceUrl}
					srcSet={featuredImage.srcSet}
					alt={featuredImage.altText}
				>
					{children}
				</img>
			) : (
				<div className={classNames("bg-green-600", className)}>{children}</div>
			)}
		</>
	);
}

FeaturedImage.fragment = gql`
	fragment FeaturedImage on Post {
		featuredImage {
			node {
				altText
				sourceUrl
				srcSet
			}
		}
	}
`;
