/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ElementDetails } from '../ElementDetails';

enum TYPE {
  query = 'query',
  queryType = 'queryType',
}

interface ISchemaProps {
  schema?: any;
}

interface IArrayProps {
  name: string;
  type: TYPE;
}

export function QueryFields({ schema }: ISchemaProps) {
  const [schemaArray, setschemaArray] = useState<IArrayProps[]>([]);

  const lastElementAtType = schema?.data.__schema.types.find(
    (el: any) => el.name === schemaArray[schemaArray.length - 1]?.name
  );

  const lastElementAtName = schema.data.__schema.types[0].fields.find(
    (el: any) => el.name === schemaArray[schemaArray.length - 1]?.name
  );

  console.log(
    schema?.data.__schema.types.find(
      (el: any) => el.name === schemaArray[schemaArray.length - 1]?.name
    )
  );

  console.log(lastElementAtType);
  console.log(lastElementAtType?.name);

  // console.log('Массив: ' + schemaArray);

  // console.log('Последний элемент массива по имени: ' + lastElementAtName?.name);

  // console.log('Последний элемент массива по типу: ' + lastElementAtType?.name);

  const addType = (name: string) => {
    setschemaArray((prevState) => [
      ...prevState,
      { name: name, type: TYPE.query },
    ]);
  };

  const addName = (name: string) => {
    setschemaArray((prevState) => [
      ...prevState,
      { name: name, type: TYPE.queryType },
    ]);
    // console.log(name);
  };

  const onBack = () => {
    setschemaArray((prevState) => {
      const newArray = [...prevState];
      newArray.pop();
      return newArray;
    });
  };

  if (!schemaArray.length) {
    return (
      <div>
        <p>A GraphQL schema provides a root type for each kind of operation.</p>
        {`${schema?.data.__schema.queryType.name} : `}
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            setschemaArray([schema?.data.__schema.types[0].name]);
          }}
        >
          Query
        </a>
      </div>
    );
  }

  if (schemaArray[schemaArray.length - 1]?.type === TYPE.queryType) {
    return (
      <div>
        {!!schemaArray.length && (
          <button onClick={onBack}>
            {schemaArray[schemaArray.length - 1].name}
          </button>
        )}
        <div>
          <p>
            {lastElementAtName.type.name || lastElementAtName.type.ofType.name}
          </p>
          <p>{lastElementAtName.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {schemaArray[schemaArray.length - 1]?.type === TYPE.query && (
        <button onClick={onBack}>
          {schemaArray[schemaArray.length - 1].name}
        </button>
      )}

      {lastElementAtType?.fields.map((el: any, id: any) => (
        <div key={id}>
          <ElementDetails el={el} addType={addType} addName={addName} />
        </div>
      ))}
    </div>
  );
}
