/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

interface IChemaProps {
  schema: any;
}

export function Character({ schema }: IChemaProps) {
  const [array, setArray] = useState<string[]>([]);

  const pushData = (newArray: string[]) => {
    return newArray;
  };
  return (
    <div>
      {schema?.data.__schema.types[0].fields.map((el: any, id: any) => (
        <div key={id}>
          <div
            style={{ color: 'green' }}
            onClick={(event) => {
              event.preventDefault();
              setArray(
                pushData(
                  schema?.data.__schema.types[2].fields.map(
                    (el: any, id: any) => (
                      <div key={id}>
                        <a href="#">{el.name}</a>
                      </div>
                    )
                  )
                )
              );
            }}
          >
            <a href="#">{el.name}</a> :
            <span style={{ color: 'red' }}> {array}</span>
            <span style={{ color: 'black' }}> {el.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
