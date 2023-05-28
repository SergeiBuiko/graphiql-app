/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ElementDetails } from '../ElementDetails';
import { Link } from '@mui/material';
import styles from './QueryFields.module.css';
import { getElementOfTypeName } from '../ElementParams/ElementParams';

enum TYPE {
  query = 'query',
  queryType = 'queryType',
  queryParams = 'queryParams',
}

interface ISchemaProps {
  schema?: any;
}

interface ISchema {
  data: {
    __schema: {
      types: [{ fields: []; name: string }];
      queryType: {
        name: string;
      };
    };
  };
}

interface IArrayProps {
  name?: string;
  type: TYPE;
}

export function QueryFields({ schema }: ISchemaProps) {
  const [schemaArray, setschemaArray] = useState<IArrayProps[]>([]);

  const lastElementAtType: any = schema?.data.__schema?.types.find(
    (el: IObjectName) => el.name === schemaArray[schemaArray.length - 1]?.name
  );

  const lastElementAtName = schema?.data.__schema.types[0].fields.find(
    (el: IObjectName) => el.name === schemaArray[schemaArray.length - 1]?.name
  );

  interface IObjectName {
    name: string;
  }

  interface Element {
    name: string;
    description: string;
    type: ElementOfType;
  }

  interface ElementOfType {
    name: string;
    ofType: ElementOfType;
  }

  const parameterType = schema?.data.__schema.types.find(
    (el: IObjectName) => el.name === schemaArray[schemaArray.length - 2]?.name
  );

  const parameter = parameterType?.fields?.find(
    (el: IObjectName) => el.name === schemaArray[schemaArray.length - 1]?.name
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
            <h2 className={styles.h2}>{lastElementAtName.type.name}</h2>
            <p>{lastElementAtName.description}</p>
            <h5 className={styles.h2}>Type</h5>
            <p>
              {lastElementAtName.type?.name
                ? lastElementAtName.type?.name
                : lastElementAtName.type?.ofType?.name}
            </p>
            <h5 className={styles.h5}>Arguments</h5>
            {lastElementAtName.args?.map((el: Element, id: number) => {
              const elementName =
                el.type?.name || getElementOfTypeName(el.type);
              return (
                <p key={id}>
                  {el.name} : {elementName}
                </p>
              );
            })}
          </div>
        )}
        {!lastElementAtName && (
          <div>
            <h2 className={styles.h2}>{parameter?.name}</h2>
            <p>{parameter?.description}</p>
            <h5 className={styles.h5}>Type</h5>
            <p>{parameter?.type.name}</p>
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
        <h2 className={styles.h2}>{lastElementAtType?.name}</h2>
        {lastElementAtType?.inputFields?.map((el: Element, id: number) => (
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
        <h2 className={styles.h2}>{lastElementAtType.name}</h2>
        <p>{lastElementAtType.description}</p>
      </div>
      {lastElementAtType?.fields?.map((el: Element, id: number) => (
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
