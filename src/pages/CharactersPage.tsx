import React from "react";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Species } from "../models/Species.model";
import { Character } from "../models/Character.model";
import Loading from "../components/Loading";
import { fetchCharactersOfSpecies, fetchSpecificSpecies } from "../api";
import {
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

interface ParamTypes {
  speciesId: string;
}

interface Props {
  updateHeader: (headerTitle: string) => void;
}

const CharactersPage = ({ updateHeader }: Props): JSX.Element => {
  const { speciesId } = useParams<ParamTypes>();
  const [characters, setCharacters] = useState<Character[]>([]);

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const species: Species = await fetchSpecificSpecies(speciesId);
      const charactersOfSpecies: Character[] = await fetchCharactersOfSpecies(
        species
      );

      setCharacters(charactersOfSpecies);

      updateHeader(`Characters of species: ${species.name}`);
    };

    fetchData();
  }, [speciesId, updateHeader]);

  return (
    <Container maxWidth="sm" className="page-container">
      <Card>
        <CardContent>
          <List>
            {characters.length > 0 ? (
              characters.map((c) => (
                <ListItem
                  key={c.id}
                  component="button"
                  button
                  onClick={() => history.push(`/character/${c.id}`)}
                >
                  <ListItemText primary={c.name} />
                </ListItem>
              ))
            ) : (
              <Loading />
            )}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CharactersPage;
