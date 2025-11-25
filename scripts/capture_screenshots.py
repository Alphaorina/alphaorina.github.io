from playwright.sync_api import sync_playwright
import time

url = "http://localhost:8000/project-page.html"
outputs = [
    (1366, 768, 'screenshot-1366x768.png'),
    (1920, 1080, 'screenshot-1920x1080.png')
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    for w, h, name in outputs:
        page = browser.new_page(viewport={"width": w, "height": h})
        page.goto(url)
        page.wait_for_timeout(1200)
        page.screenshot(path=f"assets/images/{name}", full_page=True)
        print(f"Saved assets/images/{name}")
        page.close()
    browser.close()
print('Done')
