/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface IChemaProps {
  schema: any;
}

export function Character({ schema }: IChemaProps) {
  return (
    <div>
      {schema?.data.__schema.types[0].fields.map((el: any, id: any) => (
        <div key={id}>
          <div style={{ color: 'green' }}>
            {el.name} :
            {schema?.data.__schema.types[2].fields.map((el: any, id: any) => (
              <div key={id}>
                <p>{el.name}</p>
              </div>
            ))}
            <span style={{ color: 'black' }}> {el.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
