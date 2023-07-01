# Cypress assignment revised:

Things I changed:

In general:
1. Corrected the ```getById()``` custom command so it will work (missed "" wrapping the id). So I updated all the places in the code that I wanted to use it.
2. Changed all naming of custom commands to be written with capital letters instead of '_'.
3. Added ```enterValidPassword()``` custom command to use in the Password and the 2fa tests.
4. Added spaces between tests for better readability.
      
In the ```lookup.cy.js```:
1. In the test "should open the webpage" I changed to url checking and window yielding (since we already do ```cy.visit()``` in the beforeEach block, which is also a relevant assertion) instead of checking if elements exist.
2. When checking valid email login I should have also checked it by pressing the next button in addition to the enter keyboard, so for that I also separated and added relevant custom commands: ```signEmailWithEnter()```, ```signEmailWithNext()```.
      
In the ```password.cy.js```;
1. In the test "should confirm the cancel button works"- added the email value check and the next button press (step number 9). So now the test is called "should confirm the cancel button works with email shown and clicking next to password page".
2. Added a test for the missing steps number 10 and 11: "should confirm the back button works with email shown and clicking next to password page".
3. Added step 13 that I didn't get to finish in test: "should make sure that the remember_me field has a proper value in the API call".
   
*I added the 2fa tests in order to complete the assignment.
