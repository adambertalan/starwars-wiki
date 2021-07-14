import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { Character } from "../../models/Character.model";
import SearchDialog from "./SearchDialog";

const mockHistoryPustFn = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPustFn,
  }),
}));

describe("<SearchDialog />", () => {
  afterEach(cleanup);

  afterAll(() => {
    jest.unmock("react-router-dom");
  });

  it("Should show a loading spinner if isLoading prop is true", () => {
    const loadingId = "spinner";

    render(<SearchDialog isLoading items={[]} />);

    expect(screen.getByTestId(loadingId)).toBeDefined();
  });

  it("Should show the passed items' names", () => {
    const items: Character[] = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
    ] as Character[];

    render(<SearchDialog isLoading={false} items={items} />);

    items.forEach((item) => {
      expect(screen.getByText(item.name)).toBeDefined();
    });
  });

  it("Should navigate to character profile page when clicked on a result", () => {
    const items: Character[] = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
    ] as Character[];

    render(<SearchDialog isLoading={false} items={items} />);

    screen.getByText("Item 1").click();

    expect(mockHistoryPustFn.mock.calls.length).toBe(1);
    expect(mockHistoryPustFn.mock.calls[0][0]).toBe("/character/1");
  });
});
