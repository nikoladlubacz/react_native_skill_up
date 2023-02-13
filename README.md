# Drink Advisor

## Android app only, made with Expo.

1. The application has few screens that we go to using appropriate buttons or from bottom tab bar.
2. The Drinks page displays a list of drinks sorted by the type of alcohol which is selected. Drinks are fetched from an external API -https://www.thecocktaildb.com/api.php.
3. The type of selected alcohol is stored in a context state, so after changing the screen and returning to the Drinks page, we have the drinks we selected earlier.
4. In the application, we can save drinks as a favorites to the local database, and if we don/t have access to internet, only these drinks are visible in Favorites tab and only for these drinks we can go to DrinkDetails page.
5. In the Breathalyser tab, there is a simple form focusing only on learning how to validate input data. If you enter any value greater than zero in amount and strength of alcohol you will receive an alert that you are drunk and you will have posibility to get a random drink fetched from API, going back to the form or going to the Drinks page, in the second case you will receive an alert that you are sober and you get alert with the same buttons.
6. On the Drinks page, to the right of the title, there is a setting button that uses the context menu functionality, which allows to go to the selected page of the app.
