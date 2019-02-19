Feature: Register
    Scenario: New user registration
        Given The chat.io register page
        When The user fills the user and password fields
        Then A registration success message is displayed
