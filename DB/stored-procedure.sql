-- register user function -- 
CREATE PROCEDURE [dbo].[registerUser]
    @username VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR(255),
    @phone VARCHAR(20)

AS
BEGIN
    IF EXISTS (SELECT 1 FROM users WHERE email = @email)
    BEGIN
        THROW 50001, 'User already registered';
    END

    INSERT INTO dbo.users (username, email, password, phone)--invalid
    VALUES (@username, @email, @password, @phone);
END



-- login user function -- 
CREATE PROCEDURE [dbo].[loginUser]
    @email VARCHAR(255),
    @password VARCHAR(255)

AS
BEGIN
    DECLARE @user_id INT;
    DECLARE @username VARCHAR(255);
    SELECT @user_id = id FROM users WHERE email = @email AND password = @password;
    SELECT @user_name = username FROM users WHERE email = @email;

    IF @user_id IS NULL
    BEGIN
        THROW 50002, 'invalid email or user';
    END

    SELECT @user_name AS username --TODO select id
END




-- insert recipe func -- 
CREATE PROCEDURE [dbo].[insertRecipe]
    @name VARCHAR(255);
    @image_path VARCHAR(255),
    @ingredients NVARCHAR(MAX) //????
AS
BEGIN
    DECLARE @recipe_id INT;
    INSERT INTO recipes (name, image_path) VALUES (@name, @image_path);
    SET @recipe_id = SCOPE_IDENTITY();

    INSERT INTO ingredients (name)
    SELECT value FROM OPENJSON(@ingredients)
    WITH (
        value NVARCHAR(255) '$.name'
    )
    WHERE value NOT IN (SELECT name FROM ingredients);

    -- Insert into recipe_ingredients // rebuild this
    INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, quantity_unit)
    SELECT @recipe_id, i.id, JSON_VALUE(ingredient.value, '$.quantity'), JSON_VALUE(ingredient.value, '$.quantity_unit')
    FROM OPENJSON(@ingredients) AS ingredient
    JOIN ingredients i ON i.name = JSON_VALUE(ingredient.value, '$.name');
END




-- get user saved recipe -- 
CREATE PROCEDURE [dbo].[getUserSavedRecipes]
    @user_id INT
AS
BEGIN
    SELECT r.id, r.name, r.image_path
    FROM recipes r
    JOIN saved_recipes sr ON r.id = sr.recipe_id --INNER?? default?
    WHERE sr.user_id = @user_id;

END

-- generate shopping list --
CREATE PROCEDURE [dbo].[generateShoppingList]
    @user_id INT
AS
BEGIN
    SELECT i.name --DISTINCT
    FROM ingredients i
    JOIN recipe_ingredients ri ON i.id = ri.ingredient_id
    JOIN saved_recipes sr ON ri.recipe_id = sr.recipe_id
    WHERE sr.user_id = @user_id;
END
