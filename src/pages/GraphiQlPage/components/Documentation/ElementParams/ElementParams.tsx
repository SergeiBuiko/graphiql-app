/* eslint-disable @typescript-eslint/no-explicit-any */

interface IParamsProps {
  el: any;
  addParams: (name: string) => void;
}

export function ElementParams({ el, addParams }: IParamsProps) {
  return (
    <span>
      {el.args?.map((elem: any, id: number) => (
        <span key={id}>
          <span>{elem.name}</span> :
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              addParams(
                elem.type?.name
                  ? elem.type?.name
                  : elem.type?.ofType?.name
                  ? elem.type?.ofType?.name
                  : elem.type?.ofType?.ofType?.ofType?.name
              );
            }}
          >
            {elem.type?.name
              ? elem.type?.name
              : elem.type?.ofType?.name
              ? elem.type?.ofType?.name
              : elem.type?.ofType?.ofType?.ofType?.name}
          </a>{' '}
        </span>
      ))}
    </span>
  );
}
