import { useState } from "react";
import { Character } from "./../../models/Character.model";
import { useEffect } from "react";
import { fetchCharactersOfSpecies, fetchSpecificSpecies } from "../../api";
import { Species } from "../../models/Species.model";

export interface UseCharactersResult {
  loading: boolean;
  characters: Character[];
}

export interface UseCharactersInput {
  speciesId: string;
  updateHeader: (headerTitle: string) => void;
}

export const useCharacters = ({
  speciesId,
  updateHeader,
}: UseCharactersInput): UseCharactersResult => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const species: Species = await fetchSpecificSpecies(speciesId);
      updateHeader(`Characters of species: ${species.name}`);
      
      const charactersOfSpecies: Character[] = await fetchCharactersOfSpecies(
        species
      );
      setCharacters(charactersOfSpecies);
    } catch (err) {
      updateHeader(`Characters of species with ID: ${speciesId}`);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [speciesId]);

  return {
    loading,
    characters,
  };
};
