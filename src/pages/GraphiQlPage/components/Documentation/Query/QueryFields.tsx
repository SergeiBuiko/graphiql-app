/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ElementDetails } from '../ElementDetails';
import { Link } from '@mui/material';
import styles from './QueryFields.module.css';

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

  const elem = schema?.data.__schema.types.find(
    (el: any) => el.name === schemaArray[schemaArray.length - 2]?.name
  );

  const elem2 = elem?.fields.find(
    (el: any) => el.name === schemaArray[schemaArray.length - 1]?.name
  );

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
        <Link
          underline="hover"
          href="#"
          onClick={(event) => {
            event.preventDefault();
            setschemaArray([
              { name: schema?.data.__schema.types[0].name, type: TYPE.query },
            ]);
          }}
        >
          Query
        </Link>
      </div>
    );
  }

  if (schemaArray[schemaArray.length - 1]?.type === TYPE.queryType) {
    return (
      <div>
        {!!schemaArray.length && (
          <Link component="button" onClick={onBack}>
            {schemaArray[schemaArray.length - 2]
              ? `< ${schemaArray[schemaArray.length - 2].name}`
              : '< Docs'}
          </Link>
        )}

        {lastElementAtName && (
          <div>
            <p>{lastElementAtName.type.name}</p>
            <p>{lastElementAtName.description}</p>
          </div>
        )}
        {!lastElementAtName && (
          <div>
            <p>
              {elem2?.name} : {elem2?.type.name}
            </p>
            <p>{elem2?.description}</p>
          </div>
        )}
      </div>
    );
  }

  if (schemaArray[schemaArray.length - 1]?.type === TYPE.queryParams) {
    return (
      <div>
        <Link component="button" onClick={onBack}>
          {schemaArray[schemaArray.length - 2]
            ? `< ${schemaArray[schemaArray.length - 2].name}`
            : '< Docs'}
        </Link>
        <p>{lastElementAtType?.name}</p>
        {lastElementAtType?.inputFields?.map((el: any, id: number) => (
          <p key={id}>
            <span>{el.name}</span> :{' '}
            <Link
              underline="hover"
              href="#"
              onClick={(event) => {
                event.preventDefault();
                addType(el.type?.name);
              }}
            >
              {el.type?.name}
            </Link>
          </p>
        ))}
        <p>{lastElementAtType?.description}</p>
      </div>
    );
  }

  return (
    <div>
      {schemaArray[schemaArray.length - 1]?.type === TYPE.query && (
        <Link component="button" onClick={onBack}>
          {schemaArray[schemaArray.length - 2]
            ? `< ${schemaArray[schemaArray.length - 2].name}`
            : '< Docs'}
        </Link>
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
