import { Client, fetchExchange } from "@urql/core";
export { gql } from "@urql/core";
import { persistedExchange } from "@urql/exchange-persisted";
import { WP_URL } from "astro:env/client";

const GRAPHQL_URL = "index.php?graphql";
const graphqlApi = new URL(GRAPHQL_URL, WP_URL).href;

export const client = new Client({
	url: graphqlApi,
	exchanges: [
		persistedExchange({
			preferGetForPersistedQueries: true,
		}),
		fetchExchange,
	],
});

export const fetchAllPaginated = async (query, getData, getPageInfo) => {
	const allData = [];
	let hasNextPage = true;
	let after = null;

	while (hasNextPage) {
		const { data, error } = await client.query(query, { after });

		if (error) {
			console.error("Error fetching paginated data:", error);
			break;
		}

		allData.push(...getData(data));
		after = getPageInfo(data).endCursor;
		hasNextPage = getPageInfo(data).hasNextPage;
	}

	return allData;
};
