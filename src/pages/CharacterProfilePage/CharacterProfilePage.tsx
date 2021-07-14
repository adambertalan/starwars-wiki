import React from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router";
import Loading from "../../components/Loading/Loading";
import { usePeople } from "./usePeople";

interface ParamTypes {
  characterId: string;
}

interface Props {
  updateHeader: (headerTitle: string) => void;
}

const CharacterProfilePage = ({ updateHeader }: Props): JSX.Element => {
  const { characterId } = useParams<ParamTypes>();

  const { loading, character, filmTitles, speciesNames } = usePeople({
    characterId,
    updateHeader,
  });

  const renderSectionTitle = (title: string, clazz?: string) => (
    <Typography variant="h4" className={clazz ?? ""}>
      {title}
    </Typography>
  );

  return (
    <Container maxWidth="sm" className="page-container">
      {loading && <Loading />}
      {!loading && character != null ? (
        <>
          {renderSectionTitle("Basic information", "pb-1em")}
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
          {renderSectionTitle("Appears in movies", "pt-1em")}
          <List dense>
            {filmTitles.map((title) => (
              <ListItem key={title}>
                <ListItemText primary={title} />
              </ListItem>
            ))}
          </List>
          {renderSectionTitle("Species belongs to")}
          <List dense={true}>
            {speciesNames.map((speciesName) => (
              <ListItem key={speciesName}>
                <ListItemText primary={speciesName} />
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <p>Character not found!</p>
      )}
    </Container>
  );
};

export default CharacterProfilePage;
