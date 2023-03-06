import { gql, GraphQLClient } from 'graphql-request';

const takeshapeAdminUrl = 'https://api.takeshape.io/admin/graphql';

export const getBranchQuery = gql`
  query GetSchemaBranchQuery($environment: TSSchemaBranchEnvironment!, $branchName: String, $projectId: String!) {
    result: tsGetSchemaBranch(projectId: $projectId, environment: $environment, branchName: $branchName) {
      branchName
      graphqlUrl
    }
  }
`;

export const tagBranchMutation = gql`
  mutation ($input: TSCreateSchemaBranchTagInput!) {
    result: tsCreateSchemaBranchTag(input: $input) {
      branchVersion {
        branchName
        graphqlUrl
      }
    }
  }
`;

export const createBranchMutation = gql`
  mutation CreateBranchMutation($input: TSCreateSchemaBranchInput!) {
    result: tsCreateSchemaBranch(input: $input) {
      branch {
        branchName
        graphqlUrl
      }
    }
  }
`;

export function getClient({ apiKey }) {
  const client = new GraphQLClient(takeshapeAdminUrl, { headers: { Authorization: `Bearer ${apiKey}` } });

  return {
    async getBranch(variables) {
      const { result } = await client.request(getBranchQuery, variables);
      return result;
    },
    async tagBranch(variables) {
      const { result } = await client.request(tagBranchMutation, variables);
      return result;
    },
    async createBranch(variables) {
      const { result } = await client.request(createBranchMutation, variables);
      return result;
    }
  };
}
