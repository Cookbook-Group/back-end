# back-end 
The Premise: Instagram for food, post pictures with recipes, get ratings and comments, search for recipes by parameters.

## Working Titles

* Social-mealdia


## MVP 

* Full CRUD
* MERN
* Working frontend react and backend componenets

## Stretch Goals


* Link posts and users for edit permissions/ delete permissions
* Add comments linked to users, ratings/interactions
* Advanced search features (tag searching, ingredients, calorie searching, categories...)
* Multer.io/Cloudinary  for pictures of food.
* Social media buttons...guugghh

## User Stories

* As a User, I can upload recipes with pictures
* As a User, I can rate recipes
* As a User, I want to be able to find reicpes by parameters
* As a User, I want to be able to interact with users*
* As a User, I want to be able to filter recipes

## Models

Posts;

[
    {
        image:
        name:
        calories:
        recipes: [
         ingredients: []
         instructions: []
         recipeFacts: [
            servings:
            cooktime:
         ]
                 ]
        timestamp:
        likes: [+,-]
    }
]

Users;

[
    email: ,
    username: ,
    password: ,
    profile*:[
      profileImage:,
      about:,
      name:
    ]    
]

Basic frontend, Nick
Basic Backend, Tamara


