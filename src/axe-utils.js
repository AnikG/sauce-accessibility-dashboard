function incrementKeyCount(map, key) {
    if (map.has(key)) {
        map.set(key, (map.get(key) + 1));
    } else {
        map.set(key, 1);
    }
};

export function summarizeAxeResults(axeResultArray) {
    let impactTable = new Map();
    let typeTable = new Map();
    let nodeCount = 0;

    // For display, the insertion order must be as follows:
    impactTable.set('critical', 0);
    impactTable.set('serious', 0);
    impactTable.set('moderate', 0);
    impactTable.set('minor', 0);
    
    for (const test of axeResultArray) {
        for (const n of test.nodes) {
            incrementKeyCount(impactTable, test.impact);
            incrementKeyCount(typeTable, test.help);    
            nodeCount++;
        }
    }
    return {nodeCount, impactTable, typeTable};
}
