import React from "react";
import { useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useSpecies } from "./useSpecies";

interface Props {
  updateHeader: (headerTitle: string) => void;
}

const HomePage = ({ updateHeader }: Props): JSX.Element => {

  const history = useHistory();
  const { loading, species, nextPageUrl, loadMoreSpecies } = useSpecies();

  useEffect(() => {
    updateHeader("Home Page");
  }, [updateHeader]);

  return (
    <Container maxWidth="sm" className="page-container">
      <Card>
        <CardContent>
          <List>
            {loading && <Loading />}
            {!loading && species.length > 0 ? (
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
              <ListItem>
                <ListItemText primary="No species found!" />
              </ListItem>
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
