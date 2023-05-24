/* eslint-disable @typescript-eslint/no-explicit-any */

import { ElementParams } from '../ElementParams';

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
      <a
        href="#"
        onClick={(event) => {
          event.preventDefault();
          addName(el.name);
        }}
      >
        {el.name}
      </a>{' '}
      <ElementParams addParams={addParams} el={el} /> :
      <span>
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            addType(el.type.name ? el.type.name : el.type.ofType.name);
          }}
        >
          {el.type.name ? el.type.name : el.type.ofType.name}
        </a>
      </span>
      <p>{el.description}</p>
    </div>
  );
}
