/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from '@mui/material';

interface IParamsProps {
  el: any;
  addParams: (name: string) => void;
}

export function ElementParams({ el, addParams }: IParamsProps) {
  return (
    <span>
      (
  {el.args?.map((elem: any, id: number) => {
        const elementName = elem.type?.name || getElementOfTypeName(elem.type);

        return (
          <span key={id}>
            <span style={{ color: 'red' }}>{elem.name}</span>:{' '}
            <Link
              style={{ color: 'orange' }}
              underline="hover"
              href="#"
              onClick={(event) => {
                event.preventDefault();

                addParams(elementName);
              }}
            >
              {elementName}
            </Link>{' '}
          </span>
        );
      })}{' '}
      )
    </span>
  );
}
