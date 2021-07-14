import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { fetchCharacters } from "../../api";
import GlobalSearch from "./GlobalSearch";

jest.mock("../../api", () => ({
    fetchCharacters: jest.fn()
}));

describe("<GlobalSearch />", () => {
    afterEach(cleanup);

    afterAll(() => {
        jest.unmock("../../api");
    })

    it("Should render an input", () => {
        render(<GlobalSearch />);

        expect(screen.getByTestId("global-search-input")).toBeDefined();
        expect(screen.queryByTestId("global-search-result-popup")).toBeNull();
    });

    it("Should call the API upon typing", () => {
        (fetchCharacters as jest.Mock).mockReturnValue(Promise.resolve([]));

        render(<GlobalSearch />);

        const input = screen.getByTestId("global-search-input");

        fireEvent.change(input, { target: { value: 'Luke' } });

        setTimeout(() => {
            expect((fetchCharacters as jest.Mock).mock.calls.length).toBe(1);
        }, 500);
    });

    it("Should show the result popup when input contains value", () => {
        (fetchCharacters as jest.Mock).mockReturnValue(Promise.resolve([]));

        render(<GlobalSearch />);

        const input = screen.getByTestId("global-search-input");

        fireEvent.change(input, { target: { value: 'Luke' } });

        expect(screen.getByTestId("global-search-result-popup")).toBeDefined();
    });
});