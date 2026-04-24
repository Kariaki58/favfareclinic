import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // Return a dummy object during build to prevent crashes
    if (typeof window !== 'undefined') {
      console.warn('Supabase environment variables are missing! Check your Vercel project settings.')
    }
    return {
      auth: { 
        getSession: async () => ({ data: { session: null }, error: null }),
        signInWithPassword: async () => ({ data: { user: null, session: null }, error: new Error('Supabase URL/Key missing') }),
        signOut: async () => ({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      },
      from: () => ({ 
        select: () => ({ 
          order: () => ({ 
            limit: () => ({}) 
          }),
          eq: () => ({
            single: () => ({ data: null, error: null })
          })
        }),
        insert: () => ({}),
        update: () => ({ eq: () => ({}) }),
        delete: () => ({ eq: () => ({}) })
      }),
      storage: { from: () => ({ upload: async () => ({}), remove: async () => ({}) }) }
    } as any
  }

  return createBrowserClient(url, key)
}
