import styled from "styled-components";
import { InputBase, Popper } from "@material-ui/core";

export const GlobalSearchInput = styled(InputBase)`
    color: white;
`

export const GlobalSearchResultPopup = styled(Popper)`
    z-index: 10001;
`