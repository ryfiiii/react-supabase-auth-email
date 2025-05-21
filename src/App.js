import React, { useState, useEffect } from 'react'
import { supabase } from './config/supabaseClient'
import Auth from './components/Auth'
import './App.css'

function App() {
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <div className="App">
            {!session ? (
                <Auth />
            ) : (
                <div>
                    <h1>ログイン成功！</h1>
                    <p>メールアドレス: {session.user.email}</p>
                    <button onClick={() => supabase.auth.signOut()}>
                        ログアウト
                    </button>
                </div>
            )}
        </div>
    )
}

export default App
