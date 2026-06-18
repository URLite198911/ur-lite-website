# Universal Reader

Universal Reader is a desktop personal knowledge reader for PDF, EPUB, CBZ, CBR, TXT, HTML, and DOCX files.

It is designed as more than a file viewer:

- Local library database for books, reading progress, bookmarks, highlights, notes, study notes, extracted text, searchable metadata, and cached chapter summaries
- Auto-hide left navigation panel and collapsible right Knowledge Panel, each with a narrow icon rail
- Expanded navigation sections for Library, Chapters, Search, Collections, and Bookmarks
- Global search across titles, extracted text, highlights, notes, summaries, study notes, and key terms
- Browser-based center reading panel for pages, chapters, comic images, text sections, HTML sections, and DOCX sections
- Right Knowledge Panel with Chapter Gist, Detailed Summary, Key Points, Key Terms, Quiz Questions, Flashcards, and Printable Summary
- Reading, Study, Library Browsing, and Focus layouts for narrow screens and document-first reading
- Browser renderer display modes for single page, continuous scroll, and two-page side-by-side spreads
- Optional PDF book-style spread layout where page 1 is shown alone, then pages 2-3, 4-5, and onward
- CBR/CBZ display modes for single page, cover-first two-page spreads, and lazy-loaded continuous scroll
- EPUB browser rendering with spine order, images/assets when available, font size, line spacing, margin, and theme controls
- HTML and TXT browser rendering with safe wrapping and readable CSS
- DOCX HTML View rendering through Mammoth, plus an optional LibreOffice-backed Original Layout setting for DOCX files
- Lite `File > Export pages to PDF` and `Ctrl+P` export selected pages from the open document
- Full-only advanced Legacy Renderer fallback for troubleshooting the previous manual/QLabel rendering path
- Manual AI summarization only; the app never summarizes automatically
- Saved summaries are reused locally unless the user clicks Regenerate
- OpenAI-compatible API mode using the user's own API key
- Local Ollama mode for local models
- Export actions for print, PDF, DOCX, clipboard, and study notes
- Background workers for parsing, folder scanning, library indexing, search, AI summaries, and legacy PDF rendering
- Debounced rapid navigation, cancelable obsolete render jobs, page-render caching, and loading placeholders

Universal Reader does not include DRM bypassing, proprietary reader engines, or any developer-paid AI usage.

## UR Lite Current Build

UR Lite is a lightweight Windows reader for PDF, EPUB, DOCX, TXT, HTML, CBZ, and CBR files.

Current UR Lite features:

- PDF, EPUB, DOCX, TXT, HTML, CBZ, and CBR support
- Light, Sepia, and Dark themes
- Reading Font menu for HTML/Reflow View
- Single, Continuous, Cover, and Two-page style view modes
- Optional DOCX Original Layout support through LibreOffice
- PDF export from HTML/Reflow View uses the default export font for consistency

DOCX Original Layout:

- DOCX files can open in HTML/Reflow View without LibreOffice.
- For better preservation of Word layout, install LibreOffice.
- Enable DOCX Original Layout under `Settings > Preferences...`.
- LibreOffice must use `soffice.exe`, not `soffice.com`.
- If LibreOffice is unavailable or conversion fails, UR Lite falls back to HTML/Reflow View.

Font behavior:

- `Settings > Font` changes the on-screen font in HTML/Reflow View only.
- It does not affect DOCX Original Layout.
- It does not affect exported PDFs.
- Exported PDFs use the default export font.

Optional companion software:

- LibreOffice: https://www.libreoffice.org/download/download-libreoffice/
- 7-Zip: https://www.7-zip.org/
- WinRAR: https://www.win-rar.com/download.html

Troubleshooting:

- If DOCX Original Layout fails, install or repair LibreOffice.
- If CBR files do not open, install WinRAR or 7-Zip.
- If icons or shortcuts look old, uninstall older builds and reinstall the latest setup.

Feedback and rating page: coming soon.

## Setup

Create a virtual environment, install dependencies, and run the app:

```powershell
cd D:\Projects\UniversalReader
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python main.py
```

You can also open a file directly:

```powershell
python main.py "C:\Path\To\Book.pdf"
```

## Launch Modes

Full mode opens the complete personal knowledge reader with library, navigation, Knowledge Panel, notes, summaries, search, and exports:

```powershell
python main.py
```

You can also launch full mode with:

```powershell
python launch_full.py
```

Lite mode opens a lean browser-only reader with the left Library panel, right Knowledge Panel, AI tools, and Legacy Renderer removed:

```powershell
python main.py --lite
```

You can also launch lite mode with:

```powershell
python launch_lite.py
```

Both modes support PDF, EPUB, CBR, CBZ, TXT, HTML, and DOCX through the shared browser-rendering pipeline, navigation, zoom, view modes, document search, and recent-file controls. Full mode wraps the reader with the library/sidebar and Knowledge Panel and keeps Legacy Renderer as an advanced fallback. Lite keeps only the reader window and toolbar and has no Browser/Legacy toggle.

## Browser Renderer

Universal Reader now uses the shared browser reader as the central reading layer. In the current PySide app this is embedded with Qt WebEngine `QWebEngineView`. The old manual fixed-page renderer remains available only in Full from `Settings > Advanced > Legacy renderer`.

The browser pipeline is:

1. Open file and detect type.
2. Convert or extract into browser-displayable HTML/assets under the user cache directory.
3. Generate `reader.html`.
4. Load `reader.html` into the embedded WebView.
5. Use CSS/JavaScript for continuous scrolling, single-page mode, two-page mode, fit width, fit page, zoom, dark mode, and font scaling.

Rendering paths:

- HTML: sanitized and wrapped in the Universal Reader browser shell; local relative image/link paths are rewritten to file URIs.
- TXT: escaped and wrapped as styled HTML with paragraph handling.
- EPUB: read with EbookLib, spine documents are loaded in order, assets are extracted to cache, and chapter image/link references are rewritten.
- DOCX Reflow: converted to HTML with Mammoth and cached when the source file is unchanged.
- DOCX Original Layout: enabled per-document from `Settings > Preferences...` with the checkbox `Use Original Layout for DOCX files`. When enabled, UR Lite converts the DOCX to a temporary PDF with LibreOffice `soffice.exe` and displays that PDF path. If LibreOffice is unavailable or conversion fails, the app falls back to HTML/Reflow View and shows a message.
- PDF: rendered to cached page images with PyMuPDF and displayed as browser pages. The current page/spread neighborhood is rendered first, then the remaining pages are filled into the cache in the background. This is the current PDF.js fallback path.
- CBZ/CBR: image names are read and naturally sorted first. The current page/spread neighborhood is extracted first, then remaining images are filled into cache in the background. CBR requires `rarfile` plus 7-Zip or unrar.

Lite PDF export:

- Use `File > Export pages to PDF...`, `File > Print...`, right-click the document and choose `Export current page to PDF` or `Export pages to PDF...`, or press `Ctrl+P`.
- Choose current page, all pages, or a custom range such as `1-3, 5, 8-12`.
- Source PDFs are copied page-for-page with PyMuPDF so page content is not rasterized.
- CBZ/CBR image pages are written as PDF pages from the original archive images.
- EPUB, DOCX, TXT, and HTML use Qt WebEngine print-to-PDF. HTML/Reflow export uses the default export font for consistency, not the selected on-screen Reading Font.
- Long exports show progress or a busy indicator, and completion/error dialogs include the output path or failure reason.

Browser renderer cache folders are stored outside the install folder:

- Full: `%APPDATA%\UniversalReader\cache\browser-renderer`
- Lite: `%APPDATA%\UniversalReaderLite\cache\browser-renderer`
- Non-Windows fallback: `~/.universalreader/cache/browser-renderer` or `~/.universalreaderlite/cache/browser-renderer`

Old browser-renderer cache folders are cleaned periodically.

## AI Summaries

Summaries are user-controlled:

- Use `Knowledge > AI Settings` to choose Local Ollama or an OpenAI-compatible API.
- OpenAI-compatible mode requires the user's own base URL, API key, and model.
- Ollama mode defaults to `http://localhost:11434` and model `llama3.1`.
- Click `Summarize Current Chapter` or a chapter's `Summarize` button to generate.
- Existing summaries are loaded from the local database. Click `Regenerate` to call AI again.

## Local Data

The library database is stored under `%APPDATA%\UniversalReader\library.sqlite` on Windows, or `~/.universalreader/library.sqlite` when `%APPDATA%` is not available. If that path cannot be opened, the app falls back to `.universalreader\library.sqlite` in the current working directory.

Settings are stored as JSON under `%APPDATA%\UniversalReader\settings.json` on Windows, or `~/.universalreader/settings.json` when `%APPDATA%` is not available.

Display preferences are saved both as user defaults and as per-book overrides:

- Continuous scroll is the default browser-renderer mode for PDF, EPUB, DOCX HTML, TXT, HTML, CBZ, and CBR.
- PDF books remember single-page, continuous scroll, or two-page spread mode.
- PDF spread mode advances by true spreads. Normal spreads are pages 1-2, 3-4, 5-6. Book-style spreads show page 1 alone, then 2-3, 4-5.
- CBR/CBZ books remember single-page, continuous scroll, or two-page spread mode. Comic spreads show page 1 as a cover, then pages 2-3, 4-5, and onward.
- EPUB books remember font family, font size, line spacing, margins, and Light/Sepia/Dark theme.
- DOCX books remember whether `Use Original Layout for DOCX files` is enabled. HTML/Reflow View uses Mammoth. Original Layout uses LibreOffice headless DOCX-to-PDF conversion through `soffice.exe` and displays the cached PDF through the browser PDF path. If LibreOffice is installed in a normal Windows location, UR Lite detects it automatically. Without LibreOffice, DOCX falls back to HTML/Reflow View with a short explanatory message, and formatting may be simplified.
- The toolbar Zoom and Fit controls call browser JavaScript/CSS in the default renderer. In Full Legacy Renderer mode, they use the previous manual rendering behavior.
- Right Arrow and Page Down move forward. Left Arrow and Page Up move backward. In spread mode they move by spread.
- In browser continuous mode, mouse-wheel scrolling is native WebView scrolling. In browser single/two-page mode, JavaScript debounces wheel page turns to avoid page skipping.
- `Settings > Advanced > Legacy renderer` switches Full back to the previous renderer for troubleshooting. Lite does not include this toggle.
- `Settings > Restore last session` controls whether the last file reopens on startup. It is off by default.

The left navigation panel defaults to the collapsed reading-focused rail. Hover or click the rail to expand it, or press `Ctrl+B` to pin/unpin the panel.

The right Knowledge Panel also collapses to a rail with shortcuts for Gist, Notes, Highlights, Quiz, Flashcards, and Export. Press `Ctrl+K` to pin/unpin it. Press `Ctrl+Shift+F` for Focus Reading Mode, which hides both panels and nonessential chrome while keeping an auto-hiding top-center reading control bar available. Panel layout is saved as a user default and as a per-book preference.

Responsiveness notes:

- Browser fit-width and resize behavior use CSS, so the reader expands when the left Library panel or right Knowledge Panel is collapsed.
- Browser continuous view relies on native WebView scrolling.
- Browser PDF rendering caches generated page images under the user cache directory.
- Browser PDF/comic view prepares the target page neighborhood first, writes lazy image references into `reader.html`, then fills remaining page images into the cache in the background.
- Legacy PDF page rendering runs in background workers and rendered page bytes are cached.
- Legacy single page and two-page spread views render only the needed pages.
- Legacy continuous PDF view uses placeholders and lazy-loads nearby pages instead of rendering the whole book at once.
- Legacy continuous CBR/CBZ view uses placeholders, cached image bytes, and lazy-loads visible pages while preserving natural mouse-wheel scrolling.
- Folder scans, library indexing, library search, local summary saves, bookmarks, highlights, notes, and progress writes run outside the UI thread.
- Click handlers include lightweight profiling; slow handlers are reported in the status bar and console.

## Desktop Launcher

Run the app normally with:

```powershell
python main.py
```

Or run the lightweight installer, which creates/updates `.venv`, installs requirements, and creates desktop shortcuts:

```powershell
.\install_universal_reader.ps1
```

To skip shortcut creation:

```powershell
.\install_universal_reader.ps1 -SkipShortcut
```

To create only the clickable desktop icons:

```powershell
.\create_desktop_shortcut.ps1
```

This creates `Universal Reader.lnk` and `Universal Reader Lite.lnk` on the current user's Desktop. The script prefers the packaged EXE when it exists, otherwise it falls back to `.venv\Scripts\pythonw.exe` so source mode still works without a console window. Both shortcuts use the branded `assets\icons\ur_lite.ico` icon when source mode is used.

If Windows keeps showing an older shortcut icon after reinstalling, unpin/remove the old shortcut, recreate the shortcut, then pin the new one again. Windows icon caching can lag behind the file update.

If PowerShell blocks the script, allow local user scripts with:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

## Build Profiles

Use separate clean virtual environments for Lite and Full builds so PyInstaller does not accidentally collect unused packages.

Lite browser-only installer:

```powershell
cd D:\Projects\UniversalReader
python -m venv .venv-lite
.\.venv-lite\Scripts\python.exe -m pip install -r requirements-lite.txt
.\build_lite_installer.ps1 -Python .\.venv-lite\Scripts\python.exe
```

Lite excludes the Full window, AI service, library database, side-panel layout code, legacy backend selector, and legacy-only reader modules. It does not bundle LibreOffice, python-docx, Pillow, demos, experimental modules, or Pro/Full executables. CBR support can use the optional packaged 7-Zip runtime copied by `build_lite_installer.ps1`, or a system 7-Zip/unrar install. The installer is written to `dist_installer\UniversalReaderLiteSetup.exe`.

Full browser-plus-legacy app directory:

```powershell
cd D:\Projects\UniversalReader
python -m venv .venv-full
.\.venv-full\Scripts\python.exe -m pip install -r requirements-full.txt
.\build_full.ps1 -Python .\.venv-full\Scripts\python.exe
```

Full includes the browser renderer, legacy renderer fallback, library/sidebar, Knowledge Panel, AI settings, notes/bookmarks/summaries, and advanced settings. It does not bundle LibreOffice; DOCX Original Layout uses LibreOffice only when it is already installed.

The current PySide WebView implementation depends on Qt WebEngine. The build profiles avoid bundling LibreOffice and remove Lite legacy/full modules, but they do not yet replace Qt WebEngine with Microsoft Edge WebView2.

## Supported Formats

| Format | Library |
| --- | --- |
| PDF | PyMuPDF |
| EPUB | EbookLib, BeautifulSoup4, lxml |
| CBZ | zipfile |
| CBR | rarfile with 7-Zip or unrar |
| TXT | Python standard library |
| HTML | BeautifulSoup4 |
| DOCX | Mammoth, optional LibreOffice; Full legacy reader can also use python-docx |

## Manual Test Checklist

- Lite: verify there is no Legacy Renderer toggle, no Library/Knowledge side panel, and all supported files open in the browser reader.
- Full: verify Browser Renderer is the default and Legacy Renderer is only under `Settings > Advanced`.
- PDF: open a multi-page PDF, test Continuous, Single, Two Page, Fit Width, Fit Page, zoom, and wheel navigation.
- PDF: in Fit Page + Two Page, verify the two pages sit next to each other as a centered spread with a small gap.
- PDF: switch Single -> Continuous -> Two Page -> Single around page 20 and verify it does not flash page 1.
- PDF: reopen the same unchanged file and verify cached pages appear faster.
- EPUB: verify spine/chapter order, table-of-contents labels, images, font size, dark mode, and continuous scrolling.
- DOCX Reflow: verify headings, bold/italic text, tables, lists, and images when Mammoth can extract them.
- DOCX Original Layout: with LibreOffice installed, verify the generated PDF path looks different from reflow HTML for layout-heavy documents.
- DOCX Original Layout: without LibreOffice, verify the browser reader falls back to HTML/Reflow View and shows a friendly message.
- Lite export: open a PDF and export `1-2, 4`; verify the new PDF contains only those source pages and stays sharp when zoomed.
- Lite export: open EPUB/DOCX/TXT/HTML and use `Ctrl+P`; verify the selected browser-rendered sections print to PDF with readable pagination.
- Lite export: open CBZ/CBR and export a range; verify the output PDF contains the selected image pages.
- TXT: verify long lines wrap, font size works, and continuous scrolling is smooth.
- HTML: verify local images load and unsafe scripts are not executed.
- CBZ: verify natural filename sort, continuous scroll, Single, Two Page, Fit Width, and mouse-wheel behavior.
- CBZ: in Fit Page + Two Page, verify comic pages sit as a centered spread and cached images are reused on reopen.
- CBR: if 7-Zip or unrar is installed, run the same comic checks as CBZ; otherwise verify the friendly missing-dependency message.
- Full fallback: enable `Settings > Advanced > Legacy renderer` and verify the previous renderer still opens the same files.

Current automated verification:

- `python -m py_compile browser_reader.py docx_layout.py reader_state.py ui\main_window.py ui\lite_window.py settings.py lite_settings.py tests\test_settings.py tests\test_reader_view_architecture.py tests\test_lite_packaging.py`
- `python -m unittest discover -s tests`
- Browser render smoke test for generated TXT, PDF, and CBZ reader HTML with a temporary cache.

## Notes

- CBR support uses the `rarfile` Python package and prefers 7-Zip at `C:\Program Files\7-Zip\7z.exe` or `C:\Program Files (x86)\7-Zip\7z.exe`.
- PDF summaries use extractable page text. Image-only PDFs need OCR support before they can be summarized.
- Comic archives are readable as images, but they do not have extractable text for summaries unless OCR is added later.
- EPUB, TXT, HTML, and DOCX are split into chapter-like sections for reading, notes, and summaries. DOCX search and summaries use extracted text while the visual reader uses formatted HTML or a cached original-layout PDF.

## License

Add your preferred open-source license before publishing.
