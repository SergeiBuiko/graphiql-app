/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { QueryFields } from './Query';
import { Button } from '@mui/material';
import styles from './Documentation.module.css';

export function Documentation() {
  const [schema, setSchema] = useState<any>();
  const [isShown, setIsShown] = useState(false);

  const toggleFIeldset = () => setIsShown(!isShown);
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
      .then((data) => setSchema(data));
  };

  console.log(schema);

  useEffect(() => {
    showGraphQLData();
  }, []);

  return (
    <div className={styles.docContainer}>
      <div className={styles.sidebar}>
        <Button
          onClick={toggleFIeldset}
          variant="outlined"
          className={styles.sidebarBtn}
        >
          Docs
        </Button>
      </div>
      <div className={styles.docContent}>
        {isShown && <QueryFields schema={schema} />}
      </div>
    </div>
  );
}
