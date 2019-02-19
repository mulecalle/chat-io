Feature: Sign In
    Scenario: Login into the app
        Given The chat.io login page
        When The user completes the user and password fields at the register page
        Then The user access the main page
