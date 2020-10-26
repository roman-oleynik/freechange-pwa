import queryString from 'query-string';


export function useQueryString(q: string) {
	return queryString.parse(q);
}