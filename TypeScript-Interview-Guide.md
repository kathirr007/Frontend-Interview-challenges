# TypeScript Interview Questions & Answers

## TypeScript

### Q1: What are the advantages of using TypeScript?

**A:** TypeScript adds static typing, interfaces, enums, generics, and better tooling support. It catches errors at compile time, improves code documentation, and enhances developer productivity.

### Q2: Explain TypeScript interfaces vs. types.

**A:** Interfaces are extensible and can be re-opened to add new properties. Types are not extensible but can be used for unions, intersections, and primitives.

Example:

```typescript
interface User {
  name: string
  age: number
}

type UserStatus = 'active' | 'inactive'
```

### Q3: How do you handle optional parameters in TypeScript?

**A:** Use the question mark (`?`) after the parameter name.

Example:

```typescript
function greet(name: string, greeting?: string): void {
  console.log(greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`)
}
```

### Q4: How do you type backend API integrations in TypeScript?

**A:** Typing backend APIs involves defining interfaces for request/response payloads and using them with fetch methods or HTTP clients.

Example:

```typescript
// Define API response types
interface User {
  id: number
  name: string
  email: string
}

interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

// Typing a fetch call
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  const userData: ApiResponse<User> = await response.json()
  return userData.data
}

// Typing POST request
interface CreateUserRequest {
  name: string
  email: string
  age?: number
}

async function createUser(user: CreateUserRequest): Promise<User> {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  return response
}
```

---

**Note:** For comprehensive React.js and Next.js interview questions covering component lifecycle, hooks, performance optimization, data fetching strategies, authentication patterns, middleware, SEO, and modern App Router concepts, please refer to the dedicated guide: [React-Next-Interview-Guide.md](./React-Next-Interview-Guide.md)
