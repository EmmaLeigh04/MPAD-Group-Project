# Monica's Story — Interactive Mystery

A scrolling mystery story with a fully interactive Windows XP-style desktop. Scroll through Monica's story, then explore her computer to uncover the truth before the conclusion is revealed. 

---

## Setup & Launch

### Requirements
- Python 3.10 or higher
- pip

### Steps

1. **Clone or download the repository**

2. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3. **Create a `.env` file** in the project root folder (same level as `manage.py`) with the following content:
    ```
    SECRET_KEY=any-random-string-you-choose
    ```
    For example:
    ```
    SECRET_KEY=django-insecure-abc123xyz
    ```

4. **Run migrations:**
    ```bash
    python manage.py migrate
    ```

5. **Start the development server:**
    ```bash
    python manage.py runserver
    ```

6. **Open your browser and go to:**
    ```
    http://127.0.0.1:8000/
    ```

---

## How to Play

1. **Scroll down** through Monica's story on the homepage. Read through the narrative as it unfolds.

2. **At the bottom of the story**, you will see Monica's computer appear. **Click anywhere on the screen** to boot it up.

3. You will be taken to a **Windows XP-style desktop**. Double-click the icons to open apps:
    - **Internet Explorer** — Browse to MySpace (hint: use Monica's passwords to log in)
    - **Mail** — Read Monica's emails
    - **Notepad** — Read her diary entry
    - **Documents** — Explore her files (includes hidden documents)

4. **Open all the apps** to see everything. Once you've explored them all, **Clippy will appear** and ask if you'd like to find out the truth.

5. Click **Yes** to read the conclusion of the story.

### Passwords (found in the Documents app)
- MySpace username: `YouKnowYouHateMe`
- MySpace password: `12345`

---

## Project Structure

```
manage.py               — Django entry point
termproject/            — Django project settings and URL config
mainapp/                — Main Django app (views, URLs, templates)
  templates/            — All HTML templates
    index.html          — Story homepage
    welcome.html        — Boot/splash screen
    screen.html         — Windows XP desktop
    apps/               — Individual desktop app pages
    conclusion.html     — Ending of the story
docs/                   — Scroll animation JS and CSS
Screen/                 — Desktop JS (fun.js, mc.js) and app source files
images/                 — Story and UI images
sounds/                 — Audio files
icons/                  — Windows XP icons
```
