import Table from 'cli-table';

export default function FormatResults(results) {
    const table = new Table({
        head: ['File', 'Resolution', 'Device', 'Color Space', 'Color Profile']
    });

    results.forEach(result => {
        table.push(
            [result.fileName, '', '', '', '']
        );
    });

    return table;
}
