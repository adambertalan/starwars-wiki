import { useParams } from 'react-router-dom';

interface ParamTypes {
    species: string;
}

const CharactersPage = () => {
    const { species } = useParams<ParamTypes>();

    return (
        <div>
            Characters of species: {species}
        </div>
    )
}

export default CharactersPage
