function AgeRangeFilterBar( { selectedAgeRanges, setSelectedAgeRanges }) {

    function handleButtonClick(e, newSelectedAgeRange) {
        if (newSelectedAgeRange === "all") {
            setSelectedAgeRanges([newSelectedAgeRange])
        } else if (selectedAgeRanges.includes(newSelectedAgeRange) && selectedAgeRanges.length === 1) {
            setSelectedAgeRanges(["all"])
        } else if (selectedAgeRanges.includes(newSelectedAgeRange)) {
            const updatedAgeRanges = selectedAgeRanges.filter(
                selectedAgeRange => selectedAgeRange !== newSelectedAgeRange
              );
              setSelectedAgeRanges(updatedAgeRanges);
        } else if (selectedAgeRanges.includes("all")) {
            setSelectedAgeRanges([newSelectedAgeRange]);
        } else {
            setSelectedAgeRanges([...selectedAgeRanges, newSelectedAgeRange])
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

        <div id="ageRangeFilterButtons" className="btn-group">

            <button 
            onClick={(e) => handleButtonClick(e, "all")}
            className={`btn btn-light ${selectedAgeRanges.includes("all") ? 'active' : 'inactive'}`}
            > 
            All
            </button>

            {ageRangeOptions.map(ageRangeOption => (
                <button
                    key={ageRangeOption.value}
                    className={`btn btn-light ${selectedAgeRanges.includes(ageRangeOption.value) ? 'active' : 'inactive'}`}
                    onClick={(e) => handleButtonClick(e, ageRangeOption.value)}
                    aria-current="page"
                >
                    {ageRangeOption.value}
                </button>
            ))}


        </div>
    )
}

export default AgeRangeFilterBar