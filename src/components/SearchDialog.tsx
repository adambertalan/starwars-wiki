import React from 'react';
import { List, ListItem, ListItemText } from "@material-ui/core";
import { useHistory } from "react-router";
import { Character } from "../models/Character.model";
import Loading from "./Loading";

interface Props {
  items: Character[];
  isLoading: boolean;
}

const SearchDialog = ({ items, isLoading }: Props): JSX.Element => {
  const history = useHistory();

  return isLoading ? (
    <Loading />
  ) : (
    <List>
      {items.map((item) => (
        <ListItem
          key={item.id}
          component="button"
          button
          onClick={() => history.push(`/character/${item.id}`)}
        >
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default SearchDialog;
