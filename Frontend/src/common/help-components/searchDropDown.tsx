import React from 'react';
import { SetStateAction, useState } from 'react';
import Select from 'react-select';

const SearchDropdown = () => {
    const [searchInput, setSearchInput] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [stations,] = useState([]);


    const handleSearchInputChange = (newValue: SetStateAction<string>) => {
        setSearchInput(newValue);
    };

    const handleOptionChange = (selected: SetStateAction<null>) => {
        setSelectedOption(selected);
    };

    const filteredStations = stations.filter(station =>
        station.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const selectOptions = filteredStations.map(station => ({
        value: station.id,
        label: station.name
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


