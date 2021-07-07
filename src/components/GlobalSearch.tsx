import { Card, CardContent, InputBase, Popper } from '@material-ui/core'
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { debounceTime, distinctUntilChanged, map, Subscription, Subject } from 'rxjs';
import { fetchCharacters } from '../api';
import { Character } from '../models/Character.model';
import SearchDialog from './SearchDialog';

const GlobalSearch = () => {
    const [searchExpression, setSearchExpression] = useState<string>("");
    const [searchResult, setSearchResult] = useState<Character[]>([]);
    const [searchInputFocused, setSearchInputFocused] = useState<boolean>(false);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    
    const inputRef = useRef();

    const searchExprInputKeyup$ = useMemo(() => new Subject<string>(), []);
    const searchResultPopupBlur$ = useMemo(() => new Subject<void>(), []);

    useEffect(() => {
        const typeSub: Subscription = searchExprInputKeyup$.asObservable().pipe(
            map((expr: string) => expr.trim()),
            distinctUntilChanged(),
            debounceTime(400),
        ).subscribe((expr: string) => {
            if (expr.length > 0) {
                fetchCharacters(expr).then((characters) => {
                    setSearchResult(characters);
                }).catch(err => {
                    setSearchResult([]);
                }).finally(() => {
                    setSearchLoading(false);
                });
            } else {
                setSearchLoading(false);
                setSearchResult([]);
            }
        });

        const blurSub: Subscription = searchResultPopupBlur$.asObservable().pipe(
            debounceTime(300)
        ).subscribe(() => {
            setSearchInputFocused(false);
        });

        return () => {
            typeSub.unsubscribe();
            blurSub.unsubscribe();
        }
    }, [searchExprInputKeyup$, searchResultPopupBlur$]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const expr = e.target.value;
        setSearchInputFocused(true);
        setSearchExpression(expr);
        setSearchLoading(true);
        searchExprInputKeyup$.next(expr);
    }

    return (
        <>
            <InputBase
                style={{color: 'white'}}
                ref={inputRef}
                onClick={() => setSearchInputFocused(true)}
                onBlur={() => searchResultPopupBlur$.next()}
                placeholder="Search characters"
                value={searchExpression}
                onChange={handleSearch} />
            <Popper open={searchExpression.trim().length > 0 && searchInputFocused} anchorEl={inputRef.current} style={{zIndex: 10001}}>
                <Card>
                    <CardContent>
                        {searchResult.length > 0 ? (
                            <SearchDialog items={searchResult} isLoading={searchLoading}/>
                        ) : (
                            searchExpression.trim().length > 0 ? <div>No results found!</div> : <div></div>
                        )}
                    </CardContent>
                </Card>
            </Popper>
        </>
    )
}

export default GlobalSearch
