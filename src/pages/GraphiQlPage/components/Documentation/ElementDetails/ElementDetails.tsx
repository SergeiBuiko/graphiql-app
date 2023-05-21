/* eslint-disable @typescript-eslint/no-explicit-any */

interface ISchemaProps {
  el?: any;
  addPath: (name: string) => void;
}

export function ElementDetails({ el, addPath }: ISchemaProps) {
  return (
    <div>
      <a
        href="#"
        onClick={(event) => {
          event.preventDefault();
          addPath(el.type.name);
        }}
      >
        {el.name}
      </a>
      <p>{el.description}</p>
    </div>
  );
}
