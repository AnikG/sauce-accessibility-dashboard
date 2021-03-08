import './App.css';
//import './get-axe-data.ignore';

function BigNumCard(props) {
  return (
    <div className="card">
      <div className="card-title">{props.title}</div>
      <div className="card-bigvalue">{props.value}</div>
      <div className="card-explanation">{props.explanation}</div>
    </div>
  );
}

function TableDataRow(props) {
  return (
    <tr>
      <th scope="row">{props.name}</th>
      <td>{props.value}</td>
    </tr>
  );
}

function TableBodyRows(props) {
  //TODO: props.tableValues is expected to be a Map() - how to test for it?
  const dataRows = [];
  for (const entry of props.tableValues) {
    dataRows.push(<TableDataRow key={entry[0]} name={entry[0]} value={entry[1]} />);
  }
  return (dataRows);
}

function TableCard(props) {
  return (
    <div className="card">
      <div className="card-title">{props.title}</div>
      <table className="axe-table">
                <thead>
                    <th scope="col">Severity</th>
                    <th scope="col">Count</th>
                </thead>
                <tbody>
                  <TableBodyRows tableValues={props.tableValues} />
                </tbody>
            </table>
      <div className="card-explanation">{props.explanation}</div>
    </div>
  );
}

function App() {
  const impactTable = new Map();
  impactTable.set('Critical', 4);
  impactTable.set('Serious', 6);
  impactTable.set('Moderate', 12);
  impactTable.set('Minor', 1);

  return (
    <div>
      <nav>
        <h1 style={{textAlign: "center"}}>Fixture for Accessibiltiy dashboard for Sauce Labs</h1>
        <br /><br />
      </nav>
      <div className="dashboard" role="main" style={{border: '2px solid red'}}>
        <BigNumCard title='Total Issues' value='123' explanation='This is the number of accessibility issues detected by axe for the entire test, including the results of multiple pages or page-states.' />
        <BigNumCard title='Pass Ratio' value='79%' explanation='Number of issues found compared to the total number of checks performed. #fail / (#pass + #fail).' />
        <TableCard title='Issues by Severity' tableValues={impactTable} explanation='Critical issues represent the worst experience for people with certain disabilities.' />
      </div>
    </div>
  );
}

export default App;
