import { Client, fetchExchange } from '@urql/core';
import { persistedExchange } from '@urql/exchange-persisted';

const WP_URL = "https://cms.gurugoes.net";

const GRAPHQL_URL = "index.php?graphql";
const graphqlApi = new URL(GRAPHQL_URL, WP_URL).href;

const client = new Client({
	url: graphqlApi,
	exchanges: [
		persistedExchange({
			preferGetForPersistedQueries: true,
		}),
		fetchExchange,
	],
});

export { client as c };
