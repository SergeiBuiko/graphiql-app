/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

interface IChemaProps {
  schema: any;
  element: string;
  path: any;
}

export function ElementDetails({ schema, element, path }: IChemaProps) {
  const [show, setShow] = useState(true);

  const elem = path.filter((el: any) => el.name === element);

  return (
    <div>
      {elem.map((el: any, id: any) => (
        <div key={id}>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setShow(!show);
            }}
          >
            {el.name}
          </a>
          <p>{el.description}</p>
          {!show && (
            <div>
              <p>{el.name}</p>
              <p>{el.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
