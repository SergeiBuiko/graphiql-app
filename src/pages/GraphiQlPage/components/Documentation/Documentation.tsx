/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export function Documentation() {
  const [schema, setSchema] = useState<any>();

  const showGraphQLData = () => {
    const query = `#graphql
      query IntrospectionQuery {
        __schema {
          queryType {
            name
          }
          mutationType {
            name
          }
          subscriptionType {
            name
          }
          types {
            ...FullType
          }
          directives {
            name
            description

            locations
            args {
              ...InputValue
            }
          }
        }
      }

      fragment FullType on __Type {
        kind
        name
        description

        fields(includeDeprecated: true) {
          name
          description
          args {
            ...InputValue
          }
          type {
            ...TypeRef
          }
          isDeprecated
          deprecationReason
        }
        inputFields {
          ...InputValue
        }
        interfaces {
          ...TypeRef
        }
        enumValues(includeDeprecated: true) {
          name
          description
          isDeprecated
          deprecationReason
        }
        possibleTypes {
          ...TypeRef
        }
      }

      fragment InputValue on __InputValue {
        name
        description
        type {
          ...TypeRef
        }
        defaultValue
      }

      fragment TypeRef on __Type {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                    ofType {
                      kind
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    fetch('https://rickandmortyapi.graphcdn.app/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then((response) => {
        return response.json();
      })
      // .then((data) => console.log(data.data.__schema.queryType))
      .then((data) => setSchema(data));
  };

  console.log(schema);

  return (
    <div>
      <button onClick={showGraphQLData}>Show Schema</button>
      {schema?.data.__schema.directives.map((el: any, id: any) => (
        <div>
          <ul key={id}>
            <li>
              <a href="" style={{ color: 'red' }}>
                {el.name}
              </a>
            </li>
            <li>
              <a href="" style={{ color: 'green' }}>
                {el.description}
              </a>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}
