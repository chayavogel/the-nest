import ToyCard from "./ToyCard";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchToys } from "../../Slices/ToySlice";
import AgeRangeFilterBar from "./AgeRangeFilterBar";

function ToyPage() {
    const toys = useSelector(state => state.toys.value);
    const dispatch = useDispatch();

    const [selectedAgeRanges, setSelectedAgeRanges] = useState(["all"]);

    useEffect(() => {
        dispatch(fetchToys());
    }, [dispatch]);

    let filteredToys = [];

    if (toys) {
        if (selectedAgeRanges == "all") {
            filteredToys = toys;
        } else {
            for (const toy of toys) {
                for (const ageRangeObj of toy.age_ranges) {
                    for (const selectedAgeRange of selectedAgeRanges) {
                        if (ageRangeObj.age == selectedAgeRange) {
                            if (!filteredToys.includes(toy)) {
                                filteredToys.push(toy);
                            }
                        }
                    }
                }
            }
        }
    } 

    return (
        <>
            <div className="container text-center">
               <h3>Toy Recommendations</h3>
               <p>There are so many options, but which toys will your child actually enjoy and are right for their age and stage? View what your friends recommend!</p>
            </div>

            <br/>

            <div className="text-center"> 
                <AgeRangeFilterBar 
                    selectedAgeRanges={selectedAgeRanges}
                    setSelectedAgeRanges={setSelectedAgeRanges} 
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
