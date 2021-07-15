import { Species } from "./../../models/Species.model";
import { useCharacters } from "./useCharacters";
import { cleanup } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { Character } from "../../models/Character.model";
import { fetchSpecificSpecies, fetchCharactersOfSpecies } from "../../api";

jest.mock("../../api", () => ({
  fetchSpecificSpecies: jest.fn(),
  fetchCharactersOfSpecies: jest.fn(),
}));

describe("useCharacters hook", () => {
  afterEach(cleanup);

  afterAll(() => {
    jest.unmock("../../api");
  });

  it("Should load the characters", async () => {
    const speciesFetchResult: Species = {
      id: 1,
      url: "/species/1",
      name: "Test species",
      classification: "humanoid",
      designation: "N/A",
      average_height: "60",
      skin_colors: "yellow, green",
      hair_colors: "purple, blue",
      eye_colors: "red, brown",
      average_lifespan: "91",
      homeworld: "/home/1",
      language: "chinese",
      people: ["/character/1", "/character/2"],
      films: ["/movie/1", "/movie/2"],
      created: Date.now.toString(),
      edited: Date.now.toString(),
    };
    const characterFetchResult: Character[] = [
      {
        id: 1,
        url: "/character/1",
        name: "Test character",
        height: "180",
        mass: "50",
        hair_color: "purple",
        skin_color: "yellow",
        eye_color: "red",
        birth_year: "1505",
        gender: "N/A",
        homeworld: "/planet/2",
        films: ["/movie/1", "/movie/2"],
        species: ["/species/1", "/species/2"],
        vehicles: ["/vehicle/1", "/vehicle/2"],
        starships: ["/starship/1", "/starship/2"],
        created: Date.now.toString(),
        edited: Date.now.toString(),
      },
      {
        id: 2,
        url: "/character/2",
        name: "Test character 2",
        height: "180",
        mass: "50",
        hair_color: "purple",
        skin_color: "yellow",
        eye_color: "red",
        birth_year: "1505",
        gender: "N/A",
        homeworld: "/planet/2",
        films: ["/movie/1", "/movie/2"],
        species: ["/species/1", "/species/2"],
        vehicles: ["/vehicle/1", "/vehicle/2"],
        starships: ["/starship/1", "/starship/2"],
        created: Date.now.toString(),
        edited: Date.now.toString(),
      },
    ];
    (fetchSpecificSpecies as jest.Mock).mockReturnValue(
      Promise.resolve(speciesFetchResult)
    );
    (fetchCharactersOfSpecies as jest.Mock).mockReturnValue(
      Promise.resolve(characterFetchResult)
    );
    const mockUpdateHeader = jest.fn();

    const { result, waitForNextUpdate } = renderHook(() =>
      useCharacters({ speciesId: "1", updateHeader: mockUpdateHeader })
    );

    await waitForNextUpdate();

    const { loading, characters } = result.current;

    expect(mockUpdateHeader.mock.calls.length).toBe(1);
    expect((fetchSpecificSpecies as jest.Mock).mock.calls.length).toBe(1);
    expect((fetchCharactersOfSpecies as jest.Mock).mock.calls.length).toBe(1);
    expect(characters).toStrictEqual(characterFetchResult);
    expect(loading).toBe(false);
  });

  it("Should return the default values when an error happens", async () => {
    (fetchSpecificSpecies as jest.Mock).mockImplementation(() => {
        throw new Error("Network error");
    });
    const mockUpdateHeader = jest.fn();

    const { result } = renderHook(() =>
      useCharacters({ speciesId: "1", updateHeader: mockUpdateHeader })
    );

    const { loading, characters } = result.current;

    expect(mockUpdateHeader.mock.calls.length).toBe(1);
    expect((fetchSpecificSpecies as jest.Mock).mock.calls.length).toBe(1);
    expect((fetchCharactersOfSpecies as jest.Mock).mock.calls.length).toBe(0);
    expect(characters).toStrictEqual([]);
    expect(loading).toBe(false);
  });
});
