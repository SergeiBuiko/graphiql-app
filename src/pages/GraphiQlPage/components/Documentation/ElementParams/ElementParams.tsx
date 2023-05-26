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
      {el.args?.map((elem: any, id: number) => (
        <span key={id}>
          <span style={{ color: 'red' }}>{elem.name}</span>:{' '}
          <Link
            style={{ color: 'orange' }}
            underline="hover"
            href="#"
            onClick={(event) => {
              event.preventDefault();
              addParams(
                elem.type?.name
                  ? elem.type?.name
                  : elem.type?.ofType?.name
                  ? elem.type?.ofType?.name
                  : elem.type?.ofType?.ofType?.name
                  ? elem.type?.ofType?.ofType?.name
                  : elem.type?.ofType?.ofType?.ofType?.name
              );
            }}
          >
            {elem.type?.name
              ? elem.type?.name
              : elem.type?.ofType?.name
              ? elem.type?.ofType?.name
              : elem.type?.ofType?.ofType?.name
              ? elem.type?.ofType?.ofType?.name
              : elem.type?.ofType?.ofType?.ofType?.name}
          </Link>{' '}
        </span>
      ))}
      )
    </span>
  );
}
