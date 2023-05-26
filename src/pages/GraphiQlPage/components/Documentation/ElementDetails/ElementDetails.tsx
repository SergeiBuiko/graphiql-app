/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from '@mui/material';
import { ElementParams } from '../ElementParams';
import styles from './ElementDetails.module.css';

interface ISchemaProps {
  el?: any;
  addType: (name: string) => void;
  addName: (name: string) => void;
  addParams: (name: string) => void;
}

export function ElementDetails({
  el,
  addType,
  addName,
  addParams,
}: ISchemaProps) {
  return (
    <div>
      <Link
        underline="hover"
        href="#"
        onClick={(event) => {
          event.preventDefault();
          addName(el.name);
        }}
      >
        {el.name}
      </Link>{' '}
      <ElementParams addParams={addParams} el={el} /> :
      <span>
        <Link
          // className={styles.link}
          style={{ color: 'orange' }}
          underline="hover"
          href="#"
          onClick={(event) => {
            event.preventDefault();
            addType(
              el.type.name
                ? el.type.name
                : el.type.ofType.name
                ? el.type.ofType.name
                : el.type.ofType.ofType.name
            );
          }}
        >
          {el.type.name
            ? el.type.name
            : el.type.ofType.name
            ? el.type.ofType.name
            : el.type.ofType.ofType.name}
        </Link>
      </span>
      <p>{el.description}</p>
    </div>
  );
}
