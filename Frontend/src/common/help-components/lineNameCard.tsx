

// type LineNamesCardProps = {
//     departures: { line_name: string }[];
//     selectedLines: string[];
//     toggleLineSelection: (lineName: string) => void;
// };

import { fetchDepartures, fetchLines } from "../../api/api-requests/kolombus";

// const LineNamesCard: React.FC<LineNamesCardProps> = ({ departures, selectedLines, toggleLineSelection }) => {
//     const lineNames = [
//         ...new Set(departures.map((departure) => departure.line_name)),
//     ];

//     return (
//         <div className="card">
//             <h4 className="cardHeader">Ruter som skal vises</h4>
//             <p className="lineNames">
//                 {lineNames.map((lineName) => (
//                     <button
//                         key={lineName}
//                         className={`lineNameItem ${selectedLines.includes(lineName) ? 'selected' : ''}`}
//                         onClick={() => toggleLineSelection(lineName)}
//                     >
//                         {lineName}
//                     </button>
//                 ))}
//             </p>
//         </div>
//     );
// };

// export default LineNamesCard;




export async function fetchLinesData(id: string | null) {
    try {
        const linesData = await fetchLines(id);
        return linesData;
    } catch (error) {
        console.error("Error fetching lines data:", error);
        return [];
    }
}

export async function fetchDeparturesData(id: any) {
    try {
        const departuresData = await fetchDepartures(id);
        return departuresData;
    } catch (error) {
        console.error("Error fetching departures data:", error);
        return [];
    }
}

