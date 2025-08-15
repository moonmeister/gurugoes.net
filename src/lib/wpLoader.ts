import type { Loader } from "astro/loaders";
import type { AnyVariables, Client, TypedDocumentNode } from "@urql/core";

export function wpLoader(options: {
	client: Client;
	gql: { query: TypedDocumentNode; variables: AnyVariables };
}): Loader {
	const { client, gql } = options;

	return {
		name: "wp-loader",
		load: async (context) => {
			const result = await client.query(gql.query, gql.variables).toPromise();
			if (result.error) {
				throw new Error(`Error loading data: ${result.error.message}`);
			}
			if (!result.data) {
				throw new Error("No data returned from query");
			}
			return result.data;
		},
	};
}
