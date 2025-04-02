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
