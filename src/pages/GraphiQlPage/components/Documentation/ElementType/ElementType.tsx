/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

interface ISchemaProps {
  schema?: any;
  element: string;
  path?: any;
}

export function ElementType({ schema, element }: ISchemaProps) {
  const [show, setShow] = useState(true);

  const queryPath = schema?.data.__schema.types;

  const type = queryPath.filter((el: any) => el.name === element);

  return (
    <div>
      {type.map((el: any, id: any) => (
        <div key={id}>
          {el.fields.map((el: any, id: any) => (
            <div key={id}>
              <a href="#">{el.name}</a> : <a href="#"> {el.type.name}</a>
              <p>{el.description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
