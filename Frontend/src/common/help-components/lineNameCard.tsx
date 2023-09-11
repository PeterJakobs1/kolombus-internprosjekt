

const LineNamesCard = ({ departures, selectedLines, toggleLineSelection }) => {
    const lineNames = [
        ...new Set(departures.map((departure) => departure.line_name)),
    ];

    return (
        <div className="card">
            <h4 className="cardHeader">Ruter som skal vises</h4>
            <p className="lineNames">
                {lineNames.map((lineName) => (
                    <button
                        key={lineName}
                        className={`lineNameItem ${selectedLines.includes(lineName) ? 'selected' : ''}`}
                        onClick={() => toggleLineSelection(lineName)}
                    >
                        {lineName}

                    </button>
                ))}
            </p>
        </div>
    );
};

export default LineNamesCard;
