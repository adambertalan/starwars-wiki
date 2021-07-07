import { Container, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchCharacter, fetchFilmTitlesOfCharacter, fetchSpeciesNamesOfCharacter } from "../api";
import Loading from "../components/Loading";
import { Character } from "../models/Character.model";

interface ParamTypes {
    characterId: string
}

interface Props {
    updateHeader: (headerTitle: string) => void;
}

const CharacterProfilePage = ({ updateHeader }: Props) => {
    const { characterId } = useParams<ParamTypes>();

    const [character, setCharacter] = useState<Character | null>(null);
    const [filmTitles, setFilmTitles] = useState<string[]>([]);
    const [speciesNames, setSpeciesNames] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const character: Character = await fetchCharacter(characterId);
            const speciesNames: string[] = await fetchSpeciesNamesOfCharacter(character);
            const filmTitles: string[] = await fetchFilmTitlesOfCharacter(character);
            /*
            const character: Character = {
                id: 1,
                name: "Dooku",
                birth_year: "102BBY",
                gender: "male",
                eye_color: "brown",
                hair_color: "white",
                skin_color: "fair",
                height: "193",
                mass: "80",
                films: [],
                homeworld: "",
                species: [],
                vehicles: [],
                starships: [],
                created: "",
                edited: "",
                url: "/people/1",
            };

            const speciesNames = [
                "Human"
            ];

            const filmTitles = [
                "Attack of the Clones",
                "Revenge of the Sith"
            ];
            */

            setCharacter(character);
            setSpeciesNames(speciesNames);
            setFilmTitles(filmTitles);

            updateHeader(`Profile of ${character.name}`);
        };

        fetchData();
    }, [characterId, updateHeader]);

    return (
        <div>
            {character != null ? (
                <Container maxWidth="sm" style={{paddingTop: '1em'}}>
                    <Typography variant="h4" style={{paddingBottom: '1em'}}>
                        Basic information
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>{character.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Birth year</TableCell>
                                    <TableCell>{character.birth_year}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>{character.gender}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Eye color</TableCell>
                                    <TableCell>{character.eye_color}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Hair color</TableCell>
                                    <TableCell>{character.hair_color}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Skin color</TableCell>
                                    <TableCell>{character.skin_color}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Height</TableCell>
                                    <TableCell>{character.height}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Mass</TableCell>
                                    <TableCell>{character.mass}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant="h4" style={{paddingTop: '1em'}}>
                        Appears in movies
                    </Typography>
                    <List dense={true}>
                        {filmTitles.map(title => (
                            <ListItem key={title}>
                                <ListItemText primary={title} />
                            </ListItem>
                        ))}
                    </List>
                    <Typography variant="h4">
                        Species belongs to
                    </Typography>
                    <List dense={true}>
                        {speciesNames.map(speciesName => (
                            <ListItem key={speciesName}>
                                <ListItemText primary={speciesName} />
                            </ListItem>
                        ))}
                    </List>
                </Container>
            ) : (
                <Loading />
            )}
        </div>
    )
}

export default CharacterProfilePage
