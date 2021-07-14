import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useLocation: jest.fn(),
}));

describe("<Header />", () => {
  afterEach(cleanup);

  afterAll(() => {
    jest.unmock("react-router-dom");
  });

  it("Should show the header title", () => {
    const headerTitle = "Test title";

    (useLocation as jest.Mock).mockReturnValue({
      pathname: "/",
    });

    render(<Header headerTitle={headerTitle} />);

    expect(screen.getByText(headerTitle)).toBeDefined();
    expect(screen.queryByTestId("btn-home")).toBeNull();
  });

  it("Should show a home button when not on root path", () => {
    const headerTitle = "Some page title";

    (useLocation as jest.Mock).mockReturnValue({
      pathname: "/character/1",
    });

    render(<Header headerTitle={headerTitle} />);

    expect(screen.getByTestId("btn-home")).toBeDefined();
  });
});
