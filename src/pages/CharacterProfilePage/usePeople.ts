import { useEffect, useState } from "react";
import {
  fetchCharacter,
  fetchFilmTitlesOfCharacter,
  fetchSpeciesNamesOfCharacter,
} from "../../api";
import { Character } from "../../models/Character.model";

export interface UsePeopleInput {
  characterId: string;
  updateHeader: (headerTitle: string) => void;
}

export interface UsePeopleResult {
  loading: boolean;
  character: Character | null;
  filmTitles: string[];
  speciesNames: string[];
}

export const usePeople = ({
  characterId,
  updateHeader,
}: UsePeopleInput): UsePeopleResult => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [filmTitles, setFilmTitles] = useState<string[]>([]);
  const [speciesNames, setSpeciesNames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const character: Character = await fetchCharacter(characterId);
      updateHeader(`Profile of ${character.name}`);

      const speciesNames: string[] = await fetchSpeciesNamesOfCharacter(
        character
      );
      const filmTitles: string[] = await fetchFilmTitlesOfCharacter(character);

      setCharacter(character);
      setSpeciesNames(speciesNames);
      setFilmTitles(filmTitles);
    } catch (err) {
      updateHeader(`Profile of character with ID: ${characterId}`);
      setCharacter(null);
      setSpeciesNames([]);
      setFilmTitles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [characterId]);

  return {
    loading,
    character,
    filmTitles,
    speciesNames,
  };
};
