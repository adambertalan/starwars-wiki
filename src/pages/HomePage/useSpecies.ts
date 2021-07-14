import { MouseEvent, useEffect, useState } from "react";
import { fetchSpecies } from "../../api";
import { SpeciesResult } from "../../models/SpeciesResult.model";
import { Species } from "./../../models/Species.model";

export interface UseSpeciesResult {
  loading: boolean;
  species: Species[];
  nextPageUrl: string;
  loadMoreSpecies: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
}

export const useSpecies = (): UseSpeciesResult => {
  const [species, setSpecies] = useState<Species[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (nextPageUrl?: string) => {
    setLoading(true);
    try {
      const speciesResult: SpeciesResult = await fetchSpecies(nextPageUrl);

      setSpecies(
        nextPageUrl
          ? [...species, ...speciesResult.results]
          : speciesResult.results
      );
      setNextPageUrl(speciesResult.next ?? "");
    } catch (err) {
      setSpecies([...species]);
      setNextPageUrl("");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreSpecies = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchData(nextPageUrl);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    species,
    nextPageUrl,
    loadMoreSpecies,
  };
};
