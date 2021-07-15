import { SpeciesResult } from "./../../models/SpeciesResult.model";
import { cleanup } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
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

  it("Should load the initial species", async () => {
    const fetchResult: SpeciesResult = {
      results: [],
      next: "",
      count: 0,
      previous: "",
    };
    (fetchSpecies as jest.Mock).mockReturnValue(Promise.resolve(fetchResult));

    const { result, waitForNextUpdate } = renderHook(() => useSpecies());

    await waitForNextUpdate();

    const { loading, species, nextPageUrl } = result.current;

    expect((fetchSpecies as jest.Mock).mock.calls.length).toBe(1);
    expect(species).toStrictEqual([]);
    expect(nextPageUrl).toBe("");
    expect(loading).toBe(false);
  });
});
