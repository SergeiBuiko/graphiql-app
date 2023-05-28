import { Link } from '@mui/material';
import { ElementParams } from '../ElementParams';
import styles from './ElementDetails.module.css';
import { getElementOfTypeName } from '../ElementParams/ElementParams';
import { Field } from '../const/types';

// interface Element {
//   name: string;
//   description: string;
//   type: ElementOfType;
// }

// interface ElementOfType {
//   name: string;
//   ofType: ElementOfType;
// }

interface ISchemaProps {
  el: Field;
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
  const elementName = el.type?.name || getElementOfTypeName(el.type);
  return (
    <div className={styles.padding}>
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
          style={{ color: 'orange' }}
          underline="hover"
          href="#"
          onClick={(event) => {
            event.preventDefault();
            addType(elementName);
          }}
        >
          {elementName}
        </Link>
      </span>
      <p>{el.description}</p>
    </div>
  );
}
