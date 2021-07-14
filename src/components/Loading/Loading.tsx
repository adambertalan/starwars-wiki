import React from 'react';
import { CircularProgress } from "@material-ui/core";

const Loading = (): JSX.Element => {
  return (
    <div>
      <CircularProgress data-testid="spinner" />
    </div>
  );
};

export default Loading;
