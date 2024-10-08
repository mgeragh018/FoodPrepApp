Food Prep App
Michael Geraghty
10/7/2024
Software Design Fall 24
Setup and Running Instructions

The program demonstrates the usage of the openAI API call and that it has the ability to generate recipes add random along with corresponding images.

Instructions
Set Up Your API Key:

You will need to set up 2 variables with your own API Key.

In app.js : Here is were you can find the variables to update.

1. function fetchRecipeIdeas() 
    const apiKey = 'YOUR-APIKEY';  // Replace with your actual OpenAI API key


2. function fetchRecipeImage(prompt) 
    const apiKey = 'yOUR-APIKEY';

GitHub Restricts me from uploading an API KEy, so please email me if you need one.
Email: michael.geraghty@temple.edu

Note: This API key incurs a cost for usage, so please avoid excessive requests.


Running the Application:

Option 1: Open the index.html page directly in your web browser.
Option 2: If you’re using VS Code, download the Live Server extension. Right-click on index.html and select Open with Live Server to view the web application.

Using the Application:

Once the web app is up and running, press the Get Recipe button.
Three random recipes will be generated.
Please note that the API process is a bit slow due to multiple calls: the application makes 6 calls in total (3 for recipe data and 3 for images).

This example is all showcase on the frontend with no server. For the actual project. I'm planning on using Temple Linux Server to host our webb application.  I will also be using Java's Spring Boot. So the backend API calls will be coded in Java.