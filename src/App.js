import './App.css';
import { summarizeWdioLog } from './axe-utils.js';

// TODO for Sauce Labs - replace the file being imported with a funtion that returns the wdioLog object
import wdioLog from './wdio_test_log.json';

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
  if (!(props.tableValues instanceof Map)) throw new Error('props.tableValues must be a Map.');

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
  const { testCount, violationCount, passCount, incompleteCount, impactTable} = summarizeWdioLog(wdioLog);
  const passRatio = (passCount/(passCount + violationCount + incompleteCount)).toFixed(2);

  return (
    <div>
      <nav>
        <h1 style={{textAlign: "center", color: "orange"}}>Fixture for Accessibiltiy dashboard for Sauce Labs</h1>
        <br /><br />
      </nav>
      <div className="dashboard" role="main" style={{border: '2px dashed orange'}}>
        <BigNumCard title='axe Test Runs' value={testCount} explanation='This is the number of times the test run triggered axe accessibility testing.' /> 
        <BigNumCard title='Total Issues' value={violationCount} explanation='This is the number of accessibility issues detected by axe for the entire test, including the results of multiple pages or page-states.' />
        <BigNumCard title='Pass Ratio' value={passRatio} explanation='Number of issues found compared to the total number of checks performed. #pass / (#pass + #fail).' />
        <TableCard title='Issues by Severity' tableValues={impactTable} explanation='Critical issues represent the worst experience for people with certain disabilities.' />
        {/* TODO: <TableCard title='Issues by Type' tableValues={typeTable} explanation='' />*/}
      </div>
    </div>
  );
}

export default App;
