CREATE DATABASE recipesapp;
USE recipesapp;

/*------------   Create tables   --------------*/

CREATE TABLE users (
    id INT  PRIMARY KEY IDENTITY (1,1),
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE ingredients(
    id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE recipes (
    id INT  PRIMARY KEY IDENTITY (1,1),
    recipe_name VARCHAR(255) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE recipes_ingredients(
    recipe_id INT,
    ingredient_id INT,
    quantity INT,
    quantity_unit VARCHAR(255),
    PRIMARY KEY (recipe_id, ingredient_id),  -- ?????
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
)


CREATE TABLE saved_recipes (
    id INT  PRIMARY KEY IDENTITY (1,1),
    user_id INT,
    recipe_id INT,
    --ingredients TEXT,
    saved_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

CREATE TABLE shopping_list (
    id INT  PRIMARY KEY IDENTITY (1,1),
    user_id INT,
    saved_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id),
);  


CREATE TABLE shopping_list_items (
    shopping_list_id INT,
    ingredient_id INT,
    quantity INT,
    quantity_unit VARCHAR(255),
    PRIMARY KEY (shopping_list_id ,ingredient_id), 
    FOREIGN KEY (shopping_list_id) REFERENCES shopping_list(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
    
    );


/* ------------------------ Insert Data into Tables -------------------- */
 