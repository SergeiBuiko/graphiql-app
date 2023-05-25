/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ElementDetails } from '../ElementDetails';

enum TYPE {
  query = 'query',
  queryType = 'queryType',
  queryParams = 'queryParams',
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
  console.log(schemaArray);

  const lastElementAtType = schema?.data.__schema.types.find(
    (el: any) => el.name === schemaArray[schemaArray.length - 1]?.name
  );
  console.log('Тип : ' + lastElementAtType);

  const lastElementAtName = schema.data.__schema.types[0].fields.find(
    (el: any) => el.name === schemaArray[schemaArray.length - 1]?.name
  );
  console.log(lastElementAtName);
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
  };

  const addParams = (name: string) => {
    setschemaArray((prevState) => [
      ...prevState,
      { name: name, type: TYPE.queryParams },
    ]);
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
            setschemaArray([
              { name: schema?.data.__schema.types[0].name, type: TYPE.query },
            ]);
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

  if (schemaArray[schemaArray.length - 1]?.type === TYPE.queryParams) {
    return (
      <div>
        <button onClick={onBack}>
          {schemaArray[schemaArray.length - 1].name}
        </button>
        <p>{lastElementAtType?.name}</p>
        {lastElementAtType?.inputFields?.map((el: any, id: number) => (
          <p key={id}>
            <span>{el.name}</span> :{' '}
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                addType(el.type?.name);
              }}
            >
              {el.type?.name}
            </a>
          </p>
        ))}
        <p>{lastElementAtType?.description}</p>
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
      <div>
        <p>{lastElementAtType.name}</p>
        <p>{lastElementAtType.description}</p>
      </div>
      {lastElementAtType?.fields?.map((el: any, id: number) => (
        <div key={id}>
          <ElementDetails
            el={el}
            addType={addType}
            addName={addName}
            addParams={addParams}
          />
        </div>
      ))}
    </div>
  );
}
