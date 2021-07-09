import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { ArrowBack } from "@material-ui/icons";
import GlobalSearch from "./GlobalSearch";

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
          <ArrowBack
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/")}
          >
            Home
          </ArrowBack>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <Typography variant="h6" noWrap style={{ paddingLeft: "1em" }}>
            {headerTitle}
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <SearchIcon />
            </div>
            <GlobalSearch />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
