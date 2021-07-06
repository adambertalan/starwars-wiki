import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { Species } from '../models/Species.model';
import { SpeciesResult } from '../models/SpeciesResult.model';

const HomePage = () => {
    const [species, setSpecies] = useState<Species[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setSpecies(await fetchSpecies());
        }

        fetchData();
    }, []);

    const fetchSpecies = async (): Promise<Species[]> => {
        const res: Response = await fetch(`https://swapi.dev/api/species`);
        const data: SpeciesResult = await res.json();
        return data.results;
    }

    return (
        <div>
            HomePage
            {species.length > 0 ? species.map(s => (
                <h2 key={s.name}>{s.name}</h2>
            )): <Loading />}
        </div>
    )
}

export default HomePage
