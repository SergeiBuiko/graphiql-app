/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

interface IChemaProps {
  schema: any;
}

export function Character({ schema }: IChemaProps) {
  const [queryShow, setQueryShow] = useState(false);

  return (
    <div>
      Character :
      <a
        href="#"
        onClick={(event) => {
          event.preventDefault();
          setQueryShow(!queryShow);
        }}
      >
        Character
      </a>
      {queryShow && (
        <div>
          {schema?.data.__schema.types[2].fields.map((el: any, id: any) => (
            <div key={id}>
              <a href="#">{el.name}</a> :{' '}
              <span>
                <a href="#">{el.type.name}</a>
              </span>
              <p>{el.description}</p>
            </div>
          ))}
        </div>
      )}
      {/* <p>Get a specific character by ID</p> */}
    </div>
  );
}
