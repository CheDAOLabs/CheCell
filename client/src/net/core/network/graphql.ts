import { Schema } from '@latticexyz/recs';
import { request} from 'graphql-request';
import gql from 'graphql-tag';


export type Entity = {
    keys: string;
    components: any[]; 
}

export const getEntities = async (url: string, componentName: string, componentSchema: Schema): Promise<Entity[] | undefined> => {
    const fieldKeys = Object.keys(componentSchema);
    const fields = fieldKeys.map((key) => `${key}`);

    const fieldSelections = fields.join('\n');
    // TODO: issue, need to change limit
    const query = `query {
        entities(keys: ["%"]) {
          edges {
            node {
              keys
              components {
                __typename
                ... on ${componentName} {
                  ${fieldSelections}
                  }
              }
            }
          }
        }
    }`;
 
    const GET_ENTITIES_QUERY = gql`
    ${query}
    `;

    try {
        const response: {entities: any[]} = await request(url, GET_ENTITIES_QUERY);
        return response.entities.edges;
      } catch (error) {
        console.error(error);
        return null;
      }
}
