import { GraphQLClient } from 'graphql-request'
export { gql } from 'graphql-request'

const client = new GraphQLClient('https://cms.gurugoes.net/graphql')

export async function request(resolver, ...args) {

  const data = await client.request(...args)

  return resolver(data)


}