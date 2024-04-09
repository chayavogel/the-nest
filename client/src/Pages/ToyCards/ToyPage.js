// Show loading, content or error
// create filter component to filter toys by age range

import ToyCard from "./ToyCard"
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { fetchToys } from "../../Slices/ToySlice"
import NavBar from "../../NavBar"

function ToyPage() {
    const toys = useSelector(state => state.toys.value)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchToys());
    }, [dispatch]);

    return (
        <>
        <NavBar/>
        <p>Toys</p>
        {toys.map(toy => <ToyCard key={toy.id} toy={toy}/>)}
        </>
    )
}

export default ToyPage