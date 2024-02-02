import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

     const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
     const _apiKey = 'apikey=1f876658ab9ce75e9e8b7213e53624a6';
     const _baseOffset = 210;

    // заменили функцию fetch на собственный хук

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?orderBy=name&limit=9&offset=${offset}&${_apiKey}`); // получаем всех персонажей
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`); // получаем того персонажа который нам надо
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComics = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

    const _transformCharacter = (char) => { //  нужна для того что бы не повторять код setState обновления карточки персонажа
        
        return {
            id: char.id,
            name: char.name, // results[0] берем именно первого персонажа
            description: char.description ? `${char.description.slice(0, 215)}...` : 'None description',
            thumbnail:  char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            name: comics.title,
            description: comics.description || 'Нету текста',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'Нету информации об количестве страниц',
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            language: comics.textObjects[0]?.language || "en-rus",
            price: comics.prices[0].price ? `${comics.prices[0].price} $` : "Цена неизвестна",
        };
    }
    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComics, getCharacterByName}
}

export default useMarvelService;