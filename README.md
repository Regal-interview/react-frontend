# Regal Interview Tasks:

- [ ] ✨ Authorize Microphone
- [ ] 🐛 Fix Contacts Filtering
- [ ] ♻️ Discuss Improvements

## ✨ Authorize Microphone

Before voice calls can be made we must first request permission to access the browsers' microphone.

Please implement this logic in the `requestMicPermission` function in the `context/MicPermission.tsx`.

Note that the code already detects if the user has given permission, and will dynamically update
if its permission changes.

## 🐛 Fix Contacts Filtering

Users are reporting issues when searching their contacts list. It seems as if some API
queries take longer than others, and old results sometimes override newer results.

Example search: `jack`

Update the frontend to allow for slow API calls.

## ♻️ Discuss Improvements

- If you had to improve the code, what would you look to change?
- If you had to optimize the code, what tools and tricks would you use?
