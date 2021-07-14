import React from "react";
import { useParams, useHistory } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import {
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useCharacters } from "./useCharacters";

interface ParamTypes {
  speciesId: string;
}

interface Props {
  updateHeader: (headerTitle: string) => void;
}

const CharactersPage = ({ updateHeader }: Props): JSX.Element => {
  const { speciesId } = useParams<ParamTypes>();

  const history = useHistory();
  const { loading, characters } = useCharacters({ speciesId, updateHeader });

  return (
    <Container maxWidth="sm" className="page-container">
      <Card>
        <CardContent>
          <List>
            {loading && <Loading />}
            {!loading && characters.length > 0 ? (
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
              <ListItem>
                <ListItemText primary="No characters found!" />
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CharactersPage;
