import { Client, fetchExchange } from "urql";
export { gql } from "urql";
import { persistedExchange } from "@urql/exchange-persisted";
import { WP_URL } from "astro:env/server";

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
