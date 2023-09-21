import { SetStateAction, useState } from "react";
import Select, { SingleValue } from "react-select";

const SearchDropdown = () => {
    const [searchInput, setSearchInput] = useState("");
    const [selectedOption, setSelectedOption] =
        useState<SingleValue<{ value: any; label: any } | null>>(null);
    const [stations] = useState<any[]>([]);

    const handleSearchInputChange = (newValue: SetStateAction<string>) => {
        setSearchInput(newValue);
    };

    const handleOptionChange = (
        newValue: SingleValue<{ value: any; label: any } | null>
    ) => {
        setSelectedOption(newValue);
    };

    const filteredStations = stations.filter((station: any) =>
        (station.name || "")
            .toLowerCase()
            .includes((searchInput || "").toLowerCase())
    );

    const selectOptions = filteredStations.map((station: any) => ({
        value: station.id || "",
        label: station.name || "",
    }));

    return (
        <p className="searchDropDown">
            <Select
                className="basic-single"
                classNamePrefix="select"
                value={selectedOption}
                onChange={handleOptionChange}
                onInputChange={handleSearchInputChange}
                options={selectOptions}
            />
        </p>
    );
};

export default SearchDropdown;
