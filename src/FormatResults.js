import Table from 'cli-table';

type TestFileResults = {
    graphicsMagic: Object,
    sharp: Object,
    fileName: string,
    fullPath: string
}

export default function FormatResults(results) {
    const table = new Table({
        head: ['File', 'Method', 'Resolution (WxH)', 'Device', 'Color Space', 'Color Profile']
    });

    // width: value.size.width,
    //     height: value.size.height,
    //     colorProfile: 'Unknown',
    //     colorSpaceName: value.Colorspace,
    //     device: `${value.Properties['exif:Make']} ${value.Properties['exif:Model']}`

    const formatResultRow = (result, library) => {
        return [
            result.fileName,
            library.libraryName,
            `${library.width} x ${library.height}`,
            library.device,
            library.colorSpaceName,
            library.colorProfile
        ];
    };

    results.forEach(result => {
        if (result.graphicsMagic) {
            table.push(formatResultRow(result, result.graphicsMagic));
        }

        if (result.sharp) {
            table.push(formatResultRow(result, result.sharp));
        }
    });

    return table;
}
