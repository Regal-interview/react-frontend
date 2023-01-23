# Regal Interview Tasks:

- [ ] ✨ Authorize Microphone
- [ ] 🐛 Fix Contacts Filtering
- [ ] 🔄️ Discuss Improvements

## ✨ Authorize Microphone

Before voice calls can be made we must first request permission to access the browsers' microphone.

Part of the code is already implemented in the `src/context/MicPermission.tsx`, which currently
detects if the user has given permission, and will dynamically update if it changes.

## 🐛 Contacts Filtering Issues

Users have reported a problem searching their contacts.

When typing a name quickly into the search box, some API queries take longer than others. This
results in old API results, sometimes replacing newer contact search results.

Update the frontend to allow for slow API calls.

**EXAMPLE SEARCH:** `jack`

## 🔄️ Discuss Improvements

- If you had to improve the code, what would you look to change?
- If you had to optimize the code, what tools and tricks would you use?
