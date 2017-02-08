import Table from 'cli-table';
import colors from 'colors/safe';

export default function FormatResults(results) {
    const table = new Table({
        head: ['File', 'Method', 'Resolution (WxH)', 'Device', 'Color Space', 'Color Profile', 'Time']
    });

    // width: value.size.width,
    //     height: value.size.height,
    //     colorProfile: 'Unknown',
    //     colorSpaceName: value.Colorspace,
    //     device: `${value.Properties['exif:Make']} ${value.Properties['exif:Model']}`

    const formatResultRow = (result, library) => [
        result.fileName,
        library.libraryName,
        `${library.width} x ${library.height}`,
        library.device,
        colors.red(library.colorSpaceName),
        library.colorProfile === 'No Profile' ? colors.red(library.colorProfile) : library.colorProfile,
        `${(library.count[0] * 1e9) + library.count[1]} (${library.count[0]}s ${library.count[1] / 1000000}ms)`
    ];

    results.forEach(result => {
        result.results.forEach(libraryResult => {
            table.push(formatResultRow(result, libraryResult));
        });
    });

    return table;
}
