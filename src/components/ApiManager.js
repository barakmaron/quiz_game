
export default async function  GetCategories()
{
    const res = await fetch('https://opentdb.com/api_category.php');
    const data = await res.json();
    return data;
}

export async function GetQuestions(difficulty, category, numQuestions)
{
    const res = await fetch('https://opentdb.com/api.php?amount=' + numQuestions + '&category=' + category +'&difficulty=' + difficulty + '&type=multiple&encode=base64');
    const data = await res.json(); 
    return data;
}

export async function GetLeaderBoard()
{
    const res = await fetch('https://quizgameproject.000webhostapp.com/GetRequest.php');
    const data = await res.json(); 
    return data;
}

export async function SetPlayersInDataBase(playerName, score)
{
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ player: playerName, score: score })
    };
    const res = await fetch('https://quizgameproject.000webhostapp.com/PostRequest.php', requestOptions);
    const data = await res.json(); 
    return data;
}