import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import TemplateClient from '@/app/dashboard/template/TemplateClient'

export const metadata = {
    title: 'Pilih Template',
}

export default async function TemplatePage() {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth/login')
    }

    const userName = user.user_metadata?.full_name || user.user_metadata?.name || 'User'
    const userEmail = user.email || ''
    const userAvatar = user.user_metadata?.avatar_url || null

    return (
        <TemplateClient
            userName={userName}
            userEmail={userEmail}
            userAvatar={userAvatar}
        />
    )
}
