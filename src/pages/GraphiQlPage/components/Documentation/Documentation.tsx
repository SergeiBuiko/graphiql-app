import { useState, useEffect } from 'react';
import { QueryFields } from './Query';
import { Button } from '@mui/material';
import styles from './Documentation.module.css';
import { query } from './const/const';

export function Documentation() {
  const [schema, setSchema] = useState();
  const [isShown, setIsShown] = useState(false);

  const toggleFIeldset = () => setIsShown(!isShown);
  const showGraphQLData = () => {
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
