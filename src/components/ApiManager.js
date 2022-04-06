import {shuffleArray} from './Utilities.js';

export default async function  GetCategories()
{
    const res = await fetch('https://opentdb.com/api_category.php');
    const data = await res.json();
    return data;
}

export async function GetQuestions(difficulty, category, numPlayers)
{
    const numQuestions = numPlayers * 5 * 100;
    const res = await fetch('https://opentdb.com/api.php?amount=' + numQuestions + '&category=' + category +'&difficulty=' + difficulty + '&type=multiple&encode=base64');
    const data = await res.json();
    const randData = shuffleArray(data);
    return randData;
}