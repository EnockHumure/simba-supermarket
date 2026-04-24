# SimbaBot AI - Groq API Setup Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Your Free Groq API Key

1. Go to **https://console.groq.com**
2. Sign up with your email (or login with Google/GitHub)
3. Navigate to **API Keys** section
4. Click **"Create API Key"**
5. Copy the key (starts with `gsk_...`)

### Step 2: Add Key to Your Project

1. Open `.env` file in the project root
2. Replace `your_groq_api_key_here` with your actual key:
   ```
   VITE_GROQ_API_KEY=gsk_your_actual_key_here
   ```
3. Save the file

### Step 3: Restart Dev Server

```bash
npm run dev
```

That's it! SimbaBot is now AI-powered! 🎉

---

## 🤖 What SimbaBot Can Do Now

### Before (Keyword Search):
```
User: "I need breakfast items"
Bot: No results found
```

### After (Groq AI):
```
User: "I need breakfast items"
Bot: "Great! For breakfast, I recommend checking out our bread, eggs, milk, and coffee. We have fresh options starting from 500 RWF."
[Shows: Bread products, Eggs, Milk, Coffee]
```

---

## 💬 Example Conversations

### Natural Language Queries:
- ✅ "Do you have fresh milk?"
- ✅ "I need something for breakfast"
- ✅ "Show me cleaning products"
- ✅ "What's good for cooking?"
- ✅ "I'm looking for baby items"
- ✅ "Do you sell electronics?"
- ✅ "I need ingredients for a cake"
- ✅ "Show me affordable snacks"

### How It Works:
1. **User asks** in natural language
2. **Groq AI** (llama-3.3-70b) understands intent
3. **AI extracts** relevant product keywords
4. **Smart search** finds matching products
5. **Natural response** + product cards shown

---

## 🆓 Groq Free Tier Limits

- **30 requests/minute**
- **14,400 requests/day**
- **No credit card required**
- **Perfect for demos and development**

For Demo Day, this is more than enough!

---

## 🔧 Technical Details

### Model Used:
- **llama-3.3-70b-versatile**
- Fast inference (< 1 second)
- Excellent at understanding shopping queries
- Supports multiple languages

### Fallback System:
If Groq API fails (no key, rate limit, network error):
- ✅ Automatically falls back to keyword search
- ✅ No crashes or errors
- ✅ User still gets results

### Product Context:
SimbaBot knows:
- 600+ products in catalog
- All 7 categories
- Sample product names and prices
- Rwanda-specific context

---

## 🎯 Demo Day Talking Points

1. **"We use Groq's llama-3.3-70b for conversational AI"**
   - Not just keyword search
   - Understands natural language
   - Extracts intent from queries

2. **"SimbaBot handles complex queries"**
   - "I need breakfast items" → bread, eggs, milk, coffee
   - "Show me cleaning products" → soap, detergent, wipes
   - "What's good for cooking?" → oil, spices, flour

3. **"Intelligent fallback system"**
   - If AI unavailable, keyword search kicks in
   - No crashes, always works
   - Graceful degradation

4. **"Free tier is perfect for demos"**
   - 14,400 requests/day
   - No credit card needed
   - Production-ready performance

---

## 🐛 Troubleshooting

### "Falling back to keyword search" in console?

**Cause:** Groq API key not configured or invalid

**Fix:**
1. Check `.env` file has correct key
2. Key should start with `gsk_`
3. Restart dev server after adding key

### "Groq API error: 429"?

**Cause:** Rate limit exceeded (30 requests/minute)

**Fix:**
- Wait 1 minute
- Free tier resets every minute
- For production, upgrade to paid tier

### "Groq API error: 401"?

**Cause:** Invalid API key

**Fix:**
1. Generate new key at https://console.groq.com/keys
2. Update `.env` file
3. Restart server

---

## 📊 Performance Comparison

| Feature | Keyword Search | Groq AI |
|---------|---------------|---------|
| "milk" | ✅ Works | ✅ Works |
| "I need breakfast" | ❌ No results | ✅ Bread, eggs, milk, coffee |
| "Do you have fresh milk?" | ❌ No results | ✅ Shows milk products |
| "cleaning products" | ⚠️ Partial | ✅ Soap, detergent, wipes |
| "something for cooking" | ❌ No results | ✅ Oil, spices, flour |
| Response time | < 100ms | < 1s |
| Natural language | ❌ No | ✅ Yes |
| Context awareness | ❌ No | ✅ Yes |

---

## 🚀 Production Recommendations

For a real deployment:

1. **Environment Variables**
   - Store API key in secure environment (not .env)
   - Use Vercel/Netlify environment variables

2. **Rate Limiting**
   - Implement client-side rate limiting
   - Cache common queries
   - Show "Please wait" message if rate limited

3. **Error Handling**
   - Log errors to monitoring service
   - Show user-friendly error messages
   - Always have keyword fallback

4. **Monitoring**
   - Track API usage
   - Monitor response times
   - Alert on failures

5. **Upgrade to Paid Tier** (if needed)
   - Higher rate limits
   - Priority support
   - SLA guarantees

---

## 🎓 Learning Resources

- **Groq Docs:** https://console.groq.com/docs
- **Llama 3.3 Guide:** https://www.llama.com/docs
- **API Reference:** https://console.groq.com/docs/api-reference

---

## ✅ Verification Checklist

Before Demo Day, verify:

- [ ] Groq API key is configured in `.env`
- [ ] SimbaBot opens and shows AI branding
- [ ] Test query: "I need breakfast items" returns products
- [ ] Test query: "Do you have milk?" returns milk products
- [ ] Fallback works (remove API key, test still works)
- [ ] Loading state shows "🤔 Thinking..."
- [ ] Product cards appear after AI response
- [ ] No console errors

---

**You're now ready for Demo Day with a world-class conversational AI shopping assistant!** 🚀
