import React from 'react';

function AgeRangeFilterBar({ 
    selectedAgeRanges, 
    setSelectedAgeRanges,
    setFilterText 
}) {
    
    function handleButtonClick(newSelectedAgeRange) {
        setSelectedAgeRanges(prevSelectedAgeRanges => {
            const updatedAgeRanges = (() => {
                if (newSelectedAgeRange === "all") {
                    return ["all"];
                } else if (prevSelectedAgeRanges.includes(newSelectedAgeRange) && prevSelectedAgeRanges.length === 1) {
                    return ["all"];
                } else if (prevSelectedAgeRanges.includes(newSelectedAgeRange)) {
                    return prevSelectedAgeRanges.filter(
                        selectedAgeRange => selectedAgeRange !== newSelectedAgeRange
                    );
                } else if (prevSelectedAgeRanges.includes("all")) {
                    return [newSelectedAgeRange];
                } else {
                    return [...prevSelectedAgeRanges, newSelectedAgeRange];
                }
            })();
            return updatedAgeRanges;
        });
    }

    function handleSearchChange({ target: { value } }) {
        setFilterText(value);
    }

    const ageRangeOptions = [
        { value: "0-3 months" },
        { value: "3-6 months" },
        { value: "6-9 months" },
        { value: "9-12 months" },
        { value: "12-18 months" },
        { value: "18-24 months" },
        { value: "2-3 years" },
        { value: "4-5 years" },
        { value: "6-8 years" },
        { value: "9-12 years" }
    ];

    return (
        <>
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search..."
                    onChange={handleSearchChange} 
                />
            </div>

            <div id="ageRangeFilterButtons" className="btn-group">
                <button 
                    onClick={() => handleButtonClick("all")}
                    className={`btn btn-light ${selectedAgeRanges.includes("all") ? 'active' : 'inactive'}`}
                > 
                    All
                </button>

                {ageRangeOptions.map(ageRangeOption => (
                    <button
                        key={ageRangeOption.value}
                        className={`btn btn-light ${selectedAgeRanges.includes(ageRangeOption.value) ? 'active' : 'inactive'}`}
                        onClick={() => handleButtonClick(ageRangeOption.value)}
                    >
                        {ageRangeOption.value}
                    </button>
                ))}
            </div>
        </>
    );
}

export default AgeRangeFilterBar;