Feature: Room
    Scenario: Create a new room
        Given The chat.io main page
        When The user fill the room name
        Then A new room is created
