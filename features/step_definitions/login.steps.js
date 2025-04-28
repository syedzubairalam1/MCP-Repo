Then('the text {string} should be visible', async function(text) {
  const element = await page.getByText(text, { exact: true });
  await expect(element).toBeVisible();
}); 