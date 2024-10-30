import ToyCard from "./ToyCard";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchToys } from "../../Slices/ToySlice";
import AgeRangeFilterBar from "./AgeRangeFilterBar";

function ToyPage() {
    const toys = useSelector(state => state.toys.value);
    const dispatch = useDispatch();

    const [selectedAgeRanges, setSelectedAgeRanges] = useState(["all"]);
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        dispatch(fetchToys());
    }, [dispatch]);

    let filteredToys = toys || [];

    // I don't understand this code - from AI. Work on it. 
    if (!selectedAgeRanges.includes("all")) {
        filteredToys = filteredToys.filter(toy =>
            toy.age_ranges.some(ageRangeObj =>
                selectedAgeRanges.includes(ageRangeObj.age)
            )
        );
    }

    if (filterText) {
        filteredToys = filteredToys.filter(toy => 
            toy.name.toLowerCase().includes(filterText.toLowerCase())
        );
    }

    return (
        <>
            <div className="container text-center">
               <h2 className="title">Toy Recommendations</h2>
               <p>There are so many options, but which toys will your child actually enjoy? View what your friends have tried and tested!</p>
            </div>

            <br/>

            <div className="text-center"> 
                <AgeRangeFilterBar 
                    selectedAgeRanges={selectedAgeRanges}
                    setSelectedAgeRanges={setSelectedAgeRanges} 
                    filterText={filterText}
                    setFilterText={setFilterText}
                />
            </div>

            <br/>

            <div className="container text-center">
                <div className="row justify-content-center">
                    {filteredToys.map(toy => <ToyCard key={toy.id} toy={toy} />)}
                </div>
            </div>
        </>
    );
}

export default ToyPage;
