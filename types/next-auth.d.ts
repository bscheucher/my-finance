import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  export interface Session {
    user: {
      role: string;
    } & DefaultSession['user'];
  }
}

// This tells TypeScript that the User object (and therefore session.user) 
// includes the role property.

// using `declare module` augments existing types without changing the original module, 
// ensuring compatibility with updates to the module.

// When you want to extend the session object with custom fields (like role), 
// using DefaultSession ensures that you start with the base structure and build upon it. 
// This avoids overwriting the existing properties.
