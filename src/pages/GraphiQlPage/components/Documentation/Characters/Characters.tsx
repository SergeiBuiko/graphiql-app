/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Character } from '../Character/Character';

interface IChemaProps {
  schema: any;
}

export function Characters({ schema }: IChemaProps) {
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
        Characters
      </a>
      {queryShow && (
        <div>
          {schema?.data.__schema.types[8].fields.map((el: any, id: any) => (
            <div key={id}>
              <a href="#">{el.name}</a> :{' '}
              <span>
                <a href="#">
                  {el.type.name === null ? (
                    <Character schema={schema} />
                  ) : (
                    el.type.name
                  )}
                  {/* el.type.ofType.name  */}
                </a>
              </span>
              <p>{el.description}</p>
            </div>
          ))}
        </div>
      )}
      <p>Get the list of all characters</p>
    </div>
  );
}
