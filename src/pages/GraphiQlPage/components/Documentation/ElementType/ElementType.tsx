/* eslint-disable @typescript-eslint/no-explicit-any */

interface ISchemaProps {
  element: any;
}

export function ElementType({ element }: ISchemaProps) {
  return (
    <div>
      <p>{element.name}</p>
      <p>{element.description}</p>
    </div>
  );
}
