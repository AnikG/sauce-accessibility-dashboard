function incrementKeyCount(map, key, increment) {
    if (increment === undefined) increment = 1;
    if (map.has(key)) {
        map.set(key, (map.get(key) + increment));
    } else {
        map.set(key, increment);
    }
};

function summarizeViolations(axeResultArray) {
    let impacts = new Map();
    let types = new Map();
    let violations = 0;

    for (const test of axeResultArray) {
        for (const n of test.nodes) {
            incrementKeyCount(impacts, test.impact);
            incrementKeyCount(types, test.help);    
            violations++;
        }
    }
    return { violations, impacts, types };
}

function summarizeNonViolations(axeResultArray) {
    let nodeCount = 0;
 
    for (const test of axeResultArray) {
        nodeCount += test.nodes.length;
    }
    return nodeCount;
}

export function summarizeWdioLog(log) {
//function summarizeWdioLog(log) {
    let testCount = 0;
    let violationCount = 0;
    let passCount = 0;
    let incompleteCount = 0;
    const typeTable = new Map();
    const impactTable = new Map();
    // For display, the insertion order must be as follows:
    impactTable.set('critical', 0);
    impactTable.set('serious', 0);
    impactTable.set('moderate', 0);
    impactTable.set('minor', 0);
    
    const axeResultsArray = log.filter((logNode) => {
        return (logNode.result && 
                logNode.result.results && 
                logNode.result.results.testEngine && 
                logNode.result.results.testEngine.name === 'axe-core');
    });

    for (const test of axeResultsArray) {
        testCount++;
        
        const { violations, impacts, types } = summarizeViolations(test.result.results.violations);
        violationCount += violations;
        for (const entry of impactTable) {
            if (impacts.has(entry[0])) {
                impactTable.set(entry[0], entry[1] + impacts.get(entry[0]));
            }
        }

        for (const entry of types) {
            incrementKeyCount(typeTable, entry[0], entry[1]);
        }

        passCount += summarizeNonViolations(test.result.results.passes);
        incompleteCount += summarizeNonViolations(test.result.results.incomplete);
    }

    return { testCount, violationCount, passCount, incompleteCount, impactTable, typeTable};
}

/* TODO: Make real tests 
const wdioLog = require('./wdio_test_log.json');
const { testCount, violationCount, passCount, incompleteCount, impactTable, typeTable} = summarizeWdioLog(wdioLog);
console.log(`${testCount} tests ${violationCount} violations ${passCount} passes ${incompleteCount} incompletes`);
console.table(impactTable);
console.table(typeTable);
*/
