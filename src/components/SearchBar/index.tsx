import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InputWithValidation } from '../InputWithValidation';

type Props = {
  searchFreeThings: boolean,
  onFormDiscard?: () => void,
  thingNameFromQS?: string | string[] | null | undefined,
}


function SearchBar({ onFormDiscard, thingNameFromQS, searchFreeThings }: Props) {
	const [ valueOfSearchInput, setValueOfSearchInput ] = useState<string | null>("");
  return (
    <section
      role="search"
      className="input-group px-3 py-3"
    >
      <input
        type="search"
        className="form-control"
        placeholder="Введите название вещи..." 
        aria-label="Name of a thing"
        defaultValue={thingNameFromQS || ""}
        onChange={(EO) => setValueOfSearchInput(EO.target.value)}
      />
      <div className="input-group-append">
        {
          thingNameFromQS &&
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={onFormDiscard}
          >Сброс</button>
        }
        <Link
          aria-label="Search"
          to={`/search?query=${valueOfSearchInput}&isFree=${searchFreeThings}`}
          className="btn btn-outline-primary"
        >Найти</Link>
      </div>
    </section>
  );
};


export default SearchBar;