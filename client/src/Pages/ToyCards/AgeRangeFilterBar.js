function AgeRangeFilterBar( { selectedAgeRanges, setSelectedAgeRanges }) {

    function handleButtonClick(e, newSelectedAgeRange) {
        if (selectedAgeRanges.includes(newSelectedAgeRange)) {
            const updatedAgeRanges = selectedAgeRanges.filter(selectedAgeRange => selectedAgeRange !== newSelectedAgeRange)
            setSelectedAgeRanges(updatedAgeRanges);
        } else if (!selectedAgeRanges.includes(newSelectedAgeRange) && newSelectedAgeRange !== "all") {
            const updatedAgeRanges = selectedAgeRanges.filter(selectedAgeRange => selectedAgeRange !== "all");
            setSelectedAgeRanges([...updatedAgeRanges, newSelectedAgeRange]);
        } else if (newSelectedAgeRange === "all") {
            setSelectedAgeRanges([newSelectedAgeRange]);
        }
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

        <div id="ageRangeFilterButtons">

            <button 
            onClick={(e) => handleButtonClick(e, "all")}
            className={selectedAgeRanges.includes("all") ? "active" : "inactive"}
            > 
            All
            </button>

            {ageRangeOptions.map(ageRangeOption => {
                return (
                <button 
                key={ageRangeOption.value} 
                onClick={(e) => handleButtonClick(e, ageRangeOption.value)}
                className={selectedAgeRanges.includes(ageRangeOption.value) ? "active" : "inactive"}
                >
                    {ageRangeOption.value}
                    </button>
                    )
                    })}

        </div>
    )
}

export default AgeRangeFilterBar