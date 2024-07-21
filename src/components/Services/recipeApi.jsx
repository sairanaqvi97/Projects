export const getDataRecipes = () => {

    const API = 'https://668c1d430b61b8d23b0c7558.mockapi.io/WeeklyMenuApp/Recipe'


    return fetch('https://668c1d430b61b8d23b0c7558.mockapi.io/WeeklyMenuApp/Recipe', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json",

        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
};

