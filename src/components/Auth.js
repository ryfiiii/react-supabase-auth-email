import React, { useState } from 'react'
import { supabase } from '../config/supabaseClient'

export default function Auth() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isSignUp, setIsSignUp] = useState(false)

    const handleAuth = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                })
                if (error) throw error
                setMessage('確認メールを送信しました！')
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
            }
        } catch (error) {
            setMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-container">
            <h1>{isSignUp ? '新規登録' : 'ログイン'}</h1>
            <form onSubmit={handleAuth}>
                <input
                    type="email"
                    placeholder="メールアドレスを入力"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="パスワードを入力"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? '処理中...' : (isSignUp ? '新規登録' : 'ログイン')}
                </button>
            </form>
            <button
                className="switch-auth-mode"
                onClick={() => setIsSignUp(!isSignUp)}
            >
                {isSignUp ? 'ログインに切り替え' : '新規登録に切り替え'}
            </button>
            {message && <p>{message}</p>}
        </div>
    )
} 