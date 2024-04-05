// Show loading, content or error

import ToyCard from "./ToyCard"
import { useEffect} from "react"
import { useSelector, useDispatch } from 'react-redux'
import { fetchToys } from "./ToySlice"
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
        {toys.map(toy => <ToyCard key={toy.id} toy={toy}/>)}
        </>
    )
}

export default ToyPage