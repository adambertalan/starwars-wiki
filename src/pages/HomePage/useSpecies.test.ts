import { SpeciesResult } from "./../../models/SpeciesResult.model";
import { cleanup } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import { fetchSpecies } from "../../api";
import { useSpecies } from "./useSpecies";

jest.mock("../../api", () => ({
  fetchSpecies: jest.fn(),
}));

describe("useSpecies hook", () => {
  afterEach(cleanup);

  afterAll(() => {
    jest.unmock("../../api");
  });

  xit("Should load the initial species", () => {
    const fetchResult: SpeciesResult = {
      results: [],
      next: "",
      count: 0,
      previous: "",
    };
    (fetchSpecies as jest.Mock).mockReturnValue(Promise.resolve(fetchResult));

    let result: any;
    // Testing a hook which calls an API unconditionally is not trivial
    // Despite the fact that it is wrapped with act block, console error will still present about the missing wrapping
    act(() => {
      result = renderHook(() => useSpecies());
    });

    const { loading, species, nextPageUrl, loadMoreSpecies } = result.current;

    expect((fetchSpecies as jest.Mock).mock.calls.length).toBe(1);
    expect(species).toBe([]);
    expect(nextPageUrl).toBe("");
    expect(loading).toBe(false);
  });
});
