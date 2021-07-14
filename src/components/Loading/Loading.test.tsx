import React from 'react';
import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("<Loading />", () => {
  it("Should show a spinner", () => {
    const spinnerId = "spinner";

    render(<Loading />);

    expect(screen.getByTestId(spinnerId)).toBeDefined();
  });
});
