import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page).toHaveTitle(/Kolombus-reskin/);
});


test('has button hover', async ({ page }) => {

  await page.goto('http://localhost:5173/');

  const buttonSelector = 'button.Innstillinger';

  await page.waitForSelector(buttonSelector);
  await page.hover(buttonSelector);


  const buttonBackgroundColor = await page.$eval(
    buttonSelector,
    (button) => getComputedStyle(button).getPropertyValue('background-color')
  );

  expect(buttonBackgroundColor).toBe('rgb(249, 249, 249)'); 
});

test('dropdown has placeholder', async ({ page }) => {
  await page.goto('http://localhost:5173/');


  const selectedOption = 'p.searchDropDown'; 

  await page.waitForSelector(selectedOption);

  const dropdownText = await page.$eval(
    selectedOption,
    (dropdown) => dropdown.textContent
  );

  expect(dropdownText.trim()).toBe('Søk...');
});











