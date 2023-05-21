/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ElementDetails } from '../ElementDetails';

interface ISchemaProps {
  schema?: any;
}
export function QueryFields({ schema }: ISchemaProps) {
  const [pathArray, setPathArray] = useState<string[]>([]);
  // const [pathArray1, setPathArray1] = useState<object[]>([
  //   {
  //     name: '',
  //     type: query | query.type,
  //   },
  // ]);

  console.log('Массив состоит из: ' + pathArray);

  const query = schema?.data.__schema.types.find(
    (el: any) => el.name === pathArray[pathArray.length - 1]
  );

  // console.log(query);

  const addPath = (name: string) => {
    setPathArray((prevState) => [...prevState, name]);
  };

  const onBack = () => {
    setPathArray((prevState) => {
      const newArray = [...prevState];
      newArray.pop();
      // console.log(newArray);

      return newArray;
    });
  };

  if (!pathArray.length) {
    return (
      <div>
        <p>A GraphQL schema provides a root type for each kind of operation.</p>
        {`${schema?.data.__schema.queryType.name} : `}
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            setPathArray([schema?.data.__schema.types[0].name]);
          }}
        >
          Query
        </a>
      </div>
    );
  }

  return (
    <div>
      {!!pathArray.length && (
        <button onClick={onBack}>{pathArray[pathArray.length - 1]}</button>
      )}
      {query.fields?.map((el: any, id: any) => (
        <div key={id}>
          <ElementDetails el={el} addPath={addPath} />
        </div>
      ))}
    </div>
  );
}
