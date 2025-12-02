# useHTTP Hooks - Complete Guide

## 📚 **What is This?**

Custom React hooks for making HTTP requests without writing `fetch()` code everywhere.

---

## 🎯 **Why Use These Hooks?**

**Without custom hooks:**
```typescript
// You'd write this 50+ times in your app! 😱
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch('http://localhost:8000/api/v1/restaurants/')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => setError(err))
    .finally(() => setLoading(false));
}, []);
```

**With custom hooks:**
```typescript
// Just one line! ✨
const { data, loading, error } = useGET('/api/v1/restaurants/');
```

---

## 🚀 **Quick Start**

### **1. Import the hook:**
```typescript
import { useGET } from '@/hooks';
```

### **2. Use it in your component:**
```typescript
const { data, loading, error } = useGET('/api/v1/restaurants/');
```

### **3. Handle the states:**
```typescript
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;
return <div>{data && /* render your data */}</div>;
```

---

## 📖 **Complete Examples**

### **Example 1: Fetching Restaurants**

```typescript
import { useGET } from '@/hooks';
import type { RestaurantsResponse } from '@/types/restaurant.types';

export default function RestaurantsPage() {
  // Specify the response type for TypeScript autocomplete
  const { data: response, loading, error } = useGET<RestaurantsResponse>(
    '/api/v1/restaurants/'
  );

  if (loading) return <p>Loading restaurants...</p>;
  if (error) return <p>Error: {error}</p>;

  const restaurants = response?.data || [];

  return (
    <div>
      {restaurants.map(restaurant => (
        <div key={restaurant.id}>
          <h3>{restaurant.name}</h3>
          <p>{restaurant.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### **Example 2: External API**

```typescript
// For external APIs, pass the full URL
const { data, loading, error } = useGET('https://api.github.com/users/wtoloza');

// The hook detects it's a full URL and uses it directly
```

---

## 🧠 **Smart URL Handling**

The hook automatically detects if you're calling your backend or an external API:

### **Backend API (Path Only):**
```typescript
useGET('/api/v1/restaurants/')
// ✅ Hook builds: http://localhost:8000/api/v1/restaurants/
```

### **External API (Full URL):**
```typescript
useGET('https://api.github.com/repos')
// ✅ Hook uses as-is: https://api.github.com/repos
```

### **How it works:**
```typescript
// Internal logic:
if (url.startsWith('http://') || url.startsWith('https://')) {
  // Full URL - use directly
  return url;
} else {
  // Path only - prepend config.apiUrl
  return `${config.apiUrl}${url}`;
}
```

---

## 🔧 **Testing APIs with curl**

### **Basic GET Request:**
```bash
curl -X GET http://localhost:8000/api/v1/restaurants/
```

### **Pretty Formatted Output:**
```bash
curl http://localhost:8000/api/v1/restaurants/ | python3 -m json.tool
```

### **With Headers:**
```bash
curl -X GET http://localhost:8000/api/v1/restaurants/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### **Save to File:**
```bash
curl http://localhost:8000/api/v1/restaurants/ > restaurants.json
```

---

## 📋 **API Response Structure**

Your backend returns data wrapped in this structure:

```json
{
  "data": [
    {
      "id": "01K969D2ED0WYWYGEYGYHX7NCZ",
      "name": "La Casona Boyacense",
      "description": "Restaurante típico de comida boyacense",
      "city": "Tunja",
      "state": "Boyacá",
      "phone": "+573001234567"
    }
  ],
  "pagination": {
    "page": 1,
    "page_size": 20,
    "total": 5
  }
}
```

**Important:** The actual data is in `response.data`, not at the root!

```typescript
const { data: response } = useGET<RestaurantsResponse>('/api/v1/restaurants/');
const restaurants = response?.data || []; // Extract the array
```

---

## 🎨 **TypeScript Support**

### **Define Your Types:**
```typescript
// types/restaurant.types.ts
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  // ... other fields
}

export interface RestaurantsResponse {
  data: Restaurant[];
  pagination: {
    page: number;
    page_size: number;
    total: number;
  };
}
```

### **Use With Hook:**
```typescript
const { data, loading, error } = useGET<RestaurantsResponse>('/api/v1/restaurants/');
// TypeScript now knows 'data' is RestaurantsResponse | null
// You get autocomplete and type checking! ✨
```

---

## 🏗️ **Architecture Pattern**

### **Smart Component (Page):**
```typescript
// app/restaurants/page.tsx
export default function RestaurantsPage() {
  // Page handles data fetching
  const { data, loading, error } = useGET('/api/v1/restaurants/');

  // Page handles loading/error states
  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  // Page passes clean data to View
  return <RestaurantsView restaurants={data?.data || []} />;
}
```

### **Dumb Component (View):**
```typescript
// views/Restaurants/index.jsx
export const RestaurantsView = ({ restaurants }) => {
  // View just displays data it receives
  return (
    <div>
      {restaurants.map(restaurant => (
        <RestaurantCard key={restaurant.id} {...restaurant} />
      ))}
    </div>
  );
};
```

**Benefits:**
- ✅ Separation of concerns
- ✅ View is reusable with any data
- ✅ Easy to test
- ✅ Clean architecture

---

## 🌍 **Environment Configuration**

The hook uses your config system:

```typescript
// Local (default)
apiUrl: 'http://localhost:8000'

// Development
apiUrl: 'https://api-dev.descubreboyaca.com'

// Production
apiUrl: 'https://api.descubreboyaca.com'
```

**To change environment:**
```bash
# Local
npm run dev

# Development
SCOPE=development npm run dev

# Production
SCOPE=production npm run build
```

---

## 🐛 **Debugging**

### **Check the Console:**
The hook logs the full URL it's fetching:
```
Fetching from: http://localhost:8000/api/v1/restaurants/
```

### **Common Issues:**

**1. Getting `undefined` for data:**
```typescript
// ❌ Wrong - response.data is nested
return <RestaurantsView restaurants={data} />;

// ✅ Correct - extract response.data
return <RestaurantsView restaurants={data?.data || []} />;
```

**2. Server not running:**
```bash
# Start your backend first!
cd backend
python manage.py runserver
```

**3. CORS errors:**
- Check your Django CORS settings
- Make sure `http://localhost:3000` is in `CORS_ALLOWED_ORIGINS`

---

## 📚 **What You Learned**

1. ✅ **Custom Hooks**: Reusable logic across components
2. ✅ **Smart URL Handling**: Automatic domain prepending
3. ✅ **TypeScript Generics**: Type-safe API calls
4. ✅ **Separation of Concerns**: Smart vs Dumb components
5. ✅ **Environment Config**: Different URLs per environment
6. ✅ **API Testing**: Using curl to test endpoints
7. ✅ **State Management**: Handling data, loading, error states

---

## 🚀 **Next Steps**

When you're ready to expand, you can add:

1. **POST/PUT/DELETE hooks** for creating/updating data
2. **Request headers** for authentication
3. **Request caching** to avoid duplicate calls
4. **Request cancellation** with AbortController
5. **Retry logic** for failed requests
6. **Optimistic updates** for better UX

But start simple! You now have a solid foundation. 🎉

---

## 💡 **Quick Reference**

```typescript
// Basic usage
const { data, loading, error } = useGET(url);

// With TypeScript
const { data, loading, error } = useGET<ResponseType>(url);

// Backend API (path only)
useGET('/api/v1/restaurants/')

// External API (full URL)
useGET('https://api.example.com/data')

// Extract nested data
const items = data?.data || [];

// Test with curl
curl http://localhost:8000/api/v1/restaurants/ | python3 -m json.tool
```

---

**Questions?** Review this guide or check the inline comments in `useGET.ts`! 📖

