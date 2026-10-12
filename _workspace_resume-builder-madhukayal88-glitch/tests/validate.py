"""
End-to-end validation of the Resume Builder, mirroring the AccioJob Cypress
selectors / flow. Run with:  python3 tests/validate.py
"""
import sys
from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000/"
results = []


def check(name, cond):
    results.append((name, bool(cond)))
    print(("PASS " if cond else "FAIL ") + name)


def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context()
        page = ctx.new_page()
        page.goto(BASE)
        page.evaluate("localStorage.clear()")
        page.reload()
        page.wait_for_selector("input[name='fname']")

        # ---------- PAGE 1 : PROFILE ----------
        for sel in ['input[name="fname"]', 'input[name="lname"]',
                    'input[name="phone"]', 'input[name="address"]',
                    'input[name="url"]']:
            check(f"profile has {sel}", page.locator(sel).count() == 1)
        check("has #next", page.locator("#next").count() == 1)
        check("has #back", page.locator("#back").count() == 1)
        check("has #save_continue", page.locator("#save_continue").count() == 1)

        page.fill('input[name="fname"]', "John")
        page.fill('input[name="lname"]', "Doe")
        page.fill('input[name="phone"]', "1234567890")
        page.fill('input[name="address"]', "Somewhere")
        page.fill('input[name="url"]', "https://i.pravatar.cc/120")
        page.click("#next")

        # ---------- PAGE 2 : EDUCATION ----------
        page.wait_for_selector('input[name="courseName"]')
        for sel in ['input[name="courseName"]', 'input[name="completionYear"]',
                    'input[name="college"]', 'input[name="percentage"]']:
            check(f"education has {sel}", page.locator(sel).count() == 1)
        check("has #add_education", page.locator("#add_education").count() == 1)
        check("has #delete", page.locator("#delete").count() == 1)

        page.fill('input[name="courseName"]', "B.Tech CSE")
        page.fill('input[name="completionYear"]', "2023")
        page.fill('input[name="college"]', "ABC Institute")
        page.fill('input[name="percentage"]', "85")
        page.click("#add_education")
        check("education entry added", "B.Tech CSE" in page.inner_text("body"))

        page.click("#delete")
        check("education entry deleted", "B.Tech CSE" not in page.inner_text("body"))

        # re-add for the resume
        page.fill('input[name="courseName"]', "B.Tech CSE")
        page.fill('input[name="completionYear"]', "2023")
        page.fill('input[name="college"]', "ABC Institute")
        page.fill('input[name="percentage"]', "85")
        page.click("#add_education")
        page.click("#next")

        # ---------- PAGE 3 : SKILLS ----------
        page.wait_for_selector('input[name="skill"]')
        check("skills has name=skill", page.locator('input[name="skill"]').count() == 1)
        check("has #add_skill", page.locator("#add_skill").count() == 1)
        check("has #delete_skill", page.locator("#delete_skill").count() == 1)

        page.fill('input[name="skill"]', "React")
        page.click("#add_skill")
        page.fill('input[name="skill"]', "Node.js")
        page.click("#add_skill")
        check("two skills added", page.locator(".skills-list .entry-item").count() == 2)
        page.click("#delete_skill")
        check("one skill after delete_skill",
              page.locator(".skills-list .entry-item").count() == 1)
        page.click("#next")

        # ---------- PAGE 4 : PROJECTS ----------
        page.wait_for_selector('input[name="projectName"]')
        for sel in ['input[name="projectName"]', 'input[name="techStack"]',
                    'input[name="description"]']:
            check(f"projects has {sel}", page.locator(sel).count() == 1)
        check("has #add_project", page.locator("#add_project").count() == 1)
        check("has #delete (projects)", page.locator("#delete").count() == 1)

        page.fill('input[name="projectName"]', "Portfolio")
        page.fill('input[name="techStack"]', "React, Redux")
        page.fill('input[name="description"]', "A personal portfolio website")
        page.click("#add_project")
        check("project added", "Portfolio" in page.inner_text("body"))
        page.click("#next")

        # ---------- PAGE 5 : SOCIAL ----------
        page.wait_for_selector('input[name="Social"]')
        check("social has name=Social", page.locator('input[name="Social"]').count() == 1)
        check("has #add_social", page.locator("#add_social").count() == 1)
        page.fill('input[name="Social"]', "https://github.com/johndoe")
        page.click("#add_social")
        check("social added", "github.com/johndoe" in page.inner_text("body"))

        page.click("#save_continue")

        # ---------- PAGE 6 : RESUME OUTPUT ----------
        page.wait_for_selector(".resume-card")
        body = page.inner_text("body")
        for expected in ["John", "Doe", "Somewhere", "1234567890", "React",
                         "ABC Institute", "B.Tech CSE", "Portfolio",
                         "github.com/johndoe"]:
            check(f"resume output contains '{expected}'", expected in body)

        # ---------- PERSISTENCE ----------
        page.reload()
        page.wait_for_selector('input[name="fname"]')
        check("persisted fname after reload",
              page.input_value('input[name="fname"]') == "John")

        # ---------- BACK NAVIGATION ----------
        page.click("#next")  # to education
        page.wait_for_selector('input[name="courseName"]')
        page.click("#back")
        page.wait_for_selector('input[name="fname"]')
        check("back returns to profile",
              page.locator('input[name="fname"]').count() == 1)

        browser.close()

    passed = sum(1 for _, ok in results if ok)
    total = len(results)
    print(f"\n==== {passed}/{total} checks passed ====")
    return 0 if passed == total else 1


if __name__ == "__main__":
    sys.exit(run())
