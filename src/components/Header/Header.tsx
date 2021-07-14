import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import GlobalSearch from "../GlobalSearch/GlobalSearch";
import { ClickableArrowBack, FlexCenter, FlexSpaceBetween } from "./styles";

interface Props {
  headerTitle: string;
}

const Header = ({ headerTitle }: Props): JSX.Element => {
  const location = useLocation();
  const history = useHistory();

  return (
    <AppBar position="sticky">
      <Toolbar>
        {location.pathname !== "/" && (
          <ClickableArrowBack data-testid="btn-home" onClick={() => history.push("/")}>
            Home
          </ClickableArrowBack>
        )}
        <FlexSpaceBetween>
          <Typography variant="h6" noWrap className="pl-1em">
            {headerTitle}
          </Typography>
          <FlexCenter>
            <SearchIcon />
            <GlobalSearch />
          </FlexCenter>
        </FlexSpaceBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
