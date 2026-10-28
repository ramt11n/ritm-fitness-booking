# ریتم | Ritm

A Persian RTL fitness-class booking prototype built for the **VC-062 Vibe Coder assignment**.

ریتم یک نمونهٔ محلی برای رزرو کلاس‌های گروهی باشگاه است؛ با برنامهٔ هفتگی، ظرفیت، لیست انتظار و فضای کاری مربی.

## Run

Download the repository and open **`index.html`** in a modern browser. No installation, build step, backend, or external assets are required. Persian fonts and SVG artwork are embedded in the file.

## Features

- Saturday-first weekly schedule with Persian digits and Solar Hijri dates.
- Filters by class type, coach, and available capacity.
- Name and mobile-number validation, including Persian and Arabic input digits.
- Capacity-aware booking and a FIFO waiting list.
- Personal booking history, notifications, and subscription-session activity.
- Separate member and coach demo workspaces; each coach sees their assigned classes.
- Participant withdrawal with automatic promotion from the waiting list.
- Coach cancellation that notifies every active participant and waiting member and releases each held session once.
- Responsive mobile, tablet, and desktop layouts, keyboard-accessible dialogs, and reduced-motion preferences.
- Versioned localStorage persistence with a working in-memory fallback.

## Session policy

Joining either a class or its waiting list reserves **one subscription session**. Promotion from waiting to confirmed does not reserve another session. Withdrawal or coach cancellation releases the held session exactly once.

## Try the full scenario

1. Open **امکانات نسخهٔ نمایشی** and reset the sample data.
2. Use Sara Mohammadi's member account to book the final Pilates place.
3. Join the full interval-training class's waiting list.
4. Open the coach workspace and select **آرین راد**.
5. Record a participant withdrawal to see the first waiting member promoted.
6. Cancel the interval-training session and inspect the notification/refund summary.
7. Return to the affected member accounts to inspect messages and returned sessions.

Demo identities and motion preferences are available under **امکانات نسخهٔ نمایشی**. No real credentials are needed.

## Technology

Semantic HTML, embedded CSS, vanilla JavaScript, inline SVG, `Intl`, `localStorage`, and `sessionStorage`. Created with assistance from ChatGPT.

## Verification

The app includes 16 isolated business-logic checks and 8 local role-policy checks. They run on fresh fixtures and do not change the displayed or saved demo data.

In browser developer tools:

```js
Ritm.runSelfTests()
Ritm.runAccessTests()
```

An optional Node.js runner requires no npm packages:

```sh
node tests/business.test.cjs
```

Browser UI checks were performed through a local preview at 390px, 768px, and 1440px. Direct `file://` launching was unavailable in the test browser. Cross-tab synchronization for file URLs depends on the browser; the complete demonstration works in one tab.

## Demo scope

This is an offline assignment prototype, not a production multi-user service. Demo role selection and client-side checks do not authenticate a person or enforce server-side authorization. Browser data can be edited by the person using the browser. Use sample data only.

The embedded script is allowlisted by a CSP hash, external connections are blocked, and user-entered content is escaped when rendered. Production use would require authenticated accounts, server-side authorization, a database, and concurrency controls.

## Font license

Vazirmatn by Saber Rastikerdar is embedded under the SIL Open Font License 1.1. Its license notice is included inside `index.html`.
