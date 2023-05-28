import { Link } from '@mui/material';

interface IElement {
  name: string | ' ';
  args?: [];
  type: IElementOfType;
  ofType?: IElementOfType;
}
interface IElementOfType {
  name: string;
  ofType: IElementOfType;
}

interface IElem {
  name: string | ' ';
  type?: IElemOfType;
  ofType?: IElemOfType;
}

interface IElemOfType {
  name: string;
  ofType: IElemOfType;
}

interface IParamsProps {
  el: IElement;
  addParams: (name: string) => void;
}

export function getElementOfTypeName(elem: IElem): string | ' ' {
  if (!elem?.ofType) {
    return ' ';
  }
  return elem?.ofType?.name || getElementOfTypeName(elem.ofType);
}

export function ElementParams({ el, addParams }: IParamsProps) {
  return (
    <span>
      (
      {el.args?.map((elem: IElement, id: number) => {
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
