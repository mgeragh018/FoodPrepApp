document.getElementById('get-recipes').addEventListener('click', async function() {
    console.log("Button clicked - attempting to fetch 3 recipe ideas...");

    const recipeIdeas = await fetchRecipeIdeas();

    if (recipeIdeas.length > 0) {
        const recipeContainer = document.getElementById('recipe-results');
        recipeContainer.innerHTML = '';  // Clear previous results
        recipeContainer.classList.remove('hidden');  // Show container

        // Process each of the 3 recipe ideas and generate images for the recipe title only
        for (let i = 0; i < Math.min(recipeIdeas.length, 3); i++) {
            const idea = recipeIdeas[i];

            // Generate an image for each recipe title using DALL·E
            const imageUrl = await fetchRecipeImage(idea.title);

            // Create a div to display the recipe
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');

            // Create an image element with the DALL·E generated image
            const recipeImage = document.createElement('img');
            recipeImage.src = imageUrl;
            recipeImage.alt = `Image of ${idea.title}`;
            recipeDiv.appendChild(recipeImage);

            // Create a recipe title
            const recipeTitle = document.createElement('h3');
            recipeTitle.textContent = idea.title;
            recipeDiv.appendChild(recipeTitle);

            // Create a description for the recipe
            const recipeDescription = document.createElement('p');
            recipeDescription.textContent = idea.description;
            recipeDiv.appendChild(recipeDescription);

            recipeContainer.appendChild(recipeDiv);
        }
    } else {
        console.log("No recipe ideas fetched.");
    }
});

// Fetch recipe ideas from ChatGPT (OpenAI API)
function fetchRecipeIdeas() {
    const apiKey = process.env.OPENAI_API_KEY; // Use environment variable
 // Replace with your actual OpenAI API key
    const url = 'https://api.openai.com/v1/chat/completions';

    const data = {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: "system", content: "You are a creative chef." },
            { role: "user", content: "Give me 3 unique recipe ideas with descriptions." }
        ],
        max_tokens: 300
    };

    console.log("Sending request to OpenAI for 3 recipe ideas...");
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            console.error("OpenAI API error: ", response.status);
            return [];
        }
        return response.json();
    })
    .then(data => {
        console.log("OpenAI response: ", data);
        const recipeIdeas = data.choices[0].message.content
            .split("\n")
            .filter(item => item.trim() !== "")
            .slice(0, 3)  // Limit to 3 results
            .map((recipe, index) => {
                const [title, description] = recipe.split(": ");
                return { title: title || `Recipe ${index + 1}`, description: description || "A delicious recipe." };
            });
        return recipeIdeas;
    })
    .catch(error => {
        console.error('Error fetching recipe ideas from OpenAI:', error);
        return [];
    });
}

// Fetch image for recipe title using DALL·E (OpenAI API)
function fetchRecipeImage(prompt) {
    const apiKey = process.env.OPENAI_API_KEY; // Use environment variable
 // Replace with your actual OpenAI API key
    const url = 'https://api.openai.com/v1/images/generations';

    const data = {
        prompt: prompt,  // Only use the recipe title as the prompt
        n: 1,
        size: "512x512"
    };

    console.log("Generating image for recipe: ", prompt);
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.data && data.data.length > 0) {
            return data.data[0].url;  // Return the URL of the generated image
        } else {
            return 'https://via.placeholder.com/512';  // Fallback image
        }
    })
    .catch(error => {
        console.error('Error generating image from OpenAI:', error);
        return 'https://via.placeholder.com/512';  // Fallback image
    });
}
