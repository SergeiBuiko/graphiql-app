/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from 'react';
import { ElementDetails } from '../ElementDetails';

interface IChemaProps {
  schema: any;
}

export function QueryFields({ schema }: IChemaProps) {
  // const [array, setArray] = useState<string[]>([]);

  // const pushData = (newArray: string[]) => {
  //   return newArray;
  // };

  const path = schema?.data.__schema.types[0].fields;
  const queryPath = schema?.data.__schema.types[0].fields;

  return (
    <div>
      {path.map((el: any, id: any) => (
        <div key={id}>
          <ElementDetails schema={schema} element={el.name} path={path} />
        </div>
      ))}
      <ElementDetails schema={schema} element="Character" path={queryPath} />
    </div>
  );
}
