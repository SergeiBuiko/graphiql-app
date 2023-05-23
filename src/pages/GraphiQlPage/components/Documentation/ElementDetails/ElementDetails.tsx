/* eslint-disable @typescript-eslint/no-explicit-any */

interface ISchemaProps {
  el?: any;
  addType: (name: string) => void;
  addName: (name: string) => void;
}

export function ElementDetails({ el, addType, addName }: ISchemaProps) {
  return (
    <div>
      <a
        href="#"
        onClick={(event) => {
          event.preventDefault();
          addName(el.name);
        }}
      >
        {el.name}
      </a>{' '}
      :{' '}
      <a
        href="#"
        onClick={(event) => {
          event.preventDefault();
          addType(el.type.name);
        }}
      >
        {el.type.name}
      </a>
      <p>{el.description}</p>
    </div>
  );
}
