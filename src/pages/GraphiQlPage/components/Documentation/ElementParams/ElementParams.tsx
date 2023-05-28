import { Link } from '@mui/material';
import { Field, Type2, Type3 } from '../const/types';

interface IParamsProps {
  el: Field;
  addParams: (name: string) => void;
}

export function getElementOfTypeName(elem: Type3 | Type2): string | ' ' {
  if (!elem?.ofType) {
    return ' ';
  }
  return elem?.ofType?.name || getElementOfTypeName(elem.ofType);
}

export function ElementParams({ el, addParams }: IParamsProps) {
  return (
    <span>
      (
      {el.args?.map((elem, id: number) => {
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
