// Show loading, content or error
// ability to unclick an agerange, and they all get unclicked if all is clicked, and all gets unclicked if they are clicked

import ToyCard from "./ToyCard"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { fetchToys } from "../../Slices/ToySlice"
import NavBar from "../../NavBar"
import AgeRangeFilterBar from "./AgeRangeFilterBar"

function ToyPage() {
    const toys = useSelector(state => state.toys.value)
    const dispatch = useDispatch()

    const [selectedAgeRanges, setSelectedAgeRanges] = useState(["all"])

    useEffect(() => {
        dispatch(fetchToys());
    }, [dispatch]);

    let filteredToys = []

    if (toys) {
        if (selectedAgeRanges == "all") {
            filteredToys = toys
        } else {
            for (const toy of toys) {
                for (const ageRangeObj of toy.age_ranges) {
                    for (const selectedAgeRange of selectedAgeRanges) {
                        if (ageRangeObj.age == selectedAgeRange) {
                            if (!filteredToys.includes(toy)) {
                                filteredToys.push(toy)
                            }
                        }
                    }
                }
            }
        }
    } 

    console.log(filteredToys.length)

    return (
        <>
        <NavBar/>

        <AgeRangeFilterBar 
        selectedAgeRanges={selectedAgeRanges}
        setSelectedAgeRanges={setSelectedAgeRanges} 
        />

        <p>Toys</p>
        {filteredToys.map(toy => <ToyCard key={toy.id} toy={toy}/>)}
        </>
    )
}

export default ToyPage