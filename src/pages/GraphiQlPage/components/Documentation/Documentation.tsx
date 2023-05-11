export function Documentation() {
  const showGraphQLData = () => {
    const query = `
    query {
      character (id: 2) {
       id
       name
       status
      }
    }`;

    fetch('https://rickandmortyapi.graphcdn.app/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log(data));
  };
  return (
    <div>
      <button onClick={showGraphQLData}>Show Shema</button>
    </div>
  );
}
