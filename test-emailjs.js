const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate to the live site
  await page.goto('https://dear-sweet-llc.pages.dev/order', { waitUntil: 'networkidle0' });
  
  // Listen for console logs
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });

  // Listen for failed network requests
  page.on('response', async response => {
    if (!response.ok() && response.url().includes('emailjs')) {
      const text = await response.text();
      console.log('EMAILJS API HTTP ERROR:', response.status(), text);
    }
  });

  // Fill out the form
  await page.type('input[name="name"]', 'Test Name');
  await page.type('input[name="email"]', 'test@test.com');
  await page.type('input[name="phone"]', '123-456-7890');
  
  console.log('Submitting form...');
  await page.click('button[type="submit"]');
  
  // Wait a bit to catch the error
  await page.waitForTimeout(3000);
  
  await browser.close();
})();
