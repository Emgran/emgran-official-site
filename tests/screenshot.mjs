import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewportSize({ width: 1280, height: 800 });
  
  // Navigate to the page
  await page.goto('http://localhost:4325/', { waitUntil: 'networkidle' });
  
  // Wait a bit for animations
  await page.waitForTimeout(2000);
  
  // Take full page screenshot
  await page.screenshot({ 
    path: '/Users/wesley/.openclaw-beta/workspace-mkt/emgran-official-site/tests/screenshots/homepage-full.png',
    fullPage: true 
  });
  
  // Take viewport screenshot
  await page.screenshot({ 
    path: '/Users/wesley/.openclaw-beta/workspace-mkt/emgran-official-site/tests/screenshots/homepage-viewport.png' 
  });
  
  console.log('✅ Screenshots saved to tests/screenshots/');
  
  await browser.close();
})();