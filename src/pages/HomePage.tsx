import React from "react";
import { useEffect, useState, MouseEvent } from "react";
import Loading from "../components/Loading";
import { Species } from "../models/Species.model";
import { SpeciesResult } from "../models/SpeciesResult.model";
import { useHistory } from "react-router-dom";
import { fetchSpecies } from "../api";
import {
  Button,
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

interface Props {
  updateHeader: (headerTitle: string) => void;
}

const HomePage = ({ updateHeader }: Props): JSX.Element => {
  const [species, setSpecies] = useState<Species[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string>("");

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      updateHeader("Home Page");

      const speciesResult: SpeciesResult = await fetchSpecies();

      setSpecies(speciesResult.results);
      setNextPageUrl(speciesResult.next ?? "");
    };

    fetchData();
  }, [updateHeader]);

  const loadMoreSpecies = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const speciesResult: SpeciesResult = await fetchSpecies(nextPageUrl);

    setSpecies([...species, ...speciesResult.results]);
    setNextPageUrl(speciesResult.next ?? "");
  };

  return (
    <Container maxWidth="sm" className="page-container">
      <Card>
        <CardContent>
          <List>
            {species.length > 0 ? (
              species.map((s) => (
                <ListItem
                  key={s.id}
                  component="button"
                  button
                  onClick={() => history.push(`/species/${s.id}`)}
                >
                  <ListItemText primary={s.name} />
                </ListItem>
              ))
            ) : (
              <Loading />
            )}
          </List>
          {nextPageUrl && (
            <Button color="primary" onClick={loadMoreSpecies}>
              Load more species
            </Button>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default HomePage;
