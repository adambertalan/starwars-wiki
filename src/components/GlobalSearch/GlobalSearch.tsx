import React from 'react';
import { Card, CardContent } from "@material-ui/core";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Subscription,
  Subject,
} from "rxjs";
import { fetchCharacters } from "../../api";
import { Character } from "../../models/Character.model";
import SearchDialog from "../SearchDialog";
import { GlobalSearchInput, GlobalSearchResultPopup } from './styles';

const GlobalSearch = (): JSX.Element => {
  const [searchExpression, setSearchExpression] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Character[]>([]);
  const [searchInputFocused, setSearchInputFocused] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const inputRef = useRef();

  const searchExprInputKeyup$ = useMemo(() => new Subject<string>(), []);
  const searchResultPopupBlur$ = useMemo(() => new Subject<void>(), []);

  useEffect(() => {
    const typeSub: Subscription = searchExprInputKeyup$
      .asObservable()
      .pipe(
        map((expr: string) => expr.trim()),
        distinctUntilChanged(),
        debounceTime(400)
      )
      .subscribe((expr: string) => {
        if (expr.length > 0) {
          fetchCharacters(expr)
            .then((characters) => {
              setSearchResult(characters);
            })
            .catch(() => {
              setSearchResult([]);
            })
            .finally(() => {
              setSearchLoading(false);
            });
        } else {
          setSearchLoading(false);
          setSearchResult([]);
        }
      });

    const blurSub: Subscription = searchResultPopupBlur$
      .asObservable()
      .pipe(debounceTime(300))
      .subscribe(() => {
        setSearchInputFocused(false);
      });

    return () => {
      typeSub.unsubscribe();
      blurSub.unsubscribe();
    };
  }, [searchExprInputKeyup$, searchResultPopupBlur$]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const expr = e.target.value;
    setSearchInputFocused(true);
    setSearchExpression(expr);
    setSearchLoading(true);
    searchExprInputKeyup$.next(expr);
  };

  return (
    <>
      <GlobalSearchInput
        ref={inputRef}
        onClick={() => setSearchInputFocused(true)}
        onBlur={() => searchResultPopupBlur$.next()}
        placeholder="Search characters"
        value={searchExpression}
        onChange={handleSearch}
      />
      <GlobalSearchResultPopup
        open={searchExpression.trim().length > 0 && searchInputFocused}
        anchorEl={inputRef.current}
      >
        <Card>
          <CardContent>
            {searchResult.length > 0 ? (
              <SearchDialog items={searchResult} isLoading={searchLoading} />
            ) : searchExpression.trim().length > 0 ? (
              <div>No results found!</div>
            ) : (
              <div></div>
            )}
          </CardContent>
        </Card>
      </GlobalSearchResultPopup>
    </>
  );
};

export default GlobalSearch;
