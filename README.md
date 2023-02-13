# Drink Advisor

### Android app only, made with Expo.

1. The application has few screens that we go to using appropriate buttons or from bottom tab bar.
2. The Drinks page displays a list of drinks sorted by the type of alcohol which is selected. Drinks are fetched from an external API -https://www.thecocktaildb.com/api.php.
3. The type of selected alcohol is stored in a context state, so after changing the screen and returning to the Drinks page, we have the drinks we selected earlier.
4. In the application we can save drinks as our favorites. Favorites drinks are stored on a device with usage of local database (SQLite). This means user can access them in offline mode (no internet).
5. The application also have error handling screen shown for users when problems with API or Internet connection occur.
6. In the Breathalyser tab, there is a simple form focusing only on learning how to validate input data. If you enter any value greater than zero in amount and strength of alcohol you will receive an alert that you are drunk and you will have posibility to get a random drink fetched from API, going back to the form or going to the Drinks page, in the second case you will receive an alert that you are sober and you get alert with the same buttons.
7. On the Drinks page, to the right of the title, there is a setting button that uses the context menu functionality, which allows to go to the selected page of the app.

### Screenshots

<p float="left">
<img src="https://user-images.githubusercontent.com/112687581/218426014-39ff54f3-33d4-4662-bb79-a01d93a6e0b4.png" width=45% >
<img src="https://user-images.githubusercontent.com/112687581/218427790-f738b0af-fb29-4323-833b-71530fb9fa78.png" width=45% >
<img src="https://user-images.githubusercontent.com/112687581/218428088-66fea29c-2eda-459d-8beb-c4fd47e90f3d.png" width=45% >
<img src="https://user-images.githubusercontent.com/112687581/218428265-18763ff2-be64-4d2c-950e-619d856f9554.png" width=45% >
<img src="https://user-images.githubusercontent.com/112687581/218428586-4ebba8ea-e091-4885-ae29-ef418003df6b.png" width=45% >
<img src="https://user-images.githubusercontent.com/112687581/218428724-2b71f551-9dd8-49d3-b29a-abf82faa51a1.png" width=45% >
<img src="https://user-images.githubusercontent.com/112687581/218428755-c68db9f7-d3f1-4a92-80a7-180badb10ab5.png" width=45% >
<img src="https://user-images.githubusercontent.com/112687581/218428787-487cd7fc-7272-4c5d-9aa4-7d634b230bbb.png" width=45% >
</p>
